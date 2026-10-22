import { lazy, Suspense, useEffect } from 'react';
import Box from '@mui/material/Box';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Footer from './sections/Footer';
import { profile } from './data/profile';

// Below-the-fold sections are code-split so the first paint stays fast.
const About = lazy(() => import('./sections/About'));
const Skills = lazy(() => import('./sections/Skills'));
const Projects = lazy(() => import('./sections/Projects'));
const Experience = lazy(() => import('./sections/Experience'));
const Contact = lazy(() => import('./sections/Contact'));

// Keeps the anchor target in the DOM while a section chunk loads, so nav links never miss.
function Lazy({ id, children }) {
  return <Suspense fallback={<Box id={id} sx={{ minHeight: '60vh' }} aria-hidden />}>{children}</Suspense>;
}

export default function App() {
  useEffect(() => {
    document.title = profile.siteTitle;
  }, []);

  return (
    <>
      <Box
        component="a"
        href="#main"
        sx={{
          position: 'fixed', left: 16, top: -60, zIndex: 2000, px: 2, py: 1, borderRadius: 2,
          bgcolor: 'primary.main', color: 'primary.contrastText', fontWeight: 600, textDecoration: 'none',
          '&:focus': { top: 16 },
        }}
      >
        Skip to content
      </Box>
      <Navbar />
      <Box component="main" id="main">
        <Hero />
        <Lazy id="about"><About /></Lazy>
        <Lazy id="skills"><Skills /></Lazy>
        <Lazy id="projects"><Projects /></Lazy>
        <Lazy id="experience"><Experience /></Lazy>
        <Lazy id="contact"><Contact /></Lazy>
      </Box>
      <Footer />
    </>
  );
}
