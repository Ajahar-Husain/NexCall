import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import VideocamIcon from '@mui/icons-material/Videocam';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import PeopleIcon from '@mui/icons-material/People';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const features = [
    { icon: <VideocamIcon />, title: 'HD Video', desc: 'Crystal clear 1080p video with adaptive quality.' },
    { icon: <SecurityIcon />, title: 'End-to-End Secure', desc: 'All calls are encrypted and private.' },
    { icon: <SpeedIcon />, title: 'Ultra Low Latency', desc: 'Real-time communication with <100ms delay.' },
    { icon: <PeopleIcon />, title: 'Multi-Participant', desc: 'Host meetings with multiple participants.' },
];

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: 'easeOut' }
});

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
            {/* Background orbs */}
            <Box sx={{
                position: 'fixed', top: '-20%', right: '-10%',
                width: 600, height: 600, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,152,57,0.12) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 0
            }} />
            <Box sx={{
                position: 'fixed', bottom: '-20%', left: '-10%',
                width: 500, height: 500, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,75,43,0.1) 0%, transparent 70%)',
                pointerEvents: 'none', zIndex: 0
            }} />

            {/* Hero */}
            <Container maxWidth="lg" sx={{ pt: { xs: 8, md: 12 }, pb: 10, position: 'relative', zIndex: 1 }}>
                <Grid container spacing={6} alignItems="center">
                    <Grid item xs={12} md={6}>
                        <motion.div {...fadeUp(0.1)}>
                            <Chip
                                label="✦ Now in Beta"
                                size="small"
                                sx={{
                                    mb: 3, background: 'rgba(255,152,57,0.15)',
                                    color: '#FF9839', border: '1px solid rgba(255,152,57,0.3)',
                                    fontWeight: 600, fontSize: '0.75rem'
                                }}
                            />
                        </motion.div>

                        <motion.div {...fadeUp(0.2)}>
                            <Typography
                                component="h1"
                                sx={{
                                    fontSize: { xs: '2.5rem', md: '3.8rem' },
                                    fontWeight: 800,
                                    lineHeight: 1.1,
                                    letterSpacing: '-1.5px',
                                    color: '#fff',
                                    mb: 3,
                                    fontFamily: 'Inter'
                                }}
                            >
                                Connect with your{' '}
                                <span style={{
                                    background: 'linear-gradient(135deg, #FF9839, #FF4B2B)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent'
                                }}>
                                    loved ones
                                </span>
                            </Typography>
                        </motion.div>

                        <motion.div {...fadeUp(0.3)}>
                            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400, mb: 5, lineHeight: 1.7, maxWidth: 480 }}>
                                Distance is just a number. Bridge the gap with high-quality, secure video calls — no downloads needed.
                            </Typography>
                        </motion.div>

                        <motion.div {...fadeUp(0.4)}>
                            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => navigate('/auth')}
                                    sx={{
                                        background: 'linear-gradient(135deg, #FF9839, #FF4B2B)',
                                        color: '#fff', fontWeight: 700,
                                        borderRadius: '12px', px: 4, py: 1.5,
                                        fontSize: '1rem', textTransform: 'none',
                                        boxShadow: '0 8px 30px rgba(255,75,43,0.4)',
                                        '&:hover': { boxShadow: '0 12px 40px rgba(255,75,43,0.6)', transform: 'translateY(-2px)' },
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    Get Started Free
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    onClick={() => navigate('/aljk23')}
                                    sx={{
                                        color: 'rgba(255,255,255,0.8)',
                                        borderColor: 'rgba(255,255,255,0.15)',
                                        borderRadius: '12px', px: 4, py: 1.5,
                                        fontSize: '1rem', textTransform: 'none', fontWeight: 600,
                                        backdropFilter: 'blur(10px)',
                                        '&:hover': { borderColor: 'rgba(255,152,57,0.5)', color: '#FF9839', background: 'rgba(255,152,57,0.05)' },
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    Join as Guest
                                </Button>
                            </Box>
                        </motion.div>
                    </Grid>

                    {/* Hero visual */}
                    <Grid item xs={12} md={6}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.7, delay: 0.3 }}
                        >
                            <Box sx={{
                                position: 'relative',
                                borderRadius: '24px',
                                overflow: 'hidden',
                                border: '1px solid rgba(255,255,255,0.08)',
                                boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
                                animation: 'float 4s ease-in-out infinite'
                            }}>
                                <img
                                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1740&auto=format&fit=crop"
                                    alt="Video Call"
                                    style={{ width: '100%', height: 400, objectFit: 'cover', display: 'block' }}
                                />
                                <Box sx={{
                                    position: 'absolute', inset: 0,
                                    background: 'linear-gradient(to top, rgba(10,10,15,0.8) 0%, transparent 50%)'
                                }} />
                                <Box sx={{ position: 'absolute', bottom: 20, left: 20 }}>
                                    <Chip label="🔴 Live" size="small" sx={{ background: 'rgba(255,75,43,0.9)', color: '#fff', fontWeight: 700, mb: 1 }} />
                                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }}>Crystal Clear Video</Typography>
                                </Box>
                            </Box>
                        </motion.div>
                    </Grid>
                </Grid>

                {/* Feature cards */}
                <Grid container spacing={3} sx={{ mt: 8 }}>
                    {features.map((f, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                            >
                                <Box sx={{
                                    p: 3, borderRadius: '16px',
                                    background: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.07)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s',
                                    '&:hover': {
                                        background: 'rgba(255,152,57,0.06)',
                                        border: '1px solid rgba(255,152,57,0.2)',
                                        transform: 'translateY(-4px)',
                                        boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                                    }
                                }}>
                                    <Box sx={{
                                        width: 44, height: 44, borderRadius: '12px',
                                        background: 'linear-gradient(135deg, rgba(255,152,57,0.2), rgba(255,75,43,0.2))',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#FF9839', mb: 2
                                    }}>
                                        {f.icon}
                                    </Box>
                                    <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 700, mb: 0.5 }}>{f.title}</Typography>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>{f.desc}</Typography>
                                </Box>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
