import React, { useContext, useState } from 'react';
import withAuth from '../utils/withAuth';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Typography, Grid, InputAdornment, Chip } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import AddIcon from '@mui/icons-material/Add';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { AuthContext } from '../contexts/AuthContext';
import { motion } from 'framer-motion';

function HomeComponent() {
    const navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState('');
    const { addToUserHistory } = useContext(AuthContext);

    const handleJoinVideoCall = async () => {
        if (meetingCode.trim()) {
            await addToUserHistory(meetingCode);
            navigate(`/${meetingCode}`);
        }
    };

    const handleNewMeeting = () => {
        const code = Math.random().toString(36).substring(2, 10);
        navigate(`/${code}`);
    };

    return (
        <Box sx={{
            minHeight: '85vh', display: 'flex', alignItems: 'center',
            justifyContent: 'center', position: 'relative', overflow: 'hidden', px: 3
        }}>
            {/* Background orbs */}
            <Box sx={{
                position: 'absolute', top: '10%', right: '5%',
                width: 400, height: 400, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,152,57,0.08) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />
            <Box sx={{
                position: 'absolute', bottom: '10%', left: '5%',
                width: 300, height: 300, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,75,43,0.06) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />

            <Grid container spacing={6} alignItems="center" justifyContent="center" maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                {/* Left text */}
                <Grid item xs={12} md={6}>
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                        <Chip
                            label="✦ Ready to connect"
                            size="small"
                            sx={{
                                mb: 3, background: 'rgba(255,152,57,0.12)',
                                color: '#FF9839', border: '1px solid rgba(255,152,57,0.25)',
                                fontWeight: 600
                            }}
                        />
                        <Typography sx={{
                            fontSize: { xs: '2rem', md: '3rem' },
                            fontWeight: 800, lineHeight: 1.15, letterSpacing: '-1px',
                            color: '#fff', mb: 2, fontFamily: 'Inter'
                        }}>
                            Quality Video Calls,{' '}
                            <span style={{
                                background: 'linear-gradient(135deg, #FF9839, #FF4B2B)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                            }}>
                                Anytime
                            </span>
                        </Typography>
                        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.45)', mb: 4, lineHeight: 1.8, maxWidth: 420 }}>
                            Join a meeting instantly with a code, or start a brand new one. Your peers are just one click away.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            {[
                                { n: '99.9%', label: 'Uptime' },
                                { n: '<100ms', label: 'Latency' },
                                { n: 'HD', label: 'Video Quality' }
                            ].map((s, i) => (
                                <Box key={i} sx={{ textAlign: 'center' }}>
                                    <Typography sx={{ color: '#FF9839', fontWeight: 800, fontSize: '1.2rem' }}>{s.n}</Typography>
                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>{s.label}</Typography>
                                </Box>
                            ))}
                        </Box>
                    </motion.div>
                </Grid>

                {/* Join card */}
                <Grid item xs={12} md={5}>
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                        <Box sx={{
                            p: 4, borderRadius: '24px',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 40px 80px rgba(0,0,0,0.4)',
                            position: 'relative', overflow: 'hidden'
                        }}>
                            {/* top gradient line */}
                            <Box sx={{
                                position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                                background: 'linear-gradient(90deg, #FF9839, #FF4B2B, transparent)'
                            }} />

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
                                <Box sx={{
                                    width: 42, height: 42, borderRadius: '12px',
                                    background: 'linear-gradient(135deg, #FF9839, #FF4B2B)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 8px 20px rgba(255,75,43,0.3)'
                                }}>
                                    <VideoCallIcon sx={{ color: '#fff', fontSize: 22 }} />
                                </Box>
                                <Box>
                                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, lineHeight: 1 }}>Join Meeting</Typography>
                                    <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>Enter a code to join</Typography>
                                </Box>
                            </Box>

                            <TextField
                                fullWidth
                                placeholder="Enter meeting code"
                                value={meetingCode}
                                onChange={e => setMeetingCode(e.target.value)}
                                onKeyPress={e => e.key === 'Enter' && handleJoinVideoCall()}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontWeight: 700 }}>#</Typography>
                                        </InputAdornment>
                                    )
                                }}
                                sx={{
                                    mb: 2,
                                    '& .MuiOutlinedInput-root': {
                                        color: '#fff',
                                        background: 'rgba(255,255,255,0.05)',
                                        borderRadius: '12px',
                                        '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                                        '&:hover fieldset': { borderColor: 'rgba(255,152,57,0.4)' },
                                        '&.Mui-focused fieldset': { borderColor: '#FF9839' }
                                    },
                                    '& input::placeholder': { color: 'rgba(255,255,255,0.25)' }
                                }}
                            />

                            <Button
                                fullWidth
                                variant="contained"
                                size="large"
                                endIcon={<ArrowForwardIcon />}
                                onClick={handleJoinVideoCall}
                                disabled={!meetingCode.trim()}
                                sx={{
                                    background: 'linear-gradient(135deg, #FF9839, #FF4B2B)',
                                    color: '#fff', fontWeight: 700, borderRadius: '12px',
                                    py: 1.5, fontSize: '1rem', textTransform: 'none',
                                    boxShadow: '0 8px 25px rgba(255,75,43,0.35)',
                                    '&:hover': { boxShadow: '0 12px 35px rgba(255,75,43,0.55)' },
                                    '&:disabled': { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.25)', boxShadow: 'none' },
                                    mb: 2
                                }}
                            >
                                Join Now
                            </Button>

                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                                <Box sx={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                                <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.25)' }}>or</Typography>
                                <Box sx={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
                            </Box>

                            <Button
                                fullWidth
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={handleNewMeeting}
                                sx={{
                                    color: 'rgba(255,255,255,0.7)',
                                    borderColor: 'rgba(255,255,255,0.1)',
                                    borderRadius: '12px', py: 1.4,
                                    fontWeight: 600, textTransform: 'none',
                                    '&:hover': { borderColor: 'rgba(255,152,57,0.4)', color: '#FF9839', background: 'rgba(255,152,57,0.05)' }
                                }}
                            >
                                Start New Meeting
                            </Button>
                        </Box>
                    </motion.div>
                </Grid>
            </Grid>
        </Box>
    );
}

export default withAuth(HomeComponent);
