// ============ LINKS ÚTILES ============
const defaultLinks = [
  { label: 'Página de la FACU', url: 'https://fich.unl.edu.ar' },
  { label: 'SIU GUARANÍ', url: 'https://guarani.unl.edu.ar' },
  { label: 'E-FICH', url: 'https://e.fich.unl.edu.ar' },
  { label: '¡Entérate de nuestras actividades!', url: 'https://instagram.com/ingresoofich2026' },
  { label: 'Mails de Profes', url: 'https://bibliotecafich.blogspot.com' }
];

const defaultPlanes = [
  {
    nombre: 'Ingeniería en Informática',
    tipo: 'licenciatura',
    imagen: '',
    url: '#'
  },
  {
    nombre: 'Ingeniería en Inteligencia Artificial',
    tipo: 'licenciatura',
    imagen: '',
    url: '#'
  },
  {
    nombre: 'Ingeniería en Agrimensura',
    tipo: 'licenciatura',
    imagen: '',
    url: '#'
  },
  {
    nombre: 'Ingeniería Ambiental',
    tipo: 'licenciatura',
    imagen: '',
    url: '#'
  },
  {
    nombre: 'Ingeniería en Recursos Hídricos',
    tipo: 'licenciatura',
    imagen: '',
    url: '#'
  },
  {
    nombre: 'Analista en Informática Aplicada',
    tipo: 'intermedia',
    imagen: '',
    url: '#'
  },
  {
    nombre: 'Perito Topocartógrafo',
    tipo: 'intermedia',
    imagen: '',
    url: '#'
  },
  {
    nombre: 'Tecnicatura Universitaria en Automatización y Robótica',
    tipo: 'tecnicatura',
    imagen: '',
    url: '#'
  }
];

function cargarLinksEdit() {
  const links = JSON.parse(localStorage.getItem('usufulLinks') || JSON.stringify(defaultLinks));
  const container = document.getElementById('linksEditContainer');
  
  container.innerHTML = links.map((link, index) => `
    <div class="link-edit-item">
      <input type="text" placeholder="Etiqueta" value="${link.label}" class="link-label-input" data-index="${index}">
      <input type="url" placeholder="https://..." value="${link.url}" class="link-url-input" data-index="${index}">
      <button type="button" class="btn-delete btn-small" onclick="eliminarLink(${index})">✕</button>
    </div>
  `).join('');
  
  actualizarPreview();
}

function guardarLinks() {
  const inputs = document.querySelectorAll('.link-edit-item');
  const links = [];
  
  inputs.forEach(item => {
    const label = item.querySelector('.link-label-input').value.trim();
    const url = item.querySelector('.link-url-input').value.trim();
    if (label && url) {
      links.push({ label, url });
    }
  });
  
  if (links.length === 0) {
    alert('Debes tener al menos un link');
    return;
  }
  
  localStorage.setItem('usufulLinks', JSON.stringify(links));
  alert('Links guardados correctamente');
  cargarLinksEdit();
}

function eliminarLink(index) {
  const links = JSON.parse(localStorage.getItem('usufulLinks') || JSON.stringify(defaultLinks));
  links.splice(index, 1);
  localStorage.setItem('usufulLinks', JSON.stringify(links));
  cargarLinksEdit();
}

function actualizarPreview() {
  const links = JSON.parse(localStorage.getItem('usufulLinks') || JSON.stringify(defaultLinks));
  const preview = document.getElementById('linksPreview');
  
  preview.innerHTML = links.map(link => `
    <div style="background: rgba(34,196,110,.05); border: 1px solid rgba(34,196,110,.15); border-radius: 8px; padding: 16px; display: flex; justify-content: space-between; align-items: center; gap: 12px;">
      <div style="flex: 1;">
        <div style="color: #fff; font-weight: 600; font-size: 0.95rem; margin-bottom: 4px;">${link.label}</div>
        <div style="color: var(--text-muted); font-size: 0.75rem; word-break: break-all;">${link.url}</div>
      </div>
      <a href="${link.url}" target="_blank" style="background: var(--verde-500); color: #000; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; font-size: 0.8rem; cursor: pointer; transition: all 0.2s ease; text-decoration: none;">Ir</a>
    </div>
  `).join('');
}

