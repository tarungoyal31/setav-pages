import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded';
import VerifiedUserRoundedIcon from '@mui/icons-material/VerifiedUserRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';

const items = [
    {
        icon: <PeopleAltRoundedIcon />,
        title: 'Two-Way Connection',
        description:
            'Designed for both individuals and businesses. Personal cards for networking, business cards for selling services.',
    },
    {
        icon: <LockRoundedIcon />,
        title: 'Privacy First',
        description:
            'Personal cards stay private with one-time links. Share your information only with people you choose.',
    },
    {
        icon: <ExploreRoundedIcon />,
        title: 'Easy Discovery',
        description:
            'Business cards are public and discoverable. Let potential customers find your services on the platform.',
    },
    {
        icon: <EventAvailableRoundedIcon />,
        title: 'Instant Booking',
        description:
            'Integrated calendar system with automatic invites. Customers book, both parties get notified instantly.',
    },
    {
        icon: <VerifiedUserRoundedIcon />,
        title: 'Secure Transactions',
        description:
            'Accept payments safely through the platform. Secure payment processing for peace of mind.',
    },
    {
        icon: <DevicesRoundedIcon />,
        title: 'Cross-Platform',
        description:
            'Available on iOS, Android, and web. Access your cards and manage bookings from anywhere.',
    },
];

export default function Highlights1Floating() {
    return (
        <Box
            id="highlights"
            sx={{
                pt: { xs: 4, sm: 12 },
                pb: { xs: 8, sm: 16 },
                color: 'white',
                bgcolor: 'grey.900',
            }}
        >
            <Container
                sx={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: { xs: 3, sm: 6 },
                }}
            >
                <Box
                    sx={{
                        width: { sm: '100%', md: '60%' },
                        textAlign: { sm: 'left', md: 'center' },
                    }}
                >
                    <Typography component="h2" variant="h4" gutterBottom>
                        Why Choose Setav
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'grey.400' }}>
                        Setav provides a complete platform for digital networking. Whether you're
                        an individual looking to share contacts or a business selling services,
                        we have you covered.
                    </Typography>
                </Box>
                <Grid container spacing={2}>
                    {items.map((item, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <Stack
                                direction="column"
                                component={Card}
                                spacing={1}
                                useFlexGap
                                sx={{
                                    color: 'inherit',
                                    p: 3,
                                    height: '100%',
                                    borderColor: 'hsla(220, 25%, 25%, 0.3)',
                                    backgroundColor: 'grey.800',
                                }}
                            >
                                <Box sx={{ opacity: '50%' }}>{item.icon}</Box>
                                <div>
                                    <Typography gutterBottom sx={{ fontWeight: 'medium' }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'grey.400' }}>
                                        {item.description}
                                    </Typography>
                                </div>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}
