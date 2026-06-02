import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, Chip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        setIsAuth(!!localStorage.getItem("token"));
    }, [location]);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
        navigate("/auth");
    };

    const navItems = isAuth
        ? [
            { label: 'Dashboard', path: '/home' },
            { label: 'History', path: '/history' },
            { label: 'Logout', action: handleLogout, highlight: true }
        ]
        : [
            { label: 'Guest Join', path: '/aljk23' },
            { label: 'Login', path: '/auth' },
            { label: 'Sign Up', path: '/auth', highlight: true }
        ];

    return (
        <>
            <AppBar
                component="nav"
                elevation={0}
                sx={{
                    background: scrolled
                        ? 'rgba(10,10,15,0.95)'
                        : 'rgba(10,10,15,0.7)',
                    backdropFilter: 'blur(20px)',
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    transition: 'background 0.3s ease',
                }}
            >
                <Toolbar sx={{ py: 1, px: { xs: 2, md: 4 } }}>
                    {/* Logo */}
                    <Box
                        onClick={() => navigate('/')}
                        sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', flexGrow: 1 }}
                    >
                        <Box sx={{
                            width: 34, height: 34, borderRadius: '10px',
                            background: 'linear-gradient(135deg, #FF9839, #FF4B2B)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 4px 15px rgba(255,152,57,0.4)'
                        }}>
                            <VideoCallIcon sx={{ color: '#fff', fontSize: 20 }} />
                        </Box>
                        <Typography
                            variant="h6"
                            sx={{ fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', fontFamily: 'Inter' }}
                        >
                            Nex<span style={{ color: '#FF9839' }}>Call</span>
                        </Typography>
                    </Box>

                    {/* Desktop nav */}
                    <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
                        {navItems.map((item) => (
                            <motion.div key={item.label} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                {item.highlight ? (
                                    <Button
                                        onClick={item.action || (() => navigate(item.path))}
                                        variant="contained"
                                        size="small"
                                        sx={{
                                            background: 'linear-gradient(135deg, #FF9839, #FF4B2B)',
                                            color: '#fff',
                                            fontWeight: 600,
                                            borderRadius: '8px',
                                            px: 2.5,
                                            py: 0.8,
                                            textTransform: 'none',
                                            fontSize: '0.875rem',
                                            boxShadow: '0 4px 15px rgba(255,75,43,0.3)',
                                            '&:hover': { background: 'linear-gradient(135deg, #e68932, #e03c1e)', boxShadow: '0 6px 20px rgba(255,75,43,0.5)' }
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={item.action || (() => navigate(item.path))}
                                        sx={{
                                            color: location.pathname === item.path ? '#FF9839' : 'rgba(255,255,255,0.7)',
                                            fontWeight: 500,
                                            textTransform: 'none',
                                            fontSize: '0.875rem',
                                            borderRadius: '8px',
                                            px: 2,
                                            '&:hover': { color: '#fff', background: 'rgba(255,255,255,0.06)' }
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                )}
                            </motion.div>
                        ))}
                    </Box>

                    {/* Mobile hamburger */}
                    <IconButton
                        onClick={() => setMobileOpen(true)}
                        sx={{ display: { sm: 'none' }, color: 'rgba(255,255,255,0.8)' }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                PaperProps={{
                    sx: {
                        width: 260,
                        background: 'rgba(15,15,20,0.98)',
                        backdropFilter: 'blur(20px)',
                        borderLeft: '1px solid rgba(255,255,255,0.08)',
                        pt: 2
                    }
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2 }}>
                    <IconButton onClick={() => setMobileOpen(false)} sx={{ color: 'rgba(255,255,255,0.6)' }}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <List>
                    {navItems.map((item) => (
                        <ListItem
                            key={item.label}
                            onClick={() => { setMobileOpen(false); item.action ? item.action() : navigate(item.path); }}
                            sx={{ cursor: 'pointer', '&:hover': { background: 'rgba(255,152,57,0.1)' }, borderRadius: 2, mx: 1, mb: 0.5 }}
                        >
                            <ListItemText
                                primary={item.label}
                                primaryTypographyProps={{ color: item.highlight ? '#FF9839' : 'rgba(255,255,255,0.85)', fontWeight: item.highlight ? 700 : 500 }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
