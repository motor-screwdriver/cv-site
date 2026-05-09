import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import ArrowUpRight from 'lucide-react/dist/esm/icons/arrow-up-right.mjs';
import Bolt from 'lucide-react/dist/esm/icons/bolt.mjs';
import Drill from 'lucide-react/dist/esm/icons/drill.mjs';
import Link2 from 'lucide-react/dist/esm/icons/link-2.mjs';
import Mail from 'lucide-react/dist/esm/icons/mail.mjs';
import Wrench from 'lucide-react/dist/esm/icons/wrench.mjs';
import X from 'lucide-react/dist/esm/icons/x.mjs';
import teamLogo from './assets/team-logo.png';
import photoKirill from './assets/kirill.jpg';
import photoMisha from './assets/misha.jpg';
import photoArsen from './assets/arsen.jpg';
import photoIlya from './assets/ilya.jpg';
import './styles.css';

/** photo: imported image URL or null. Empty link href shows a placeholder state */
const team = [
  {
    initials: 'KE',
    name: 'Kirill Yefimovich',
    role: 'Team Lead · Development',
    photo: photoKirill,
    skills: ['Full-stack & web', 'Languages & frameworks', 'DevOps & cloud', 'Data & tooling'],
    bio:
      'Shapes how the team tells its story—demo flow, framing for judges and partners, and keeping the product narrative coherent from idea to delivery. Focused on clarity and momentum, not on a fixed checklist of tools.',
    prizes: [
      'Huawei TechArena Hackathon — 2nd place',
      'Student of the Year (2×) — outstanding social impact',
      'MTS True Tech Hack — winner, "Best solution on track" nomination',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/lanebo1' },
      { label: 'Telegram', href: 'https://t.me/Cblblblblblp' },
    ],
  },
  {
    initials: 'MT',
    name: 'Mikhail Trifonov',
    role: 'Backend (JVM)',
    photo: photoMisha,
    skills: ['Java & Scala', 'Python', 'Services & APIs', 'Data & messaging', 'Platform engineering'],
    bio:
      'Builds and hardens server-side systems where correctness and throughput matter. Works across the JVM stack and in Python when the task calls for it—services, contracts, and integration—with an eye on predictable behavior under load. At work he contributes to building a Data Platform.',
    prizes: [
      'Huawei TechArena Hackathon — 2nd place',
      'MTS True Tech Hack — winner, "Best solution on track" nomination',
      'Student of the Year — outstanding social impact',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/LuminiteTime' },
      { label: 'Telegram', href: 'https://t.me/LuminiteTime' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mikhailtrifonov28/' },
    ],
  },
  {
    initials: 'AG',
    name: 'Arsen Galiev',
    role: 'Cybersecurity · Blue team',
    photo: photoArsen,
    skills: ['AppSec & DevSecOps', 'Full-stack delivery', 'Detection & analytics', 'Automation'],
    bio:
      'Cybersecurity specialist who spends a lot of time in CTFs and on the defensive side: primarily blue-team work, forensics, and making sense of artifacts and telemetry so the team can respond with confidence—not guesswork.',
    prizes: [
      'Cyber Battle URFU CTF — winner (blue team)',
      'CTF “The Secret of the Third Capital” — 1st place in the Republic of Tatarstan',
      'BEZUMhack 2.0 — winner',
      'Student of the Year (2×) — outstanding social impact',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/projacktor' },
      { label: 'Telegram', href: 'https://t.me/rosehipbloom' },
    ],
  },
  {
    initials: 'IN',
    name: 'Ilya-Linh Nguyen',
    role: 'DevOps',
    photo: photoIlya,
    skills: ['Deploy', 'CI/CD', 'Monitoring', 'Linux', 'Docker', 'Kubernetes', 'IaC'],
    bio:
      'DevOps engineer—owns the path from commit to running systems: pipelines, observability, Linux hosts, containers, clusters, and infrastructure-as-code, so the team can ship and roll back without drama.',
    prizes: [
      'MTS True Tech Hack — winner, "Best solution on track" nomination',
      'Cyber Battle URFU CTF — winner (blue team)',
      'VNEDREID Hackathon — finalist',
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/ilyalinhnguyen' },
      { label: 'Telegram', href: 'https://t.me/pickpusha' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ilya-linh-nguyen/' },
    ],
  },
];

const BRAND_FIRST = 'motor';
const BRAND_SECOND = 'screwdriver';

function TypewriterBrand() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  /** block1 | block2: block caret while typing; ul1 | ul2: underline blink on pause / erase */
  const [caret, setCaret] = useState('');
  const timeoutsRef = useRef([]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setLine1(BRAND_FIRST);
      setLine2(BRAND_SECOND);
      setCaret('');
      return undefined;
    }

    const full1 = BRAND_FIRST;
    const full2 = BRAND_SECOND;
    let stopped = false;

    const later = (fn, ms) => {
      const id = window.setTimeout(() => {
        timeoutsRef.current = timeoutsRef.current.filter((t) => t !== id);
        if (!stopped) fn();
      }, ms);
      timeoutsRef.current.push(id);
    };

    function stepType1(i) {
      if (stopped) return;
      if (i === 0) {
        setLine1('');
        setLine2('');
        setCaret('block1');
      }
      if (i < full1.length) {
        setLine1(full1.slice(0, i + 1));
        later(() => stepType1(i + 1), 68);
        return;
      }
      setCaret('block2');
      stepType2(0);
    }

    function stepType2(j) {
      if (stopped) return;
      if (j < full2.length) {
        setLine2(full2.slice(0, j + 1));
        later(() => stepType2(j + 1), 52);
        return;
      }
      setCaret('ul2');
      const pauseMs = 5000 + Math.random() * 5000;
      later(() => stepErase2(full2.length), pauseMs);
    }

    function stepErase2(len) {
      if (stopped) return;
      if (len > 0) {
        setLine2(full2.slice(0, len - 1));
        later(() => stepErase2(len - 1), 38);
        return;
      }
      setCaret('ul1');
      stepErase1(full1.length);
    }

    function stepErase1(len) {
      if (stopped) return;
      if (len > 0) {
        setLine1(full1.slice(0, len - 1));
        later(() => stepErase1(len - 1), 42);
        return;
      }
      setCaret('');
      later(() => stepType1(0), 400);
    }

    stepType1(0);

    return () => {
      stopped = true;
      timeoutsRef.current.forEach((tid) => window.clearTimeout(tid));
      timeoutsRef.current = [];
    };
  }, []);

  return (
    <h1
      id="hero-title"
      className="hero__title hero__title--type"
      translate="no"
      aria-label="motorscrewdriver"
    >
      <span className="hero__title-line">
        {line1}
        {caret === 'block1' ? <span className="typewriter-cursor" aria-hidden="true" /> : null}
        {caret === 'ul1' ? <span className="typewriter-caret-underline" aria-hidden="true" /> : null}
      </span>
      <span className="hero__title-line">
        {line2}
        {caret === 'block2' ? <span className="typewriter-cursor" aria-hidden="true" /> : null}
        {caret === 'ul2' ? <span className="typewriter-caret-underline" aria-hidden="true" /> : null}
      </span>
    </h1>
  );
}

