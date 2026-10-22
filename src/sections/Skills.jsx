import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { skillCategories } from '../data/skills';

export default function Skills() {
  const categories = skillCategories.filter((c) => c.items && c.items.length);

  return (
    <Box component="section" id="skills" aria-labelledby="skills-title" sx={{ py: { xs: 9, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionHeading eyebrow="Skills" title="Tools I work with." id="skills-title" />

        <Box component="div" sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
          {categories.map((cat, i) => (
            <Reveal key={cat.title} delay={i * 0.04} y={16}>
              <Box
                sx={{
                  display: 'grid', gridTemplateColumns: { xs: '1fr', md: '280px 1fr' }, gap: { xs: 1.5, md: 4 },
                  py: { xs: 3, md: 3.5 }, borderBottom: '1px solid', borderColor: 'divider',
                  transition: 'background .25s ease', '&:hover': { background: 'rgba(255,255,255,0.015)' },
                }}
              >
                <Typography variant="h3" component="h3" sx={{ fontSize: '1.05rem', color: 'text.secondary' }}>
                  {cat.title}
                </Typography>
                <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexWrap: 'wrap', gap: '10px 28px' }}>
                  {cat.items.map((item) => (
                    <Box
                      component="li"
                      key={item}
                      sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, fontWeight: 500, fontSize: { xs: '1rem', md: '1.1rem' } }}
                    >
                      <Box aria-hidden sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: 'primary.main', opacity: 0.85 }} />
                      {item}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
