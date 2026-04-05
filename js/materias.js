// Obtener datos de materias del localStorage
function obtenerMateriasCarrera(carrera) {
  const datos = localStorage.getItem('materiasCarreras');
  if (!datos) return [];
  
  try {
    const materiasData = JSON.parse(datos);
    return materiasData[carrera] || [];
  } catch (e) {
    console.error('Error cargando materias:', e);
    return [];
  }
}

const iconosDisponibles = {
  chart: '<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>',
  code: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',
  grid: '<rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect>',
  circle: '<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>',
  message: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>',
  box: '<path d="M3 3h18v18H3z"></path><path d="M9 9h6v6H9z"></path>',
  check: '<polyline points="20 6 9 17 4 12"></polyline>',
  book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6.5a2.5 2.5 0 0 1-2.5-2.5v-15a2.5 2.5 0 0 1 2.5-2.5z"/>',
};

// Generar contenido de materias
function generarContenidoMaterias(carrera) {
  const materias = obtenerMateriasCarrera(carrera);
  
  if (materias.length === 0) {
    for (let i = 1; i <= 5; i++) {
      const el = document.getElementById(`ano-${i}`);
      if (el) el.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:40px;">Sin materias agregadas</p>';
    }
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

  for (let ano = 1; ano <= 5; ano++) {
    if (!porAno[ano]) continue;

    const anoContent = document.getElementById(`ano-${ano}`);
    if (!anoContent) continue;

    let contenido = '';

    // 1ER CUATRIMESTRE
    const materias1 = porAno[ano][1];
    if (materias1.length > 0) {
      contenido += `
        <div style="margin-bottom:40px;">
          <h3 style="color:var(--verde-500);font-weight:700;margin-bottom:20px;font-family:'Syne',sans-serif;font-size:1.1rem;">
            1.er Cuatrimestre
          </h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
            ${materias1.map(materia => generarTarjetaMateria(materia)).join('')}
          </div>
        </div>
      `;
    }

    // 2DO CUATRIMESTRE
    const materias2 = porAno[ano][2];
    if (materias2.length > 0) {
      contenido += `
        <div>
          <h3 style="color:var(--verde-500);font-weight:700;margin-bottom:20px;font-family:'Syne',sans-serif;font-size:1.1rem;">
            2.do Cuatrimestre
          </h3>
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;">
            ${materias2.map(materia => generarTarjetaMateria(materia)).join('')}
          </div>
        </div>
      `;
    }

    anoContent.innerHTML = contenido;
  }
}

// Generar tarjeta de materia
function generarTarjetaMateria(materia) {
  const svgContent = iconosDisponibles[materia.icono] || iconosDisponibles.chart;
  
  return `
    <div class="materia-card" style="
      background:${materia.color}15;
      border:2px solid ${materia.color}30;
      border-radius:12px;
      padding:16px;
      transition:all .3s ease;
      display:flex;
      flex-direction:column;
      gap:12px;
    " onmouseover="this.style.background='${materia.color}25';this.style.borderColor='${materia.color}50';this.style.transform='translateY(-4px)';this.style.boxShadow='0 12px 24px rgba(0,0,0,.3)'" 
       onmouseout="this.style.background='${materia.color}15';this.style.borderColor='${materia.color}30';this.style.transform='translateY(0)';this.style.boxShadow='none'">
      
      <div style="display:flex;align-items:center;gap:12px;">
        <div style="
          width:44px;
          height:44px;
          border-radius:8px;
          background:${materia.color}20;
          display:flex;
          align-items:center;
          justify-content:center;
          flex-shrink:0;
        ">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="${materia.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            ${svgContent}
          </svg>
        </div>
        <div>
          <h4 style="color:#fff;font-weight:700;margin:0;font-size:0.95rem;">
            ${materia.nombre}
          </h4>
          <p style="color:var(--text-muted);font-size:0.8rem;margin:0;">
            Materia
          </p>
        </div>
      </div>

      <p style="color:var(--text-soft);font-size:0.85rem;line-height:1.5;margin:0;">
        ${materia.descripcion}
      </p>

      ${materia.link ? `
        <a href="${materia.link}" target="_blank" style="
          color:${materia.color};
          font-size:0.8rem;
          text-decoration:none;
          font-weight:600;
          word-break:break-all;
          transition:all .2s;
        " onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">
          🔗 Ver enlace
        </a>
      ` : ''}
    </div>
  `;
}

// Cargar materias cuando la página carga
document.addEventListener('DOMContentLoaded', () => {
  const urlActual = window.location.pathname;
  
  if (urlActual.includes('ing_informatica')) {
    generarContenidoMaterias('ing_informatica');
  } else if (urlActual.includes('ing_ambiental')) {
    generarContenidoMaterias('ing_ambiental');
  } else if (urlActual.includes('ing_agrimensura')) {
    generarContenidoMaterias('ing_agrimensura');
  } else if (urlActual.includes('ing_recursos_hidricos')) {
    generarContenidoMaterias('ing_recursos_hidricos');
  } else if (urlActual.includes('ing_ia')) {
    generarContenidoMaterias('ing_ia');
  }
});

// Actualizar materias cada vez que se abre el tab
window.addEventListener('focus', () => {
  const urlActual = window.location.pathname;
  
  if (urlActual.includes('ing_informatica')) {
    generarContenidoMaterias('ing_informatica');
  } else if (urlActual.includes('ing_ambiental')) {
    generarContenidoMaterias('ing_ambiental');
  } else if (urlActual.includes('ing_agrimensura')) {
    generarContenidoMaterias('ing_agrimensura');
  } else if (urlActual.includes('ing_recursos_hidricos')) {
    generarContenidoMaterias('ing_recursos_hidricos');
  } else if (urlActual.includes('ing_ia')) {
    generarContenidoMaterias('ing_ia');
  }
});