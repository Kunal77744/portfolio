"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import dynamic from "next/dynamic";

const LottiePlayer = dynamic(() => import("@/components/lottie-player"), {
  ssr: false,
});

interface SkillItem {
  name: string;
  slug: string;
  category: string;
}

const SKILLS: SkillItem[] = [
  { name: "React.js", slug: "react", category: "Frontend" },
  { name: "Tailwind CSS", slug: "tailwindcss", category: "Frontend" },
  { name: "Node.js", slug: "nodedotjs", category: "Backend" },
  { name: "Express.js", slug: "express", category: "Backend" },
  { name: "MongoDB", slug: "mongodb", category: "Database" },
  { name: "SQL", slug: "mysql", category: "Database" },
  { name: "JavaScript", slug: "javascript", category: "Language" },
  { name: "Python", slug: "python", category: "Language" },
  { name: "C++", slug: "cplusplus", category: "Language" },
  { name: "DSA", slug: "leetcode", category: "Practice" },
  { name: "Git / GitHub", slug: "git", category: "Tooling" },
  { name: "Postman", slug: "postman", category: "Tooling" },
  { name: "Netlify", slug: "netlify", category: "Deployment" },
  { name: "Vercel", slug: "vercel", category: "Deployment" },
  { name: "Render", slug: "render", category: "Deployment" },
  { name: "Gemini API", slug: "googlegemini", category: "AI" }
];

interface Project {
  num: string;
  title: string;
  desc: string;
  demoUrl?: string;
  githubUrl?: string;
  badges: string[];
}

const PROJECTS: Project[] = [
  {
    num: "Project 01",
    title: "EcoTrace — Carbon Emission Tracker",
    desc: "A sustainability-focused MERN application that lets users log activity and visualize their estimated carbon footprint over time — full CRUD, auth, interactive dashboards and data visualization.",
    demoUrl: "https://ecotrace-mu.vercel.app",
    githubUrl: "https://github.com/mern2026book-cmd/CarbonEmission",
    badges: ["react", "nodedotjs", "express", "mongodb"]
  },
  {
    num: "Project 02",
    title: "Bookify — Full-Stack E-Commerce Platform",
    desc: "A full-stack bookstore built on the MERN stack with REST APIs for inventory, user management and order processing — including search, category filtering, and a working shopping cart.",
    githubUrl: "https://github.com/Kunal77744/Shopify",
    badges: ["react", "express", "mongodb"]
  },
  {
    num: "Project 03",
    title: "AI Study Buddy",
    desc: "An AI-powered study companion built for the IBM SkillsBuild / Edunet Foundation capstone — Gemini 2.5 Flash handles reasoning, Streamlit handles the interface.",
    githubUrl: "https://github.com/Kunal77744/AI-Study-Buddy",
    badges: ["python", "streamlit", "googlegemini"]
  }
];

interface PathwayStep {
  year: string;
  title: string;
  desc: string;
  tags: string[];
}

const PATHWAY: PathwayStep[] = [
  {
    year: "2026 — ongoing",
    title: "Hackathon Builder, Team KD_ByteBusters",
    desc: "Competing in the Redrob INDIA.RUNS Hackathon. Built a fully offline, CPU-only candidate-ranking pipeline for 100K profiles (Track 1), and currently producing content for the Social Media track across Reels, LinkedIn posts, and a long-form article.",
    tags: ["Python", "Pipeline Design", "Hack2Skill"]
  },
  {
    year: "2025 — 2026",
    title: "AI-Powered Study Buddy — IBM SkillsBuild / Edunet Foundation",
    desc: "Built an AI study companion using Streamlit and Gemini 2.5 Flash as a capstone for the internship program, shipping it as a working app with a full presentation deck.",
    tags: ["Streamlit", "Gemini API", "Python"]
  },
  {
    year: "2024 — 2026",
    title: "MCA, University School of ICT (USICT) — GGSIPU",
    desc: "Built a working knowledge of the MERN stack through projects, alongside coursework — with a steady focus on DSA and interview-readiness for service-based IT roles.",
    tags: ["MERN", "DSA", "Self-taught"]
  }
];

