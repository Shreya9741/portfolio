import { motion } from 'framer-motion';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

// Fades/slides children in once when they scroll into view. No-op for reduced-motion users.
export default function Reveal({ children, delay = 0, y = 24, as = 'div', ...rest }) {
  const reduced = usePrefersReducedMotion();
  const Tag = motion[as] || motion.div;
  if (reduced) return <Tag {...rest}>{children}</Tag>;
  return (
    <Tag
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
