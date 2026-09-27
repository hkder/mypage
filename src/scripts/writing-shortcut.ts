export {};

function attach(brand: HTMLAnchorElement, tree: HTMLElement, shortcut: HTMLAnchorElement, flight: HTMLElement, status: HTMLElement): void {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const tokens = getComputedStyle(document.documentElement);
  const duration = (name: string) => {
    const value = tokens.getPropertyValue(name).trim();
    return parseFloat(value) * (value.endsWith('ms') ? 1 : 1000);
  };
  const holdDuration = duration('--harvest-hold');
  const flightDuration = duration('--harvest-flight');
  let press: { readonly id: number; readonly x: number; readonly y: number } | undefined;
  let holdTimer: ReturnType<typeof setTimeout> | undefined;
  let frame = 0;
  let busy = false;
  let suppressClick = false;

  const showShortcut = () => {
    try { localStorage.setItem('hosung-writing-shortcut', '1'); }
    catch (error) { if (!(error instanceof DOMException)) throw error; }
    shortcut.hidden = false;
  };
  const cancelHold = () => {
    clearTimeout(holdTimer);
    press = undefined;
    tree.classList.remove('is-growing');
  };
  const stopFlight = () => {
    cancelAnimationFrame(frame);
    flight.hidden = true;
    busy = false;
    tree.classList.remove('is-harvested');
    shortcut.classList.remove('is-landing');
  };
  const finish = () => {
    stopFlight();
    shortcut.focus({ preventScroll: true });
    status.textContent = 'Your private writing key is ready.';
    if (!reducedMotion.matches) shortcut.classList.add('is-landing');
  };
  const harvest = () => {
    if (busy) return;
    const source = tree.getBoundingClientRect();
    suppressClick = press !== undefined;
    cancelHold();
    showShortcut();
    if (reducedMotion.matches) {
      shortcut.scrollIntoView({ block: 'nearest', behavior: 'instant' });
      finish();
      return;
    }
    busy = true;
    tree.classList.add('is-harvested');
    const destination = shortcut.getBoundingClientRect();
    const scrollStart = scrollY;
    const scrollEnd = destination.bottom <= innerHeight ? scrollStart : Math.min(
      document.documentElement.scrollHeight - innerHeight,
      scrollStart + destination.bottom - innerHeight + 32,
    );
    const start = { x: source.left + source.width / 2, y: source.top + source.height / 3 };
    const end = { x: destination.left + destination.width / 2, y: destination.top + destination.height / 2 - (scrollEnd - scrollStart) };
    const control = { x: Math.min(innerWidth - 24, Math.max(24, start.x + (end.x - start.x) * .8 + 40)), y: Math.max(12, start.y - 32) };
    flight.style.transform = `translate(${start.x - 18}px, ${start.y - 18}px) scale(.7)`;
    flight.style.opacity = '1';
    flight.hidden = false;
    const began = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - began) / flightDuration);
      const progress = t * t * (3 - 2 * t);
      window.scrollTo({ top: scrollStart + (scrollEnd - scrollStart) * progress, behavior: 'instant' });
      const x = (1 - progress) ** 2 * start.x + 2 * (1 - progress) * progress * control.x + progress ** 2 * end.x;
      const y = (1 - progress) ** 2 * start.y + 2 * (1 - progress) * progress * control.y + progress ** 2 * end.y;
      flight.style.transform = `translate(${x - 18}px, ${y - 18}px) rotate(${Math.sin(t * Math.PI) * 100 - 25 * (1 - t)}deg) scale(${.7 + Math.sin(t * Math.PI) * .5})`;
      flight.style.opacity = String(Math.min(1, (1 - t) * 8));
      if (t < 1) frame = requestAnimationFrame(tick);
      else finish();
    };
    frame = requestAnimationFrame(tick);
  };

  const url = new URL(location.href);
  try { shortcut.hidden = localStorage.getItem('hosung-writing-shortcut') !== '1'; }
  catch (error) { if (!(error instanceof DOMException)) throw error; }
  if (url.searchParams.get('writer') === '1') {
    showShortcut();
    url.searchParams.delete('writer');
    history.replaceState(history.state, '', url);
  }
  brand.addEventListener('pointerdown', event => {
    if (busy) return;
    cancelHold(); suppressClick = false;
    if (event.button !== 0 || !event.isPrimary || event.ctrlKey || event.metaKey || event.altKey || event.shiftKey
      || !(event.target instanceof Element) || !tree.contains(event.target)) return;
    press = { id: event.pointerId, x: event.clientX, y: event.clientY };
    tree.classList.add('is-growing');
    holdTimer = setTimeout(harvest, holdDuration);
  });
  window.addEventListener('pointermove', event => {
    if (press && event.pointerId === press.id && Math.hypot(event.clientX - press.x, event.clientY - press.y) > 12) cancelHold();
  });
  window.addEventListener('pointerup', event => { if (press?.id === event.pointerId) cancelHold(); });
  brand.addEventListener('click', event => {
    if (busy || (suppressClick && event.detail > 0)) { event.preventDefault(); suppressClick = false; }
  });
  brand.addEventListener('contextmenu', event => { if (press || busy) event.preventDefault(); });
  brand.addEventListener('pointerleave', cancelHold);
  window.addEventListener('pointercancel', cancelHold);
  const interrupt = () => { cancelHold(); stopFlight(); };
  window.addEventListener('blur', interrupt);
  window.addEventListener('resize', interrupt);
  window.addEventListener('wheel', interrupt, { passive: true });
  window.addEventListener('touchmove', () => { if (busy) stopFlight(); }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden) interrupt(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') interrupt(); });
  reducedMotion.addEventListener('change', interrupt);
  brand.addEventListener('keydown', event => {
    if (event.key === 'Enter' && event.shiftKey) { event.preventDefault(); harvest(); }
  });
  shortcut.addEventListener('animationend', () => shortcut.classList.remove('is-landing'));
}

const brand = document.querySelector<HTMLAnchorElement>('.brand');
const tree = document.querySelector<HTMLElement>('.tree-mark');
const shortcut = document.querySelector<HTMLAnchorElement>('#writing-shortcut');
const flight = document.querySelector<HTMLElement>('#key-flight');
const status = document.querySelector<HTMLElement>('#writing-shortcut-status');
if (brand && tree && shortcut && flight && status) attach(brand, tree, shortcut, flight, status);
