const buttons = document.querySelectorAll(".toggle-btn");
const sections = document.querySelectorAll(".content-section");

buttons.forEach(button => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    buttons.forEach(btn => btn.classList.remove("active"));
    // Add to the clicked one
    button.classList.add("active");

    // Hide all sections
    sections.forEach(section => section.classList.remove("active"));
    // Show the one matching the button's data-target
    const target = document.getElementById(button.dataset.target);
    target.classList.add("active");
  });
});

function goToSpaceShooter() {
  // deactivate tabs
  document.querySelectorAll('.toggle-btn').forEach(btn =>
    btn.classList.remove('active')
  );
  document.querySelectorAll('.content-section').forEach(sec =>
    sec.classList.remove('active')
  );

  // activate projects tab
  document.querySelector('[data-target="projects"]').classList.add('active');
  document.getElementById('projects').classList.add('active');

  // wait for the layout & then scroll
  setTimeout(() => {
    document
      .getElementById('space-shooter')
      .scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 50);
}

// ─── GALLERY + LIGHTBOX ───
// For video items: data-type="video" data-src="media/videos/my_file.mp4"
// For image items: data-type="image" data-src="media/images/my_file.png"

(function () {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `
    <div class="lightbox-inner">
      <button class="lightbox-close" aria-label="Close">&#x2715;</button>
      <button class="lightbox-nav prev" aria-label="Previous">&#8592;</button>
      <button class="lightbox-nav next" aria-label="Next">&#8594;</button>
      <div class="lightbox-content"></div>
      <div class="lightbox-caption"></div>
    </div>
  `;
  document.body.appendChild(overlay);

  const content  = overlay.querySelector('.lightbox-content');
  const caption  = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');
  const prevBtn  = overlay.querySelector('.lightbox-nav.prev');
  const nextBtn  = overlay.querySelector('.lightbox-nav.next');

  let currentItems = [];
  let currentIndex = 0;

  function stopVideo() {
    const video = content.querySelector('video');
    if (video) { video.pause(); video.src = ''; }
  }

  function openLightbox(items, index) {
    currentItems = items;
    currentIndex = index;
    render();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    stopVideo();
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    content.innerHTML = '';
  }

  function render() {
    stopVideo();
    content.innerHTML = '';

    const item = currentItems[currentIndex];
    const type = item.dataset.type;
    const src  = item.dataset.src;
    const cap  = item.dataset.caption || '';

    if (type === 'image') {
      const img = document.createElement('img');
      img.src = src;
      img.alt = cap;
      content.appendChild(img);

    } else {
      const video = document.createElement('video');
      video.src = src;
      video.controls = true;
      video.autoplay = true;
      video.playsInline = true;
      video.style.cssText = 'width:100%; max-height:80vh; border-radius:4px; display:block;';

      // fallback message
      video.innerHTML = 'Your browser does not support the video tag.';
      content.appendChild(video);
    }

    caption.textContent = cap;
    prevBtn.style.visibility = currentItems.length > 1 ? 'visible' : 'hidden';
    nextBtn.style.visibility = currentItems.length > 1 ? 'visible' : 'hidden';
  }

  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
    render();
  });

  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % currentItems.length;
    render();
  });

  closeBtn.addEventListener('click', closeLightbox);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape')      { closeLightbox(); return; }
    if (e.key === 'ArrowLeft')   { currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length; render(); }
    if (e.key === 'ArrowRight')  { currentIndex = (currentIndex + 1) % currentItems.length; render(); }
  });

  document.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery-item');
    if (!item) return;
    const gallery = item.closest('.gallery');
    const items   = Array.from(gallery.querySelectorAll('.gallery-item'));
    openLightbox(items, items.indexOf(item));
  });
})();