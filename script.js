(function () {
  // Footer year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Header border on scroll
  var header = document.getElementById('siteHeader');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile menu
  var toggle = document.getElementById('menuToggle');
  var mobileNav = document.getElementById('mobileNav');
  function setMenu(open) {
    mobileNav.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }
  toggle.addEventListener('click', function () {
    setMenu(mobileNav.hidden);
  });
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setMenu(false); });
  });

  // Reveal on scroll
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { observer.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('visible'); });
  }

  // Contact form
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  var submitBtn = document.getElementById('submitBtn');
  var resetBtn = document.getElementById('resetForm');
  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setError(name, message) {
    var input = form.elements[name];
    var el = form.querySelector('.error[data-for="' + name + '"]');
    el.textContent = message || '';
    input.classList.toggle('invalid', !!message);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name.value.trim();
    var email = form.elements.email.value.trim();
    var message = form.elements.message.value.trim();

    var nameOk = !!name;
    var emailOk = emailPattern.test(email);
    var messageOk = message.length >= 10;

    setError('name', nameOk ? '' : 'Please enter your name.');
    setError('email', emailOk ? '' : 'Please enter a valid email.');
    setError('message', messageOk ? '' : 'Message should be at least 10 characters.');
    if (!nameOk || !emailOk || !messageOk) return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    // Replace this timeout with a real form service (e.g. Formspree) when publishing.
    setTimeout(function () {
      form.hidden = true;
      success.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send message';
      form.reset();
    }, 1200);
  });

  resetBtn.addEventListener('click', function () {
    success.hidden = true;
    form.hidden = false;
  });
})();
