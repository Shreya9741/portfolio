import { createTheme } from '@mui/material/styles';

export const ACCENT = '#5eead4'; // soft cyan/teal — change this one value to re-color the site
export const ACCENT_STRONG = '#22d3ee';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: ACCENT, contrastText: '#071012' },
    background: { default: '#0a0b0d', paper: '#111317' },
    text: { primary: '#f4f5f7', secondary: '#9aa0aa' },
    divider: 'rgba(255,255,255,0.08)',
  },
  shape: { borderRadius: 10 },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", system-ui, -apple-system, sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05, fontSize: 'clamp(2.4rem, 6vw, 4.6rem)' },
    h2: { fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' },
    h3: { fontWeight: 600, letterSpacing: '-0.01em', fontSize: 'clamp(1.2rem, 2.2vw, 1.5rem)' },
    body1: { lineHeight: 1.75, fontSize: '1.02rem' },
    body2: { lineHeight: 1.65 },
    overline: { letterSpacing: '0.18em', fontWeight: 600, color: ACCENT },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: { scrollBehavior: 'smooth', scrollPaddingTop: '72px' },
        body: {
          background:
            'radial-gradient(1200px 600px at 80% -10%, rgba(34,211,238,0.08), transparent 60%), radial-gradient(900px 500px at -10% 30%, rgba(94,234,212,0.05), transparent 60%), #0a0b0d',
          overflowX: 'hidden',
        },
        '::selection': { background: 'rgba(94,234,212,0.3)' },
        '@media (prefers-reduced-motion: reduce)': {
          html: { scrollBehavior: 'auto' },
          '*, *::before, *::after': { animationDuration: '0.01ms !important', transitionDuration: '0.01ms !important' },
        },
        ':focus-visible': { outline: `2px solid ${ACCENT}`, outlineOffset: 3 },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 999, padding: '10px 22px', transition: 'all .2s ease' },
        containedPrimary: {
          '&:hover': { boxShadow: '0 0 0 4px rgba(94,234,212,0.18)', transform: 'translateY(-1px)' },
        },
        outlined: {
          borderColor: 'rgba(255,255,255,0.18)',
          color: '#f4f5f7',
          '&:hover': { borderColor: ACCENT, background: 'rgba(94,234,212,0.06)', transform: 'translateY(-1px)' },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: { root: { transition: 'all .2s ease', '&:hover': { color: ACCENT, background: 'rgba(94,234,212,0.08)' } } },
    },
    MuiTextField: { defaultProps: { variant: 'outlined', fullWidth: true } },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.02)',
          '& fieldset': { borderColor: 'rgba(255,255,255,0.12)' },
          '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.28)' },
        },
      },
    },
  },
});

export default theme;
