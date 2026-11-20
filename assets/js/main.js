document.addEventListener('DOMContentLoaded', () => {
  const CLUB_EMAIL = 'fcnortherncity@gmail.com';
  const CLUB_PHONE_E164 = '+61456447068';
  const CLUB_WA_NUM = '61456447068';

  // Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    mainNav.querySelectorAll('a, button').forEach(item => {
      item.addEventListener('click', () => {
        mainNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Helper to build registration message text and launch Email, SMS, or WhatsApp
  const sendClubRegistration = ({ playerName, ageGroup, parentPhone, positionOrNotes, method, feedbackEl }) => {
    const cleanName = playerName || 'New Player';
    const cleanGroup = ageGroup || 'Northern City FC Squad';
    const cleanPhone = parentPhone || 'Not provided';
    const cleanNotes = positionOrNotes || 'Midfielder / General';

    const messageText =
      `Hi Northern City FC Coaching & Registration Team,\n\n` +
      `I would like to join / register for Northern City FC:\n` +
      `- Player Name: ${cleanName}\n` +
      `- Squad / Age Group: ${cleanGroup}\n` +
      `- Position / Details: ${cleanNotes}\n` +
      `- Contact Mobile: ${cleanPhone}\n\n` +
      `Thank you!`;

    if (method === 'sms') {
      if (feedbackEl) {
        feedbackEl.textContent = `✓ Opening your SMS app to text ${cleanName}'s details to +61 456 447 068...`;
      }
      window.location.href = `sms:${CLUB_PHONE_E164}?body=${encodeURIComponent(messageText)}`;
    } else if (method === 'whatsapp') {
      if (feedbackEl) {
        feedbackEl.textContent = `✓ Opening WhatsApp to message +61 456 447 068...`;
      }
      window.open(`https://wa.me/${CLUB_WA_NUM}?text=${encodeURIComponent(messageText)}`, '_blank', 'noopener');
    } else {
      const subject = encodeURIComponent(`Join Northern City FC: ${cleanName} (${cleanGroup})`);
      if (feedbackEl) {
        feedbackEl.textContent = `✓ Opening your email client to send ${cleanName}'s registration to ${CLUB_EMAIL}...`;
      }
      window.location.href = `mailto:${CLUB_EMAIL}?subject=${subject}&body=${encodeURIComponent(messageText)}`;
    }
  };

  // Express Trial Registration Form (Email, SMS, or WhatsApp)
  const trialRegForm = document.getElementById('trialRegForm');
  const formFeedback = document.getElementById('formFeedback');
  const formSmsBtn = document.getElementById('formSmsBtn');
  const formWhatsappBtn = document.getElementById('formWhatsappBtn');

  const getInlineFormValues = () => ({
    playerName: document.getElementById('playerName')?.value.trim(),
    ageGroup: document.getElementById('ageGroup')?.value,
    parentPhone: document.getElementById('parentPhone')?.value.trim(),
    positionOrNotes: document.getElementById('position')?.value,
    feedbackEl: formFeedback
  });

  if (trialRegForm) {
    trialRegForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendClubRegistration({ ...getInlineFormValues(), method: 'email' });
    });
  }

  if (formSmsBtn) {
    formSmsBtn.addEventListener('click', () => {
      if (trialRegForm && !trialRegForm.reportValidity()) return;
      sendClubRegistration({ ...getInlineFormValues(), method: 'sms' });
    });
  }

  if (formWhatsappBtn) {
    formWhatsappBtn.addEventListener('click', () => {
      if (trialRegForm && !trialRegForm.reportValidity()) return;
      sendClubRegistration({ ...getInlineFormValues(), method: 'whatsapp' });
    });
  }

  // "Join Now" Modal Logic
  const joinModal = document.getElementById('joinModal');
  const joinModalClose = document.getElementById('joinModalClose');
  const openJoinBtns = document.querySelectorAll('.open-join-modal');
  const joinModalForm = document.getElementById('joinModalForm');
  const modalFeedback = document.getElementById('modalFeedback');
  const modalSendEmail = document.getElementById('modalSendEmail');
  const modalSendSms = document.getElementById('modalSendSms');
  const modalSendWa = document.getElementById('modalSendWa');

  if (joinModal) {
    const openJoinModal = () => {
      joinModal.classList.add('open');
      joinModal.setAttribute('aria-hidden', 'false');
    };

    const closeJoinModal = () => {
      joinModal.classList.remove('open');
      joinModal.setAttribute('aria-hidden', 'true');
    };

    openJoinBtns.forEach(btn => btn.addEventListener('click', openJoinModal));

    if (joinModalClose) {
      joinModalClose.addEventListener('click', closeJoinModal);
    }

    joinModal.addEventListener('click', (e) => {
      if (e.target === joinModal) closeJoinModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && joinModal.classList.contains('open')) {
        closeJoinModal();
      }
    });

    const getModalFormValues = () => ({
      playerName: document.getElementById('modalPlayerName')?.value.trim(),
      ageGroup: document.getElementById('modalAgeGroup')?.value,
      parentPhone: document.getElementById('modalPhone')?.value.trim(),
      positionOrNotes: document.getElementById('modalNotes')?.value.trim(),
      feedbackEl: modalFeedback
    });

    if (modalSendEmail) {
      modalSendEmail.addEventListener('click', () => {
        if (joinModalForm && !joinModalForm.reportValidity()) return;
        sendClubRegistration({ ...getModalFormValues(), method: 'email' });
      });
    }

    if (modalSendSms) {
      modalSendSms.addEventListener('click', () => {
        if (joinModalForm && !joinModalForm.reportValidity()) return;
        sendClubRegistration({ ...getModalFormValues(), method: 'sms' });
      });
    }

    if (modalSendWa) {
      modalSendWa.addEventListener('click', () => {
        if (joinModalForm && !joinModalForm.reportValidity()) return;
        sendClubRegistration({ ...getModalFormValues(), method: 'whatsapp' });
      });
    }
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
});
