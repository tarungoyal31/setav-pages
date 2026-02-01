import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

type ShowcaseSite = {
  name: string;
  url: string;
  description: string;
  theme: string;
};

const showcaseWebsites: ShowcaseSite[] = [
  {
    name: 'FitnGlow',
    url: 'https://fitnglow.setav.app',
    description: 'A fitness and wellness platform showcasing training programs, nutrition guidance, and transformation stories.',
    theme: 'Fitness & Wellness',
  },
  {
    name: 'Sanjay Prasad',
    url: 'https://sanjayp.setav.app',
    description: 'Professional astrology services with consultation booking, birth chart readings, and personalized guidance.',
    theme: 'Professional Services',
  },
  {
    name: 'Tarun Goyal',
    url: 'https://tarungoyal.setav.app',
    description: 'Professional portfolio showcasing software development expertise, technical projects, and entrepreneurial ventures.',
    theme: 'Personal Portfolio',
  },
  {
    name: 'Ajnaeye',
    url: 'https://ajnaeye.setav.app',
    description: 'Reiki healing and tarot reading services offering energy healing sessions and intuitive spiritual guidance.',
    theme: 'Wellness & Spirituality',
  },
];

const ShowcaseCard = ({ site }: { site: ShowcaseSite }) => (
  <Card
    variant="outlined"
    sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      transition: 'transform 0.2s, box-shadow 0.2s',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 4,
      },
    }}
  >
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 240,
        overflow: 'hidden',
        bgcolor: 'grey.100',
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Box
        component="iframe"
        src={site.url}
        title={site.name}
        sx={{
          width: '200%',
          height: '200%',
          border: 'none',
          transform: 'scale(0.5)',
          transformOrigin: 'top left',
          pointerEvents: 'none',
        }}
      />
    </Box>
    <CardContent sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
        <Box>
          <Typography variant="h6" component="h3" gutterBottom sx={{ mb: 0.5 }}>
            {site.name}
          </Typography>
          <Typography variant="caption" sx={{ color: 'primary.main', fontWeight: 500 }}>
            {site.theme}
          </Typography>
        </Box>
        <Link
          href={site.url}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'text.secondary',
            textDecoration: 'none',
            '&:hover': { color: 'primary.main' },
          }}
        >
          <Typography variant="body2">Visit</Typography>
          <OpenInNewRoundedIcon fontSize="small" />
        </Link>
      </Box>
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
        {site.description}
      </Typography>
    </CardContent>
  </Card>
);

export default function Showcase1Floating() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container
      id="showcase"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
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
        <Typography
          component="h2"
          variant="h4"
          gutterBottom
          sx={{ color: 'text.primary' }}
        >
          Our Portfolio
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Browse websites we have designed and built for our clients. Each one is a custom creation tailored to their brand and goals.
        </Typography>
      </Box>

      {isMobile ? (
        <Box sx={{ width: '100%' }}>
          <Swiper
            modules={[Pagination]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
            style={{
              paddingBottom: '40px',
              '--swiper-pagination-color': theme.palette.primary.main,
              '--swiper-theme-color': theme.palette.primary.main,
            } as React.CSSProperties}
          >
            {showcaseWebsites.map((site, index) => (
              <SwiperSlide key={index}>
                <ShowcaseCard site={site} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {showcaseWebsites.map((site, index) => (
            <Grid size={{ xs: 12, sm: 6 }} key={index}>
              <ShowcaseCard site={site} />
            </Grid>
          ))}
        </Grid>
      )}

      <Box
        sx={{
          mt: { xs: 2, sm: 4 },
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 500 }}>
          Ready to Get Your Own Website?
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="mailto:support@setav.ai"
          sx={{ px: 4 }}
        >
          Contact Us
        </Button>
      </Box>
    </Container>
  );
}
