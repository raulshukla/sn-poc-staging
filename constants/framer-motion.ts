export const FADE_IN_UP_VARIANTS = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: { duration: 0.2 },
};

export const STAGGER_CHILDREN = {
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};
