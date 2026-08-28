const menuToggle = document.querySelector('#menuToggle');
const siteNav = document.querySelector('#siteNav');
if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });
  siteNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

// Make pricing cards clickable to show their corresponding demo site
document.querySelectorAll('.price-card').forEach((card) => {
  const demoUrl = card.getAttribute('data-demo-url');
  if (demoUrl) {
    card.addEventListener('click', (event) => {
      // Do not redirect if clicking the "Choose this package" CTA button or the "View demo" link directly
      if (event.target.closest('.card-link') || event.target.closest('.demo-link')) {
        return;
      }
      window.location.href = demoUrl;
    });
  }
});

const contactCopy = document.querySelector('.contact-copy');
if (contactCopy && !contactCopy.querySelector('.direct-contact')) {
  const directContact = document.createElement('div');
  directContact.className = 'direct-contact';
  directContact.innerHTML = '<span>Direct contact</span><a href="tel:+64226479021">022 647 9021</a><a href="mailto:Shayveetake2@gmail.com">Shayveetake2@gmail.com</a>';
  contactCopy.append(directContact);
}

const leadForm = document.querySelector('#leadForm');
const formStatus = document.querySelector('#formStatus');
if (leadForm && formStatus) {
  leadForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!leadForm.reportValidity()) {
      return;
    }

    const submitButton = leadForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.classList.add('opacity-75', 'cursor-not-allowed');
    submitButton.innerHTML = 'Sending...';
    formStatus.className = 'mt-4 hidden rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-3 text-sm text-slate-200';
    formStatus.textContent = '';

    try {
      const response = await fetch(leadForm.action, {
        method: 'POST',
        body: new FormData(leadForm),
        headers: {
          'Accept': 'application/json'
        }
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Unable to send your enquiry right now.');
      }

      formStatus.className = 'mt-4 block rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200';
      formStatus.textContent = 'Thanks! Your enquiry has been sent successfully. We’ll get back to you soon.';
      leadForm.reset();
    } catch (error) {
      formStatus.className = 'mt-4 block rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200';
      formStatus.textContent = 'There was a problem sending your message. Please try again, or email us directly.';
    } finally {
      submitButton.disabled = false;
      submitButton.classList.remove('opacity-75', 'cursor-not-allowed');
      submitButton.innerHTML = originalButtonText;
    }
  });
}

// Pre-fill contact form package description based on query parameter
const urlParams = new URLSearchParams(window.location.search);
const selectedPackage = urlParams.get('package');
if (selectedPackage && leadForm) {
  const messageField = leadForm.querySelector('textarea[name="message"]');
  if (messageField) {
    const packagesMap = {
      'quick-menu': 'Quick Menu ($25 NZD sale package)',
      'digital-business-card': 'Digital Business Card ($50 NZD sale package)',
      'landing-page': 'The Fast Landing Page ($200 NZD package)',
      'essential-site': 'The Essential 3-Page Website ($350 NZD package)',
      'complete-site': 'The Complete Starter Site ($500 NZD package)'
    };
    const packageName = packagesMap[selectedPackage] || selectedPackage;
    messageField.value = `Hi! I'm interested in the "${packageName}". Let's get in touch.`;
  }
}


