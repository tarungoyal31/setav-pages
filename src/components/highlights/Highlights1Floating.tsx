import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import SupportAgentRoundedIcon from '@mui/icons-material/SupportAgentRounded';
import DnsRoundedIcon from '@mui/icons-material/DnsRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';

const items = [
    {
        icon: <BrushRoundedIcon />,
        title: 'Tailored to Your Brand',
        description:
            'Every website we build is uniquely designed to reflect your brand identity, tone, and goals. No cookie-cutter templates.',
    },
    {
        icon: <SupportAgentRoundedIcon />,
        title: 'Ongoing Support',
        description:
            'We are here after launch to help with updates, changes, and questions. Your website grows with your business.',
    },
    {
        icon: <DnsRoundedIcon />,
        title: 'Domain & Hosting Included',
        description:
            'We handle domain registration, hosting setup, and SSL certificates. Everything is taken care of for you.',
    },
    {
        icon: <SpeedRoundedIcon />,
        title: 'Performance Optimized',
        description:
            'Fast load times and optimized assets ensure your visitors have a smooth experience every time.',
    },
    {
        icon: <LockRoundedIcon />,
        title: 'Secure & Reliable',
        description:
            'Built with security best practices and reliable hosting so your website stays online and protected.',
    },
    {
        icon: <DevicesRoundedIcon />,
        title: 'Works on Every Device',
        description:
            'Responsive design that adapts to phones, tablets, and desktops. Your site looks great everywhere.',
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
                        Setav delivers fully managed website creation for businesses and
                        individuals. From design to deployment, we handle everything so you
                        can focus on your work.
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
