import React, { useEffect } from 'react';
import { motion, type Variants } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 8,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: {
      duration: 0.18,
      ease: 'easeIn',
    },
  },
};

/**
 * PageTransition provides subtle, fluid entrance and exit animations
 * for page contents when navigating between routes using Framer Motion.
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ children, className = '' }) => {
  useEffect(() => {
    // Ensure viewport resets to top when a new page transition mounts
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full flex-grow flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
};
