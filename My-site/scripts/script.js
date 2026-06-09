


document.addEventListener('DOMContentLoaded', () => {

  const numberFormatter = new Intl.NumberFormat('fa-IR');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // انتخاب المان‌ها (Cached elements)
  const logo = document.querySelector('.logo');
  const counters = Array.from(document.querySelectorAll('.counter'));
  const statsSection = document.querySelector('.stats-section');
  const menu = document.querySelector('#mobile-menu');
  const menuLinks = document.querySelector('nav ul');
  const faqContainer = document.querySelector('.faq-container');

  // --- افکت Flicker لوگو (بهینه برای CPU) ---
  if (logo && !reducedMotion) {
    let rafId = null;
    let last = 0;

    const flicker = (ts) => {
      if (!last) last = ts;
      if (ts - last >= 100) { 
        const randomOpacity = (Math.random() * 0.2) + 0.75; 
        logo.style.opacity = String(randomOpacity);
        last = ts;
      }
      rafId = requestAnimationFrame(flicker);
      };

    const logoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (!rafId) rafId = requestAnimationFrame(flicker);
        } else {
          if (rafId) { cancelAnimationFrame(rafId); rafId = null; last = 0; }
        }
      });
    }, { threshold: 0 });

    logo.classList.add('neon-active');
    logoObserver.observe(logo);
  } else if (logo) {
    logo.classList.add('neon-active');
  }

  // --- سیستم انیمیشن اعداد (Counters) ---
 




  // --- منوی موبایل (Hamburger Menu) ---
  if (menu && menuLinks) {
    menu.addEventListener('click', () => {
      const active = menuLinks.classList.toggle('active');
      document.body.style.overflow = active ? 'hidden' : '';

      const bars = document.querySelectorAll('.bar');
      bars.forEach((bar, i) => {
        if (i === 0) bar.classList.toggle('rotate-down');
        if (i === 1) bar.classList.toggle('fade-out');
        if (i === 2) bar.classList.toggle('rotate-up');
      });
    });
  }

  // --- سیستم سوالات متداول (FAQ) با Event Delegation ---
  if (faqContainer) {
    faqContainer.addEventListener('click', (ev) => {
      const q = ev.target.closest('.faq-question');
      if (!q) return;

      const item = q.closest('.faq-item');
      if (!item) return;

      const wasActive = item.classList.contains('active');

      // بستن سایر سوالات (Accordion effect)
      faqContainer.querySelectorAll('.faq-item').forEach(el => {
        el.classList.remove('active');
        const ans = el.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = null;
      });

      if (!wasActive) {
        item.classList.add('active');
        const ans = item.querySelector('.faq-answer');
        if (ans) ans.style.maxHeight = `${ans.scrollHeight}px`;
      }
    });
  }
});