// ============ CALENDARIO ============
let calendarConfig = JSON.parse(localStorage.getItem('calendarConfig') || '{"year": 2026, "highlightColor": "rgba(34,196,110,.25)", "examColor": "rgba(34,196,110,.15)"}');
let specialDates = JSON.parse(localStorage.getItem('specialDates') || '{}');

const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

function guardarConfigCalendar() {
  localStorage.setItem('calendarConfig', JSON.stringify(calendarConfig));
  alert('Configuración guardada');
  refrescarCalendario();
}

function selectColor(type, element) {
  if (type === 'highlight') {
    calendarConfig.highlightColor = window.getComputedStyle(element).backgroundColor;
  } else {
    calendarConfig.examColor = window.getComputedStyle(element).backgroundColor;
  }
}

function agregarFecha() {
  const mes = parseInt(document.getElementById('fechaMes').value);
  const dia = parseInt(document.getElementById('fechaDia').value);
  const tipo = document.getElementById('fechaTipo').value;

  if (!dia) {
    alert('Ingresa un día');
    return;
  }

  if (!specialDates[mes]) specialDates[mes] = {};
  specialDates[mes][dia] = tipo;
  
  localStorage.setItem('specialDates', JSON.stringify(specialDates));
  cargarFechas();
  
  document.getElementById('fechaDia').value = '';
  alert('Fecha agregada correctamente');
}

function cargarFechas() {
  const container = document.getElementById('fechasContainer');
  let html = '';

  Object.keys(specialDates).forEach(mes => {
    Object.keys(specialDates[mes]).forEach(dia => {
      const tipo = specialDates[mes][dia];
      html += `
        <div class="fecha-item">
          <div style="color: #fff;">${meses[mes]} ${dia}</div>
          <div style="color: var(--text-soft); font-size: 0.85rem;">${tipo}</div>
          <button type="button" onclick="eliminarFecha(${mes}, ${dia})" class="btn-delete btn-small">Eliminar</button>
        </div>
      `;
    });
  });

  container.innerHTML = html || '<div style="color:var(--text-muted);text-align:center;">Sin fechas configuradas</div>';
}

function eliminarFecha(mes, dia) {
  delete specialDates[mes][dia];
  if (Object.keys(specialDates[mes]).length === 0) delete specialDates[mes];
  localStorage.setItem('specialDates', JSON.stringify(specialDates));
  cargarFechas();
}

function refrescarCalendario() {
  window.location.reload();
}

// ============ MATERIALES ============
function mostrarTab(tab) {
  document.querySelectorAll('#tab-materiales, #tab-aportes, #tab-calendario, #tab-links, #tab-planes').forEach(el => el.style.display = 'none');
  document.getElementById('tab-' + tab).style.display = 'block';
  
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  if (tab === 'links') {
    cargarLinksEdit();
  } else if (tab === 'planes') {
    cargarPlanes();
  }
}

function cargarMateriales() {
  const materiales = JSON.parse(localStorage.getItem('materiales') || '[]');
  const materialList = document.getElementById('materialList');
  
  if (materiales.length === 0) {
    materialList.innerHTML = '<div style="padding:24px;text-align:center;color:var(--text-muted);">Sin materiales agregados aún</div>';
    return;
  }
  
  materialList.innerHTML = materiales.map((material, index) => {
    const linksHtml = (material.links || []).map(l => 
      `<div style="color:var(--verde-400);font-size:.75rem;">→ ${l.label}: ${l.url}</div>`
    ).join('');
    
    return `
      <div class="material-item">
        <div class="material-info" style="flex:1;">
          <h4>${material.nombre}</h4>
          <p>${material.descripcion}</p>
          <div style="margin-top:8px;">${linksHtml}</div>
        </div>
        <div>
          <button onclick="eliminarMaterial(${index})" class="btn-delete">Eliminar</button>
        </div>
      </div>
    `;
  }).join('');
}

