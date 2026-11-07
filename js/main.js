/* Conteúdo em index.html; aparência em css/style.css. Sem dependências externas. */
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  const menu = document.querySelector('.menu');
  const navigation = document.querySelector('#navigation');
  function closeMenu() {
    menu.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    navigation.classList.toggle('open', open);
  });
  navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navigation.classList.contains('open')) { closeMenu(); menu.focus(); }
  });
  document.addEventListener('click', e => {
    if (!navigation.contains(e.target) && !menu.contains(e.target)) closeMenu();
  });
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let paused = preference.matches;
  const toggle = document.querySelector('.motion-toggle');
  function setMotion() {
    document.body.classList.toggle('motion-paused', paused);
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.setAttribute('aria-label', paused ? 'Ativar animações' : 'Pausar animações');
    toggle.textContent = paused ? '▷' : 'Ⅱ';
  }
  toggle.addEventListener('click', () => { paused = !paused; setMotion(); });
  preference.addEventListener('change', e => { paused = e.matches; setMotion(); });
  setMotion();
  const reveals = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    reveals.forEach(el => observer.observe(el));
  } else reveals.forEach(el => el.classList.add('visible'));
  const links = [...navigation.querySelectorAll('a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  const progress = document.querySelector('.progress');
  let queued = false;
  function onScroll() {
    queued = false;
    const range = root.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${range > 0 ? scrollY / range : 0})`;
    let current = 'inicio';
    sections.forEach(section => { if (section.getBoundingClientRect().top <= 180) current = section.id; });
    links.forEach(link => {
      const active = link.hash === `#${current}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location'); else link.removeAttribute('aria-current');
    });
  }
  addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(onScroll); } }, { passive: true });
  addEventListener('resize', () => { if (innerWidth > 760) closeMenu(); onScroll(); });
  onScroll();
  const scene = document.querySelector('.portrait-scene');
  const sculpture = document.querySelector('.sculpture-motion');
  let orbQueued = false;
  function moveOrbOnScroll() {
    orbQueued = false;
    const progress = Math.min(1, Math.max(0, scrollY / Math.max(1, innerHeight)));
    sculpture.style.setProperty('--orb-scroll', paused || preference.matches ? '0px' : `${-progress * 22}px`);
  }
  addEventListener('scroll', () => {
    if (!orbQueued) { orbQueued = true; requestAnimationFrame(moveOrbOnScroll); }
  }, { passive: true });
  scene.addEventListener('pointermove', e => {
    if (paused || preference.matches || e.pointerType !== 'mouse') return;
    const r = scene.getBoundingClientRect();
    sculpture.style.setProperty('--orb-x', `${((e.clientX-r.left)/r.width-.5)*16}px`);
    sculpture.style.setProperty('--orb-y', `${((e.clientY-r.top)/r.height-.5)*12}px`);
  });
  scene.addEventListener('pointerleave', () => {
    sculpture.style.setProperty('--orb-x', '0px');
    sculpture.style.setProperty('--orb-y', '0px');
  });
  const portrait = document.querySelector('[data-tilt]');
  portrait.addEventListener('pointermove', e => {
    if (paused || preference.matches || e.pointerType !== 'mouse') return;
    const r = portrait.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    portrait.style.transform = `rotate(-4deg) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  portrait.addEventListener('pointerleave', () => { portrait.style.transform = ''; });
  document.querySelector('#year').textContent = new Date().getFullYear();
})();
