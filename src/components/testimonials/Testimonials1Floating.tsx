import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useState } from 'react';

const userTestimonials = [
  {
    initials: 'SS',
    name: 'Shreya Suman',
    occupation: 'Nutritionist',
    testimonial:
      "Setav built me a beautiful website that showcases my nutrition programs and makes it easy for clients to reach out. The whole process was smooth, and I had my site live within days!",
  },
  {
    initials: 'SP',
    name: 'Sanjay Prasad',
    occupation: 'Astrologer',
    testimonial:
      "I needed a professional website to showcase my astrology services, and Setav delivered exactly that. The design perfectly represents my brand, and new clients find me through search all the time now.",
  },
  {
    initials: 'AG',
    name: 'Abhishek Goyal',
    occupation: 'Consultant',
    testimonial:
      "Setav created a clean, professional site for my consulting practice. They handled the domain, hosting, and SEO — I just provided the content. It was the easiest decision I made for my business.",
  },
  {
    initials: 'AR',
    name: 'Arun Rampure',
    occupation: 'Yoga Instructor',
    testimonial:
      "My new website from Setav looks incredible on every device. Students can browse my class schedule and get in touch directly. The turnaround was fast and the team was great to work with.",
  },
  {
    initials: 'MD',
    name: 'Moutushi Das',
    occupation: 'Freelance Designer',
    testimonial:
      "As a designer, I have high standards for websites. Setav exceeded my expectations with a portfolio site that truly reflects my style. They even set up my custom domain and email.",
  },
];

export default function Testimonials1Floating() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollLeft = event.currentTarget.scrollLeft;
    const clientWidth = event.currentTarget.clientWidth;
    const index = Math.round(scrollLeft / clientWidth);
    setActiveIndex(index);
  };

  return (
    <Container
      id="testimonials"
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
          What Our Clients Say
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Hear from businesses and individuals who chose Setav to build their online presence.
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        onScroll={handleScroll}
        sx={{
          flexWrap: { xs: 'nowrap', sm: 'wrap' },
          overflowX: { xs: 'auto', sm: 'visible' },
          width: '100%',
          scrollSnapType: { xs: 'x mandatory', sm: 'none' },
          pb: { xs: 2, sm: 0 },
          '::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {userTestimonials.map((testimonial, index) => (
          <Grid
            size={{ xs: 12, sm: 6, md: 4 }}
            key={index}
            sx={{
              display: 'flex',
              minWidth: { xs: '300px', sm: 'auto' },
              flexShrink: { xs: 0, sm: 1 },
              scrollSnapAlign: 'center',
            }}
          >
            <Card
              variant="outlined"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                flexGrow: 1,
              }}
            >
              <CardContent>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ color: 'text.secondary' }}
                >
                  {testimonial.testimonial}
                </Typography>
              </CardContent>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    {testimonial.initials}
                  </Avatar>
                }
                title={testimonial.name}
                subheader={testimonial.occupation}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: { xs: 'flex', sm: 'none' },
          justifyContent: 'center',
          gap: 1,
          mt: 2,
        }}
      >
        {userTestimonials.map((_, index) => (
          <Box
            key={index}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              bgcolor: index === activeIndex ? 'primary.main' : 'grey.300',
              transition: 'background-color 0.3s',
            }}
          />
        ))}
      </Box>
    </Container>
  );
}
