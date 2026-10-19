import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const glow = glowRef.current;
    if (!cursor || !glow) return;

    const onMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      gsap.to(cursor, {
        x: x,
        y: y,
        duration: 0.03,
        ease: 'power2.out',
      });

      gsap.to(glow, {
        x: x,
        y: y,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const addHoverClass = () => cursor.classList.add('hovering');
    const removeHoverClass = () => cursor.classList.remove('hovering');

    window.addEventListener('mousemove', onMouseMove);

    const attachHoverListeners = () => {
      const elements = document.querySelectorAll(
        'a, button, .orbital-node, .neural-node-chip, .project-cube-card, .chamber-cell, input, textarea, [role="button"]'
      );
      elements.forEach((el) => {
        el.removeEventListener('mouseenter', addHoverClass);
        el.removeEventListener('mouseleave', removeHoverClass);
        el.addEventListener('mouseenter', addHoverClass);
        el.addEventListener('mouseleave', removeHoverClass);
      });
    };

    const timer = setTimeout(attachHoverListeners, 800);
    const observer = new MutationObserver(attachHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" style={{ top: 0, left: 0 }} />
      <div ref={glowRef} className="custom-cursor-glow" style={{ top: 0, left: 0 }} />
    </>
  );
}
