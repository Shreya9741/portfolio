import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CodeIcon from '@mui/icons-material/Code';
import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

function Preview({ image, title }) {
  const [failed, setFailed] = useState(false);
  if (image && !failed) {
    return (
      <Box
        component="img"
        src={image}
        alt={`Screenshot of ${title}`}
        loading="lazy"
        width={960}
        height={540}
        onError={() => setFailed(true)}
        sx={{ width: '100%', aspectRatio: '16 / 9', objectFit: 'cover', display: 'block' }}
      />
    );
  }
  // Graceful fallback when there is no screenshot (or it fails to load)
  return (
    <Box
      role="img"
      aria-label={`Preview placeholder for ${title}`}
      sx={{
        aspectRatio: '16 / 9', display: 'grid', placeItems: 'center', color: 'text.secondary',
        background:
          'linear-gradient(135deg, rgba(94,234,212,0.08), rgba(34,211,238,0.02) 50%, rgba(255,255,255,0.02))',
        backgroundImage:
          'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '28px 28px',
      }}
    >
      <Stack alignItems="center" spacing={1}>
        <CodeIcon sx={{ fontSize: 36, color: 'primary.main', opacity: 0.8 }} />
        <Typography variant="caption">Add a screenshot in /public/projects</Typography>
      </Stack>
    </Box>
  );
}

export default function ProjectCard({ project }) {
  const reduced = usePrefersReducedMotion();
  const { title, description, problem, features, tech, image, repo, live, placeholder } = project;

  return (
    <Box
      component={motion.article}
      whileHover={reduced ? undefined : { y: -6 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      sx={{
        position: 'relative', height: '100%', display: 'flex', flexDirection: 'column',
        borderRadius: 3, overflow: 'hidden', bgcolor: 'background.paper',
        border: '1px solid', borderColor: 'divider',
        transition: 'border-color .3s ease, box-shadow .3s ease',
        '&:hover, &:focus-within': {
          borderColor: 'rgba(94,234,212,0.45)',
          boxShadow: '0 20px 50px -20px rgba(34,211,238,0.25)',
        },
      }}
    >
      <Box sx={{ position: 'relative', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Preview image={image} title={title} />
        {placeholder && (
          <Chip
            label="Placeholder"
            size="small"
            sx={{ position: 'absolute', top: 12, left: 12, bgcolor: 'rgba(10,11,13,0.85)', border: '1px solid rgba(255,255,255,0.15)', color: 'text.secondary' }}
          />
        )}
      </Box>

      <Box sx={{ p: { xs: 2.5, md: 3 }, display: 'flex', flexDirection: 'column', gap: 2, flexGrow: 1 }}>
        <Box>
          <Typography variant="h3" component="h3" sx={{ mb: 1 }}>{title}</Typography>
          <Typography variant="body2" color="text.secondary">{description}</Typography>
        </Box>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          <Box component="span" sx={{ color: 'text.primary', fontWeight: 600 }}>Problem solved: </Box>
          {problem}
        </Typography>

        <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'text.secondary', typography: 'body2', '& li::marker': { color: 'primary.main' } }}>
          {features.map((f) => <li key={f}>{f}</li>)}
        </Box>

        <Stack direction="row" flexWrap="wrap" useFlexGap spacing={1} aria-label="Technologies used">
          {tech.map((t) => (
            <Chip key={t} label={t} size="small" variant="outlined" sx={{ borderColor: 'divider', color: 'text.secondary' }} />
          ))}
        </Stack>

        {(repo || live) && (
          <Stack direction="row" spacing={1.5} sx={{ mt: 'auto', pt: 1 }}>
            {repo && (
              <Button size="small" variant="outlined" startIcon={<GitHubIcon />} href={repo} target="_blank" rel="noopener noreferrer" aria-label={`${title} source code on GitHub`}>
                Code
              </Button>
            )}
            {live && (
              <Button size="small" variant="contained" color="primary" endIcon={<OpenInNewIcon />} href={live} target="_blank" rel="noopener noreferrer" aria-label={`${title} live demo`}>
                Live demo
              </Button>
            )}
          </Stack>
        )}
      </Box>
    </Box>
  );
}
