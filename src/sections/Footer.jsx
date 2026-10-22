import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import SocialLinks from '../components/SocialLinks';
import { profile } from '../data/profile';

export default function Footer() {
  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <Box component="footer" sx={{ borderTop: '1px solid', borderColor: 'divider', py: 4 }}>
      <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SocialLinks />
          <Tooltip title="Back to top">
            <IconButton aria-label="Back to top" onClick={toTop} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <KeyboardArrowUpIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Container>
    </Box>
  );
}
