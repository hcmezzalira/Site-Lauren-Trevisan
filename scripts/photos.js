document.addEventListener('DOMContentLoaded', function () {
  
  const galeria = document.getElementById('galeria');
  for (let i = 1; i <= 12; i++) {
    galeria.innerHTML += `
    <div class="blocos-photo">
      <div class="bloco-photo">
        <img src="./images/bloco${i}.jpg" alt="Foto Lauren Trevisan" class="bloco-img-photo">
      </div>
    </div>
    `;
  }

  const imgs = document.querySelectorAll('.bloco-img-photo');
  if (!imgs.length) return;

  // Create overlay HTML
  const overlay = document.createElement('div');
  overlay.className = 'photo-overlay';
  overlay.innerHTML = `
  <div class=\"overlay-content\" role=\"dialog\" aria-modal=\"true\">
    <button class=\"close-btn\" aria-label=\"Fechar\">×</button>
    <img class=\"overlay-img\" src=\"\" alt=\"\">
    <div class=\"zoom-controls\">
      <button class=\"zoom-out\" aria-label=\"Diminuir\">−</button>
      <button class=\"zoom-in\" aria-label=\"Aumentar\">+</button>
    </div>
  </div>
  `;

  document.body.appendChild(overlay);

  const overlayImg = overlay.querySelector('.overlay-img');
  const btnClose = overlay.querySelector('.close-btn');
  const btnIn = overlay.querySelector('.zoom-in');
  const btnOut = overlay.querySelector('.zoom-out');

  let scale = 1;

  function open(src, alt) {
    overlay.classList.add('active');
    overlayImg.src = src;
    overlayImg.alt = alt || '';
    scale = 1;
    overlayImg.style.transform = 'scale(1)';
    document.body.style.overflow = 'hidden';
    btnClose.focus();
  }

  function close() {
    overlay.classList.remove('active');
    overlayImg.src = '';
    document.body.style.overflow = '';
  }

  function zoomIn() {
    scale = Math.min(3, +(scale + 0.1).toFixed(2));
    overlayImg.style.transform = 'scale(' + scale + ')';
  }

  function zoomOut() {
    scale = Math.max(0.3, +(scale - 0.1).toFixed(2));
    overlayImg.style.transform = 'scale(' + scale + ')';
  }

  imgs.forEach(function (img) {
    // make focusable for keyboard users
    img.setAttribute('tabindex', '0');
    img.addEventListener('click', function () {
      open(img.src, img.alt);
    });
    img.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') open(img.src, img.alt);
    });
  });

  btnClose.addEventListener('click', close);
  btnIn.addEventListener('click', zoomIn);
  btnOut.addEventListener('click', zoomOut);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
    if (!overlay.classList.contains('active')) return;
    if (e.key === '+' || e.key === '=' || e.key === 'ArrowUp') zoomIn();
    if (e.key === '-' || e.key === 'ArrowDown') zoomOut();
  });

  // Prevent image drag and provide nicer cursor
  overlayImg.addEventListener('dragstart', function (e) { e.preventDefault(); });
});
