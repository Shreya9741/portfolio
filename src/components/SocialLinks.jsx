import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import MailOutlineIcon from '@mui/icons-material/MailOutlined';
import { profile, socials } from '../data/profile';

const links = () => [
  { label: 'GitHub', href: socials.github, Icon: GitHubIcon, external: true },
  { label: 'LinkedIn', href: socials.linkedin, Icon: LinkedInIcon, external: true },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: MailOutlineIcon, external: false },
];

export default function SocialLinks({ size = 'medium' }) {
  return (
    <Stack direction="row" spacing={0.5} component="nav" aria-label="Social links">
      {links()
        .filter((l) => l.href)
        .map(({ label, href, Icon, external }) => (
          <Tooltip key={label} title={label}>
            <IconButton
              size={size}
              component="a"
              href={href}
              aria-label={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              sx={{ color: 'text.secondary' }}
            >
              <Icon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        ))}
    </Stack>
  );
}
