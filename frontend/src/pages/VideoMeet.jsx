import React, { useEffect, useRef, useState } from 'react'
import io from "socket.io-client";
import { Badge, IconButton, TextField, Button, Box, Typography, Paper, Tooltip, Container, Fab, Drawer } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff'
import CallEndIcon from '@mui/icons-material/CallEnd'
import MicIcon from '@mui/icons-material/Mic'
import MicOffIcon from '@mui/icons-material/MicOff'
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare'
import ChatIcon from '@mui/icons-material/Chat'
import CloseIcon from '@mui/icons-material/Close';
import server from '../environment';
import { motion, AnimatePresence } from 'framer-motion';

const server_url = server;

const peerConfigConnections = {
    "iceServers": [
        { "urls": "stun:stun.l.google.com:19302" }
    ]
}

export default function VideoMeetComponent() {

    var socketRef = useRef();
    let socketIdRef = useRef();

    let localVideoref = useRef();

    // Use useRef for connections to prevent global state pollution and ensure persistence appropriately
    let connectionsRef = useRef({});

    let [videoAvailable, setVideoAvailable] = useState(true);
    let [audioAvailable, setAudioAvailable] = useState(true);

    let [video, setVideo] = useState(true);
    let [audio, setAudio] = useState(true);

    let [screen, setScreen] = useState();
    let [showModal, setModal] = useState(false);
    let [screenAvailable, setScreenAvailable] = useState();
    let [messages, setMessages] = useState([])
    let [message, setMessage] = useState("");
    let [newMessages, setNewMessages] = useState(0);
    let [askForUsername, setAskForUsername] = useState(true);
    let [username, setUsername] = useState("");

    const videoRef = useRef([])
    let videoStreamRef = useRef(); // Backup for camera stream during screen share
    let [videos, setVideos] = useState([])

    useEffect(() => {
        getPermissions();
    }, [])

    const getPermissions = async () => {
        try {
            // Check video permission
            try {
                const videoStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setVideoAvailable(true);
                // Stop tracks immediately after check to release device
                videoStream.getTracks().forEach(track => track.stop());
            } catch (e) {
                setVideoAvailable(false);
                console.log("Video permission denied or no device");
            }

            // Check audio permission
            try {
                const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setAudioAvailable(true);
                // Stop tracks immediately
                audioStream.getTracks().forEach(track => track.stop());
            } catch (e) {
                setAudioAvailable(false);
                console.log("Audio permission denied or no device");
            }

            if (navigator.mediaDevices.getDisplayMedia) {
                setScreenAvailable(true);
            } else {
                setScreenAvailable(false);
            }

            // Immediately attempt to get the stream for the preview
            if (videoAvailable || audioAvailable) {
                getUserMedia();
            }

        } catch (error) {
            console.log(error);
        }
    };

    const getUserMedia = () => {
        // Only request if we think we have devices, otherwise fallback/failing is handled by catch
        if (videoAvailable || audioAvailable) {
            navigator.mediaDevices.getUserMedia({ video: videoAvailable, audio: audioAvailable })
                .then(stream => {
                    window.localStream = stream;
                    if (localVideoref.current) {
                        localVideoref.current.srcObject = stream;
                    }
                })
                .catch(e => {
                    console.error("Error getting user media:", e);
                });
        }
    }

    let getUserMediaSuccess = (stream) => {
        try {
            window.localStream.getTracks().forEach(track => track.stop())
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connectionsRef.current) {
            if (id === socketIdRef.current) continue // Skip self

            connectionsRef.current[id].addStream(window.localStream)
            connectionsRef.current[id].createOffer().then((description) => {
                connectionsRef.current[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connectionsRef.current[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        // Re-apply track states from React state
        toggleVideoTrack(video);
        toggleAudioTrack(audio);
    }

    const toggleVideoTrack = (status) => {
        if (window.localStream) {
            const videoTrack = window.localStream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.enabled = status;
            }
        }
    }

    const toggleAudioTrack = (status) => {
        if (window.localStream) {
            const audioTrack = window.localStream.getAudioTracks()[0];
            if (audioTrack) {
                audioTrack.enabled = status;
            }
        }
    }

    let connect = () => {
        setAskForUsername(false);
        connectToSocketServer();
    }

    let connectToSocketServer = () => {
        socketRef.current = io.connect(server_url, { secure: false })

        socketRef.current.on('signal', gotMessageFromServer)

        socketRef.current.on('connect', () => {
            socketRef.current.emit('join-call', window.location.href)
            socketIdRef.current = socketRef.current.id

            socketRef.current.on('chat-message', addMessage)

            socketRef.current.on('user-left', (id) => {
                setVideos((videos) => videos.filter((video) => video.socketId !== id))
            })

            socketRef.current.on('user-joined', (id, clients) => {
                clients.forEach((socketListId) => {
                    // Initialize connection if not exists
                    if (!connectionsRef.current[socketListId]) {
                        connectionsRef.current[socketListId] = new RTCPeerConnection(peerConfigConnections);

                        connectionsRef.current[socketListId].onicecandidate = function (event) {
                            if (event.candidate != null) {
                                socketRef.current.emit('signal', socketListId, JSON.stringify({ 'ice': event.candidate }))
                            }
                        }

                        connectionsRef.current[socketListId].onaddstream = (event) => {
                            let videoExists = videoRef.current.find(video => video.socketId === socketListId);

                            if (videoExists) {
                                setVideos(videos => {
                                    const updatedVideos = videos.map(video =>
                                        video.socketId === socketListId ? { ...video, stream: event.stream } : video
                                    );
                                    videoRef.current = updatedVideos;
                                    return updatedVideos;
                                });
                            } else {
                                let newVideo = {
                                    socketId: socketListId,
                                    stream: event.stream,
                                    autoplay: true,
                                    playsinline: true
                                };
                                setVideos(videos => {
                                    const updatedVideos = [...videos, newVideo];
                                    videoRef.current = updatedVideos;
                                    return updatedVideos;
                                });
                            }
                        };

                        // Add local stream if available
                        if (window.localStream) {
                            connectionsRef.current[socketListId].addStream(window.localStream);
                        }
                    }
                })

                if (id === socketIdRef.current) {
                    for (let id2 in connectionsRef.current) {
                        if (id2 === socketIdRef.current) continue

                        try {
                            connectionsRef.current[id2].addStream(window.localStream)
                        } catch (e) { }

                        connectionsRef.current[id2].createOffer().then((description) => {
                            connectionsRef.current[id2].setLocalDescription(description)
                                .then(() => {
                                    socketRef.current.emit('signal', id2, JSON.stringify({ 'sdp': connectionsRef.current[id2].localDescription }))
                                })
                                .catch(e => console.log(e))
                        })
                    }
                }
            })
        })
    }

    let gotMessageFromServer = (fromId, message) => {
        var signal = JSON.parse(message)

        if (fromId !== socketIdRef.current) {
            // CRITICAL FIX: Check if connection exists before using it
            if (!connectionsRef.current[fromId]) {
                // Attempt to recover or ignore if race condition (usually we can create it here if strategy permits, but safer to wait for user-joined or ignore spurious signals)
                // Or we can lazy-create it here if it's an offer:
                if (signal.sdp && signal.sdp.type === 'offer') {
                    connectionsRef.current[fromId] = new RTCPeerConnection(peerConfigConnections);
                    connectionsRef.current[fromId].onicecandidate = function (event) {
                        if (event.candidate != null) {
                            socketRef.current.emit('signal', fromId, JSON.stringify({ 'ice': event.candidate }))
                        }
                    }
                    connectionsRef.current[fromId].onaddstream = (event) => {
                        // ... (same logic as above, ideally refactored into a helper, but duplicating for safety in this hotfix)
                        setVideos(videos => {
                            const newVideo = { socketId: fromId, stream: event.stream, autoplay: true, playsinline: true };
                            return [...videos, newVideo];
                        });
                    }
                    if (window.localStream) {
                        connectionsRef.current[fromId].addStream(window.localStream);
                    }
                } else {
                    return; // Cannot handle answer/ice for non-existent connection
                }
            }

            if (signal.sdp) {
                connectionsRef.current[fromId].setRemoteDescription(new RTCSessionDescription(signal.sdp)).then(() => {
                    if (signal.sdp.type === 'offer') {
                        connectionsRef.current[fromId].createAnswer().then((description) => {
                            connectionsRef.current[fromId].setLocalDescription(description).then(() => {
                                socketRef.current.emit('signal', fromId, JSON.stringify({ 'sdp': connectionsRef.current[fromId].localDescription }))
                            }).catch(e => console.log(e))
                        }).catch(e => console.log(e))
                    }
                }).catch(e => console.log(e))
            }

            if (signal.ice) {
                connectionsRef.current[fromId].addIceCandidate(new RTCIceCandidate(signal.ice)).catch(e => console.log(e))
            }
        }
    }

    let handleVideo = () => {
        setVideo(!video);
        toggleVideoTrack(!video);
    }

    let handleAudio = () => {
        setAudio(!audio)
        toggleAudioTrack(!audio);
    }

    let getDislayMedia = () => {
        if (screen) {
            if (navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true, audio: true })
                    .then(getDislayMediaSuccess)
                    .then((stream) => { })
                    .catch((e) => console.log(e))
            }
        }
    }

    let getDislayMediaSuccess = (stream) => {
        try {
            if (window.localStream) {
                // Backup the camera stream instead of stopping it
                videoStreamRef.current = window.localStream;
                // Mute the video track so it doesn't stay active in background (optional, but good for indicators)
                // We keep it "live" so we can restore it without permission prompt
                window.localStream.getVideoTracks().forEach(track => track.enabled = false);
            }
        } catch (e) { console.log(e) }

        window.localStream = stream
        localVideoref.current.srcObject = stream

        for (let id in connectionsRef.current) {
            if (id === socketIdRef.current) continue

            connectionsRef.current[id].addStream(window.localStream)

            connectionsRef.current[id].createOffer().then((description) => {
                connectionsRef.current[id].setLocalDescription(description)
                    .then(() => {
                        socketRef.current.emit('signal', id, JSON.stringify({ 'sdp': connectionsRef.current[id].localDescription }))
                    })
                    .catch(e => console.log(e))
            })
        }

        stream.getTracks().forEach(track => track.onended = () => {
            setScreen(false)

            try {
                let tracks = localVideoref.current.srcObject.getTracks()
                tracks.forEach(track => track.stop())
            } catch (e) { console.log(e) }

            // Restore the backup camera stream
            if (videoStreamRef.current) {
                const cameraStream = videoStreamRef.current;
                cameraStream.getVideoTracks().forEach(track => track.enabled = true);

                getUserMediaSuccess(cameraStream);
            } else {
                // Fallback if no backup found (should be rare)
                navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
                    window.localStream = stream
                    localVideoref.current.srcObject = stream
                    getUserMediaSuccess(stream);
                }).catch(e => console.log(e));
            }
        })
    }

    useEffect(() => {
        if (screen !== undefined) {
            getDislayMedia();
        }
    }, [screen])

    let handleScreen = () => {
        setScreen(!screen);
    }

    let handleEndCall = () => {
        try {
            let tracks = localVideoref.current.srcObject.getTracks()
            tracks.forEach(track => track.stop())
        } catch (e) { }
        window.location.href = "/"
    }

    let openChat = () => {
        setModal(!showModal);
        setNewMessages(0);
    }

    let handleMessage = (e) => {
        setMessage(e.target.value);
    }

    const addMessage = (data, sender, socketIdSender) => {
        setMessages((prevMessages) => [
            ...prevMessages,
            { sender: sender, data: data }
        ]);
        if (socketIdSender !== socketIdRef.current) {
            setNewMessages((prevNewMessages) => prevNewMessages + 1);
        }
    };

    let sendMessage = () => {
        socketRef.current.emit('chat-message', message, username)
        setMessage("");
    }

    return (
        <Box sx={{ height: 'calc(100vh - 64px)', position: 'relative', overflow: 'hidden', background: '#202124' }}>
            {askForUsername ? (
                <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Paper elevation={10} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <Typography variant="h5" gutterBottom>Type your name to join</Typography>
                            <TextField
                                label="Username"
                                variant="outlined"
                                fullWidth
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                            <Button variant="contained" size="large" onClick={connect} disabled={!username.trim()}>Connect</Button>
                            <Box sx={{ mt: 2, width: '100%', height: 300, bgcolor: 'black', borderRadius: 2, overflow: 'hidden' }}>
                                <video ref={localVideoref} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}></video>
                            </Box>
                        </Paper>
                    </motion.div>
                </Container>
            ) : (
                <>
                    {/* Video Grid */}
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', height: '100%', alignItems: 'center', justifyContent: 'center', p: 2, gap: 2 }}>
                        {/* Local Video - Always present */}
                        <motion.div
                            layout
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Paper elevation={4} sx={{ position: 'relative', width: videos.length === 0 ? '60%' : '300px', height: videos.length === 0 ? '60%' : '225px', overflow: 'hidden', borderRadius: 2, border: '2px solid #3c4043' }}>
                                <video ref={localVideoref} autoPlay muted style={{ width: '100%', height: '100%', objectFit: 'cover' }}></video>
                                <Typography variant="caption" sx={{ position: 'absolute', bottom: 10, left: 10, color: 'white', bgcolor: 'rgba(0,0,0,0.6)', px: 1, borderRadius: 1 }}>You</Typography>
                            </Paper>
                        </motion.div>

                        {/* Remote Videos */}
                        <AnimatePresence>
                            {videos.map((video) => (
                                <motion.div
                                    key={video.socketId}
                                    layout
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.5, opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <Paper elevation={4} sx={{ position: 'relative', width: '300px', height: '225px', overflow: 'hidden', borderRadius: 2, border: '2px solid #3c4043' }}>
                                        <video
                                            data-socket={video.socketId}
                                            ref={ref => {
                                                if (ref && video.stream) {
                                                    ref.srcObject = video.stream;
                                                }
                                            }}
                                            autoPlay
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        >
                                        </video>
                                    </Paper>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </Box>

                    {/* Control Bar */}
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
                        style={{
                            position: 'fixed',
                            bottom: 20,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 1000
                        }}
                    >
                        <Box sx={{
                            bgcolor: 'rgba(32, 33, 36, 0.9)',
                            borderRadius: 8,
                            px: 3,
                            py: 1,
                            display: 'flex',
                            gap: 2,
                            boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                            backdropFilter: 'blur(5px)'
                        }}>
                            <Tooltip title={video ? "Turn off video" : "Turn on video"}>
                                <Fab color={video ? 'default' : 'error'} onClick={handleVideo} size="medium">
                                    {video ? <VideocamIcon /> : <VideocamOffIcon />}
                                </Fab>
                            </Tooltip>

                            <Tooltip title={audio ? "Turn off microphone" : "Turn on microphone"}>
                                <Fab color={audio ? 'default' : 'error'} onClick={handleAudio} size="medium">
                                    {audio ? <MicIcon /> : <MicOffIcon />}
                                </Fab>
                            </Tooltip>

                            {screenAvailable && (
                                <Tooltip title="Share screen">
                                    <Fab color={screen ? 'primary' : 'default'} onClick={handleScreen} size="medium">
                                        {screen ? <StopScreenShareIcon /> : <ScreenShareIcon />}
                                    </Fab>
                                </Tooltip>
                            )}

                            <Tooltip title="End call">
                                <Fab color="error" onClick={handleEndCall} size="medium">
                                    <CallEndIcon />
                                </Fab>
                            </Tooltip>

                            <Badge badgeContent={newMessages} color="secondary">
                                <Tooltip title="Chat">
                                    <Fab color={showModal ? 'primary' : 'default'} onClick={openChat} size="medium">
                                        <ChatIcon />
                                    </Fab>
                                </Tooltip>
                            </Badge>
                        </Box>
                    </motion.div>

                    {/* Chat Drawer */}
                    <Drawer
                        anchor="right"
                        open={showModal}
                        onClose={() => setModal(false)}
                        PaperProps={{ sx: { width: 320, p: 2 } }}
                    >
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6">In-call messages</Typography>
                            <IconButton onClick={() => setModal(false)}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, bgcolor: '#f5f5f5', p: 1, borderRadius: 2 }}>
                            {messages.length > 0 ? messages.map((item, index) => (
                                <Box key={index} sx={{ mb: 1.5, display: 'flex', flexDirection: 'column' }}>
                                    <Typography variant="caption" color="text.secondary">{item.sender}</Typography>
                                    <Paper elevation={0} sx={{ p: 1, bgcolor: 'white', border: '1px solid #e0e0e0' }}>
                                        <Typography variant="body2">{item.data}</Typography>
                                    </Paper>
                                </Box>
                            )) : (
                                <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                                    No messages yet
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Send a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <Button variant="contained" onClick={sendMessage} disabled={!message.trim()}>
                                Send
                            </Button>
                        </Box>
                    </Drawer>
                </>
            )}
        </Box>
    )
}
