/* ─────────────────────────────────────────────
   Aditi Dosi — Portfolio Scripts
   Sections:
     1. Nav burger menu (mobile)
     2. Scroll-up button
     3. Fade-in on scroll (IntersectionObserver)
───────────────────────────────────────────── */

/* ── 1. Nav burger menu ── */
const burger  = document.getElementById('burger');
const navList = document.getElementById('nav-list');

burger.addEventListener('click', () => {
  navList.classList.toggle('open');
});

// Close menu when any nav link is clicked
navList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navList.classList.remove('open');
  });
});

/* ── 2. Scroll-up button ── */
const scrollUpBtn = document.getElementById('scroll-up');

window.addEventListener('scroll', () => {
  scrollUpBtn.classList.toggle('visible', window.scrollY > 400);
});

scrollUpBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── 3. Fade-in on scroll ── */
const fadeElements = document.querySelectorAll('.fade-up');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      // Stagger each element slightly for a cascade effect
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);

      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => fadeObserver.observe(el));