// Demo data (FICTITIOUS)
const properties = [
  {
    id: 'p1',
    title: 'Sunny Villa, Miami Beach',
    address: '123 Ocean Drive, Miami Beach, FL',
    price: '$2,150,000',
    bedrooms: 4,
    bathrooms: 3,
    sqft: 3200,
    video: 'https://www.w3schools.com/html/mov_bbb.mp4', // demo video
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'p2',
    title: 'Downtown Condo, Orlando',
    address: '456 Central Ave, Orlando, FL',
    price: '$530,000',
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop'
    ]
  },
  {
    id: 'p3',
    title: 'Family Home, Tampa',
    address: '789 Lake View Rd, Tampa, FL',
    price: '$750,000',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 2000,
    video: 'https://www.w3schools.com/html/mov_bbb.mp4',
    images: [
      'https://images.unsplash.com/photo-1572120360610-d971b9b78825?q=80&w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1570129477492-45c003edd2be?q=80&w=800&auto=format&fit=crop'
    ]
  }
];

// Populate properties grid
const grid = document.getElementById('propertiesGrid');
properties.forEach(p => {
  const card = document.createElement('div');
  card.className = 'property-card';
  card.innerHTML = `
    <img src="${p.images[0]}" alt="${p.title}">
    <div class="property-body">
      <div class="title">${p.title}</div>
      <div class="price">${p.price}</div>
      <div class="address">${p.address}</div>
      <button class="btn small" data-id="${p.id}">View</button>
    </div>`;
  grid.appendChild(card);
});

// Modal
const modal = document.getElementById('propModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

grid.addEventListener('click', e => {
  if (e.target.tagName === 'BUTTON') {
    const id = e.target.getAttribute('data-id');
    const prop = properties.find(x => x.id === id);
    if (prop) {
      modalBody.innerHTML = `
        <h2>${prop.title}</h2>
        <p><strong>Address:</strong> ${prop.address}</p>
        <p><strong>Price:</strong> ${prop.price}</p>
        <p><strong>Bedrooms:</strong> ${prop.bedrooms}, <strong>Bathrooms:</strong> ${prop.bathrooms}, <strong>Size:</strong> ${prop.sqft} sqft</p>
        <video controls width="100%" src="${prop.video}"></video>
        <div class="gallery">
          ${prop.images.map(img => `<img src="${img}" style="width:100%;margin-top:0.5rem;border-radius:8px">`).join('')}
        </div>
        <button class="btn primary" id="contactFromProp">Contact About This Property</button>
      `;
      modal.setAttribute('aria-hidden', 'false');
      document.getElementById('contactFromProp').addEventListener('click', () => {
        modal.setAttribute('aria-hidden', 'true');
        document.getElementById('actionSelect').value = 'buy';
        document.getElementById('addressInput').value = prop.address;
        location.hash = '#contact';
      });
    }
  }
});
modalClose.addEventListener('click', () => modal.setAttribute('aria-hidden', 'true'));
modal.addEventListener('click', e => { if (e.target === modal) modal.setAttribute('aria-hidden', 'true'); });

// Carousel (simple auto-rotate)
const carousel = document.getElementById('carousel');
if (carousel) {
  const slides = [
    'https://images.unsplash.com/photo-1505691723518-36a6a9f1a0b5?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1572120360610-d971b9b78825?q=80&w=1600&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=1600&auto=format&fit=crop'
  ];
  let i = 0;
  const img = carousel.querySelector('img');
  setInterval(() => {
    i = (i + 1) % slides.length;
    img.src = slides[i];
  }, 4000);
}

// Contact form
document.getElementById('contactForm').addEventListener('submit', e => {
  e.preventDefault();
  document.getElementById('formMsg').textContent = 'Message sent (demo only).';
  e.target.reset();
});

// Simple i18n (English / Spanish)
const translations = {
  es: {
    about: 'Nosotros',
    properties: 'Propiedades',
    contact: 'Contáctanos',
    headline: 'Encuentra la casa de tus sueños en Florida',
    subheadline: 'DEMO FICTICIO — Propiedades y agentes solo de muestra.',
    explore: 'Ver Propiedades',
    aboutTitle: 'Acerca de Sunshine Realty',
    ourRealtors: 'Nuestros Agentes',
    selection: 'Seleccione',
    buy: 'Quiero comprar',
    sell: 'Quiero vender',
    name: 'Nombre completo *',
    phone: 'Teléfono *',
    address: 'Dirección',
    comment: 'Comentario',
    send: 'Enviar Mensaje',
    disclaimer: 'Toda la información en este sitio es ficticia y solo para demostración.'
  },
  en: {}
};
const langToggle = document.getElementById('langToggle');
let currentLang = 'en';
langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'es' : 'en';
  langToggle.textContent = currentLang === 'en' ? 'ES' : 'EN';
  applyTranslations();
});
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[currentLang][key]) {
      el.textContent = translations[currentLang][key];
    }
  });
}
