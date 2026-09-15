const article = document.querySelector('.article-body');
const progress = document.querySelector('.progress span');
if (article && progress) {
  const headings = [...article.querySelectorAll('h2')];
  const links = [...document.querySelectorAll('.contents a[href^="#"]')];
  let scheduled = false;
  const update = () => {
    const bounds = article.getBoundingClientRect();
    const start = bounds.top + window.scrollY - 100;
    const end = bounds.bottom + window.scrollY - window.innerHeight;
    const ratio = Math.min(1, Math.max(0, (window.scrollY - start) / Math.max(1, end - start)));
    progress.style.transform = `scaleX(${ratio})`;
    let current = headings[0];
    for (const heading of headings) if (heading.getBoundingClientRect().top <= 160) current = heading;
    for (const link of links) {
      if (link.getAttribute('href') === `#${current?.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    scheduled = false;
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  addEventListener('scroll', schedule, {passive:true});
  addEventListener('resize', schedule);
  document.fonts.ready.then(schedule);
  addEventListener('load', schedule, {once:true});
  update();
}

for (const figure of document.querySelectorAll('figure.code')) {
  const code = figure.querySelector('pre code');
  const toolbar = figure.querySelector('.code-toolbar');
  if (!code || !toolbar) continue;
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'copy-code';
  button.textContent = 'Copy';
  button.setAttribute('aria-label', 'Copy code');
  const status = document.createElement('span');
  status.className = 'visually-hidden';
  status.setAttribute('role', 'status');
  toolbar.append(button);
  figure.append(status);
  let reset;
  button.addEventListener('click', async () => {
    clearTimeout(reset);
    button.disabled = true;
    try {
      await navigator.clipboard.writeText(code.textContent);
      button.textContent = 'Copied';
      status.className = 'visually-hidden';
      status.textContent = 'Code copied to clipboard.';
      reset = setTimeout(() => { button.textContent = 'Copy'; }, 2000);
    } catch {
      button.textContent = 'Copy';
      status.className = 'copy-help';
      status.textContent = 'Select the code, then copy with your keyboard or device menu.';
    } finally {
      button.disabled = false;
    }
  });
}
