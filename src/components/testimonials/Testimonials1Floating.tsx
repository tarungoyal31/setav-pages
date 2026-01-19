import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

const userTestimonials = [
  {
    initials: 'SS',
    name: 'Shreya Suman',
    occupation: 'Marketing Professional',
    testimonial:
      "Setav has completely changed how I network. I just share my personal card via a one-time link, and my contacts have everything they need. No more fumbling with paper cards at events!",
  },
  {
    initials: 'SP',
    name: 'Sanjay Prasad',
    occupation: 'Fitness Trainer',
    testimonial:
      "As a fitness trainer, listing my services on Setav has been a game-changer. Clients can see my packages, pricing, and book sessions directly. My bookings have increased significantly!",
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
      <Grid container spacing={2}>
        {userTestimonials.map((testimonial, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index} sx={{ display: 'flex' }}>
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
    </Container>
  );
}
