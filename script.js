document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. PRELOADER SCREEN (<1.5s EXIT)
  // ==========================================
  const loaderScreen = document.getElementById('loaderScreen');
  const loaderBar = document.getElementById('loaderBar');
  const loaderNum = document.getElementById('loaderNum');

  let loadProgress = 0;
  const loaderInterval = setInterval(() => {
    loadProgress += Math.floor(Math.random() * 15) + 10;
    if (loadProgress >= 100) {
      loadProgress = 100;
      clearInterval(loaderInterval);

      if (loaderBar) loaderBar.style.width = '100%';
      if (loaderNum) loaderNum.textContent = '100%';

      setTimeout(() => {
        if (loaderScreen) loaderScreen.classList.add('hide');
        initHeroAnimations();
        initStorylineAnimations();
      }, 250);
    } else {
      if (loaderBar) loaderBar.style.width = loadProgress + '%';
      if (loaderNum) loaderNum.textContent = loadProgress + '%';
    }
  }, 50);

  setTimeout(() => {
    if (loaderScreen && !loaderScreen.classList.contains('hide')) {
      loaderScreen.classList.add('hide');
      initHeroAnimations();
      initStorylineAnimations();
    }
  }, 1500);

  // ==========================================
  // 2. LENIS SMOOTH SCROLL + GSAP INTEGRATION
  // ==========================================
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // Smooth scroll links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        if (lenis) {
          lenis.scrollTo(targetEl, { offset: -80 });
        } else {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // ==========================================
  // 3. GSAP HERO REVEAL & STORYLINE CHAPTER SCENIC REVEALS
  // ==========================================
  function initHeroAnimations() {
    if (typeof gsap !== 'undefined') {
      const heroTimeline = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1 } });
      heroTimeline
        .from('.badge', { opacity: 0, y: -20, delay: 0.1 })
        .from('.hero-title', { opacity: 0, y: 30 }, '-=0.6')
        .from('.hero-subtitle', { opacity: 0, y: 20 }, '-=0.6')
        .from('.hero-description', { opacity: 0, y: 20 }, '-=0.6')
        .from('.hero-cta .btn', { opacity: 0, y: 20, stagger: 0.15 }, '-=0.6')
        .from('.hero-visual', { opacity: 0, scale: 0.95 }, '-=0.8');
    }
  }

  function initStorylineAnimations() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      const chapters = document.querySelectorAll('section[data-chapter], section#home');
      const chapterColors = {
        'home': '#161426',
        'about': '#18152B',
        'skills': '#1C1630',
        'projects': '#201328',
        'achievements': '#1A1428',
        'education': '#17172A',
        'contact': '#1B132C'
      };

      chapters.forEach((chapter) => {
        const id = chapter.getAttribute('id');

        ScrollTrigger.create({
          trigger: chapter,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => updateChapterState(id),
          onEnterBack: () => updateChapterState(id)
        });

        const revealItems = chapter.querySelectorAll('.reveal-stagger');
        if (revealItems.length > 0) {
          gsap.from(revealItems, {
            scrollTrigger: {
              trigger: chapter,
              start: 'top 78%',
              once: true
            },
            opacity: 0,
            y: 40,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out'
          });
        }
      });

      function updateChapterState(id) {
        if (chapterColors[id]) {
          gsap.to('body', {
            backgroundColor: chapterColors[id],
            duration: 1.2,
            ease: 'power2.out'
          });
        }
      }
    } else {
      const revealObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.reveal-stagger').forEach(el => revealObserver.observe(el));
    }
  }

  // ==========================================
  // 4. ACTIVE NAVIGATION ON SCROLL
  // ==========================================
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
  sections.forEach(section => sectionObserver.observe(section));

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });
  }

  // ==========================================
  // 5. REFINED CUSTOM CURSOR
  // ==========================================
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  const cursorGlow = document.getElementById('cursorGlow');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX, ringY = mouseY;
  let glowX = mouseX, glowY = mouseY;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = mouseX + 'px';
      cursorDot.style.top = mouseY + 'px';
    }
  });

  function animateCursor() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;

    if (cursorRing) {
      cursorRing.style.left = ringX + 'px';
      cursorRing.style.top = ringY + 'px';
    }
    if (cursorGlow) {
      cursorGlow.style.left = glowX + 'px';
      cursorGlow.style.top = glowY + 'px';
    }
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  const interactiveEls = document.querySelectorAll('a, button, .skill-pill, .tag, .bento-item, .project-card-stacked, input');
  interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });

  // ==========================================
  // 6. SCROLL PROGRESS BAR
  // ==========================================
  const scrollProgress = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = progress + '%';
  }, { passive: true });

  // ==========================================
  // 7. CARD SPOTLIGHT LIGHTING EFFECT
  // ==========================================
  const spotlightCards = document.querySelectorAll('.bento-item, .project-card-stacked');
  spotlightCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // ==========================================
  // 8. INTERACTIVE 3D PROJECT TILT
  // ==========================================
  const tiltCards = document.querySelectorAll('.project-card-stacked');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
  });

  // ==========================================
  // 9. MAGNETIC BUTTONS PHYSICS
  // ==========================================
  const magneticBtns = document.querySelectorAll('.btn, .social-link');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.02)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // ==========================================
  // 10. ANIMATED CGPA COUNTER
  // ==========================================
  const cgpaEl = document.getElementById('cgpaCounter');
  if (cgpaEl) {
    const target = parseFloat(cgpaEl.getAttribute('data-target'));
    let started = false;

    const cgpaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started) {
          started = true;
          let start = 0;
          const duration = 1600;
          const step = target / (duration / 16);
          const interval = setInterval(() => {
            start += step;
            if (start >= target) {
              start = target;
              clearInterval(interval);
              cgpaEl.textContent = target.toFixed(2) + ' / 10.0';
            } else {
              cgpaEl.textContent = start.toFixed(2) + ' / 10.0';
            }
          }, 16);
        }
      });
    }, { threshold: 0.5 });
    cgpaObserver.observe(cgpaEl);
  }

  // ==========================================
  // 11. INTERACTIVE HERO CANVAS NODE NETWORK
  // ==========================================
  const canvas = document.getElementById('heroCanvas');
  if (canvas && canvas.parentElement) {
    const ctx = canvas.getContext('2d');
    let width = canvas.width = canvas.parentElement.offsetWidth;
    let height = canvas.height = canvas.parentElement.offsetHeight;

    window.addEventListener('resize', () => {
      if (canvas.parentElement) {
        width = canvas.width = canvas.parentElement.offsetWidth;
        height = canvas.height = canvas.parentElement.offsetHeight;
      }
    });

    const particles = [];
    const particleCount = 35;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 2 + 1,
        color: i % 2 === 0 ? 'rgba(247, 37, 133, ' : 'rgba(157, 78, 221, '
      });
    }

    function renderCanvas() {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.6)';
        ctx.fill();

        for (let j = idx + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(157, 78, 221, ${0.22 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      });

      requestAnimationFrame(renderCanvas);
    }
    renderCanvas();
  }

  // ==========================================
  // 12. FLOATING AI ASSISTANT CHATBOT
  // ==========================================
  const chatTrigger = document.getElementById('chatTrigger');
  const chatWindow = document.getElementById('chatWindow');
  const chatCloseBtn = document.getElementById('chatCloseBtn');
  const chatBody = document.getElementById('chatBody');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const iconChatBtn = document.querySelector('.icon-chat-btn');
  const iconCloseBtn = document.querySelector('.icon-close-btn');
  const suggestionsContainer = document.getElementById('suggestionsContainer');

  const botResponses = {
    about: "Khush Purohit is a B.Tech Computer Science & Engineering student at GLS University (2023–2027) with a CGPA of 9.13. He is an AI & ML enthusiast and full stack developer with a passion for web development and software engineering.",
    skills: "Khush works with:<br>• <strong>Programming</strong>: Python, Java, C/C++, JavaScript, PHP<br>• <strong>Frontend</strong>: HTML, CSS, React.js, Flutter<br>• <strong>Backend</strong>: Node.js, Flask, PHP<br>• <strong>AI & ML</strong>: Machine Learning, NLP, Deep Learning<br>• <strong>Cloud</strong>: AWS, Vercel, Git, Linux, Figma",
    projects: "Khush's key projects:<br><br>1. <strong>CO2 Digital Twin</strong>: 3D CesiumJS dashboard for CO₂ monitoring, SIH 2025.<br><br>2. <strong>Village Craft</strong>: GIS-based 3D village planning simulation, SIH 2024.<br><br>3. <strong>ML Adaptive Digital Twin</strong>: AI threat detection framework — published at IEEE CICON 2026.",
    achievements: "Notable achievements:<br>• <strong>IEEE Publication</strong>: IEEE CICON 2026<br>• <strong>SIH</strong>: 2-Time Finalist & Team Leader (2024, 2025)<br>• <strong>Startup</strong>: PIERC Cohort 9 Pre-Incubation<br>• <strong>Runner-Up</strong>: GLS FET Internal Hackathon (2024 & 2025)<br>• <strong>Top 10</strong>: AU Ingenium 7.0 (2026)<br>• <strong>Organizer</strong>: CyberShadez 2025",
    contact: "Reach Khush at:<br>• <strong>Email</strong>: <a href='mailto:khushpurohit441027@gmail.com' style='color:#F72585;'>khushpurohit441027@gmail.com</a><br>• <strong>LinkedIn</strong>: <a href='https://www.linkedin.com/in/khush-purohit-b8b5722b4?utm_source=share_via&utm_content=profile&utm_medium=member_ios' target='_blank' rel='noopener noreferrer' style='color:#F72585;'>khush-purohit</a><br>• <strong>GitHub</strong>: <a href='https://github.com/KhushPurohit' target='_blank' rel='noopener noreferrer' style='color:#F72585;'>KhushPurohit</a><br>• <strong>Location</strong>: Ahmedabad, Gujarat, India",
    resume: "Download the resume <a href='assets/resume.pdf' target='_blank' download='Khush_Purohit_Resume.pdf' style='color:#F72585;font-weight:600;'>here</a> or click the button in the Hero section!"
  };

  function getFormattedTime() {
    const now = new Date();
    let h = now.getHours(), m = now.getMinutes().toString().padStart(2, '0');
    return `${h % 12 || 12}:${m} ${h >= 12 ? 'PM' : 'AM'}`;
  }

  function toggleChat() {
    const isOpen = chatWindow.classList.contains('open');
    chatWindow.classList.toggle('open', !isOpen);
    if (iconChatBtn) iconChatBtn.classList.toggle('hidden', !isOpen);
    if (iconCloseBtn) iconCloseBtn.classList.toggle('hidden', isOpen);
    if (!isOpen && chatInput) setTimeout(() => chatInput.focus(), 300);
  }

  if (chatTrigger) chatTrigger.addEventListener('click', toggleChat);
  if (chatCloseBtn) chatCloseBtn.addEventListener('click', toggleChat);

  function appendMessage(text, isUser = false) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('message', isUser ? 'message-user' : 'message-assistant');
    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    bubble.innerHTML = text;
    const time = document.createElement('span');
    time.classList.add('message-time');
    time.textContent = getFormattedTime();
    msgDiv.appendChild(bubble);
    msgDiv.appendChild(time);
    chatBody.appendChild(msgDiv);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function showTyping() {
    const div = document.createElement('div');
    div.classList.add('message', 'message-assistant', 'temp-indicator');
    const bubble = document.createElement('div');
    bubble.classList.add('message-bubble');
    bubble.innerHTML = '<div style="display:flex;gap:4px;padding:4px;"><span style="width:6px;height:6px;background:#C4C1D9;border-radius:50%;animation:typing 1.4s infinite ease-in-out -0.32s both;display:inline-block;"></span><span style="width:6px;height:6px;background:#C4C1D9;border-radius:50%;animation:typing 1.4s infinite ease-in-out -0.16s both;display:inline-block;"></span><span style="width:6px;height:6px;background:#C4C1D9;border-radius:50%;animation:typing 1.4s infinite ease-in-out both;display:inline-block;"></span></div>';
    div.appendChild(bubble);
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight;
    return div;
  }

  function getResponse(q) {
    q = q.toLowerCase();
    if (q.match(/about|who|yourself|bio/)) return botResponses.about;
    if (q.match(/skill|tech|python|javascript|react|database|language/)) return botResponses.skills;
    if (q.match(/project|work|twin|village|portfolio/)) return botResponses.projects;
    if (q.match(/achieve|paper|publication|sih|hackathon/)) return botResponses.achievements;
    if (q.match(/contact|email|reach|linkedin/)) return botResponses.contact;
    if (q.match(/resume|cv|download/)) return botResponses.resume;
    return "Try asking about my <strong>projects</strong>, <strong>skills</strong>, <strong>achievements</strong>, or <strong>contact</strong> info!";
  }

  function handleSend(text) {
    if (!text.trim()) return;
    appendMessage(text, true);
    if (suggestionsContainer) { suggestionsContainer.style.opacity = '0.4'; suggestionsContainer.style.pointerEvents = 'none'; }
    const indicator = showTyping();
    setTimeout(() => {
      if (indicator.parentNode) indicator.parentNode.removeChild(indicator);
      appendMessage(getResponse(text));

      if (typeof confetti !== 'undefined' && (text.toLowerCase().includes('contact') || text.toLowerCase().includes('email'))) {
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
      }
    }, 700 + Math.random() * 500);
  }

  if (chatSendBtn && chatInput) {
    chatSendBtn.addEventListener('click', () => { const t = chatInput.value; chatInput.value = ''; handleSend(t); });
    chatInput.addEventListener('keydown', e => { if (e.key === 'Enter') { const t = chatInput.value; chatInput.value = ''; handleSend(t); } });
  }

  document.addEventListener('click', e => {
    if (e.target && e.target.classList.contains('suggest-btn')) {
      handleSend(e.target.textContent);
    }
  });

});