function cargarAportes() {
  const aportes = JSON.parse(localStorage.getItem('apuntes') || '[]');
  const aportsList = document.getElementById('aportsList');
  
  if (aportes.length === 0) {
    aportsList.innerHTML = '<div style="padding:24px;text-align:center;color:var(--text-muted);">Sin aportes pendientes</div>';
    return;
  }
  
  aportsList.innerHTML = aportes.map((aporte, index) => {
    const estado = aporte.estado || 'pendiente';
    const badgeClass = estado === 'aprobado' ? 'badge-aprobado' : 'badge-pendiente';
    const estadoText = estado === 'aprobado' ? 'Aprobado' : 'Pendiente';
    
    return `
      <div class="material-item">
        <div class="material-info" style="flex:1;">
          <h4>${aporte.materia} - ${aporte.tema}</h4>
          <p>Tipo: ${aporte.tipo} | Por: ${aporte.nombre}</p>
          <p>${aporte.descripcion}</p>
          <p style="color:var(--verde-400);font-size:.75rem;margin-top:6px;">Link: ${aporte.link}</p>
          <span class="badge-status ${badgeClass}">${estadoText}</span>
        </div>
        <div>
          ${estado === 'pendiente' ? `
            <button onclick="aprobarAporte(${index})" class="btn-edit btn-small">Aprobar</button>
            <button onclick="rechazarAporte(${index})" class="btn-delete btn-small">Rechazar</button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');
}

function aprobarAporte(index) {
  let aportes = JSON.parse(localStorage.getItem('apuntes') || '[]');
  aportes[index].estado = 'aprobado';
  localStorage.setItem('apuntes', JSON.stringify(aportes));
  cargarAportes();
}

function rechazarAporte(index) {
  if (confirm('¿Rechazar este aporte?')) {
    let aportes = JSON.parse(localStorage.getItem('apuntes') || '[]');
    aportes.splice(index, 1);
    localStorage.setItem('apuntes', JSON.stringify(aportes));
    cargarAportes();
  }
}

function addLinkRow(label = '', url = '') {
  const container = document.getElementById('linksContainer');
  const row = document.createElement('div');
  row.style.display = 'grid';
  row.style.gridTemplateColumns = '1fr 1fr auto';
  row.style.gap = '8px';
  row.innerHTML = `
    <input type="text" placeholder="Etiqueta" value="${label}" required>
    <input type="url" placeholder="https://..." value="${url}" required>
    <button type="button" class="btn-delete" style="padding:8px 10px;">✕</button>
  `;
  row.querySelector('.btn-delete').onclick = () => row.remove();
  container.appendChild(row);
}

document.getElementById('addLinkBtn').addEventListener('click', () => addLinkRow());
addLinkRow('Temas', '');
addLinkRow('Exámenes', '');

document.getElementById('materialForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const links = [];
  const rows = document.querySelectorAll('#linksContainer > div');
  rows.forEach(row => {
    const label = row.querySelectorAll('input')[0].value.trim();
    const url = row.querySelectorAll('input')[1].value.trim();
    if (label && url) links.push({ label, url });
  });

  const material = {
    nombre: document.getElementById('nombreMaterial').value,
    descripcion: document.getElementById('descripcionMaterial').value,
    categoria: document.getElementById('categoriaMaterial').value,
    links
  };

  let materiales = JSON.parse(localStorage.getItem('materiales') || '[]');
  materiales.push(material);
  localStorage.setItem('materiales', JSON.stringify(materiales));

  this.reset();
  document.getElementById('linksContainer').innerHTML = '';
  addLinkRow('Temas', '');
  addLinkRow('Exámenes', '');

  cargarMateriales();
  alert('Material agregado');
});

function eliminarMaterial(index) {
  if (confirm('¿Eliminar este material?')) {
    let materiales = JSON.parse(localStorage.getItem('materiales') || '[]');
    materiales.splice(index, 1);
    localStorage.setItem('materiales', JSON.stringify(materiales));
    cargarMateriales();
  }
}

// ============ PLANES DE ESTUDIO ============
function cargarPlanes() {
  const planes = JSON.parse(localStorage.getItem('planesEstudio') || JSON.stringify(defaultPlanes));
  const container = document.getElementById('planesContainer');
  
  if (planes.length === 0) {
    container.innerHTML = '<div style="padding:24px;text-align:center;color:var(--text-muted);grid-column:1/-1;">Sin planes agregados aún</div>';
    return;
  }
  
  const typeLabels = {
    'licenciatura': 'Licenciatura',
    'intermedia': 'Intermedia',
    'tecnicatura': 'Tecnicatura'
  };
  
  container.innerHTML = planes.map((plan, index) => `
    <div class="plan-card">
      <div class="plan-card-image">
        ${plan.imagen ? `<img src="${plan.imagen}" alt="${plan.nombre}">` : '<div style="color:var(--text-muted);font-size:0.8rem;">Sin imagen</div>'}
      </div>
      <div class="plan-card-body">
        <h5>${plan.nombre}</h5>
        <p>${typeLabels[plan.tipo] || plan.tipo}</p>
      </div>
      <div class="plan-card-actions">
        <button onclick="editarPlan(${index})" class="btn-edit">Editar</button>
        <button onclick="eliminarPlan(${index})" class="btn-delete">Eliminar</button>
      </div>
    </div>
  `).join('');
}

document.getElementById('planForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const plan = {
    nombre: document.getElementById('planNombre').value,
    tipo: document.getElementById('planTipo').value,
    imagen: document.getElementById('planImagen').dataset.base64 || '',
    url: document.getElementById('planUrl').value
  };

  let planes = JSON.parse(localStorage.getItem('planesEstudio') || JSON.stringify(defaultPlanes));
  planes.push(plan);
  localStorage.setItem('planesEstudio', JSON.stringify(planes));

  this.reset();
  document.getElementById('planImagenPreview').style.display = 'none';
  cargarPlanes();
  alert('Plan agregado correctamente');
});

