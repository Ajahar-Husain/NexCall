import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Drawer, List, ListItem, ListItemText, useScrollTrigger, Slide } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        target: window ? window() : undefined,
    });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export default function Navbar(props) {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setIsAuth(true);
        } else {
            setIsAuth(false);
        }
    }, [])


    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuth(false);
        navigate("/auth");
    }

    const navItems = isAuth
        ? [
            { label: 'Join Video', path: '/home' },
            { label: 'History', path: '/history' },
            { label: 'Logout', action: handleLogout }
        ]
        : [
            { label: 'Join as Guest', path: '/aljk23' },
            { label: 'Register', path: '/auth' },
            { label: 'Login', path: '/auth' }
        ];

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                NexCall
            </Typography>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label} disablePadding onClick={item.action ? item.action : () => navigate(item.path)}>
                        <ListItemText primary={item.label} sx={{ textAlign: 'center', cursor: 'pointer' }} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <HideOnScroll {...props}>
                <AppBar component="nav" sx={{ background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(10px)', boxShadow: 'none' }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2, display: { sm: 'none' }, color: 'black' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: 'black', fontWeight: 'bold', cursor: 'pointer' }}
                            onClick={() => navigate('/')}
                        >
                            NexCall
                        </Typography>
                        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
                            {navItems.map((item) => (
                                <Box
                                    key={item.label}
                                    component={motion.div}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Button
                                        onClick={item.action ? item.action : () => navigate(item.path)}
                                        sx={{
                                            color: '#333',
                                            fontWeight: 600,
                                            position: 'relative',
                                            '&::after': {
                                                content: '""',
                                                position: 'absolute',
                                                width: '0%',
                                                height: '2px',
                                                bottom: 0,
                                                left: '50%',
                                                transform: 'translateX(-50%)',
                                                backgroundColor: '#FF9839',
                                                transition: 'width 0.3s ease-in-out'
                                            },
                                            '&:hover::after': {
                                                width: '80%'
                                            },
                                            '&:hover': {
                                                backgroundColor: 'transparent',
                                                color: '#FF9839'
                                            }
                                        }}
                                    >
                                        {item.label}
                                    </Button>
                                </Box>
                            ))}
                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Box component="nav">
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                    }}
                >
                    {drawer}
                </Drawer>
            </Box>
        </Box>
    );
}
