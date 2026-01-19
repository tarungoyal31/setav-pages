import * as React from 'react';
import {styled, alpha} from '@mui/material/styles';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { useNavigate, useLocation } from 'react-router-dom';
// import {SvgIconProps} from "@mui/material";
// _@ts-expect-error Svg import // Remove underscore if you want to use svg
// import FitNGlowLogo from '/src/assets/fit_n_glow_logo.svg?react';

const StyledToolbar = styled(Toolbar)(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexShrink: 0,
    borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
    backdropFilter: 'blur(24px)',
    border: '1px solid',
    borderColor: (theme.vars || theme).palette.divider,
    backgroundColor: theme.vars
        ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
        : alpha(theme.palette.background.default, 0.4),
    boxShadow: (theme.vars || theme).shadows[1],
    padding: '8px 12px',
}));

// function LogoIcon(props: SvgIconProps) {
//     return (
//     <FitNGlowLogo
//         {...props}
//         style={{marginRight: 16, width: 32, height: 32}}
//         />
//     );
// }

const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({behavior: 'smooth'});
};

export default function AppBar1Floating() {
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    const handleNavClick = (sectionId: string) => {
        if (location.pathname !== '/') {
             navigate('/#' + sectionId);
             // Allow time for navigation then scroll if possible, or rely on browser
             setTimeout(() => scrollToSection(sectionId), 100);
        } else {
            scrollToSection(sectionId);
        }
        setOpen(false);
    };

    return (
        <AppBar
            position="fixed"
            enableColorOnDark
            sx={{
                boxShadow: 0,
                bgcolor: 'transparent',
                backgroundImage: 'none',
                mt: 'calc(var(--template-frame-height, 0px) + 28px)',
            }}
        >
            <Container maxWidth="lg">
                <StyledToolbar variant="dense" disableGutters>
                    <Box sx={{flexGrow: 1, display: 'flex', alignItems: 'center', px: 0}}>
                        <Box onClick={() => navigate('/')} sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <img src={"/logo192.png"} width='32px' height='32px' alt={"Setav logo"}/>
                        </Box>
                        <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                            <Button variant="text" color="info" size="small" onClick={() => handleNavClick('features')}>
                                Features
                            </Button>
                            <Button variant="text" color="info" size="small" onClick={() => handleNavClick('testimonials')}>
                                Testimonials
                            </Button>
                            <Button variant="text" color="info" size="small" onClick={() => handleNavClick('highlights')}>
                                Highlights
                            </Button>
                            <Button variant="text" color="info" size="small" onClick={() => handleNavClick('pricing')}>
                                Pricing
                            </Button>
                            <Button variant="text" color="info" size="small" sx={{minWidth: 0}} onClick={() => handleNavClick('faq')}>
                                FAQ
                            </Button>
                        </Box>
                    </Box>
                    <Box
                        sx={{
                            display: {xs: 'none', md: 'flex'},
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Button color="primary" variant="text" size="small" href="https://app.setav.ai">
                            Sign in
                        </Button>
                        <Button color="primary" variant="contained" size="small" href="https://app.setav.ai">
                            Sign up
                        </Button>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}, gap: 1}}>
                        <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
                            <MenuIcon/>
                        </IconButton>
                        <Drawer
                            anchor="top"
                            open={open}
                            onClose={toggleDrawer(false)}
                            PaperProps={{
                                sx: {
                                    top: 'var(--template-frame-height, 0px)',
                                },
                            }}
                        >
                            <Box sx={{p: 2, backgroundColor: 'background.default'}}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                    }}
                                >
                                    <IconButton onClick={toggleDrawer(false)}>
                                        <CloseRoundedIcon/>
                                    </IconButton>
                                </Box>

                                <MenuItem onClick={() => handleNavClick('features')}>Features</MenuItem>
                                <MenuItem onClick={() => handleNavClick('testimonials')}>Testimonials</MenuItem>
                                <MenuItem onClick={() => handleNavClick('highlights')}>Highlights</MenuItem>
                                <MenuItem onClick={() => handleNavClick('pricing')}>Pricing</MenuItem>
                                <MenuItem onClick={() => handleNavClick('faq')}>FAQ</MenuItem>
                                <Divider sx={{my: 3}}/>
                                <MenuItem>
                                    <Button color="primary" variant="contained" fullWidth href="https://app.setav.ai">
                                        Sign up
                                    </Button>
                                </MenuItem>
                                <MenuItem>
                                    <Button color="primary" variant="outlined" fullWidth href="https://app.setav.ai">
                                        Sign in
                                    </Button>
                                </MenuItem>
                            </Box>
                        </Drawer>
                    </Box>
                </StyledToolbar>
            </Container>
        </AppBar>
    );
}
