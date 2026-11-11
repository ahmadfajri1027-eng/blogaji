/**
 * 1. AUTO-SLIDE CAROUSEL UNTUK FOTO HERO AHMAD FAJRI
 */
let currentHeroSlide = 0;
let heroSlideInterval = null;
const SLIDE_DELAY_MS = 3500;

function showHeroSlide(index) {
  const slides = document.querySelectorAll('#heroSlider .hero-slide');
  const dots = document.querySelectorAll('#heroSliderDots .dot');
  if (!slides.length) return;

  if (index >= slides.length) {
    currentHeroSlide = 0;
  } else if (index < 0) {
    currentHeroSlide = slides.length - 1;
  } else {
    currentHeroSlide = index;
  }

  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === currentHeroSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentHeroSlide);
  });
}

function goToHeroSlide(index) {
  showHeroSlide(index);
  resetHeroSlideTimer();
}

function startHeroSlideTimer() {
  heroSlideInterval = setInterval(() => {
    showHeroSlide(currentHeroSlide + 1);
  }, SLIDE_DELAY_MS);
}

function resetHeroSlideTimer() {
  clearInterval(heroSlideInterval);
  startHeroSlideTimer();
}

/**
 * 2. FILTER KATEGORI SKILL AHMAD FAJRI
 */
function filterSkill(category, clickedButton) {
  const allButtons = document.querySelectorAll('.tab-btn');
  allButtons.forEach((btn) => btn.classList.remove('active'));
  clickedButton.classList.add('active');

  const skillItems = document.querySelectorAll('#skillGrid .soft-item');
  skillItems.forEach((item) => {
    const itemCat = item.getAttribute('data-category');
    if (category === 'all' || itemCat === category) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

/**
 * 3. MODAL VIDEO VIEWER & CAROUSEL SKILL
 */
const skillVideos = [
  {
    title: "02. Skill Showcase 1: Web Development & UI/UX Design",
    url: "showcase_web.mp4",
    narrative: "Demonstrasi perancangan antarmuka website bergaya editorial modern (Web Design) sekaligus implementasi barisan kode responsif (Web Development) oleh Ahmad Fajri."
  },
  {
    title: "02. Skill Showcase 2: Public Speaking & Presentation",
    url: "showcase_speaking.mp4",
    narrative: "Cuplikan dokumentasi Ahmad Fajri saat melakukan Public Speaking, mempresentasikan gagasan secara komunikatif, terstruktur, dan persuasif."
  }
];

let currentModalVideoIndex = 0;
let isSkillGalleryMode = false;

function openSkillVideoGallery() {
  isSkillGalleryMode = true;
  currentModalVideoIndex = 0;
  renderModalVideo();

  const navBar = document.getElementById('modalVideoNavBar');
  if (navBar) navBar.style.display = 'flex';

  document.getElementById('videoModal').classList.add('active');
}

function renderModalVideo() {
  const current = skillVideos[currentModalVideoIndex];
  const titleEl = document.getElementById('modalTitle');
  const driveFrame = document.getElementById('modalDriveFrame');
  const narrativeEl = document.getElementById('modalNarrativeText');
  const counterPill = document.getElementById('videoCounterPill');

  titleEl.textContent = current.title;
  narrativeEl.textContent = current.narrative;
  driveFrame.src = current.url;

  if (counterPill) {
    counterPill.textContent = `Video ${currentModalVideoIndex + 1} dari ${skillVideos.length}`;
  }
}

function nextModalVideo() {
  if (!isSkillGalleryMode) return;
  currentModalVideoIndex = (currentModalVideoIndex + 1) % skillVideos.length;
  renderModalVideo();
}

function prevModalVideo() {
  if (!isSkillGalleryMode) return;
  currentModalVideoIndex = (currentModalVideoIndex - 1 + skillVideos.length) % skillVideos.length;
  renderModalVideo();
}

function openSingleVideoModal(title, videoSrc, narrativeText) {
  isSkillGalleryMode = false;
  const modal = document.getElementById('videoModal');
  const titleEl = document.getElementById('modalTitle');
  const driveFrame = document.getElementById('modalDriveFrame');
  const narrativeEl = document.getElementById('modalNarrativeText');
  const navBar = document.getElementById('modalVideoNavBar');

  titleEl.textContent = title;
  narrativeEl.textContent = narrativeText;
  driveFrame.src = videoSrc;

  if (navBar) navBar.style.display = 'none';
  modal.classList.add('active');
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const driveFrame = document.getElementById('modalDriveFrame');

  if (driveFrame) driveFrame.src = '';
  if (modal) modal.classList.remove('active');
}

function closeModalOnBg(event) {
  if (event.target.id === 'videoModal') {
    closeVideoModal();
  }
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closeVideoModal();
  }
});