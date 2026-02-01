import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

function Copyright() {
    return (
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {'Copyright © '}
            <Link color="text.secondary" href="https://setav.ai">
                Setav
            </Link>
            &nbsp;
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function Footer1Floating() {
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: { xs: 4, sm: 8 },
                py: { xs: 8, sm: 10 },
                textAlign: { sm: 'center', md: 'left' },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    width: '100%',
                    justifyContent: 'space-between',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 4,
                        minWidth: { xs: '100%', sm: '60%' },
                    }}
                >
                    <Box sx={{ width: { xs: '100%', sm: '60%' } }}>
                        <img src={"/logo192.png"} width='48px' height='48px' alt={"Setav logo"}/>
                        <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                            Custom websites, built for you.
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                            Professional web design and development for businesses and individuals.
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            href="mailto:support@setav.ai"
                            sx={{ textTransform: 'none', px: 3, py: 1 }}
                        >
                            Get in Touch
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        Product
                    </Typography>
                    <Link color="text.secondary" variant="body2" href="/#features">
                        Features
                    </Link>
                    <Link color="text.secondary" variant="body2" href="/#testimonials">
                        Testimonials
                    </Link>
                    <Link color="text.secondary" variant="body2" href="/#highlights">
                        Highlights
                    </Link>
                    <Link color="text.secondary" variant="body2" href="/#showcase">
                        Portfolio
                    </Link>
                    <Link color="text.secondary" variant="body2" href="/#faq">
                        FAQs
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: { xs: 'none', sm: 'flex' },
                        flexDirection: 'column',
                        gap: 1,
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                        Contact
                    </Typography>
                    <Link color="text.secondary" variant="body2" href="mailto:support@setav.ai">
                        support@setav.ai
                    </Link>
                    <Link color="text.secondary" variant="body2" href="tel:+918826668006">
                        +91 8826668006
                    </Link>
                </Box>
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    pt: { xs: 4, sm: 8 },
                    width: '100%',
                    borderTop: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <div>
                    <Link color="text.secondary" variant="body2" href="/privacy-policy">
                        Privacy Policy
                    </Link>
                    <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
                        &nbsp;•&nbsp;
                    </Typography>
                    <Link color="text.secondary" variant="body2" href="/terms">
                        Terms of Service
                    </Link>
                    <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
                        &nbsp;•&nbsp;
                    </Typography>
                    <Link color="text.secondary" variant="body2" href="/csae">
                        CSAE
                    </Link>
                    <Copyright />
                </div>
            </Box>
        </Container>
    );
}
