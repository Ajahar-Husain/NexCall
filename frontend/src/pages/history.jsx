import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, Container, Button, Box } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function History() {
    const { getHistoryOfUser } = useContext(AuthContext);
    const [meetings, setMeetings] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // Handle error or empty history
            }
        }
        fetchHistory();
    }, [getHistoryOfUser])

    let formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        })
    }

    return (
        <Container maxWidth="md" sx={{ mt: 5, mb: 5, animation: 'fadeIn 0.5s' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <HistoryIcon sx={{ fontSize: 40, color: 'text.primary', mr: 2 }} />
                <Typography variant="h4" component="h1" fontWeight="bold">
                    Meeting History
                </Typography>
            </Box>

            {meetings.length !== 0 ? meetings.map((e, i) => {
                return (
                    <Card key={i} elevation={3} sx={{ mb: 2, borderRadius: 2, transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-2px)' } }}>
                        <CardContent>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item xs={12} sm={8}>
                                    <Typography variant="subtitle1" color="text.secondary">
                                        Meeting Code: <span style={{ fontWeight: 'bold', color: 'black' }}>{e.meetingCode}</span>
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Date: {formatDate(e.date)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'left', sm: 'right' }, mt: { xs: 2, sm: 0 } }}>
                                    <Button
                                        variant="outlined"
                                        endIcon={<ArrowForwardIcon />}
                                        onClick={() => navigate(`/${e.meetingCode}`)}
                                    >
                                        Rejoin
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                )
            }) : (
                <Box sx={{ textAlign: 'center', mt: 10, color: 'text.secondary' }}>
                    <Typography variant="h6">No History Found</Typography>
                    <Typography variant="body2">Join a meeting to see it here.</Typography>
                </Box>
            )}
        </Container>
    )
}
