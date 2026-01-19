import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AppleIcon from '@mui/icons-material/Apple';
import AndroidIcon from '@mui/icons-material/Android';

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
                            Download the App
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                            Get Setav on your mobile device and start connecting today.
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} useFlexGap>
                            <Button
                                variant="contained"
                                color="primary"
                                href="https://apps.apple.com/in/app/setav/id6738992536"
                                target="_blank"
                                rel="noopener"
                                startIcon={<AppleIcon />}
                                sx={{
                                    textTransform: 'none',
                                    px: 2,
                                    py: 1,
                                }}
                            >
                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography variant="caption" sx={{ display: 'block', lineHeight: 1, fontSize: '0.65rem' }}>
                                        Download on the
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                                        App Store
                                    </Typography>
                                </Box>
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                href="https://play.google.com/store/apps/details?id=ai.setav.customer"
                                target="_blank"
                                rel="noopener"
                                startIcon={<AndroidIcon />}
                                sx={{
                                    textTransform: 'none',
                                    px: 2,
                                    py: 1,
                                }}
                            >
                                <Box sx={{ textAlign: 'left' }}>
                                    <Typography variant="caption" sx={{ display: 'block', lineHeight: 1, fontSize: '0.65rem' }}>
                                        Get it on
                                    </Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                                        Google Play
                                    </Typography>
                                </Box>
                            </Button>
                        </Stack>
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
                    <Link color="text.secondary" variant="body2" href="#features">
                        Features
                    </Link>
                    <Link color="text.secondary" variant="body2" href="#testimonials">
                        Testimonials
                    </Link>
                    <Link color="text.secondary" variant="body2" href="#highlights">
                        Highlights
                    </Link>
                    <Link color="text.secondary" variant="body2" href="#pricing">
                        Pricing
                    </Link>
                    <Link color="text.secondary" variant="body2" href="#faq">
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
                        Download
                    </Typography>
                    <Link color="text.secondary" variant="body2" href="https://apps.apple.com/in/app/setav/id6738992536" target="_blank" rel="noopener">
                        iOS App
                    </Link>
                    <Link color="text.secondary" variant="body2" href="https://play.google.com/store/apps/details?id=ai.setav.customer" target="_blank" rel="noopener">
                        Android App
                    </Link>
                    <Link color="text.secondary" variant="body2" href="https://app.setav.ai" target="_blank" rel="noopener">
                        Web App
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
                    <Link color="text.secondary" variant="body2" href="#">
                        Privacy Policy
                    </Link>
                    <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
                        &nbsp;•&nbsp;
                    </Typography>
                    <Link color="text.secondary" variant="body2" href="#">
                        Terms of Service
                    </Link>
                    <Copyright />
                </div>
                <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{ justifyContent: 'left', color: 'text.secondary' }}
                >
                    <IconButton
                        color="inherit"
                        size="small"
                        href="https://apps.apple.com/in/app/setav/id6738992536"
                        aria-label="iOS App"
                        sx={{ alignSelf: 'center' }}
                    >
                        <AppleIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        size="small"
                        href="https://play.google.com/store/apps/details?id=ai.setav.customer"
                        aria-label="Android App"
                        sx={{ alignSelf: 'center' }}
                    >
                        <AndroidIcon />
                    </IconButton>
                </Stack>
            </Box>
        </Container>
    );
}
