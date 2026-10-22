import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SectionHeading from '../components/SectionHeading';
import Reveal from '../components/Reveal';
import { profile, socials } from '../data/profile';
import { contactConfig } from '../data/contact';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = 'Please enter your name.';
  if (!v.email.trim()) e.email = 'Please enter your email.';
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'Please enter a valid email address.';
  if (!v.message.trim()) e.message = 'Please write a message.';
  else if (v.message.trim().length < 10) e.message = 'Message should be at least 10 characters.';
  return e;
}

function ContactForm({ endpoint }) {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const onChange = (field) => (e) => {
    setValues((s) => ({ ...s, [field]: e.target.value }));
    if (errors[field]) setErrors((s) => ({ ...s, [field]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus('sending');
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: values.name.trim(), email: values.email.trim(), message: values.message.trim() }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('success');
      setValues({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <Box component="form" onSubmit={onSubmit} noValidate aria-label="Contact form">
      <Stack spacing={2.5}>
        <TextField label="Name" name="name" autoComplete="name" value={values.name} onChange={onChange('name')} error={!!errors.name} helperText={errors.name} required />
        <TextField label="Email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange('email')} error={!!errors.email} helperText={errors.email} required />
        <TextField label="Message" name="message" multiline minRows={5} value={values.message} onChange={onChange('message')} error={!!errors.message} helperText={errors.message} required />
        <Box>
          <Button type="submit" variant="contained" color="primary" size="large" endIcon={<SendIcon />} disabled={status === 'sending'}>
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </Button>
        </Box>
        <Box aria-live="polite">
          {status === 'success' && <Alert severity="success" variant="outlined">Thanks! Your message was sent. I&apos;ll get back to you soon.</Alert>}
          {status === 'error' && (
            <Alert severity="error" variant="outlined">
              Something went wrong and your message was not sent. Please try again, or email me directly at{' '}
              <a href={`mailto:${profile.email}`} style={{ color: 'inherit' }}>{profile.email}</a>.
            </Alert>
          )}
        </Box>
      </Stack>
    </Box>
  );
}

export default function Contact() {
  const hasForm = Boolean(contactConfig.endpoint);

  return (
    <Box component="section" id="contact" aria-labelledby="contact-title" sx={{ py: { xs: 9, md: 14 } }}>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 5, md: 10 }}>
          <Grid size={{ xs: 12, md: hasForm ? 5 : 8 }}>
            <SectionHeading eyebrow="Contact" title="Let's build something together." id="contact-title" />
            <Reveal>
              <Typography color="text.secondary" sx={{ mb: 4, maxWidth: 520 }}>
                I&apos;m open to internships and full-time software engineering roles. If you have an opportunity, a question, or just want to say hi, my inbox is open.
              </Typography>
              <Stack spacing={1.5} alignItems="flex-start">
                <Button variant="contained" color="primary" size="large" href={`mailto:${profile.email}`} startIcon={<MailOutlineIcon />}>
                  {profile.email}
                </Button>
                <Stack direction="row" spacing={1.5} flexWrap="wrap" useFlexGap>
                  {socials.github && <Button variant="outlined" href={socials.github} target="_blank" rel="noopener noreferrer" startIcon={<GitHubIcon />}>GitHub</Button>}
                  {socials.linkedin && <Button variant="outlined" href={socials.linkedin} target="_blank" rel="noopener noreferrer" startIcon={<LinkedInIcon />}>LinkedIn</Button>}
                </Stack>
              </Stack>
            </Reveal>
          </Grid>

          {hasForm && (
            <Grid size={{ xs: 12, md: 7 }}>
              <Reveal delay={0.1}>
                <Box sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 3, border: '1px solid', borderColor: 'divider', background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(8px)' }}>
                  <ContactForm endpoint={contactConfig.endpoint} />
                </Box>
              </Reveal>
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
