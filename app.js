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

const entryPrice = document.querySelector('.entry-price');
if (entryPrice) {
  entryPrice.querySelector('.price-top').innerHTML = '<span>01 / QUICK START</span><strong><del>$100</del> $50 <small>NZD SPECIAL</small></strong>';
  entryPrice.querySelector('h3').innerHTML = 'Digital<br><em>Business Card.</em>';
  entryPrice.querySelector('.target').textContent = 'For small businesses that need a polished digital presence in one clear page.';
  entryPrice.querySelector('ul').innerHTML = '<li>1 professionally designed webpage</li><li>Mobile-friendly digital profile</li><li>Clear contact details or CTA</li><li>Social links and business information</li><li>1 round of minor revisions</li>';
}

const contactCopy = document.querySelector('.contact-copy');
if (contactCopy && !contactCopy.querySelector('.direct-contact')) {
  const directContact = document.createElement('div');
  directContact.className = 'direct-contact';
  directContact.innerHTML = '<span>Direct contact</span><a href="tel:+64226479021">022 647 9021</a><a href="mailto:Shayveetake2@gmail.com">Shayveetake2@gmail.com</a>';
  contactCopy.append(directContact);
}

const projectGrid = document.querySelector('.project-grid');
if (projectGrid && !document.querySelector('.project-business-card')) {
  const project = document.createElement('a');
  project.className = 'project-card project-business-card';
  project.href = 'digital-business-card.html';
  project.innerHTML = '<div class="project-preview"><span class="preview-brand">HARBOUR &amp;<br><b>HOME REPAIRS</b></span><span class="preview-cta">VIEW DEMO ↗</span><div class="preview-card-mark">HH</div></div><div class="project-info"><div class="project-meta"><span class="kicker">04 / Quick start</span><strong><del>$100</del> $50 <small>NZD SALE</small></strong></div><h2>Harbour &amp; Home Repairs</h2><p>A polished one-page digital business card for a local property maintenance business, with contact details, social links and tap-to-call actions.</p><span class="project-tags">MOBILE-FIRST · CONTACT · QUICK START</span></div>';
  projectGrid.prepend(project);
  const projectLabels = ['01 / Quick start', '02 / Electrical', '03 / Hospitality', '04 / Outdoor design'];
  projectGrid.querySelectorAll('.project-meta .kicker').forEach((label, index) => {
    label.textContent = projectLabels[index];
  });
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

