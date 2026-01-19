import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import PaymentsRoundedIcon from '@mui/icons-material/PaymentsRounded';

const items = [
    {
        icon: <QrCode2RoundedIcon/>,
        title: 'Digital Cards',
        description:
            'Create personal or business digital cards with unique QR codes. Share your contact info or services instantly.',
    },
    {
        icon: <LockRoundedIcon/>,
        title: 'Private Sharing',
        description:
            'Share personal cards via secure one-time links. Your information stays private and under your control.',
    },
    {
        icon: <StorefrontRoundedIcon/>,
        title: 'Service Catalog',
        description:
            'Businesses can list services with pricing for customers to browse. Showcase what you offer professionally.',
    },
    {
        icon: <EventAvailableRoundedIcon/>,
        title: 'Booking System',
        description:
            'Let customers book time slots directly through your card. Calendar invites are sent automatically to both parties.',
    },
    {
        icon: <PaymentsRoundedIcon/>,
        title: 'Secure Payments',
        description:
            'Accept payments for services directly through business cards. Safe and seamless transactions.',
    },
];

export default function Features1Floating() {
    return (
        <Container id="features" sx={{py: {xs: 8, sm: 16}}}>
            <Box sx={{width: {sm: '100%', md: '60%'}, mb: {xs: 2, sm: 4}}}>
                <Typography
                    component="h2"
                    variant="h4"
                    gutterBottom
                    sx={{color: 'text.primary'}}
                >
                    Platform Features
                </Typography>
                <Typography
                    variant="body1"
                    sx={{color: 'text.secondary'}}
                >
                    Everything you need to create, share, and manage digital cards for personal or business use.
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {items.map((item, index) => (
                    <Grid size={{xs: 12, sm: 6, md: 4}} key={index}>
                        <Stack
                            direction="column"
                            component={Card}
                            variant="outlined"
                            spacing={1}
                            useFlexGap
                            sx={{
                                p: 3,
                                height: '100%',
                            }}
                        >
                            <Box sx={{color: 'primary.main'}}>{item.icon}</Box>
                            <div>
                                <Typography gutterBottom sx={{fontWeight: 'medium'}}>
                                    {item.title}
                                </Typography>
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    {item.description}
                                </Typography>
                            </div>
                        </Stack>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
