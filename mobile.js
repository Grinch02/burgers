// Burger House — mobile burger menu
(function () {
  function init() {
    var header = document.querySelector('.header');
    var container = header && header.querySelector('.container');
    if (!container) return setTimeout(init, 100);
    if (container.querySelector('.burger-toggle')) return;

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'burger-toggle';
    btn.setAttribute('aria-label', 'Открыть меню');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span></span><span></span><span></span>';
    container.appendChild(btn);

    function setOpen(open) {
      header.classList.toggle('menu-open', open);
      document.body.classList.toggle('no-scroll', open);
      btn.setAttribute('aria-expanded', String(open));
      btn.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    }

    btn.addEventListener('click', function () {
      setOpen(!header.classList.contains('menu-open'));
    });
    header.querySelectorAll('.menu a').forEach(function (a) {
      a.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > 767) setOpen(false);
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();

// Burger House — living menu: staggered reveal on scroll + jump on "Order"
(function () {
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = !reduce && 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      var el = e.target, i = Number(el.dataset.bhIndex || 0) % 3;
      setTimeout(function () { el.classList.add('bh-in'); el.classList.remove('bh-hidden'); }, i * 120);
      io.unobserve(el);
    });
  }, { threshold: 0.15 }) : null;

  function prepare(card, idx) {
    if (card.dataset.bhReady) return;
    card.dataset.bhReady = '1';
    card.dataset.bhIndex = idx;
    if (io) { card.classList.add('bh-hidden'); io.observe(card); }
    var btn = card.querySelector('.product-button');
    if (btn) btn.addEventListener('click', function () {
      card.classList.remove('bh-jump'); void card.offsetWidth; card.classList.add('bh-jump');
      setTimeout(function () { card.classList.remove('bh-jump'); }, 800);
    });
  }
  function scan() { document.querySelectorAll('.products-item').forEach(prepare); }
  var mo = new MutationObserver(scan);
  function start() { scan(); mo.observe(document.body, { childList: true, subtree: true }); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start); else start();
})();
