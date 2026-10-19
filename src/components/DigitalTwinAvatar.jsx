import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function DigitalTwinAvatar({ activeModule }) {
  const containerRef = useRef(null);
  const avatarGroupRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 500);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const avatarGroup = new THREE.Group();
    avatarGroupRef.current = avatarGroup;
    scene.add(avatarGroup);

    /* ── 1. Central Particle Humanoid Silhouette ── */
    const PARTICLE_COUNT = 450;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const blueColor = new THREE.Color(0x3b82f6);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      // Define a stylized humanoid form (head sphere, torso cylinder, arms/legs points)
      let x = 0, y = 0, z = 0;
      const part = Math.random();

      if (part < 0.25) {
        // Head sphere
        const u = Math.random();
        const v = Math.random();
        const theta = u * 2.0 * Math.PI;
        const phi = Math.acos(2.0 * v - 1.0);
        const r = 2.2 + Math.random() * 0.4;
        x = r * Math.sin(phi) * Math.cos(theta);
        y = r * Math.sin(phi) * Math.sin(theta) + 5.5;
        z = r * Math.cos(phi);
      } else if (part < 0.7) {
        // Torso cylinder / capsule
        const h = (Math.random() - 0.5) * 8.0;
        const r = (1.0 - Math.abs(h) / 10.0) * 3.0 + Math.random() * 0.5;
        const angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * r;
        y = h;
        z = Math.sin(angle) * r;
      } else {
        // Limbs & outer energy aura
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 4.5;
        x = Math.cos(angle) * radius;
        y = (Math.random() - 0.5) * 14.0;
        z = Math.sin(angle) * radius;
      }

      positions[i3]     = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      const c = Math.random() > 0.3 ? cyanColor : blueColor;
      colors[i3] = c.r; colors[i3 + 1] = c.g; colors[i3 + 2] = c.b;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.35,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const humanoidPoints = new THREE.Points(pGeo, pMat);
    avatarGroup.add(humanoidPoints);

    /* ── 2. Rotating Holographic Scan Rings ── */
    const ringGeo1 = new THREE.TorusGeometry(5.2, 0.04, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x00f0ff, wireframe: true, transparent: true, opacity: 0.6 });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.5;
    avatarGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(7.0, 0.03, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0x3b82f6, wireframe: true, transparent: true, opacity: 0.4 });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3;
    avatarGroup.add(ring2);

    /* ── Mouse Tilt ── */
    let mouseX = 0, mouseY = 0;
    const onMouseMove = e => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.001;
    };
    window.addEventListener('mousemove', onMouseMove);

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', onResize);

    /* ── Animation Loop ── */
    let clock = new THREE.Clock();
    let raf;

    const animate = () => {
      const time = clock.getElapsedTime();

      // Breathing idle animation
      const breath = Math.sin(time * 1.8) * 0.12;
      humanoidPoints.scale.set(1 + breath * 0.05, 1 + breath * 0.08, 1 + breath * 0.05);

      // Rotate scan rings
      ring1.rotation.z = time * 0.4;
      ring2.rotation.z = -time * 0.3;
      ring2.rotation.y = time * 0.2;

      // Mouse inertia tilt
      avatarGroup.rotation.y += (mouseX - avatarGroup.rotation.y) * 0.05;
      avatarGroup.rotation.x += (-mouseY - avatarGroup.rotation.x) * 0.05;

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      if (container && renderer.domElement) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // Target rotation based on active module
  useEffect(() => {
    if (avatarGroupRef.current && activeModule !== null) {
      const targetY = (activeModule * (Math.PI * 2 / 7));
      avatarGroupRef.current.rotation.y = targetY;
    }
  }, [activeModule]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', pointerEvents: 'none' }} />;
}
