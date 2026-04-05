const planesData = [
  {
    id: 'ing_informatica',
    nombre: 'Ingeniería en Informática',
    descripcion: 'Carrera de 5 años',
    icono: '💻',
    imagen: 'https://via.placeholder.com/600x400?text=Plan+Ingenieria+Informatica',
    urlPdf: 'https://example.com/plan_ing_informatica.pdf', // Cambiar por URL real
    urlCarrera: '../carreras/ing_informatica.html'
  },
  {
    id: 'ing_ambiental',
    nombre: 'Ingeniería Ambiental',
    descripcion: 'Carrera de 5 años',
    icono: '🌍',
    imagen: 'https://via.placeholder.com/600x400?text=Plan+Ingenieria+Ambiental',
    urlPdf: 'https://example.com/plan_ing_ambiental.pdf',
    urlCarrera: '../carreras/ing_ambiental.html'
  },
  {
    id: 'ing_agrimensura',
    nombre: 'Ingeniería en Agrimensura',
    descripcion: 'Carrera de 5 años',
    icono: '📐',
    imagen: 'https://via.placeholder.com/600x400?text=Plan+Ingenieria+Agrimensura',
    urlPdf: 'https://example.com/plan_ing_agrimensura.pdf',
    urlCarrera: '../carreras/ing_agrimensura.html'
  },
  {
    id: 'ing_recursos_hidricos',
    nombre: 'Ingeniería en Recursos Hídricos',
    descripcion: 'Carrera de 5 años',
    icono: '💧',
    imagen: 'https://via.placeholder.com/600x400?text=Plan+Ingenieria+Recursos+Hidricos',
    urlPdf: 'https://example.com/plan_ing_recursos_hidricos.pdf',
    urlCarrera: '../carreras/ing_recursos_hidricos.html'
  },
  {
    id: 'ing_ia',
    nombre: 'Ingeniería en Inteligencia Artificial',
    descripcion: 'Carrera de 5 años',
    icono: '🤖',
    imagen: 'https://via.placeholder.com/600x400?text=Plan+Ingenieria+IA',
    urlPdf: 'https://example.com/plan_ing_ia.pdf',
    urlCarrera: '../carreras/ing_ia.html'
  }
];

// Generar acordiones
function generarAcordiones() {
  const container = document.getElementById('acordionesContainer');
  
  container.innerHTML = planesData.map((plan, index) => `
    <div class="acordion-item" data-id="${plan.id}">
      <div class="acordion-header" onclick="toggleAcordion(${index})">
        <div class="acordion-header-left">
          <div class="acordion-icon">${plan.icono}</div>
          <div class="acordion-titulo">
            <h3>${plan.nombre}</h3>
            <p>${plan.descripcion}</p>
          </div>
        </div>
        <div class="acordion-toggle">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>

      <div class="acordion-content">
        <div class="acordion-body">
          <div class="plan-imagen" onclick="abrirModalImagen('${plan.imagen}')">
            <img src="${plan.imagen}" alt="${plan.nombre}">
          </div>

          <div class="plan-actions">
            <a href="${plan.urlPdf}" target="_blank" class="btn-descargar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Descargar PDF
            </a>
            <a href="${plan.urlCarrera}" class="btn-ver-mas">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              Ver Carrera
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// Toggle acordión
function toggleAcordion(index) {
  const items = document.querySelectorAll('.acordion-item');
  const clickedItem = items[index];
  
  // Cerrar otros acordiones
  items.forEach((item, i) => {
    if (i !== index) {
      item.classList.remove('active');
    }
  });

  // Toggle el acordión clickeado
  clickedItem.classList.toggle('active');
}

// Abrir modal con imagen
function abrirModalImagen(src) {
  const modal = document.getElementById('modalImagen');
  const img = document.getElementById('modalImg');
  
  img.src = src;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

// Cerrar modal
function cerrarModalImagen(event) {
  const modal = document.getElementById('modalImagen');
  
  if (!event || event.target === modal) {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}

// Cerrar modal con tecla ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    cerrarModalImagen();
  }
});

// Inicializar cuando DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  generarAcordiones();
});