import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

export default function Projects() {
  return (
    <Box component="section" id="projects" aria-labelledby="projects-title" sx={{ py: { xs: 9, md: 14 } }}>
      <Container maxWidth="lg">
        <SectionHeading eyebrow="Projects" title="Featured work." id="projects-title" />
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {projects.map((project, i) => (
            <Grid key={project.id} size={{ xs: 12, md: 6, lg: 4 }}>
              <Reveal delay={i * 0.08} style={{ height: '100%' }}>
                <ProjectCard project={project} />
              </Reveal>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
