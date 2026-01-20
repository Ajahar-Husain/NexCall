import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import { Button, TextField, Box, Typography, Paper, Grid, IconButton, Tooltip } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        if (meetingCode.trim()) {
            await addToUserHistory(meetingCode)
            navigate(`/${meetingCode}`)
        }
    }

    return (
        <Box sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh',
            animation: 'fadeIn 1s'
        }}>
            <Grid container spacing={4} justifyContent="center" alignItems="center" maxWidth="lg">
                <Grid item xs={12} md={5} sx={{ animation: 'slideInRight 0.8s' }}>
                    <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Quality Video Calls, <br />
                        <span style={{ color: '#FF9839' }}>Just Like Quality Education</span>
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                        Join a meeting instantly or start a new one to connect with your peers.
                    </Typography>
                </Grid>

                {/* Join Card */}
                <Grid item xs={12} md={4} sx={{ animation: 'slideUp 0.8s' }}>
                    <Paper
                        elevation={10}
                        sx={{
                            p: 4,
                            borderRadius: '20px',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            textAlign: 'center',
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        <Box sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            height: '6px',
                            background: 'linear-gradient(90deg, #FF9839, #FF4B2B)'
                        }} />

                        <VideoCallIcon sx={{ fontSize: 60, color: '#FF9839', mb: 2 }} />
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>Join Meeting</Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                            <TextField
                                onChange={e => setMeetingCode(e.target.value)}
                                id="outlined-basic"
                                label="Enter Meeting Code"
                                variant="outlined"
                                fullWidth
                            />
                            <Button
                                onClick={handleJoinVideoCall}
                                variant='contained'
                                size='large'
                                sx={{
                                    py: 1.5,
                                    fontSize: '1.1rem',
                                    background: '#FF9839',
                                    '&:hover': {
                                        background: '#e68932'
                                    }
                                }}
                            >
                                Join Now
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Live Image Decoration */}
                <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' }, animation: 'slideInRight 1s' }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: 300,
                            borderRadius: 4,
                            boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
                            backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1740&auto=format&fit=crop)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            transform: 'rotate(5deg)',
                            transition: 'transform 0.3s',
                            '&:hover': {
                                transform: 'rotate(0deg) scale(1.05)'
                            }
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default withAuth(HomeComponent)