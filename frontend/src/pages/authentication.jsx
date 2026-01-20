import React, { useContext, useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Paper, Box, Grid, Typography, IconButton, InputAdornment, Snackbar, Alert } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

// ... (keep default theme if needed, or rely on global styles)
const defaultTheme = createTheme();

export default function Authentication() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();
    const [error, setError] = useState();
    const [message, setMessage] = useState();
    const [formState, setFormState] = useState(0); // 0: Login, 1: Register
    const { handleRegister, handleLogin } = useContext(AuthContext);

    let handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                let result = await handleRegister(name, username, password);
                setUsername("");
                setMessage(result);
                setFormState(0);
                setError("");
            }
        } catch (err) {
            let message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
            setError(message);
        }
    }

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
                <CssBaseline />

                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square
                    sx={{
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.85)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
                    }}
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography component="h1" variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                            {formState === 0 ? "Sign In" : "Sign Up"}
                        </Typography>

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={formState}
                                initial={{ opacity: 0, x: formState === 0 ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: formState === 0 ? 20 : -20 }}
                                transition={{ duration: 0.3 }}
                                style={{ width: '100%' }}
                            >
                                <Box component="form" noValidate sx={{ mt: 1 }}>
                                    {formState === 1 && (
                                        <TextField
                                            margin="normal"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Full Name"
                                            name="name"
                                            autoFocus
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    )}
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="username"
                                        label="Username"
                                        name="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <TextField
                                        margin="normal"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />

                                    <Typography color="error" variant="body2">{error}</Typography>

                                    <Button
                                        type="button"
                                        fullWidth
                                        variant="contained"
                                        sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1rem', fontWeight: 'bold', background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)' }}
                                        onClick={handleAuth}
                                    >
                                        {formState === 0 ? "Login" : "Register"}
                                    </Button>

                                    <Grid container justifyContent="center">
                                        <Grid item>
                                            <Button onClick={() => { setFormState(formState === 0 ? 1 : 0); setError("") }} sx={{ textTransform: 'none' }}>
                                                {formState === 0 ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </motion.div>
                        </AnimatePresence>

                    </Box>
                </Grid>
            </Grid>
            <Snackbar
                open={!!message}
                autoHideDuration={4000}
                onClose={() => setMessage("")}
            >
                <Alert onClose={() => setMessage("")} severity="success" sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}