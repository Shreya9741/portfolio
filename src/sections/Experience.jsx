import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { experience } from '../data/experience';

export default function Experience() {
  // Hidden entirely unless enabled AND there is at least one real entry.
  if (!experience.enabled || !experience.items.length) return null;

  return (
    <Box component="section" id="experience" aria-labelledby="experience-title" sx={{ py: { xs: 9, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionHeading eyebrow="Experience" title="Experience & achievements." id="experience-title" />
        <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, borderLeft: '1px solid', borderColor: 'divider' }}>
          {experience.items.map((item, i) => (
            <Reveal as="li" key={`${item.title}-${i}`} delay={i * 0.06} style={{ listStyle: 'none' }}>
              <Box sx={{ position: 'relative', pl: { xs: 3, md: 5 }, pb: 5 }}>
                <Box aria-hidden sx={{ position: 'absolute', left: -5, top: 8, width: 9, height: 9, borderRadius: '50%', bgcolor: 'primary.main', boxShadow: '0 0 0 4px rgba(94,234,212,0.15)' }} />
                <Typography variant="overline" component="p">{item.type} {item.period ? `· ${item.period}` : ''}</Typography>
                <Typography variant="h3" component="h3" sx={{ mt: 0.5 }}>
                  {item.title}{item.org ? <Box component="span" sx={{ color: 'text.secondary', fontWeight: 400 }}> — {item.org}</Box> : null}
                </Typography>
                {item.description && <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 640 }}>{item.description}</Typography>}
              </Box>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
