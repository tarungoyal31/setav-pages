import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

function LogoIcon(props: SvgIconProps) {
  // Simple placeholder logo (MUI logo style)
  return (
    <SvgIcon {...props} viewBox="0 0 40 40">
      <circle cx="20" cy="20" r="18" fill="#1976d2" />
      <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="16" fontFamily="Arial" dy=".3em">L</text>
    </SvgIcon>
  );
}

export default function CustomToolbar() {
  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        <LogoIcon sx={{ mr: 2, fontSize: 32 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Box>
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Contact Us</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