function HeroToolDecor() {
  const reduceMotion = useReducedMotion();

  const floatTransition = { duration: 3.2, repeat: Infinity, ease: 'easeInOut' };

  return (
    <div className="hero-tools" aria-hidden="true">
      <motion.span
        className="hero-tools__cell"
        animate={reduceMotion ? undefined : { y: [0, -6, 0], rotate: [-2, 4, -2] }}
        transition={floatTransition}
      >
        <Drill className="hero-tools__icon" strokeWidth={1.65} size={36} />
      </motion.span>
      <motion.span
        className="hero-tools__cell hero-tools__cell--pulse"
        animate={reduceMotion ? undefined : { scale: [1, 1.08, 1], opacity: [0.85, 1, 0.85] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Bolt className="hero-tools__icon" strokeWidth={1.65} size={34} />
      </motion.span>
      <motion.span
        className="hero-tools__cell"
        animate={reduceMotion ? undefined : { rotate: [0, 16, -10, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Wrench className="hero-tools__icon hero-tools__icon--wrench" strokeWidth={1.65} size={32} />
      </motion.span>
    </div>
  );
}

function Particles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particles = [];
    let width = 0;
    let height = 0;
    let frameId = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const createParticles = () => {
      particles.length = 0;
      const count = Math.min(56, Math.floor((window.innerWidth * window.innerHeight) / 22000));
      for (let index = 0; index < count; index += 1) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.26,
          vy: (Math.random() - 0.5) * 0.26,
          size: Math.random() * 1.4 + 0.45,
          red: Math.random() > 0.76,
        });
      }
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        particle.x += particle.vx;
        particle.y += particle.vy;
        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;
        context.beginPath();
        context.fillStyle = particle.red ? 'rgba(255, 122, 0, 0.55)' : 'rgba(120, 118, 110, 0.18)';
        context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        context.fill();
        for (let next = index + 1; next < particles.length; next += 1) {
          const other = particles[next];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distance = Math.hypot(dx, dy);
          if (distance < 100) {
            context.strokeStyle = `rgba(255, 122, 0, ${0.08 * (1 - distance / 100)})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(particle.x, particle.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }
      }
      if (!reducedMotion) frameId = window.requestAnimationFrame(draw);
    };

    const initialize = () => {
      resize();
      createParticles();
      draw();
    };
    initialize();
    window.addEventListener('resize', initialize, { passive: true });
    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', initialize);
    };
  }, []);

  return <canvas className="particles" ref={canvasRef} aria-hidden="true" />;
}

function CursorTrail() {
  const trailRef = useRef(null);
  const pointsRef = useRef([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const trail = trailRef.current;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    if (reducedMotion || window.matchMedia('(pointer: coarse)').matches) {
      trail.hidden = true;
      return undefined;
    }

    const onPointerMove = (event) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      pointsRef.current.unshift({ x: pointer.x, y: pointer.y, life: 1 });
      pointsRef.current = pointsRef.current.slice(0, 12);
    };

    const render = () => {
      const segments = pointsRef.current
        .map((point, index) => {
          point.life -= 0.04;
          const size = Math.max(4, 20 - index * 1.2);
          return `radial-gradient(circle ${size}px at ${point.x}px ${point.y}px, rgba(255,122,0,${Math.max(point.life, 0) * 0.14}), transparent 72%)`;
        })
        .filter(Boolean);
      trail.style.background = segments.join(',');
      pointsRef.current = pointsRef.current.filter((point) => point.life > 0);
      frameRef.current = window.requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    frameRef.current = window.requestAnimationFrame(render);
    return () => {
      window.cancelAnimationFrame(frameRef.current);
      window.removeEventListener('pointermove', onPointerMove);
    };
  }, []);

  return <div className="cursor-trail" ref={trailRef} aria-hidden="true" />;
}

function FaceThumb({ member, onOpen }) {
  return (
    <button
      type="button"
      className="hero-face"
      style={{ '--face-shift': `${(member.initials.codePointAt(0) % 5) * 11}deg` }}
      onClick={() => onOpen(member)}
      aria-haspopup="dialog"
      aria-label={`Open profile: ${member.name}`}
    >
      <span className="hero-face__ring">
        {member.photo ? (
          <img src={member.photo} alt="" className="hero-face__img" />
        ) : (
          <span className="hero-face__ph" aria-hidden="true">
            <span className="hero-face__ini">{member.initials}</span>
          </span>
        )}
      </span>
      <span className="hero-face__cap">{member.name.split(' ')[0]}</span>
    </button>
  );
}

function MemberModal({ member, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = window.requestAnimationFrame(() => closeRef.current?.focus());
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.cancelAnimationFrame(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [member, onClose]);

  return (
    <motion.div
      className="modal-root"
      role="presentation"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <motion.article
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-member-name"
        className="modal-card"
        initial={{ opacity: 0, y: 28, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.96 }}
        transition={{ duration: 0.22, ease: [0.2, 0.8, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <X size={20} strokeWidth={2.25} aria-hidden="true" />
        </button>

        <div className="modal-card__grid">
          <div className="modal-card__aside">
            <div className="modal-card__photo-ring">
              {member.photo ? (
                <img src={member.photo} alt="" />
              ) : (
                <div className="modal-card__photo-ph" aria-hidden="true">
                  <span>{member.initials}</span>
                </div>
              )}
            </div>
          </div>

          <div className="modal-card__main">
            <h2 id="modal-member-name" className="modal-card__name">
              {member.name}
            </h2>
            <p className="modal-card__role">{member.role}</p>
            <p className="modal-card__bio">{member.bio}</p>

            <p className="modal-card__label">Stack</p>
            <ul className="modal-chips">
              {member.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>

            <p className="modal-card__label">Awards & milestones</p>
            <ul className="modal-prizes">
              {member.prizes.map((row, index) => (
                <li key={`${member.name}-prize-${index}`}>{row}</li>
              ))}
            </ul>

            <p className="modal-card__label">Links</p>
            <div className="modal-links">
              {member.links.map(({ label, href }) =>
                href ? (
                  <a key={label} className="modal-link" href={href} target="_blank" rel="noreferrer">
                    <Link2 size={14} aria-hidden="true" /> {label}
                  </a>
                ) : (
                  <span key={label} className="modal-link modal-link--empty">
                    <Link2 size={14} aria-hidden="true" /> {label}
                    <small>add URL</small>
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
}

function App() {
  const [openMember, setOpenMember] = useState(null);

  return (
    <>
      <Particles />
      <CursorTrail />
      <a className="skip-link" href="#content">Skip to content</a>

      <header className="topbar">
        <a href="#top" className="brand" translate="no">motorscrewdriver</a>
        <nav aria-label="Primary">
          <a href="#team">Team</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="content">
        <section className="hero hero--compact" id="top" aria-labelledby="hero-title">
          <div className="hero__brand-row">
            <div className="hero-brand-mark">
              <img
                src={teamLogo}
                alt="MOTORSCREWDRIVER team logo — power drill with motor piston and flames"
                className="hero-brand-mark__img"
                width={800}
                height={800}
                decoding="async"
              />
            </div>
            <div className="hero__intro-side">
              <div className="hero-typewriter-slot">
                <TypewriterBrand />
              </div>
              <div className="hero-tools-row">
                <HeroToolDecor />
              </div>
              <p className="hero__lede">
                <strong className="hero__lede-tagline">Powered by ideas. Driven by engineering.</strong>
                <span className="hero__lede-line">Motorscrewdriver team — we make things work.</span>
              </p>
            </div>
          </div>

          <div className="hero-team" id="team">
            {team.map((m) => (
              <FaceThumb key={m.name} member={m} onOpen={setOpenMember} />
            ))}
          </div>
        </section>

        <section className="contact-strip" id="contact" aria-labelledby="contact-heading">
          <div className="contact-strip__inner">
            <h2 id="contact-heading" className="contact-strip__h">Contact</h2>
            <p className="contact-strip__text">
              For briefs, timelines, and how we might fit, write to the shared address below—we will reply, clarify the
              request, and suggest who on the team is the best match and how to collaborate.
            </p>
            <div className="contact-strip__actions">
              <a className="button primary" href="mailto:motorscrewdriver@gmail.com">
                <Mail size={18} aria-hidden="true" /> motorscrewdriver@gmail.com
              </a>
              <a className="button" href="#top">
                <ArrowUpRight size={18} aria-hidden="true" /> Back to top
              </a>
            </div>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {openMember ? (
          <MemberModal key={openMember.name} member={openMember} onClose={() => setOpenMember(null)} />
        ) : null}
      </AnimatePresence>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
