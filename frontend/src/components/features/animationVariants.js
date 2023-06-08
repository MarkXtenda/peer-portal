// VARIANTS FOR FRME-MOTION LIBRARY

export const menuVariants = {
    hidden: {
        opacity: 0,
        x: '-100%',
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.3,
        },
    },
    closed: {
        opacity: 1,
        x: '-100%',
        transition: {
            duration: 0.3,
        },
    }
  };

  export const toggleVariants = {
    hidden: {
        x: '-100%',
    },
    visible: {
        x: 0,
    },
    closed: {
        x: '-500%',
        transition: {
            duration: 0.8,
        },
    },
  };
  export const blurVariants = {
    hidden: {
        filter: 'none',
    },
    blur: {
        filter: 'blur(4px)',
        transition: {
            duration: 0.3,
        },
    },
    unBlur: {
        filter: 'none',
        transition: {
            duration: 0.3,
        },
    },
  };
