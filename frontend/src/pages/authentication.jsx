import React, { useContext, useState } from 'react';
import { Button, TextField, Box, Typography, Snackbar, Alert, InputAdornment, IconButton, CircularProgress } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import { AuthContext } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function Authentication() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [formState, setFormState] = useState(0);
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
    const { handleRegister, handleLogin } = useContext(AuthContext);

    const handleAuth = async () => {
        setLoading(true);
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                const result = await handleRegister(name, username, password);
                setUsername(''); setPassword(''); setName('');
                setMessage(result);
                setFormState(0);
                setError('');
            }
        } catch (err) {
            setError((err.response?.data?.message) || err.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const inputSx = {
        '& .MuiOutlinedInput-root': {
            color: '#fff',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '12px',
            '& fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
            '&:hover fieldset': { borderColor: 'rgba(255,152,57,0.4)' },
            '&.Mui-focused fieldset': { borderColor: '#FF9839' }
        },
        '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.4)' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#FF9839' },
        '& input': { color: '#fff' },
    };

    return (
        <Box sx={{
            minHeight: '100vh', display: 'flex', background: '#0a0a0f',
            position: 'relative', overflow: 'hidden'
        }}>
            {/* Background orbs */}
            <Box sx={{
                position: 'absolute', top: '-10%', right: '-5%',
                width: 500, height: 500, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,152,57,0.1) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />
            <Box sx={{
                position: 'absolute', bottom: '-10%', left: '-5%',
                width: 400, height: 400, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,75,43,0.08) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />

            {/* Left branding panel (desktop only) */}
            <Box sx={{
                display: { xs: 'none', md: 'flex' },
                width: '45%', flexDirection: 'column', justifyContent: 'center',
                alignItems: 'flex-start', px: 8, position: 'relative'
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 5 }}>
                    <Box sx={{
                        width: 44, height: 44, borderRadius: '12px',
                        background: 'linear-gradient(135deg, #FF9839, #FF4B2B)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 8px 25px rgba(255,75,43,0.4)'
                    }}>
                        <VideoCallIcon sx={{ color: '#fff', fontSize: 24 }} />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#fff', fontFamily: 'Inter' }}>
                        Nex<span style={{ color: '#FF9839' }}>Call</span>
                    </Typography>
                </Box>

                <Typography sx={{
                    fontSize: '2.8rem', fontWeight: 800, color: '#fff',
                    lineHeight: 1.15, letterSpacing: '-1.5px', mb: 3, fontFamily: 'Inter'
                }}>
                    Video calls made{' '}
                    <span style={{
                        background: 'linear-gradient(135deg, #FF9839, #FF4B2B)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                    }}>
                        simple
                    </span>
                </Typography>
                <Typography sx={{ color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, maxWidth: 360 }}>
                    Join millions of people connecting through NexCall. Secure, fast, and always crystal clear.
                </Typography>

                {/* Floating stat cards */}
                <Box sx={{ mt: 6, display: 'flex', gap: 2 }}>
                    {[{ n: '10K+', l: 'Users' }, { n: '99.9%', l: 'Uptime' }, { n: 'HD', l: 'Quality' }].map((s, i) => (
                        <Box key={i} sx={{
                            px: 2.5, py: 2, borderRadius: '16px',
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            textAlign: 'center'
                        }}>
                            <Typography sx={{ color: '#FF9839', fontWeight: 800, fontSize: '1.3rem' }}>{s.n}</Typography>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.35)' }}>{s.l}</Typography>
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Right form panel */}
            <Box sx={{
                flex: 1, display: 'flex', alignItems: 'center',
                justifyContent: 'center', px: { xs: 3, sm: 6 }, py: 6
            }}>
                <Box sx={{ width: '100%', maxWidth: 420 }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={formState}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Box sx={{
                                p: { xs: 3, sm: 5 }, borderRadius: '24px',
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(255,255,255,0.08)',
                                backdropFilter: 'blur(20px)',
                                boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
                                position: 'relative', overflow: 'hidden'
                            }}>
                                <Box sx={{
                                    position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
                                    background: 'linear-gradient(90deg, #FF9839, #FF4B2B, transparent)'
                                }} />

                                <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.8rem', mb: 0.5, fontFamily: 'Inter' }}>
                                    {formState === 0 ? 'Welcome back' : 'Create account'}
                                </Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.4)', mb: 4, fontSize: '0.9rem' }}>
                                    {formState === 0 ? 'Sign in to continue to NexCall' : 'Join NexCall today'}
                                </Typography>

                                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                    {formState === 1 && (
                                        <TextField fullWidth label="Full Name" value={name}
                                            onChange={e => setName(e.target.value)} sx={inputSx} />
                                    )}
                                    <TextField fullWidth label="Username" value={username}
                                        onChange={e => setUsername(e.target.value)} sx={inputSx} />
                                    <TextField
                                        fullWidth label="Password" type={showPass ? 'text' : 'password'}
                                        value={password} onChange={e => setPassword(e.target.value)}
                                        onKeyPress={e => e.key === 'Enter' && handleAuth()}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPass(!showPass)} edge="end"
                                                        sx={{ color: 'rgba(255,255,255,0.3)' }}>
                                                        {showPass ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            )
                                        }}
                                        sx={inputSx}
                                    />
                                </Box>

                                {error && (
                                    <Typography sx={{ color: '#ff6b6b', fontSize: '0.85rem', mt: 2, p: 1.5, borderRadius: '8px', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.2)' }}>
                                        {error}
                                    </Typography>
                                )}

                                <Button
                                    fullWidth variant="contained" size="large"
                                    onClick={handleAuth} disabled={loading}
                                    sx={{
                                        mt: 3, py: 1.5, borderRadius: '12px',
                                        background: 'linear-gradient(135deg, #FF9839, #FF4B2B)',
                                        fontWeight: 700, fontSize: '1rem', textTransform: 'none',
                                        boxShadow: '0 8px 25px rgba(255,75,43,0.35)',
                                        '&:hover': { boxShadow: '0 12px 35px rgba(255,75,43,0.55)' },
                                        '&:disabled': { background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.3)' }
                                    }}
                                >
                                    {loading ? <CircularProgress size={22} sx={{ color: '#fff' }} /> : (formState === 0 ? 'Sign In' : 'Create Account')}
                                </Button>

                                <Box sx={{ mt: 3, textAlign: 'center' }}>
                                    <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.35)' }}>
                                        {formState === 0 ? "Don't have an account?" : 'Already have an account?'}
                                        {' '}
                                        <Button
                                            variant="text" size="small"
                                            onClick={() => { setFormState(formState === 0 ? 1 : 0); setError(''); }}
                                            sx={{ color: '#FF9839', fontWeight: 700, textTransform: 'none', p: 0, minWidth: 'auto', '&:hover': { background: 'transparent', textDecoration: 'underline' } }}
                                        >
                                            {formState === 0 ? 'Sign Up' : 'Sign In'}
                                        </Button>
                                    </Typography>
                                </Box>
                            </Box>
                        </motion.div>
                    </AnimatePresence>
                </Box>
            </Box>

            <Snackbar open={!!message} autoHideDuration={4000} onClose={() => setMessage('')}>
                <Alert onClose={() => setMessage('')} severity="success"
                    sx={{ background: 'rgba(46,160,67,0.15)', color: '#4caf50', border: '1px solid rgba(76,175,80,0.3)', backdropFilter: 'blur(10px)' }}>
                    {message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
