export const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

export const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: '-100vh',
    x: '-50vw',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.4,
      type: 'spring',
      ease: 'easeInOut',
      stiffness: 32,
    },
  },
};

export const itemVariants2 = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: '-100vh',
    x: '50vw',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.4,
      type: 'spring',
      ease: 'easeInOut',
      stiffness: 32,
    },
  },
};

export const itemVariants3 = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: '100vh',
    x: '50vw',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.4,
      type: 'spring',
      ease: 'easeInOut',
      stiffness: 32,
    },
  },
};
export const tdItem = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'tween',
      ease: 'easeInOut',
      duration: 0.1,
    },
  },
  exit: {
    x: '100vw',
    opacity: 0,
  },
};

export const tdOpacityVariant = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,

    transition: {
      type: 'tween',
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
  },
};