function eliminarPlan(index) {
  if (confirm('¿Eliminar este plan?')) {
    let planes = JSON.parse(localStorage.getItem('planesEstudio') || JSON.stringify(defaultPlanes));
    planes.splice(index, 1);
    localStorage.setItem('planesEstudio', JSON.stringify(planes));
    cargarPlanes();
  }
}

function editarPlan(index) {
  const planes = JSON.parse(localStorage.getItem('planesEstudio') || JSON.stringify(defaultPlanes));
  const plan = planes[index];
  
  document.getElementById('planNombre').value = plan.nombre;
  document.getElementById('planTipo').value = plan.tipo;
  document.getElementById('planUrl').value = plan.url;
  
  if (plan.imagen) {
    document.getElementById('planImagenPreview').style.display = 'block';
    document.getElementById('planImagenImg').src = plan.imagen;
  }
  
  const originalForm = document.getElementById('planForm');
  const saveBtn = originalForm.querySelector('.btn-submit');
  saveBtn.textContent = 'Actualizar Plan';
  
  const submitHandler = function(e) {
    e.preventDefault();
    
    planes[index] = {
      nombre: document.getElementById('planNombre').value,
      tipo: document.getElementById('planTipo').value,
      imagen: document.getElementById('planImagen').dataset.base64 || plan.imagen,
      url: document.getElementById('planUrl').value
    };
    
    localStorage.setItem('planesEstudio', JSON.stringify(planes));
    originalForm.reset();
    document.getElementById('planImagenPreview').style.display = 'none';
    saveBtn.textContent = 'Agregar Plan';
    originalForm.removeEventListener('submit', submitHandler);
    document.getElementById('planForm').addEventListener('submit', arguments.callee);
    cargarPlanes();
    alert('Plan actualizado correctamente');
  };
  
  originalForm.removeEventListener('submit', originalForm.onsubmit);
  originalForm.addEventListener('submit', submitHandler);
  
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============ MANEJO DE IMÁGENES ============
document.getElementById('planImagen').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(event) {
      document.getElementById('planImagen').dataset.base64 = event.target.result;
      document.getElementById('planImagenPreview').style.display = 'block';
      document.getElementById('planImagenImg').src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

// Drag and drop para imágenes
const fileLabel = document.querySelector('.file-input-label');
fileLabel.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileLabel.style.background = 'rgba(34,196,110,.2)';
});

fileLabel.addEventListener('dragleave', () => {
  fileLabel.style.background = 'rgba(34,196,110,.1)';
});

fileLabel.addEventListener('drop', (e) => {
  e.preventDefault();
  fileLabel.style.background = 'rgba(34,196,110,.1)';
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    document.getElementById('planImagen').files = files;
    const event = new Event('change', { bubbles: true });
    document.getElementById('planImagen').dispatchEvent(event);
  }
});

// Inicializar
document.getElementById('calendarYear').value = calendarConfig.year;
cargarMateriales();
cargarAportes();
cargarFechas();

// ═══════════════════════════════════════════════════════════════
// GESTIÓN DE MATERIAS POR CARRERA (localStorage)
// ═══════════════════════════════════════════════════════════════

