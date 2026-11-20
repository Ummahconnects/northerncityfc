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

  // Team Filter Tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const teamCards = document.querySelectorAll('.team-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');
      teamCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const toggleIcon = btn.querySelector('.faq-toggle');
      const isOpen = answer.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(isOpen));
      if (toggleIcon) {
        toggleIcon.innerHTML = isOpen ? '&minus;' : '+';
      }
    });
  });

  // Express Trial Registration Form -> Formats mailto to fcnortherncity@gmail.com + visual confirmation
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
