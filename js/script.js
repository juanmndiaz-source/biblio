/* ── Navbar al hacer scroll ─────────────────── */
const nav = document.getElementById('navbar');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* ── Menú móvil ─────────────────────────────── */
let menuAbierto = false;
function toggleMenu() {
  menuAbierto = !menuAbierto;
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) {
    mobileMenu.classList.toggle('open', menuAbierto);
    const h1 = document.getElementById('h1');
    const h2 = document.getElementById('h2');
    const h3 = document.getElementById('h3');
    if (h1) h1.style.transform = menuAbierto ? 'rotate(45deg) translateY(7px)' : '';
    if (h2) h2.style.opacity   = menuAbierto ? '0' : '1';
    if (h3) h3.style.transform = menuAbierto ? 'rotate(-45deg) translateY(-7px)' : '';
    if (h3) h3.style.width      = menuAbierto ? '22px' : '16px';
  }
}
function cerrarMenu() {
  menuAbierto = false;
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

/* ── Mostrar sidebar en desktop ─────────────── */
function mostrarSidebar() {
  const sb = document.getElementById('sidebar');
  if (sb && window.innerWidth >= 1200) sb.style.display = 'block';
}
window.addEventListener('resize', mostrarSidebar);
mostrarSidebar();

/* ── Conteo animado ─────────────────────────── */
function animarConteo(id, objetivo) {
  const el = document.getElementById(id);
  if (!el) return;
  let v = 0;
  const paso = objetivo / 60;
  (function tick() {
    v = Math.min(v + paso, objetivo);
    el.textContent = Math.floor(v).toLocaleString('es-AR') + '+';
    if (v < objetivo) requestAnimationFrame(tick);
  })();
}
setTimeout(() => {
  animarConteo('cnt-recursos', 2400);
  animarConteo('cnt-alumnos',  6200);
}, 700);

/* ── Scroll reveal ──────────────────────────── */
const obs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 75);
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

/* ── Filtros de cards ───────────────────────── */
let filtroActivo = 'todos';
let textoBusqueda = '';

function setFiltro(btn, tipo) {
  filtroActivo = tipo;
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  aplicarFiltros();
}

function filtrarCards(q) {
  textoBusqueda = q.toLowerCase().trim();
  aplicarFiltros();
}

function aplicarFiltros() {
  const cards = document.querySelectorAll('#grid-cards .resource-card');
  let visibles = 0;
  cards.forEach(card => {
    const tipo  = card.dataset.tipo  || '';
    const titulo = (card.dataset.titulo || '').toLowerCase();
    const okTipo   = filtroActivo === 'todos' || tipo === filtroActivo;
    const okTexto  = !textoBusqueda || titulo.includes(textoBusqueda);
    const mostrar  = okTipo && okTexto;
    card.style.display = mostrar ? '' : 'none';
    if (mostrar) visibles++;
  });
  const sinResultados = document.getElementById('sin-resultados');
  if (sinResultados) sinResultados.style.display = visibles ? 'none' : 'block';
}

/* ── Búsqueda desde hero ────────────────────── */
function manejarBusquedaHero(v) { textoBusqueda = v.toLowerCase(); }

function ejecutarBusqueda() {
  const heroInput = document.getElementById('busqueda-hero');
  const principalInput = document.getElementById('busqueda-principal');
  const materiales = document.getElementById('materiales');
  
  if (heroInput && principalInput) {
    const v = heroInput.value;
    principalInput.value = v;
    textoBusqueda = v.toLowerCase();
    aplicarFiltros();
  }
  if (materiales) materiales.scrollIntoView({ behavior:'smooth' });
}

function buscarTermino(t) {
  const heroInput = document.getElementById('busqueda-hero');
  const principalInput = document.getElementById('busqueda-principal');
  const materiales = document.getElementById('materiales');
  
  if (heroInput) heroInput.value = t;
  if (principalInput) principalInput.value = t;
  textoBusqueda = t.toLowerCase();
  aplicarFiltros();
  if (materiales) materiales.scrollIntoView({ behavior:'smooth' });
}

function abrirBusqueda() {
  window.scrollTo({ top:0, behavior:'smooth' });
  setTimeout(() => {
    const busquedaHero = document.getElementById('busqueda-hero');
    if (busquedaHero) busquedaHero.focus();
  }, 400);
}

