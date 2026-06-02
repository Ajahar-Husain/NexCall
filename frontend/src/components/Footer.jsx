import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';

export default function Footer() {
    return (
        <Box sx={{ mt: 'auto', borderTop: '1px solid rgba(255,255,255,0.06)', py: 3, px: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, mb: 1 }}>
                <Box sx={{
                    width: 24, height: 24, borderRadius: '6px',
                    background: 'linear-gradient(135deg, #FF9839, #FF4B2B)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                    <VideoCallIcon sx={{ color: '#fff', fontSize: 14 }} />
                </Box>
                <Typography variant="body2" sx={{ fontWeight: 700, color: '#fff' }}>
                    Nex<span style={{ color: '#FF9839' }}>Call</span>
                </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)', display: 'block', textAlign: 'center' }}>
                © {new Date().getFullYear()} NexCall. All rights reserved.
            </Typography>
        </Box>
    );
}
