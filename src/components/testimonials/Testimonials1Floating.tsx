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
      "Setav has made it so easy for my clients to book consultations and access my diet plans. I list all my services, and clients can see my packages and book directly. It's streamlined my entire practice!",
  },
  {
    initials: 'SP',
    name: 'Sanjay Prasad',
    occupation: 'Astrologer',
    testimonial:
      "As an astrologer, Setav helps me connect with clients seeking guidance. They can view my consultation types, book readings, and I get automatic calendar reminders. My client base has grown tremendously!",
  },
  {
    initials: 'AG',
    name: 'Abhishek Goyal',
    occupation: 'Consultant',
    testimonial:
      "The QR code feature is brilliant for networking events. I just show my code, and people can save my contact instantly. Professional and efficient - exactly what I needed.",
  },
  {
    initials: 'AR',
    name: 'Arun Rampure',
    occupation: 'Yoga Instructor',
    testimonial:
      "The booking system is seamless. My students book their slots, and both of us get calendar invites automatically. No more back-and-forth messages to schedule sessions!",
  },
  {
    initials: 'MD',
    name: 'Moutushi Das',
    occupation: 'Freelance Designer',
    testimonial:
      "Setting up my business card took just minutes. The interface is so intuitive, and now I have a professional digital presence that I can share with potential clients anywhere.",
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
          Testimonials
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          See how Setav is helping individuals and businesses connect more effectively.
          Join thousands of users who have transformed their networking experience.
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
