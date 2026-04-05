# 📁 Estructura del Proyecto - Biblioteca Digital CEICH

## 📂 Árbol de Carpetas Optimizado

```
testttt/
├── index.html                          # 🏠 Página principal
├── README.md                           # 📖 Documentación del proyecto
│
├── css/                                # 🎨 Estilos
│   ├── variables.css                   # 🔤 Variables CSS (colores, espacios, tipografía)
│   ├── global.css                      # 🌍 Estilos globales y reset
│   ├── navbar.css                      # 📍 Estilos del navbar reutilizable
│   ├── styles.css                      # 💅 Estilos específicos del sitio
│   ├── forms.css                       # 📝 Estilos de formularios
│   └── responsive.css                  # 📱 Media queries y responsividad
│
├── js/                                 # ⚙️ Scripts
│   ├── script.js                       # 🚀 Script principal
│   ├── navbar.js                       # 🧭 Interactividad del navbar
│   ├── search.js                       # 🔍 Lógica de búsqueda
│   ├── admin.js                        # 👨‍💼 Panel de administración
│   └── api.js                          # 🌐 Llamadas a API (futuro)
│
├── img/                                # 🖼️ Imágenes
│   ├── logos/
│   │   ├── logo-fich.png
│   │   ├── logo-ceich.png
│   │   └── biblioteca-digital.svg
│   ├── careers/
│   │   ├── informatica.jpg
│   │   ├── ia.jpg
│   │   ├── ambiental.jpg
│   │   ├── hidricos.jpg
│   │   └── agrimensura.jpg
│   ├── heroes/
│   │   └── hero-main.jpg
│   └── icons/
│       ├── book.svg
│       ├── upload.svg
│       └── download.svg
│
├── data/                               # 📊 Datos estáticos
│   ├── carrera.json                    # Información de carreras
│   ├── materias.json                   # Información de materias (futuro)
│   └── materiales.json                 # Catálogo de materiales (futuro)
│
├── docs/                               # 📚 Documentación
│   └── ESTRUCTURA.md                   # Este archivo
│
└── pages/                              # 📄 Páginas HTML
    ├── que_es_la_biblioteca.html       # ¿Qué es?
    ├── deja_apunte.html                # Formulario para subir apuntes
    ├── modelos_notas_reglamento.html   # Reglamentos y modelos
    ├── planes_estudio.html             # Planes de estudio
    ├── calendario_mail_clave.html      # Calendario académico
    ├── ingreso.html                    # Información de ingreso
    ├── admin.html                      # Panel de administración
    │
    └── carreras/                       # 🎓 Páginas por carrera
        ├── ing_informatica.html
        ├── ing_ia.html
        ├── ing_ambiental.html
        ├── ing_agrimensura.html
        └── ing_recursos_hidricos.html
```

## 🎨 Sistema de Variables CSS

### Colores
- **Navy 950:** `#020c1a` (Fondo principal)
- **Navy 900:** `#041728` (Cards)
- **Navy 700:** `#0d3360` (Bordes)
- **Verde 500:** `#22c46e` (Botones, highlights) ⭐
- **Verde 400:** `#36e68a` (Hover)

### Espacios (Rem)
- `--spacing-xs: 0.25rem` (4px)
- `--spacing-sm: 0.5rem` (8px)
- `--spacing-md: 1rem` (16px)
- `--spacing-lg: 1.5rem` (24px)
- `--spacing-xl: 2rem` (32px)
- `--spacing-2xl: 3rem` (48px)

### Border Radius
- `--radius-sm: 0.375rem` (6px)
- `--radius-md: 0.5rem` (8px)
- `--radius-lg: 0.75rem` (12px)
- `--radius-xl: 1rem` (16px)
- `--radius-2xl: 1.5rem` (24px)

## 📝 Cómo Importar los Estilos

En el `<head>` de cada archivo HTML (en este orden):

```html
<!-- 1. Variables CSS -->
<link rel="stylesheet" href="../css/variables.css">

<!-- 2. Estilos globales -->
<link rel="stylesheet" href="../css/global.css">

<!-- 3. Navbar -->
<link rel="stylesheet" href="../css/navbar.css">

<!-- 4. Estilos específicos -->
<link rel="stylesheet" href="../css/styles.css">

<!-- 5. Formularios (si es necesario) -->
<link rel="stylesheet" href="../css/forms.css">

<!-- 6. Responsividad -->
<link rel="stylesheet" href="../css/responsive.css">
```

## 🚀 Próximas Mejoras

- [ ] Implementar backend (Node.js/Python)
- [ ] Base de datos de usuarios
- [ ] Sistema de autenticación
- [ ] Subida y descarga de materiales
- [ ] Búsqueda avanzada con filtros
- [ ] Sistema de calificaciones
- [ ] Notificaciones en tiempo real
- [ ] Dark/Light mode toggle
- [ ] PWA (Progressive Web App)
- [ ] API REST completa

## 🔄 Migración de Datos

Si tienes datos en otras ubicaciones, cópialos a `/data/`:
- Información de carreras → `carrera.json`
- Información de materias → `materias.json`
- Catálogo de materiales → `materiales.json`

## 📞 Contacto

- **Institución:** CEICH - FICH - UNL
- **Email:** ceich@fich.unl.edu.ar
- **Instagram:** @ceich.fich

---

**Última actualización:** Abril 2026
**Versión:** 2.0 (Reorganizada)