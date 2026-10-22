import { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import DownloadIcon from '@mui/icons-material/Download';
import { navLinks } from '../data/navigation';
import { profile } from '../data/profile';

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy: highlight the section nearest the top of the viewport
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = navLinks[0].id;
      for (const { id } of navLinks) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= y) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    // wait for the drawer to start closing so scroll isn't blocked by scroll-lock
    setTimeout(() => {
      scrollToId(id);
      history.replaceState(null, '', `#${id}`);
    }, 50);
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="transparent"
        elevation={0}
        component="header"
        sx={{
          transition: 'all .3s ease',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          background: scrolled ? 'rgba(10,11,13,0.72)' : 'transparent',
          borderBottom: '1px solid',
          borderColor: scrolled ? 'divider' : 'transparent',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ minHeight: { xs: 60, md: 68 }, justifyContent: 'space-between' }}>
            <Box
              component="a"
              href="#home"
              onClick={(e) => go(e, 'home')}
              aria-label={`${profile.name} — back to top`}
              sx={{
                textDecoration: 'none', color: 'text.primary', fontWeight: 700, letterSpacing: '0.04em',
                display: 'inline-flex', alignItems: 'center', gap: 1,
              }}
            >
              <Box sx={{ width: 30, height: 30, borderRadius: 1.5, border: '1px solid', borderColor: 'primary.main', color: 'primary.main', display: 'grid', placeItems: 'center', fontSize: 12 }}>
                {profile.initials}
              </Box>
            </Box>

            <Box component="nav" aria-label="Primary" sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
              {navLinks.map(({ label, id }) => (
                <Button
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => go(e, id)}
                  aria-current={active === id ? 'true' : undefined}
                  sx={{
                    color: active === id ? 'text.primary' : 'text.secondary', px: 1.75, borderRadius: 2,
                    position: 'relative',
                    '&::after': {
                      content: '""', position: 'absolute', left: 14, right: 14, bottom: 4, height: 2, borderRadius: 1,
                      background: 'primary.main', backgroundColor: '#5eead4',
                      transform: active === id ? 'scaleX(1)' : 'scaleX(0)', transition: 'transform .25s ease',
                    },
                    '&:hover': { color: 'text.primary', background: 'rgba(255,255,255,0.04)' },
                  }}
                >
                  {label}
                </Button>
              ))}
              <Button
                variant="outlined"
                size="small"
                href={profile.resumeUrl}
                download={profile.resumeFileName}
                startIcon={<DownloadIcon />}
                sx={{ ml: 1.5 }}
              >
                Resume
              </Button>
            </Box>

            <IconButton
              aria-label="Open navigation menu"
              onClick={() => setOpen(true)}
              sx={{ display: { xs: 'inline-flex', md: 'none' }, color: 'text.primary' }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 'min(80vw, 320px)', background: '#0d0f12', borderLeft: '1px solid', borderColor: 'divider', p: 2 } }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="overline">Menu</Typography>
          <IconButton aria-label="Close navigation menu" onClick={() => setOpen(false)}><CloseIcon /></IconButton>
        </Box>
        <List component="nav" aria-label="Mobile">
          {navLinks.map(({ label, id }) => (
            <ListItemButton key={id} component="a" href={`#${id}`} onClick={(e) => go(e, id)} selected={active === id} sx={{ borderRadius: 2, py: 1.5 }}>
              <ListItemText primary={label} primaryTypographyProps={{ fontWeight: 600 }} />
            </ListItemButton>
          ))}
        </List>
        <Button
          variant="contained"
          color="primary"
          href={profile.resumeUrl}
          download={profile.resumeFileName}
          startIcon={<DownloadIcon />}
          sx={{ mt: 2 }}
          fullWidth
        >
          Resume
        </Button>
      </Drawer>
    </>
  );
}
