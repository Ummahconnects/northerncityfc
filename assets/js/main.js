document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Club Gallery Filter Tabs
  const galleryFilterBtns = document.querySelectorAll('.gallery-filter-btn');
  const photoCards = document.querySelectorAll('.club-photo-card');

  galleryFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      galleryFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-gallery-filter');
      photoCards.forEach(card => {
        const categories = (card.getAttribute('data-gallery-cat') || '').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Fullscreen Image Lightbox Modal
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const triggers = document.querySelectorAll('.lightbox-trigger');

  if (lightboxModal && lightboxImg) {
    triggers.forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        if (lightboxCaption) {
          lightboxCaption.textContent = img.getAttribute('data-caption') || img.alt;
        }
        lightboxModal.classList.add('open');
        lightboxModal.setAttribute('aria-hidden', 'false');
      });
    });

    const closeLightbox = () => {
      lightboxModal.classList.remove('open');
      lightboxModal.setAttribute('aria-hidden', 'true');
      lightboxImg.src = '';
    };

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeLightbox);
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightboxModal.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  // Express Trial Registration Form -> Formats mailto to fcnortherncity@gmail.com
  const trialRegForm = document.getElementById('trialRegForm');
  const formFeedback = document.getElementById('formFeedback');

  if (trialRegForm) {
    trialRegForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const playerName = document.getElementById('playerName').value.trim();
      const ageGroup = document.getElementById('ageGroup').value;
      const parentPhone = document.getElementById('parentPhone').value.trim();
      const position = document.getElementById('position').value;

      const subject = encodeURIComponent(`Junior Trial Registration: ${playerName} (${ageGroup})`);
      const body = encodeURIComponent(
        `Hi Northern City FC Coaching & Registration Team,\n\n` +
        `Please register the following player for the Northern City FC Trials:\n\n` +
        `- Player Name: ${playerName}\n` +
        `- Squad / Age Group: ${ageGroup}\n` +
        `- Preferred Position: ${position}\n` +
        `- Contact Mobile: ${parentPhone}\n\n` +
        `We note the 5:00 PM arrival / 5:30 PM trial kickoff time.\n\n` +
        `Thank you!`
      );

      if (formFeedback) {
        formFeedback.textContent = `✓ Ready! Opening your email client to send ${playerName}'s registration to fcnortherncity@gmail.com...`;
      }

      window.location.href = `mailto:fcnortherncity@gmail.com?subject=${subject}&body=${body}`;
    });
  }
});
