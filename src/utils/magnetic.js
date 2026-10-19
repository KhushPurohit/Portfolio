import gsap from 'gsap';

/**
 * Initializes a magnetic hover effect on an element using GSAP.
 * @param {HTMLElement} element - The target element.
 * @param {number} strength - The multiplier of movement strength.
 * @returns {Function} A cleanup function to remove event listeners.
 */
export const initMagneticEffect = (element, strength = 30) => {
  if (!element) return;

  const moveEvent = (e) => {
    const rect = element.getBoundingClientRect();
    // Distance between cursor and center of the element
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(element, {
      x: x * (strength / 100),
      y: y * (strength / 100),
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const leaveEvent = () => {
    // Return element to its origin smoothly
    gsap.to(element, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)"
    });
  };

  element.addEventListener('mousemove', moveEvent);
  element.addEventListener('mouseleave', leaveEvent);

  return () => {
    element.removeEventListener('mousemove', moveEvent);
    element.removeEventListener('mouseleave', leaveEvent);
  };
};
