import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { about } from '../data/profile';

export default function About() {
  return (
    <Box component="section" id="about" aria-labelledby="about-title" sx={{ py: { xs: 9, md: 14 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 4, md: 10 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <SectionHeading eyebrow="About" title="Building with care, solving with curiosity." id="about-title" />
          </Grid>
          <Grid size={{ xs: 12, md: 7 }}>
            {about.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <Typography variant="body1" color={i === 0 ? 'text.primary' : 'text.secondary'} sx={{ mb: 3, fontSize: i === 0 ? { xs: '1.1rem', md: '1.25rem' } : undefined }}>
                  {p}
                </Typography>
              </Reveal>
            ))}
          </Grid>
        </Grid>

        {/* Highlights: editorial stat row separated by hairlines (not cards) */}
        <Reveal>
          <Box
            component="dl"
            sx={{
              m: 0, mt: { xs: 5, md: 8 }, display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
              borderTop: '1px solid', borderColor: 'divider',
            }}
          >
            {about.highlights.map((h, i) => (
              <Box
                key={h.label}
                sx={{
                  py: 3, pr: 3, pl: { xs: 0, sm: i === 0 ? 0 : 3 },
                  borderLeft: { xs: 'none', sm: i === 0 ? 'none' : '1px solid' }, borderColor: 'divider',
                  borderBottom: { xs: i < about.highlights.length - 1 ? '1px solid' : 'none', sm: 'none' },
                }}
              >
                <Typography component="dd" sx={{ m: 0, order: 2, fontSize: { xs: '2.2rem', md: '2.8rem' }, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 }}>
                  {h.value}
                </Typography>
                <Typography component="dt" variant="body2" sx={{ mt: 1, fontWeight: 600 }}>{h.label}</Typography>
                <Typography variant="caption" color="text.secondary">{h.note}</Typography>
              </Box>
            ))}
          </Box>
        </Reveal>
      </Container>
    </Box>
  );
}
