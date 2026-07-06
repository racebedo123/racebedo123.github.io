// ============================================================
// Robert Acebedo — Portfolio
// GSAP-powered scroll reveals + nav behavior
// ============================================================

document.getElementById('year').textContent = new Date().getFullYear();

gsap.registerPlugin(ScrollTrigger);

/* ---------- Nav scroll state + mobile toggle ---------- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

const navToggle = document.getElementById('navToggle');
const navLinksList = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
});

/* ---------- Smooth in-page nav ---------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    navLinksList.classList.remove('open');
  });
});

/* ---------- Hero entrance timeline ---------- */
const heroTL = gsap.timeline({ defaults: { ease: 'power3.out' } });
heroTL
  .to('.hero-eyebrow', { opacity: 1, y: 0, duration: 0.8, delay: 0.2 })
  .to('.hero-title .line', { opacity: 1, y: 0, duration: 0.9, stagger: 0.15 }, '-=0.5')
  .to('.hero-sub', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
  .to('.hero-actions', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
  .to('.hero-socials', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
  .to('.hero-photo', { opacity: 1, y: 0, duration: 0.8 }, '-=0.7');

/* ---------- Scroll-triggered reveals for everything else ---------- */
gsap.utils.toArray('#about .reveal, #experience .reveal, #projects .reveal, #skills .reveal, #contact .reveal')
  .forEach((el, i) => {
    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      },
      delay: (i % 3) * 0.05
    });
  });

/* ---------- Animated stat counters ---------- */
document.querySelectorAll('.stat-num').forEach((el) => {
  const target = parseFloat(el.dataset.count);
  const isDecimal = target % 1 !== 0;
  ScrollTrigger.create({
    trigger: el,
    start: 'top 90%',
    once: true,
    onEnter: () => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: target,
        duration: 1.6,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = isDecimal ? obj.val.toFixed(2) : Math.round(obj.val);
        }
      });
    }
  });
});