const renderProjectVisual = (num: string) => {
  if (num === "Project 01") {
    return (
      <div className="mockup-browser">
        <div className="mockup-header">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
          <span className="mockup-title">ecotrace-dashboard</span>
        </div>
        <div className="mockup-body dashboard-mockup">
          <div className="mockup-stat-row">
            <div className="mockup-stat">
              <span className="lbl">Carbon</span>
              <span className="val">2.4 t</span>
            </div>
            <div className="mockup-stat">
              <span className="lbl">Trend</span>
              <span className="val trend-down">↓ 18%</span>
            </div>
          </div>
          <div className="mockup-chart">
            <svg viewBox="0 0 100 30" className="chart-svg">
              <path d="M0,25 Q25,10 50,15 T100,5" fill="none" stroke="var(--accent)" strokeWidth="2" />
              <circle cx="100" cy="5" r="2" fill="var(--accent)" />
            </svg>
          </div>
        </div>
      </div>
    );
  }
  if (num === "Project 02") {
    return (
      <div className="mockup-browser">
        <div className="mockup-header">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
          <span className="mockup-title">bookify-store</span>
        </div>
        <div className="mockup-body store-mockup">
          <div className="store-header">
            <span className="store-logo">Bookify</span>
            <span className="cart-badge">🛒 3</span>
          </div>
          <div className="store-grid">
            <div className="book-card">
              <span className="book-title">MERN Stack</span>
              <span className="book-btn">Add</span>
            </div>
            <div className="book-card">
              <span className="book-title">React UI</span>
              <span className="book-btn">Add</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (num === "Project 03") {
    return (
      <div className="mockup-browser">
        <div className="mockup-header">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
          <span className="mockup-title">study-buddy-ai</span>
        </div>
        <div className="mockup-body chat-mockup">
          <div className="chat-msg user">
            <p>Explain Trie</p>
          </div>
          <div className="chat-msg ai">
            <div className="ai-nodes">
              <span className="node node-root"></span>
              <span className="node-line l1"></span>
              <span className="node node-child1"></span>
              <span className="node-line l2"></span>
              <span className="node node-child2"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function Home() {
  // Form and utility states
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [copied, setCopied] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ loading: boolean; success: boolean; error: string | null }>({
    loading: false,
    success: false,
    error: null
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    // Map id to state keys
    const fieldMap: Record<string, string> = { cname: "name", cemail: "email", cmsg: "message" };
    const fieldName = fieldMap[id] || id;
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("deshmukhkunal813@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: null });
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setSubmitStatus({ loading: false, success: true, error: null });
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setSubmitStatus(prev => ({ ...prev, success: false }));
        }, 3000);
      } else {
        setSubmitStatus({ loading: false, success: false, error: result.error || 'Failed to send message.' });
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus({ loading: false, success: false, error: 'Something went wrong. Please check your network and try again.' });
    }
  };

  useEffect(() => {
    // 1. Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // 2. Loader progress bar simulation
    let p = 0;
    const bar = document.getElementById("loaderbar");
    const pct = document.getElementById("loaderpct");
    const loader = document.getElementById("loader");

    const iv = setInterval(() => {
      p += Math.random() * 18;
      if (p >= 100) {
        p = 100;
        clearInterval(iv);
      }
      if (bar) bar.style.width = p + "%";
      if (pct) pct.textContent = String(Math.floor(p)).padStart(2, "0") + "%";

      if (p === 100) {
        gsap.to("#loader", {
          opacity: 0,
          duration: 0.6,
          delay: 0.3,
          ease: "power2.out",
          onComplete() {
            if (loader) loader.style.display = "none";
            introAnim();
          },
        });
      }
    }, 110);

    // 3. Lenis scroll setup
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const updateScrollTrigger = () => ScrollTrigger.update();
    lenis.on("scroll", updateScrollTrigger);

    const tickerHandler = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerHandler);
    gsap.ticker.lagSmoothing(0);

    // 4. Intro animations
    function introAnim() {
      gsap.to(".hero h1 .line span", {
        y: "0%",
        duration: 1,
        ease: "power4.out",
        stagger: 0.09,
      });
      gsap.to(".hero .eyebrow, .hero-sub, .hero-actions, .hero-lottie, .status-panel", {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        delay: 0.25,
      });
    }
    gsap.set(".hero .eyebrow, .hero-sub, .hero-actions, .hero-lottie, .status-panel", {
      opacity: 0,
      y: 20,
    });

    // 5. Scroll Trigger batch reveal for `.reveal` components
    const revealTriggers: gsap.core.Tween[] = [];
    document.querySelectorAll(".reveal").forEach((el) => {
      const t = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      });
      revealTriggers.push(t);
    });

    // 6. Anchor scroll bindings using Lenis
    const anchors = document.querySelectorAll('a[href^="#"]');
    const anchorHandlers = new Map<Element, (e: Event) => void>();

    anchors.forEach((a) => {
      const handler = (e: Event) => {
        const id = a.getAttribute("href");
        if (id && id.length > 1) {
          e.preventDefault();
          const target = document.querySelector(id);
          if (target) lenis.scrollTo(target as HTMLElement, { offset: -20 });
        }
      };
      a.addEventListener("click", handler);
      anchorHandlers.set(a, handler);
    });

    const backTop = document.getElementById("backTop");
    const backTopHandler = () => lenis.scrollTo(0);
    if (backTop) {
      backTop.addEventListener("click", backTopHandler);
    }

    // 7. Glow backdrop following mouse coordinates (Lerp 12%)
    const glow = document.getElementById("glow");
    let gx = 0, gy = 0, cx = 0, cy = 0;

    const handleMouseMoveGlow = (e: MouseEvent) => {
      gx = e.clientX;
      gy = e.clientY;
      if (glow) glow.style.opacity = "1";
    };

    const handleMouseLeaveGlow = () => {
      if (glow) glow.style.opacity = "0";
    };

    window.addEventListener("mousemove", handleMouseMoveGlow);
    window.addEventListener("mouseleave", handleMouseLeaveGlow);

    let glowLoopId: number;
    function glowLoop() {
      cx += (gx - cx) * 0.12;
      cy += (gy - cy) * 0.12;
      if (glow) {
        glow.style.left = cx + "px";
        glow.style.top = cy + "px";
      }
      glowLoopId = requestAnimationFrame(glowLoop);
    }
    glowLoop();

    // 8. Custom cursor following mouse (GSAP dur:0.15)
    const cursor = document.getElementById("cursor");
    const handleMouseMoveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: "power2.out",
      });
    };
    window.addEventListener("mousemove", handleMouseMoveCursor);

    const cursorHoverables = document.querySelectorAll(
      "a, button, [data-tilt], .magnetic"
    );
    const hoverEnterHandler = () => cursor?.classList.add("ring");
    const hoverLeaveHandler = () => cursor?.classList.remove("ring");

    cursorHoverables.forEach((el) => {
      el.addEventListener("mouseenter", hoverEnterHandler);
      el.addEventListener("mouseleave", hoverLeaveHandler);
    });

    // 9. Active navigation link state on scroll
    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("main section, .hero");
    const batch = ScrollTrigger.batch(sections, {
      onEnter: (els) =>
        els.forEach((el) => {
          const id = "#" + el.id;
          navLinks.forEach((l) =>
            l.classList.toggle("active", l.getAttribute("href") === id)
          );
        }),
      start: "top center",
    });

    // 10. Magnetic wiggles
    const magneticElements = document.querySelectorAll(".magnetic");
    const magneticMoveHandlers = new Map<Element, (e: Event) => void>();
    const magneticLeaveHandlers = new Map<Element, () => void>();

    magneticElements.forEach((el) => {
      const moveHandler = (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const r = el.getBoundingClientRect();
        const mx = mouseEvent.clientX - r.left - r.width / 2;
        const my = mouseEvent.clientY - r.top - r.height / 2;
        gsap.to(el, { x: mx * 0.2, y: my * 0.3, duration: 0.4, ease: "power3.out" });
      };
      const leaveHandler = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      };
      el.addEventListener("mousemove", moveHandler);
      el.addEventListener("mouseleave", leaveHandler);
      magneticMoveHandlers.set(el, moveHandler);
      magneticLeaveHandlers.set(el, leaveHandler);
    });

    // 11. Additional Premium Animations (from portfolio_10)
    const progressTween = gsap.to('#progress', {
      width: '100%',
      ease: 'none',
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true
      }
    });

    const titleTriggers: gsap.core.Tween[] = [];
    document.querySelectorAll('.sec-title').forEach(el => {
      const t = gsap.to(el, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%'
        }
      });
      titleTriggers.push(t);
    });

    const visualTriggers: gsap.core.Tween[] = [];
    document.querySelectorAll('.proj-visual').forEach(el => {
      const t = gsap.to(el, {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%'
        }
      });
      visualTriggers.push(t);
    });

    const parallaxTween = gsap.to('.status-panel', {
      y: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    // Staggered scroll batch reveals for skills and credentials
    gsap.set('.skill-tile, .creds-item', { opacity: 0, y: 16 });
    const skillBatch = ScrollTrigger.batch('.skill-tile', {
      start: 'top 92%',
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.05 })
    });
    const credsBatch = ScrollTrigger.batch('.creds-item', {
      start: 'top 92%',
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.04 })
    });

    // Cleanup all event listeners, timers, and animation frames on component unmount
    return () => {
      clearInterval(iv);
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(glowLoopId);
      lenis.off("scroll", updateScrollTrigger);
      gsap.ticker.remove(tickerHandler);
      lenis.destroy();

      window.removeEventListener("mousemove", handleMouseMoveGlow);
      window.removeEventListener("mouseleave", handleMouseLeaveGlow);
      window.removeEventListener("mousemove", handleMouseMoveCursor);

      anchors.forEach((a) => {
        const handler = anchorHandlers.get(a);
        if (handler) a.removeEventListener("click", handler);
      });

      if (backTop) {
        backTop.removeEventListener("click", backTopHandler);
      }

      cursorHoverables.forEach((el) => {
        el.removeEventListener("mouseenter", hoverEnterHandler);
        el.removeEventListener("mouseleave", hoverLeaveHandler);
      });

      batch.forEach((b) => b.kill());
      revealTriggers.forEach((t) => t.kill());
      progressTween.kill();
      parallaxTween.kill();
      titleTriggers.forEach(t => t.kill());
      visualTriggers.forEach(t => t.kill());
      skillBatch.forEach(b => b.kill());
      credsBatch.forEach(b => b.kill());
      ScrollTrigger.getAll().forEach((t) => t.kill());

      magneticElements.forEach((el) => {
        const move = magneticMoveHandlers.get(el);
        const leave = magneticLeaveHandlers.get(el);
        if (move) el.removeEventListener("mousemove", move);
        if (leave) el.removeEventListener("mouseleave", leave);
      });
    };
  }, []);

  return (
    <>
      <div id="progress"></div>
      <div id="glow"></div>
      <div id="grain"></div>
      <div id="cursor"></div>

      <div id="loader">
        <div className="symbol">Initializing portfolio</div>
        <div className="bar">
          <span id="loaderbar"></span>
        </div>
        <div className="pct" id="loaderpct">
          00%
        </div>
      </div>

      <header>
        <a href="#top" className="logo">
          kunal<span>.</span>dev
        </a>
        <nav>
          <ul>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#experience">Experience</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
            <li>
              <a href="#credentials">Credentials</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </header>

      <main id="top">
        <section className="hero" style={{ borderTop: "none" }}>
          <div className="wrap">
            <div className="hero-grid">
              <div>
                <div className="eyebrow">
                  <span className="dot"></span> Available for full-time roles · Delhi, IN
                </div>
                <h1>
                  <div className="line">
                    <span>I build</span>
                  </div>
                  <div className="line">
                    <span>full&nbsp;stack</span>
                  </div>
                  <div className="line">
                    <span>
                      products that <em>ship</em>.
                    </span>
                  </div>
                </h1>
                <p className="hero-sub">
                  I&apos;m <strong>Kunal Deshmukh</strong> — an MCA graduate from USICT, GGSIPU,
                  building production MERN applications and competing in hackathons and competitive
                  programming on the side.
                </p>
                <div className="hero-actions">
                  <a href="#projects" className="btn primary magnetic">
                    <span>View Projects</span>
                    <span className="arrow">→</span>
                  </a>
                  <a href="/resume.pdf" download className="btn magnetic">
                    <span>Download CV</span>
                  </a>
                  <a href="#contact" className="btn magnetic">
                    <span>Get in touch</span>
                  </a>
                </div>
              </div>

              <div>
                <div className="hero-lottie" style={{ height: "200px", marginBottom: "24px", display: "flex", justifyContent: "center", overflow: "hidden" }}>
                  <LottiePlayer src="/boy-laptop.lottie" />
                </div>
                <div className="status-panel magnetic">
                  <div className="status-bigname">Kunal Deshmukh</div>
                  <div className="status-divider"></div>
                  <div className="status-row">
                    <span className="k">Role</span>
                    <span className="v">MERN / Full Stack Dev</span>
                  </div>
                  <div className="status-row">
                    <span className="k">Status</span>
                    <span className="v accent">● Open to work</span>
                  </div>
                  <div className="status-row">
                    <span className="k">Based in</span>
                    <span className="v">Delhi, India</span>
                  </div>
                  <div className="status-row">
                    <span className="k">Currently</span>
                    <span className="v">Redrob Hackathon</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="scroll-cue">
            <div className="stick">
              <span></span>
            </div>{" "}
            Scroll
          </div>
        </section>

        <section id="about">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <span className="sec-label">01 / About</span>
                <h2 className="sec-title">
                  Self-taught, project-first, and a little obsessed with shipping.
                </h2>
              </div>
              <p className="sec-note">Fewer tutorials. More deployed apps.</p>
            </div>

            <div className="about-grid">
              <div className="about-text reveal">
                <p>
                  I completed my <strong>MCA at USICT, GGSIPU</strong> and have been building the{" "}
                  <strong>MERN stack</strong> through real projects rather than waiting on coursework
                  — closing gaps in JS fundamentals along the way by just building.
                </p>
                <p>
                  Outside of job hunting, I spend most of my time in{" "}
                  <strong>competitive programming</strong> and <strong>hackathons</strong> —
                  currently building as part of <strong>Team KD_ByteBusters</strong> for the Redrob
                  INDIA.RUNS Hackathon.
                </p>
                <p>
                  I&apos;m currently targeting <strong>Full Stack / MERN Developer</strong> roles at
                  service-based IT companies, with TCS NQT already cleared and applications active
                  on Naukri and LinkedIn.
                </p>
              </div>

              <div className="stat-grid reveal">
                <div className="stat">
                  <div className="n">
                    2<span>+</span>
                  </div>
                  <div className="l">Deployed Full-stack Apps</div>
                </div>
                <div className="stat">
                  <div className="n">
                    336<span>th</span>
                  </div>
                  <div className="l">/ 33,663 — Prompt War 3</div>
                </div>
                <div className="stat">
                  <div className="n">
                    Top 1<span>%</span>
                  </div>
                  <div className="l">Competitive Ranking</div>
                </div>
                <div className="stat">
                  <div className="n">
                    TCS<span> NQT</span>
                  </div>
                  <div className="l">Cleared</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <span className="sec-label">02 / Skills</span>
                <h2 className="sec-title">What I actually build with.</h2>
              </div>
              <p className="sec-note">No progress bars — just the stack, grouped by use.</p>
            </div>

            <div className="marquee reveal">
              <div className="marquee-track">
                {[...SKILLS, ...SKILLS].map((skill, index) => (
                  <div key={index} className="marquee-item">
                    <img
                      src={`https://cdn.simpleicons.org/${skill.slug}/ffffff`}
                      alt={skill.name}
                    />
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="skill-grid reveal">
              {SKILLS.map((skill, index) => (
                <div key={index} className="skill-tile">
                  <img
                    src={`https://cdn.simpleicons.org/${skill.slug}/ffffff`}
                    alt=""
                  />
                  <div className="txt">
                    <div className="lbl">{skill.category}</div>
                    <div className="name">{skill.name}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="experience">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <span className="sec-label">03 / Experience</span>
                <h2 className="sec-title">Where the work has actually been.</h2>
              </div>
              <p className="sec-note">Most recent first.</p>
            </div>

            <div className="pathway reveal">
              {PATHWAY.map((step, index) => (
                <div key={index} className="path-step active">
                  <div className="path-meta">
                    <span className="y">{step.year}</span>
                  </div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                  <div className="path-tags">
                    {step.tags.map((tag, tIndex) => (
                      <span key={tIndex} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <span className="sec-label">04 / Projects</span>
                <h2 className="sec-title">Things I&apos;ve built and shipped.</h2>
              </div>
              <p className="sec-note">Live, deployed, and on GitHub.</p>
            </div>

            <div className="reveal">
              {PROJECTS.map((proj, index) => (
                <div key={index} className="proj">
                  <div>
                    <div className="proj-num">{proj.num}</div>
                    <h3>{proj.title}</h3>
                    <p>{proj.desc}</p>
                    
                    <div className="project-tags">
                      {proj.badges.map((badge, bIndex) => (
                        <span key={bIndex} className="tag-badge">
                          {badge === "nodedotjs"
                            ? "Node.js"
                            : badge === "googlegemini"
                            ? "Gemini API"
                            : badge.charAt(0).toUpperCase() + badge.slice(1)}
                        </span>
                      ))}
                    </div>

                    <div className="proj-links">
                      {proj.demoUrl && (
                        <a href={proj.demoUrl} target="_blank" rel="noopener noreferrer">
                          Live Demo ↗
                        </a>
                      )}
                      {proj.githubUrl && (
                        <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer">
                          GitHub ↗
                        </a>
                      )}
                    </div>
                  </div>
                  <div className="proj-visual">
                    {renderProjectVisual(proj.num)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="credentials">
          <div className="wrap">
            <div className="sec-head reveal">
              <div>
                <span className="sec-label">05 / Credentials</span>
                <h2 className="sec-title">Education, certifications, and a few wins.</h2>
              </div>
              <p className="sec-note">The paper trail behind the projects.</p>
            </div>

            <div className="creds-grid reveal">
              <div className="creds-col">
                <h4>Education</h4>
                <div className="creds-item">
                  <div className="ct">Master of Computer Applications (MCA)</div>
                  <span className="cs">USICT, GGSIPU · 2024–2026 · CGPA 7.01/10</span>
                </div>
                <div className="creds-item">
                  <div className="ct">Bachelor of Science (B.Sc.)</div>
                  <span className="cs">Institute for Excellence in Higher Education, Bhopal · 2019–2022</span>
                </div>
              </div>

              <div className="creds-col">
                <h4>Certifications</h4>
                <div className="creds-item">
                  <div className="ct">IBM SkillsBuild — Front-End Web Development</div>
                  <span className="cs">Project Based Learning Program</span>
                </div>
                <div className="creds-item">
                  <div className="ct">Tata GenAI Powered Data Analytics</div>
                  <span className="cs">Job Simulation · Forage</span>
                </div>
                <div className="creds-item">
                  <div className="ct">Cisco CyberOps Associate</div>
                  <span className="cs">Cisco</span>
                </div>
                <div className="creds-item">
                  <div className="ct">Cisco Python Essentials 1</div>
                  <span className="cs">Cisco</span>
                </div>
                <div className="creds-item">
                  <div className="ct">SQL (Intermediate) · Python (Basic)</div>
                  <span className="cs">HackerRank</span>
                </div>
              </div>

              <div className="creds-col">
                <h4>Achievements</h4>
                <div className="creds-item">
                  <div className="ct">Top 1% in Job Readiness</div>
                  <span className="cs">Naukri Campus CareerVerse</span>
                </div>
                <div className="creds-item">
                  <div className="ct">Advanced to TCS Ninja interview stage</div>
                  <span className="cs">TCS Recruitment Process</span>
                </div>
                <div className="creds-item">
                  <div className="ct">Rank 336 / 33,663</div>
                  <span className="cs">Prompt War 3 · Top 1%</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="wrap">
            <div className="contact-grid">
              <div className="reveal">
                <h2>
                  Let&apos;s <em>build</em> something.
                </h2>
                <p>Open to full-time MERN / Full Stack roles. Reach out directly or drop a message.</p>

                <button className="copy-email" id="copyEmail" onClick={handleCopyEmail}>
                  <span className="reversed-email">moc.liamg@318lanukhsuhsed</span>
                  <span className="ic" id="copyState">
                    {copied ? "Copied ✓" : "Copy"}
                  </span>
                </button>

                <div className="social-row">
                  <a href="https://github.com/Kunal77744" target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Naukri
                  </a>
                </div>
              </div>

              <form className="reveal" id="contactForm" onSubmit={handleFormSubmit}>
                <div className="field">
                  <label htmlFor="cname">Name</label>
                  <input
                    id="cname"
                    type="text"
                    placeholder="Your name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="cemail">Email</label>
                  <input
                    id="cemail"
                    type="email"
                    placeholder="you@email.com"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="cmsg">Message</label>
                  <textarea
                    id="cmsg"
                    placeholder="What are we building?"
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="submit-row">
                  <button type="submit" className="btn primary magnetic" id="sendBtn" disabled={submitStatus.loading}>
                    <span>{submitStatus.loading ? "Sending..." : "Send Message"}</span>
                    <span className="arrow">→</span>
                  </button>
                  <span className={`send-success ${submitStatus.success ? "show" : ""}`} id="sendSuccess">
                    Sent — thank you.
                  </span>
                  {submitStatus.error && (
                    <span className="send-success show" style={{ color: "#ff6b6b" }}>
                      {submitStatus.error}
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="wrap foot-row">
          <span className="l mono">© 2026 Kunal Deshmukh.</span>
          <span className="back-top" id="backTop">
            Back to top ↑
          </span>
        </div>
      </footer>
    </>
  );
}
