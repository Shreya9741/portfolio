import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, id }) {
  return (
    <Reveal>
      <Box sx={{ mb: { xs: 5, md: 7 } }}>
        <Typography variant="overline" component="p" sx={{ mb: 1 }}>
          {eyebrow}
        </Typography>
        <Typography variant="h2" component="h2" id={id}>
          {title}
        </Typography>
      </Box>
    </Reveal>
  );
}
