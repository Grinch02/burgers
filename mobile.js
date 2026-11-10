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
