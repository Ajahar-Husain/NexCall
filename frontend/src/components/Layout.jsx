import React from 'react';
import Box from '@mui/material/Box';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children }) => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <Navbar />
            <Box component="main" sx={{ flexGrow: 1, pt: 8 }}>
                {children}
            </Box>
            <Footer />
        </Box>
    );
};

export default Layout;
