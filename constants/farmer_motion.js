export const fadeInTopVariant = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.2,
      type: "spring",
      stiffness: 60,
    },
  },
};

export const fadeInLeftVariant = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 50,
      duration: 0.8,
      ease: [0.65, 0, 0.35, 1],
      delay: 0.2,
    },
  },
};
export const fadeInLeftchildrenVariant = {
  hidden: {
    opacity: 0,
    y: 100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.4,
      type: "spring",
      stiffness: 40,
      duration: 0.8,
      ease: [0.65, 0, 0.35, 1],
      delay: 0.2,
    },
  },
};
export const fadeInVariant = {
  hidden: {
    opacity: 0,
    scale: 0.5,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.2,
      ease: [0, 0.5, 0.7, 1.01],
    },
  },
};

export const menuSilde = {
  initial: {
    y: "-100%",
  },
  enter: {
    y: "0%",
    transition: {duration: 0.8, ease: [0.65, 0, 0.35, 1]},
  },
  exit: {
    y: "-100%",
    transition: {duration: 0.8, ease: [0.65, 0, 0.35, 1], delay: 0.3},
  },
};
