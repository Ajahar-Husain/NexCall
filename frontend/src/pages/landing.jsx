import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box, Paper } from '@mui/material';

export default function LandingPage() {
    const router = useNavigate();

    return (
        <Container maxWidth="lg" sx={{ mt: 8, mb: 8, animation: 'fadeIn 1s' }}>
            <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6} sx={{ animation: 'slideInRight 1s' }}>
                    <Typography component="h1" variant="h2" color="text.primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Connect with your <span style={{ color: "#FF9839" }}>loved Ones</span>
                    </Typography>
                    <Typography variant="h5" color="text.secondary" paragraph>
                        Distance is just a number. Bridge the gap with high-quality video calls using NexCall.
                        Secure, fast, and easy to use.
                    </Typography>
                    <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
                        <Button
                            variant="contained"
                            size="large"
                            onClick={() => router("/auth")}
                            sx={{ borderRadius: '50px', px: 4, py: 1.5, fontSize: '1.2rem', textTransform: 'none' }}
                        >
                            Get Started
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            onClick={() => router("/aljk23")}
                            sx={{ borderRadius: '50px', px: 4, py: 1.5, fontSize: '1.2rem', textTransform: 'none' }}
                        >
                            Join as Guest
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ animation: 'slideUp 1s' }}>
                    <Paper
                        elevation={6}
                        sx={{
                            p: 0,
                            borderRadius: 4,
                            overflow: 'hidden',
                            position: 'relative',
                            height: 400
                        }}
                    >
                        <img
                            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1740&auto=format&fit=crop"
                            alt="Video Call"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                        <Box sx={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
                            p: 2,
                            color: 'white'
                        }}>
                            <Typography variant="h6">Crystal Clear Video</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
