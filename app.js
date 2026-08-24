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

const contactHeader = document.querySelector('.contact-page .site-header');
const siteHeader = document.querySelector('.site-header');
if (siteHeader && !siteHeader.querySelector('.header-contact')) {
  const headerContact = document.createElement('div');
  headerContact.className = 'header-contact';
  headerContact.innerHTML = '<a href="tel:+64226479021">022 647 9021</a><a class="header-email" href="mailto:Shayveetake2@gmail.com">Shayveetake2@gmail.com</a>';
  siteHeader.insertBefore(headerContact, siteHeader.querySelector('.menu-toggle'));
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
if (leadForm) {
  leadForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(leadForm);
    const business = formData.get('business');
    const subject = `New free concept enquiry from ${business}`;
    const body = [
      `Business name: ${business}`,
      `Contact name: ${formData.get('name')}`,
      `Email: ${formData.get('email')}`,
      `Current website: ${formData.get('website') || 'Not provided'}`
    ].join('\n');
    formStatus.textContent = `Thanks, ${business}. Opening your email app to send the enquiry.`;
    window.location.href = `mailto:Shayveetake2@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    leadForm.reset();
  });
}
