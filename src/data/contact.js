// Contact form configuration.
// The form only appears when an endpoint is configured, so it can never "pretend" to send.
// Easiest option: create a free form at https://formspree.io and paste its URL below,
// or set VITE_CONTACT_ENDPOINT in a .env file (see README).

export const contactConfig = {
  endpoint: import.meta.env.VITE_CONTACT_ENDPOINT || '',
};
