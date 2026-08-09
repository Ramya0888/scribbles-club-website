import React from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

export function PresenceFade({ show, children, mode = 'fade' }) {
  const reduceMotion = useReducedMotion();

  const variants = reduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : mode === 'scale'
      ? {
          initial: { opacity: 0, scale: 0.98 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 0.98 },
        }
      : mode === 'slide'
        ? {
            initial: { opacity: 0, y: 6 },
            animate: { opacity: 1, y: 0 },
            exit: { opacity: 0, y: -4 },
          }
        : {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
          };

  return (
    <AnimatePresence initial={false} mode="popLayout">
      {show ? (
        <motion.div
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{ duration: reduceMotion ? 0 : 0.18, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default PresenceFade;