/* ── Modal ──────────────────────────────────── */
function abrirModal(titulo, tipo, sub, cuerpo, icono) {
  const mTitle = document.getElementById('m-title');
  const mTipo = document.getElementById('m-tipo');
  const mSub = document.getElementById('m-sub');
  const mBody = document.getElementById('m-body');
  const mIcon = document.getElementById('m-icon');
  const modalBg = document.getElementById('modal-bg');
  
  if (mTitle) mTitle.textContent = titulo;
  if (mTipo) mTipo.textContent  = tipo;
  if (mSub) mSub.textContent   = sub;
  if (mBody) mBody.textContent  = cuerpo;
  if (mIcon) mIcon.textContent  = icono;
  if (modalBg) modalBg.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cerrarModal() {
  const modalBg = document.getElementById('modal-bg');
  if (modalBg) modalBg.classList.remove('open');
  document.body.style.overflow = '';
}

function cerrarModalFondo(e) {
  const modalBg = document.getElementById('modal-bg');
  if (e.target === modalBg) cerrarModal();
}

document.addEventListener('keydown', e => { if (e.key === 'Escape') cerrarModal(); });

/* ── Cargar más (demo) ──────────────────────── */
function cargarMas(e) {
  const btn = e.currentTarget;
  btn.textContent = 'Cargando…';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Todos los recursos cargados`;
    btn.disabled = false;
  }, 1100);
}

/* ── Formulario Deja Apunte ────────────────── */
function enviarApunte(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const apunte = {
    materia: formData.get('materia'),
    tema: formData.get('tema'),
    descripcion: formData.get('descripcion'),
    tipo: formData.get('tipo'),
    link: formData.get('link'),
    nombre: formData.get('nombre') || 'Anónimo',
    fecha: new Date().toLocaleString('es-AR'),
    estado: 'pendiente'
  };
  
  let apuntes = JSON.parse(localStorage.getItem('apuntes') || '[]');
  apuntes.push(apunte);
  localStorage.setItem('apuntes', JSON.stringify(apuntes));
  
  const successMsg = document.getElementById('successMessage');
  if (successMsg) {
    successMsg.style.display = 'flex';
    setTimeout(() => {
      successMsg.style.display = 'none';
    }, 5000);
  }
  
  event.target.reset();
}

/* ── Formulario Contacto ──────────────────── */
function enviarContacto(event) {
  event.preventDefault();
  
  const formData = new FormData(event.target);
  const datos = {
    nombre: formData.get('nombre'),
    email: formData.get('email'),
    asunto: formData.get('asunto'),
    mensaje: formData.get('mensaje'),
    fecha: new Date().toLocaleString('es-AR')
  };
  
  let contactos = JSON.parse(localStorage.getItem('contactos') || '[]');
  contactos.push(datos);
  localStorage.setItem('contactos', JSON.stringify(contactos));
  
  event.target.reset();
  alert('¡Gracias por tu mensaje! Nos comunicaremos pronto.');
}

/* ── Tabs (Ingreso) ────────────────────────── */
function mostrarTab(tab, btn) {
  document.querySelectorAll('[id^="tab-"]').forEach(el => el.style.display = 'none');
  const tabElement = document.getElementById('tab-' + tab);
  if (tabElement) tabElement.style.display = 'grid';
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  if (btn) btn.classList.add('active');
}

/* ── Admin Panel ────────────────────────────– */
function mostrarTabAdmin(tab) {
  document.querySelectorAll('#tab-materiales, #tab-aportes, #tab-calendario, #tab-links, #tab-planes').forEach(el => el.style.display = 'none');
  const tabElement = document.getElementById('tab-' + tab);
  if (tabElement) tabElement.style.display = 'block';
  
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');

  if (tab === 'links') {
    cargarLinksEdit();
  } else if (tab === 'planes') {
    cargarPlanes();
  }
}

/* ── Planes de Estudio - Acordiones ────────── */
const defaultPlanes = [
  {
    nombre: 'Ingeniería en Informática',
    descripcion: 'Plan de estudios completo para la Ingeniería en Informática, con asignaturas de programación, bases de datos, sistemas operativos y más.',
    tipo: 'licenciatura',
    duracion: '5 años - 10 cuatrimestres',
    vigencia: '',
    imagen: '',
    url: '#'
  },
  {
    nombre: 'Ingeniería en Inteligencia Artificial',
    descripcion: 'Carrera especializada en Inteligencia Artificial con énfasis en machine learning, deep learning, procesamiento de lenguaje natural y sistemas inteligentes.',
    tipo: 'licenciatura',
    duracion: '5 años - 10 cuatrimestres',
    vigencia: '',
    imagen: '',
    url: '#'
  },
  {
    nombre: 'Ingeniería en Agrimensura',
    descripcion: 'Formación en topografía, cartografía, geodesia y gestión territorial para profesionales especializados en medición y representación del territorio.',
    tipo: 'licenciatura',
    duracion: '5 años - 10 cuatrimestres',
    vigencia: '',
    imagen: '',
    url: '#'
  },
  {
    nombre: 'Ingeniería Ambiental',
    descripcion: 'Formación en sostenibilidad, gestión ambiental, tratamiento de residuos y conservación de recursos naturales para ingenieros comprometidos con el medio ambiente.',
    tipo: 'licenciatura',
    duracion: '5 años - 10 cuatrimestres',
    vigencia: '',
    imagen: '',
    url: '#'
  },
  {
    nombre: 'Ingeniería en Recursos Hídricos',
    descripcion: 'Especialización en gestión y aprovechamiento de recursos hídricos, hidrología, obras hidráulicas y sistemas de riego para profesionales de la ingeniería del agua.',
    tipo: 'licenciatura',
    duracion: '5 años - 10 cuatrimestres',
    vigencia: 'Plan 2006/2025',
    imagen: '',
    url: '#'
  },
  {
    nombre: 'Analista en Informática Aplicada',
    descripcion: 'Formación en análisis de sistemas, desarrollo de software y aplicaciones informáticas. Carrera intermedia que permite seguir a Ingeniería en Informática.',
    tipo: 'intermedia',
    duracion: '3 años - 6 cuatrimestres',
    vigencia: '',
    imagen: '',
    url: '#'
  },
  {
    nombre: 'Perito Topocartógrafo',
    descripcion: 'Formación en topografía y cartografía. Carrera intermedia que habilita profesionales técnicos especializados en medición y representación del territorio.',
    tipo: 'intermedia',
    duracion: '3 años - 6 cuatrimestres',
    vigencia: '',
    imagen: '',
    url: '#'
  },
  {
    nombre: 'Tecnicatura Universitaria en Automatización y Robótica',
    descripcion: 'Especialización en sistemas de automatización industrial, robótica, control y electrónica. Formación técnica para profesionales del sector industrial.',
    tipo: 'tecnicatura',
    duracion: '2 años - 4 cuatrimestres',
    vigencia: '',
    imagen: '',
    url: '#'
  }
];

const iconosPlan = {
  'Ingeniería en Informática': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 3v2H7a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2v-2h2V3H9zm0 2h6v2H9V5zm6 14H7V9h8v10z"/></svg>',
  'Ingeniería en Inteligencia Artificial': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>',
  'Ingeniería en Agrimensura': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.894L9 7.382v12.618zM9 9l6-3.618v12.236L9 21V9zm6 5.618l5.447-3.272A1 1 0 0122 11.382v10.236a1 1 0 01-1.553.894L15 18.618v-3.382z"/></svg>',
  'Ingeniería Ambiental': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h.5A2.5 2.5 0 0016 5.5V3.935m0 2.946a24.881 24.881 0 015.945 2.134C20.285 7.773 21 9.159 21 10.5a6 6 0 11-12 0c0-1.341.715-2.727 1.318-4.384a24.88 24.88 0 015.564-2.409V5.881zm6.798 4.959a1 1 0 10-1.414-1.414l-3.85 3.85a1 1 0 001.415 1.414l3.849-3.85zm4.18-4.176a1 1 0 10-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM9 12a1 1 0 100-2 1 1 0 000 2z"/></svg>',
  'Ingeniería en Recursos Hídricos': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/></svg>',
  'Analista en Informática Aplicada': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>',
  'Perito Topocartógrafo': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.553-.894L9 7.382v12.618zm0-12L15.5 3v12.618l-6.5 3.882V8zm8 5.236L9.5 21l8-4.764V8.236z"/></svg>',
  'Tecnicatura Universitaria en Automatización y Robótica': '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M10.5 1.5H3.75A2.25 2.25 0 001.5 3.75v16.5A2.25 2.25 0 003.75 22.5h16.5a2.25 2.25 0 002.25-2.25V12m-18-5.25h5.25m-5.25 4.5h5.25M9 3.75a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"/></svg>'
};

function getTypeClass(tipo) {
  if (tipo === 'licenciatura') return 'ingenieria';
  if (tipo === 'intermedia') return 'analista';
  if (tipo === 'tecnicatura') return 'tecnicatura';
  return '';
}

function getTypeLabel(tipo) {
  if (tipo === 'licenciatura') return 'Licenciatura';
  if (tipo === 'intermedia') return 'Carrera Intermedia';
  if (tipo === 'tecnicatura') return 'Tecnicatura';
  return tipo;
}

function abrirModalImagen(imagenSrc) {
  const modal = document.getElementById('modalImagen');
  const img = document.getElementById('modalImg');
  if (modal && img) {
    img.src = imagenSrc;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function cerrarModalImagen(event) {
  if (event && event.target.id !== 'modalImagen') return;
  const modal = document.getElementById('modalImagen');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') cerrarModalImagen();
});

function generarAcordiones() {
  const planes = JSON.parse(localStorage.getItem('planesEstudio') || JSON.stringify(defaultPlanes));
  const container = document.getElementById('acordionesContainer');
  const planesCount = document.querySelector('.planes-count');
  
  if (!container) return;
  
  if (planesCount) planesCount.textContent = `${planes.length} Carreras disponibles`;
  
  container.innerHTML = planes.map((plan, index) => `
    <div class="accordion">
      <div class="accordion-header" onclick="toggleAccordion(this)">
        <div class="accordion-title">
          <div class="carrera-icon">
            ${iconosPlan[plan.nombre] || '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 6.253v13m0-13C6.5 6.253 2 10.753 2 16.5S6.5 26.747 12 26.747s10-4.5 10-10.247S17.5 6.253 12 6.253z"/></svg>'}
          </div>
          <h3>${plan.nombre}</h3>
        </div>
        <div class="accordion-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
          </svg>
        </div>
      </div>
      <div class="accordion-content">
        <div class="accordion-body">
          <span class="carrera-type ${getTypeClass(plan.tipo)}">${getTypeLabel(plan.tipo)}</span>
          
          ${plan.imagen ? `
            <div class="plan-image-container" onclick="abrirModalImagen('${plan.imagen}')">
              <img src="${plan.imagen}" alt="${plan.nombre}">
            </div>
          ` : `
            <div class="plan-image-container">
              <div class="plan-image-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" style="width:48px;height:48px;margin-bottom:8px;">
                  <path d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                Sin imagen disponible
              </div>
            </div>
          `}
          
          <a href="${plan.url}" class="download-btn" ${plan.url === '#' ? 'onclick="event.preventDefault(); alert(\'PDF no disponible aún\')"' : 'target="_blank"'}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
            Descargar Plan
          </a>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleAccordion(header) {
  const accordion = header.parentElement;
  const isActive = accordion.classList.contains('active');
  
  document.querySelectorAll('.accordion').forEach(acc => {
    acc.classList.remove('active');
  });
  
  if (!isActive) {
    accordion.classList.add('active');
  }
}

document.addEventListener('click', function(event) {
  if (!event.target.closest('.accordion')) {
    document.querySelectorAll('.accordion').forEach(acc => {
      acc.classList.remove('active');
    });
  }
});

window.addEventListener('storage', function(e) {
  if (e.key === 'planesEstudio') {
    generarAcordiones();
  }
});

/* ── Ingreso - Cargar Materiales ────────────── */
function toggleAccordion(button) {
  const content = button.closest('.resource-card').querySelector('.accordion-content');
  button.classList.toggle('active');
  content.classList.toggle('active');
}

function cargarMateriales() {
  const materiales = JSON.parse(localStorage.getItem('materiales') || '[]');
  const container = document.getElementById('materialesContainer');

  if (!container) return;

  if (materiales.length === 0) {
    container.innerHTML = `
      <div style="font-family:'Syne',sans-serif;font-size:.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.1em;">Material de Estudio</div>
      <div style="color:var(--text-soft);padding:20px;text-align:center;">
        No hay materiales disponibles. Visita el <a href="admin.html" style="color:var(--verde-400);">panel de admin</a> para agregar.
      </div>
    `;
    return;
  }

  let html = '<div style="font-family:\'Syne\',sans-serif;font-size:.75rem;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:.1em;">Material de Estudio</div>';

  materiales.forEach((material) => {
    const linksHtml = (material.links || []).map(l => `
      <a href="${l.url}" target="_blank" rel="noopener noreferrer" class="submenu-btn">🔗 ${l.label}</a>
    `).join('');

    html += `
      <div class="resource-card">
        <button onclick="toggleAccordion(this)" class="accordion-toggle">
          <div style="display:flex;align-items:center;gap:16px;flex:1;text-align:left;">
            <div class="icon-wrap" style="background:rgba(34,196,110,.12);">📂</div>
            <div>
              <div style="color:#fff;font-weight:600;font-size:1rem;">${material.nombre}</div>
              <div style="color:var(--text-muted);font-size:.75rem;">${material.descripcion}</div>
            </div>
          </div>
        </button>
        <div class="accordion-content">
          <div class="accordion-submenu">
            ${linksHtml}
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

document.addEventListener('DOMContentLoaded', cargarMateriales);

window.addEventListener('storage', function() {
  cargarMateriales();
});

// Inicializar acordiones cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', generarAcordiones);
} else {
  generarAcordiones();
}

/* ── Calendario - Generador ────────────────── */
const defaultSpecialDates = {
  2: { 15: 'inscripcion', 16: 'inscripcion' },
  3: { 20: 'examen', 21: 'examen', 22: 'examen', 23: 'examen', 24: 'examen', 25: 'examen', 26: 'examen', 27: 'examen' },
  5: { 16: 'examen', 17: 'examen', 18: 'examen', 19: 'examen', 20: 'examen', 29: 'special', 30: 'examen' },
  6: { 21: 'ciclo', 22: 'ciclo', 27: 'ciclo', 28: 'ciclo' },
  7: { 5: 'inscripcion', 6: 'inscripcion' },
  8: { 14: 'special', 15: 'examen', 16: 'examen', 17: 'examen', 18: 'examen', 19: 'examen', 20: 'examen', 21: 'examen', 22: 'examen', 23: 'examen' },
  9: { 5: 'examen', 6: 'examen', 7: 'examen', 8: 'examen', 9: 'examen', 10: 'examen', 11: 'examen', 12: 'examen', 13: 'examen', 14: 'examen', 19: 'examen', 20: 'examen', 21: 'examen', 22: 'examen', 23: 'examen', 24: 'examen', 25: 'examen', 26: 'examen' },
  10: { 9: 'recursado', 10: 'recursado', 11: 'recursado', 12: 'recursado', 13: 'recursado', 14: 'recursado', 15: 'recursado', 16: 'recursado', 17: 'recursado', 23: 'examen', 24: 'examen', 25: 'examen', 26: 'examen', 27: 'examen', 28: 'examen', 29: 'examen' },
  11: { 7: 'special', 8: 'special', 9: 'special', 10: 'special', 11: 'special', 12: 'special', 13: 'special', 14: 'special', 15: 'special', 21: 'receso', 22: 'receso' }
};

const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const days = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

function generateCalendar() {
  const container = document.getElementById('calendarGrid');
  if (!container) return;

  let specialDates = JSON.parse(localStorage.getItem('specialDates') || JSON.stringify(defaultSpecialDates));
  const year = 2026;
  
  container.innerHTML = '';
  
  for (let month = 2; month < 12; month++) {
    const firstDay = new Date(year, month, 1).getDay();
    const lastDay = new Date(year, month + 1, 0).getDate();
    
    let html = `
      <div class="month">
        <div class="month-name">${months[month]}</div>
        <table class="calendar-table">
          <tr>
            ${days.map(d => `<th>${d}</th>`).join('')}
          </tr>
    `;
    
    let dayCount = 0;
    
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) {
      html += '<td><span class="calendar-day day-empty">-</span></td>';
    }
    
    for (let day = 1; day <= lastDay; day++) {
      const dateType = specialDates[month] && specialDates[month][day] ? specialDates[month][day] : null;
      const dayClass = dateType ? `day-${dateType}` : '';
      
      html += `<td><span class="calendar-day ${dayClass}" data-date="${months[month]} ${day}" data-type="${dateType || 'normal'}">${day}</span></td>`;
      
      dayCount++;
      if ((dayCount + (firstDay === 0 ? 6 : firstDay - 1)) % 7 === 0) {
        html += '</tr><tr>';
      }
    }
    
    while ((dayCount + (firstDay === 0 ? 6 : firstDay - 1)) % 7 !== 0) {
      html += '<td><span class="calendar-day day-empty">-</span></td>';
      dayCount++;
    }
    
    html += `</tr></table></div>`;
    
    container.innerHTML += html;
  }
  
  document.querySelectorAll('.calendar-day[data-type]').forEach(day => {
    day.addEventListener('click', function() {
      const type = this.dataset.type;
      if (type !== 'normal') {
        showDateTooltip(this, type);
      }
    });
  });
}

function showDateTooltip(element, type) {
  const eventNames = {
    'inscripcion': 'Inscripción turno de examen',
    'examen': 'Turno de examen',
    'cursado': 'Inicio/fin cursado',
    'recursado': 'Inscripción recursado',
    'receso': 'Receso',
    'ciclo': 'Turno de examen ciclo superior',
    'special': 'Examen Final'
  };
  
  alert(`${element.dataset.date}\n${eventNames[type] || type}`);
}

window.addEventListener('storage', function(e) {
  if (e.key === 'specialDates') {
    generateCalendar();
  }
});

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', generateCalendar);
} else {
  generateCalendar();
}
