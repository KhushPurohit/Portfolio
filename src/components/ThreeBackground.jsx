import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width  = container.clientWidth  || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(60, width / height, 0.1, 500);
    camera.position.z = 45;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    /* ── Ambient Floating Particles (Pollen / Motes) ── */
    const COUNT = 90;
    const positions  = new Float32Array(COUNT * 3);
    const colors     = new Float32Array(COUNT * 3);
    const velocities = [];

    const palette = [
      new THREE.Color(0x7ab8ff), // crystal blue
      new THREE.Color(0xffd666), // warm gold
      new THREE.Color(0xc0ff60), // firefly green
      new THREE.Color(0xf0e6d0), // parchment white
    ];

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3;
      positions[i3]     = (Math.random() - 0.5) * 70;
      positions[i3 + 1] = (Math.random() - 0.5) * 50;
      positions[i3 + 2] = (Math.random() - 0.5) * 40;

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i3] = c.r; colors[i3 + 1] = c.g; colors[i3 + 2] = c.b;

      velocities.push({
        x: (Math.random() - 0.5) * 0.015,
        y: (Math.random() - 0.5) * 0.018 + 0.005, // gentle upward float
        z: (Math.random() - 0.5) * 0.01,
      });
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geo, mat);
    scene.add(particles);

    /* ── Mouse Parallax ── */
    let mx = 0, my = 0;
    const onMouse = e => {
      mx = (e.clientX - window.innerWidth / 2) * 0.015;
      my = (e.clientY - window.innerHeight / 2) * 0.015;
    };
    window.addEventListener('mousemove', onMouse);

    const onResize = () => {
      if (!container) return;
      width  = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    /* ── Loop ── */
    let raf;
    const loop = () => {
      const pos = geo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3;
        pos[i3]     += velocities[i].x;
        pos[i3 + 1] += velocities[i].y;
        pos[i3 + 2] += velocities[i].z;

        // Reset if float out of bounds
        if (pos[i3 + 1] > 30) pos[i3 + 1] = -30;
        if (pos[i3] > 35 || pos[i3] < -35) velocities[i].x *= -1;
      }
      geo.attributes.position.needsUpdate = true;

      particles.rotation.y += 0.0004;
      scene.position.x += (mx - scene.position.x) * 0.03;
      scene.position.y += (-my - scene.position.y) * 0.03;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="three-canvas-container" />;
}