const iconosDisponibles = [
  { id: 'chart', name: 'Gráfico', svg: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>' },
  { id: 'code', name: 'Código', svg: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>' },
  { id: 'grid', name: 'Grid', svg: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>' },
  { id: 'circle', name: 'Círculo', svg: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>' },
  { id: 'message', name: 'Mensaje', svg: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>' },
  { id: 'box', name: 'Caja', svg: '<path d="M3 3h18v18H3z"></path><path d="M9 9h6v6H9z"></path>' },
  { id: 'check', name: 'Check', svg: '<polyline points="20 6 9 17 4 12"></polyline>' },
  { id: 'book', name: 'Libro', svg: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5a2.5 2.5 0 0 1-2.5-2.5v-15a2.5 2.5 0 0 1 2.5-2.5z"/>' }
];

let carreraActual = 'ing_informatica';
let materiasData = {};
let materiaEditandoId = null;

// Inicializar
function inicializarMaterias() {
  const formElement = document.getElementById('materiaForm');
  if (!formElement) return;

  cargarDatosMaterias();
  cargarIconos();
  cargarMaterias();
  
  formElement.addEventListener('submit', (e) => {
    e.preventDefault();
    guardarMateria();
  });
}

function cargarDatosMaterias() {
  const datos = localStorage.getItem('materiasCarreras');
  if (datos) {
    try {
      materiasData = JSON.parse(datos);
    } catch (e) {
      console.error('Error al parsear materias:', e);
      inicializarMateriasPorDefecto();
    }
  } else {
    inicializarMateriasPorDefecto();
  }
}

function inicializarMateriasPorDefecto() {
  materiasData = {
    ing_informatica: [],
    ing_ambiental: [],
    ing_agrimensura: [],
    ing_recursos_hidricos: [],
    ing_ia: []
  };
  guardarDatosMaterias();
}

function guardarDatosMaterias() {
  localStorage.setItem('materiasCarreras', JSON.stringify(materiasData));
}

function cambiarCarrera() {
  carreraActual = document.getElementById('carreraSelect').value;
  materiaEditandoId = null;
  limpiarFormulario();
  cargarMaterias();
}

function cargarIconos() {
  const container = document.getElementById('iconosContainer');
  if (!container) return;

  container.innerHTML = iconosDisponibles.map((icono, index) => `
    <div class="icono-option ${index === 0 ? 'selected' : ''}" 
         onclick="seleccionarIcono('${icono.id}', this)"
         title="${icono.name}"
         data-icono="${icono.id}">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--verde-500)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${icono.svg}
      </svg>
    </div>
  `).join('');
}

function seleccionarIcono(id, element) {
  document.querySelectorAll('.icono-option').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');
  document.getElementById('materiaIcono').value = id;
}

function guardarMateria() {
  const ano = parseInt(document.getElementById('materiaAno').value);
  const cuatrimestre = parseInt(document.getElementById('materiaCuatrimestre').value);
  const nombre = document.getElementById('materiaNombre').value;
  const descripcion = document.getElementById('materiaDescripcion').value;
  const link = document.getElementById('materiaLink').value;
  const icono = document.getElementById('materiaIcono').value;
  const color = document.getElementById('materiaColor').value;

  if (!ano || !nombre || !descripcion) {
    alert('Completa los campos requeridos: Año, Nombre y Descripción');
    return;
  }

  const materia = {
    id: materiaEditandoId || Date.now(),
    ano,
    cuatrimestre,
    nombre,
    descripcion,
    link: link || '',
    icono,
    color
  };

  if (!materiasData[carreraActual]) {
    materiasData[carreraActual] = [];
  }

  if (materiaEditandoId) {
    materiasData[carreraActual] = materiasData[carreraActual].map(m => 
      m.id === materiaEditandoId ? materia : m
    );
    materiaEditandoId = null;
    alert('✓ Materia actualizada exitosamente');
  } else {
    materiasData[carreraActual].push(materia);
    alert('✓ Materia agregada exitosamente');
  }

  guardarDatosMaterias();
  limpiarFormulario();
  cargarMaterias();
}

function limpiarFormulario() {
  const form = document.getElementById('materiaForm');
  if (form) form.reset();
  
  document.getElementById('materiaIcono').value = 'chart';
  document.getElementById('materiaColor').value = '#22c46e';
  document.getElementById('formTitulo').textContent = 'Agregar Nueva Materia';
  
  const btnCancelar = document.getElementById('btnCancelarEdicion');
  if (btnCancelar) btnCancelar.style.display = 'none';
  
  document.querySelectorAll('.icono-option').forEach((el, i) => {
    el.classList.toggle('selected', i === 0);
  });
}

function cargarMaterias() {
  const container = document.getElementById('materiasOrganizadas');
  if (!container) return;

  const materias = materiasData[carreraActual] || [];

  if (materias.length === 0) {
    container.innerHTML = '<div style="color:var(--text-muted);text-align:center;padding:40px;grid-column:1/-1;">Sin materias agregadas. ¡Crea la primera!</div>';
    return;
  }

  // Agrupar por año
  const porAno = {};
  materias.forEach(materia => {
    if (!porAno[materia.ano]) {
      porAno[materia.ano] = { 1: [], 2: [] };
    }
    porAno[materia.ano][materia.cuatrimestre].push(materia);
  });

  let html = '';
  for (let ano = 1; ano <= 5; ano++) {
    if (!porAno[ano]) continue;

    html += `<div class="ano-section">
      <h4>Año ${ano}</h4>`;

    [1, 2].forEach(cuatrimestre => {
      const materiasCuat = porAno[ano][cuatrimestre];
      const nombreCuat = cuatrimestre === 1 ? '1.er Cuatrimestre' : '2.do Cuatrimestre';

      html += `<div class="cuatrimestre-section">
        <h5>${nombreCuat}</h5>
        <div class="materias-grid">`;

      if (materiasCuat.length === 0) {
        html += '<div class="materia-vacia">Sin materias</div>';
      } else {
        html += materiasCuat.map(materia => {
          const iconoData = iconosDisponibles.find(i => i.id === materia.icono);
          const svgContent = iconoData ? iconoData.svg : iconosDisponibles[0].svg;
          
          return `
            <div class="materia-card">
              <div class="materia-card-header">
                <div class="materia-card-icon" style="background: ${materia.color}20;">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="${materia.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    ${svgContent}
                  </svg>
                </div>
                <div class="materia-card-info">
                  <h6>${materia.nombre}</h6>
                  <p>Año ${materia.ano} • ${nombreCuat}</p>
                </div>
              </div>
              <p class="materia-card-desc">${materia.descripcion}</p>
              ${materia.link ? `<a href="${materia.link}" target="_blank" class="materia-card-link">🔗 Ver enlace</a>` : ''}
              <div class="materia-card-actions">
                <button class="btn-edit-card" onclick="editarMateria(${materia.id})">✏️ Editar</button>
                <button class="btn-delete-card" onclick="eliminarMateria(${materia.id})">🗑️ Eliminar</button>
              </div>
            </div>
          `;
        }).join('');
      }

      html += '</div></div>';
    });

    html += '</div>';
  }

  container.innerHTML = html;
}

function editarMateria(id) {
  const materia = (materiasData[carreraActual] || []).find(m => m.id === id);
  if (!materia) return;

  materiaEditandoId = id;
  document.getElementById('materiaAno').value = materia.ano;
  document.getElementById('materiaCuatrimestre').value = materia.cuatrimestre;
  document.getElementById('materiaNombre').value = materia.nombre;
  document.getElementById('materiaDescripcion').value = materia.descripcion;
  document.getElementById('materiaLink').value = materia.link || '';
  document.getElementById('materiaColor').value = materia.color;

  // Seleccionar ícono correcto
  document.querySelectorAll('.icono-option').forEach(el => {
    const isSelected = el.getAttribute('data-icono') === materia.icono;
    el.classList.toggle('selected', isSelected);
  });
  document.getElementById('materiaIcono').value = materia.icono;

  document.getElementById('formTitulo').textContent = `Editando: ${materia.nombre}`;
  document.getElementById('btnCancelarEdicion').style.display = 'block';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelarEdicion() {
  materiaEditandoId = null;
  limpiarFormulario();
}

function eliminarMateria(id) {
  if (confirm('¿Eliminar esta materia?')) {
    materiasData[carreraActual] = (materiasData[carreraActual] || []).filter(m => m.id !== id);
    guardarDatosMaterias();
    cargarMaterias();
    alert('✓ Materia eliminada');
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  inicializarMaterias();
});