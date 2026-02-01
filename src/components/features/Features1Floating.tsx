import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import BrushRoundedIcon from '@mui/icons-material/BrushRounded';
import PhoneIphoneRoundedIcon from '@mui/icons-material/PhoneIphoneRounded';
import SpeedRoundedIcon from '@mui/icons-material/SpeedRounded';
import TravelExploreRoundedIcon from '@mui/icons-material/TravelExploreRounded';
import BuildRoundedIcon from '@mui/icons-material/BuildRounded';

const items = [
    {
        icon: <BrushRoundedIcon/>,
        title: 'Custom Design',
        description:
            'Every website is designed from scratch to match your brand. No templates — just a unique site that represents you.',
    },
    {
        icon: <PhoneIphoneRoundedIcon/>,
        title: 'Mobile Responsive',
        description:
            'Your website will look and work great on every device — phones, tablets, and desktops.',
    },
    {
        icon: <SpeedRoundedIcon/>,
        title: 'Fast Turnaround',
        description:
            'We work efficiently to get your website live quickly without cutting corners on quality.',
    },
    {
        icon: <TravelExploreRoundedIcon/>,
        title: 'SEO Optimized',
        description:
            'Built with search engines in mind so your customers can find you online from day one.',
    },
    {
        icon: <BuildRoundedIcon/>,
        title: 'Easy Content Updates',
        description:
            'Need to change text, images, or add new pages? We make updates simple and hassle-free.',
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
                    What We Build
                </Typography>
                <Typography
                    variant="body1"
                    sx={{color: 'text.secondary'}}
                >
                    Everything you need for a professional web presence, designed and built by our team.
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
