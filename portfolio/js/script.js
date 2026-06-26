gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
  let p = 0;
  const bar = document.getElementById('loaderbar');
  const pct = document.getElementById('loaderpct');
  const iv = setInterval(() => {
    p += Math.random()*18;
    if(p >= 100){ p = 100; clearInterval(iv); }
    bar.style.width = p + '%';
    pct.textContent = String(Math.floor(p)).padStart(2,'0') + '%';
    if(p === 100){
      gsap.to('#loader', { opacity:0, duration:0.6, delay:0.3, ease:'power2.out', onComplete(){
        document.getElementById('loader').style.display='none';
        introAnim();
      }});
    }
  }, 110);
});

const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
requestAnimationFrame(raf);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=>{ lenis.raf(time*1000); });
gsap.ticker.lagSmoothing(0);

function introAnim(){
  gsap.to('.hero .line span', { y:'0%', duration:1, ease:'power4.out', stagger:0.09 });
  gsap.to('.hero .eyebrow, .hero-sub, .hero-actions, .status-panel', {
    opacity:1, y:0, duration:0.9, ease:'power3.out', stagger:0.08, delay:0.25
  });
}
gsap.set('.hero .eyebrow, .hero-sub, .hero-actions, .status-panel', { opacity:0, y:20 });

document.querySelectorAll('.reveal').forEach((el) => {
  gsap.to(el, { opacity:1, y:0, duration:0.9, ease:'power3.out', scrollTrigger: { trigger: el, start:'top 85%' } });
});

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const id = a.getAttribute('href');
    if(id.length>1){
      e.preventDefault();
      const target = document.querySelector(id);
      if(target) lenis.scrollTo(target, { offset:-20 });
    }
  });
});
document.getElementById('backTop').addEventListener('click', ()=> lenis.scrollTo(0));

const glow = document.getElementById('glow');
let gx=0, gy=0, cx=0, cy=0;
window.addEventListener('mousemove', e=>{ gx=e.clientX; gy=e.clientY; glow.style.opacity=1; });
window.addEventListener('mouseleave', ()=> glow.style.opacity=0 );
function glowLoop(){ cx += (gx-cx)*0.12; cy += (gy-cy)*0.12; glow.style.left = cx+'px'; glow.style.top = cy+'px'; requestAnimationFrame(glowLoop); }
glowLoop();

/* custom cursor */
const cursor = document.getElementById('cursor');
window.addEventListener('mousemove', e=>{
  gsap.to(cursor, { x:e.clientX, y:e.clientY, duration:0.15, ease:'power2.out' });
});
document.querySelectorAll('a, button, [data-tilt], .magnetic').forEach(el=>{
  el.addEventListener('mouseenter', ()=> cursor.classList.add('ring'));
  el.addEventListener('mouseleave', ()=> cursor.classList.remove('ring'));
});

/* active nav highlight on scroll */
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section, .hero');
ScrollTrigger.batch(sections, {
  onEnter: (els) => els.forEach(el=>{
    const id = '#' + el.id;
    navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === id));
  }),
  start:'top center'
});

document.querySelectorAll('.magnetic').forEach(el=>{
  el.addEventListener('mousemove', e=>{
    const r = el.getBoundingClientRect();
    const mx = e.clientX - r.left - r.width/2;
    const my = e.clientY - r.top - r.height/2;
    gsap.to(el, { x:mx*0.2, y:my*0.3, duration:0.4, ease:'power3.out' });
  });
  el.addEventListener('mouseleave', ()=>{ gsap.to(el, { x:0, y:0, duration:0.5, ease:'elastic.out(1,0.4)' }); });
});

document.getElementById('copyEmail').addEventListener('click', ()=>{
  navigator.clipboard.writeText('deshmukhkunal813@gmail.com').then(()=>{
    const s = document.getElementById('copyState');
    s.textContent = 'Copied ✓';
    setTimeout(()=> s.textContent = 'Copy', 1800);
  });
});

document.getElementById('contactForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const btn = document.getElementById('sendBtn');
  const success = document.getElementById('sendSuccess');
  btn.querySelector('span').textContent = 'Sending...';
  setTimeout(()=>{
    btn.querySelector('span').textContent = 'Send Message';
    success.classList.add('show');
    document.getElementById('contactForm').reset();
    setTimeout(()=> success.classList.remove('show'), 3000);
  }, 900);
});
