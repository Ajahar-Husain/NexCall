import React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';

function Footer() {
    return (
        <Box sx={{ p: 4, mt: 'auto', backgroundColor: 'transparent' }}>
            <Typography variant="body2" color="text.secondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="#">
                    NexCall
                </Link>{' '}
                {new Date().getFullYear()}
                {'. All rights reserved.'}
            </Typography>
        </Box>
    );
}

export default Footer;
