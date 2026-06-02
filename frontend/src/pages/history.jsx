import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Button, Chip } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import VideocamIcon from '@mui/icons-material/Videocam';
import { motion } from 'framer-motion';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch { }
        };
        fetchHistory();
    }, [getHistoryOfUser]);

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <Container maxWidth="md" sx={{ pt: 6, pb: 8 }}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
                    <Box sx={{
                        width: 48, height: 48, borderRadius: '14px',
                        background: 'linear-gradient(135deg, rgba(255,152,57,0.2), rgba(255,75,43,0.2))',
                        border: '1px solid rgba(255,152,57,0.3)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                        <HistoryIcon sx={{ color: '#FF9839', fontSize: 24 }} />
                    </Box>
                    <Box>
                        <Typography sx={{ color: '#fff', fontWeight: 800, fontSize: '1.8rem', fontFamily: 'Inter', lineHeight: 1 }}>
                            Meeting History
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.35)', mt: 0.3 }}>
                            {meetings.length} meeting{meetings.length !== 1 ? 's' : ''} found
                        </Typography>
                    </Box>
                </Box>
            </motion.div>

            {/* List */}
            {meetings.length > 0 ? (
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {meetings.map((meeting, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.06 }}
                        >
                            <Box sx={{
                                p: 3, borderRadius: '16px',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.07)',
                                backdropFilter: 'blur(10px)',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                flexWrap: 'wrap', gap: 2,
                                transition: 'all 0.2s',
                                '&:hover': {
                                    background: 'rgba(255,152,57,0.05)',
                                    border: '1px solid rgba(255,152,57,0.15)',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 12px 30px rgba(0,0,0,0.3)'
                                }
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{
                                        width: 40, height: 40, borderRadius: '10px',
                                        background: 'rgba(255,152,57,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        flexShrink: 0
                                    }}>
                                        <VideocamIcon sx={{ color: '#FF9839', fontSize: 20 }} />
                                    </Box>
                                    <Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
                                            <Typography sx={{ color: '#fff', fontWeight: 600, fontSize: '0.95rem' }}>
                                                Meeting
                                            </Typography>
                                            <Chip
                                                label={meeting.meetingCode}
                                                size="small"
                                                sx={{
                                                    background: 'rgba(255,152,57,0.12)',
                                                    color: '#FF9839',
                                                    border: '1px solid rgba(255,152,57,0.25)',
                                                    fontWeight: 700, fontSize: '0.75rem',
                                                    height: 22
                                                }}
                                            />
                                        </Box>
                                        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.3)' }}>
                                            {formatDate(meeting.date)}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Button
                                    variant="outlined"
                                    size="small"
                                    endIcon={<ArrowForwardIcon />}
                                    onClick={() => navigate(`/${meeting.meetingCode}`)}
                                    sx={{
                                        color: 'rgba(255,255,255,0.7)',
                                        borderColor: 'rgba(255,255,255,0.1)',
                                        borderRadius: '10px',
                                        textTransform: 'none', fontWeight: 600,
                                        px: 2.5,
                                        '&:hover': {
                                            borderColor: '#FF9839', color: '#FF9839',
                                            background: 'rgba(255,152,57,0.08)'
                                        }
                                    }}
                                >
                                    Rejoin
                                </Button>
                            </Box>
                        </motion.div>
                    ))}
                </Box>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                    <Box sx={{
                        textAlign: 'center', py: 12,
                        borderRadius: '24px',
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px dashed rgba(255,255,255,0.08)'
                    }}>
                        <HistoryIcon sx={{ fontSize: 56, color: 'rgba(255,255,255,0.1)', mb: 2 }} />
                        <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontWeight: 600, mb: 1 }}>No meetings yet</Typography>
                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.2)', mb: 4 }}>
                            Join or start a meeting to see your history here.
                        </Typography>
                        <Button
                            variant="contained"
                            onClick={() => navigate('/home')}
                            sx={{
                                background: 'linear-gradient(135deg, #FF9839, #FF4B2B)',
                                borderRadius: '10px', textTransform: 'none', fontWeight: 700,
                                px: 3, boxShadow: '0 8px 25px rgba(255,75,43,0.3)'
                            }}
                        >
                            Start a Meeting
                        </Button>
                    </Box>
                </motion.div>
            )}
        </Container>
    );
}
