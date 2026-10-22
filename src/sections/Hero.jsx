import { lazy, Suspense } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import DownloadIcon from '@mui/icons-material/Download';
import { motion } from 'framer-motion';
import SocialLinks from '../components/SocialLinks';
import ErrorBoundary from '../components/ErrorBoundary';
import useCanRender3D from '../hooks/useCanRender3D';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';
import { profile } from '../data/profile';

const Hero3D = lazy(() => import('../components/Hero3D'));

// Lightweight CSS-only fallback for mobile / no-WebGL / load failure
function StaticOrb() {
  return (
    <Box
      aria-hidden
      sx={{
        width: '70%', aspectRatio: '1', borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 30%, rgba(94,234,212,0.35), rgba(34,211,238,0.08) 45%, transparent 70%)',
        border: '1px solid rgba(94,234,212,0.25)', boxShadow: '0 0 80px rgba(34,211,238,0.15)',
      }}
    />
  );
}

export default function Hero() {
  const can3D = useCanRender3D();
  const reduced = usePrefersReducedMotion();
  const fade = (delay) =>
    reduced ? {} : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] } };

  const scrollTo = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <Box component="section" id="home" aria-labelledby="hero-title" sx={{ position: 'relative', minHeight: '100svh', display: 'flex', alignItems: 'center', overflow: 'hidden', pt: { xs: 10, md: 8 }, pb: { xs: 8, md: 6 } }}>
      {/* 3D layer sits BEHIND the text on small screens and beside it on large ones */}
      <Box
        sx={{
          position: 'absolute', zIndex: 0, pointerEvents: 'none',
          top: { xs: '8%', md: 0 }, right: { xs: '-25%', md: 0 }, bottom: { xs: 'auto', md: 0 },
          width: { xs: '90%', md: '52%' }, height: { xs: '55%', md: '100%' },
          opacity: { xs: 0.45, md: 1 },
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >
        {/* pointer events enabled only on desktop so scrolling on touch devices is never blocked */}
        <Box sx={{ width: '100%', height: '100%', pointerEvents: { xs: 'none', md: 'auto' }, display: 'grid', placeItems: 'center' }}>
          {can3D ? (
            <ErrorBoundary fallback={<StaticOrb />}>
              <Suspense fallback={<StaticOrb />}>
                <Hero3D />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <StaticOrb />
          )}
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ maxWidth: { xs: '100%', md: 640 } }}>
          <Typography component={motion.p} variant="overline" {...fade(0.05)} sx={{ mb: 2 }}>
            Software Engineering · Open to opportunities
          </Typography>

          <Typography component={motion.h1} id="hero-title" variant="h1" {...fade(0.15)}>
            Hi, I&apos;m {profile.name}
            <Box component="span" sx={{ display: 'block', color: 'text.secondary' }}>
              {profile.role}.
            </Box>
          </Typography>

          <Typography component={motion.p} variant="body1" color="text.secondary" {...fade(0.3)} sx={{ mt: 3, maxWidth: 540, fontSize: { xs: '1rem', md: '1.1rem' } }}>
            {profile.tagline}
          </Typography>

          <Stack component={motion.div} direction={{ xs: 'column', sm: 'row' }} spacing={2} {...fade(0.45)} sx={{ mt: 4.5 }}>
            <Button variant="contained" color="primary" size="large" href="#projects" onClick={(e) => scrollTo(e, 'projects')} endIcon={<ArrowDownwardIcon />}>
              Explore My Work
            </Button>
            <Button variant="outlined" size="large" href={profile.resumeUrl} download={profile.resumeFileName} startIcon={<DownloadIcon />}>
              Download Resume
            </Button>
          </Stack>

          <Box component={motion.div} {...fade(0.6)} sx={{ mt: 4 }}>
            <SocialLinks size="large" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
