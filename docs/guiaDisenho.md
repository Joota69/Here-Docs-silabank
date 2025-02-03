# 📄 Biblia de Diseño

📌 _Documento de referencia para el diseño de la interfaz de usuario (UI) y experiencia de usuario (UX) del proyecto._

---

## 🎨 1. Identidad Visual
Definimos la identidad visual para mantener coherencia en todo el proyecto.

### 📌 Paleta de Colores
| Nombre | Código HEX | Uso |
|--------|-----------|------|
| **Primario** | `#1E90FF` | Botones principales, enlaces destacados |
| **Secundario** | `#FFD700` | Elementos de acento y resaltado |
| **Fondo** | `#F5F5F5` | Fondo principal de la interfaz |
| **Texto Principal** | `#333333` | Color base para textos |
| **Texto Secundario** | `#666666` | Textos secundarios, etiquetas |
| **Bordes y Líneas** | `#DDDDDD` | Separadores, contornos |

---

## 🔤 2. Tipografía

### 📌 Fuentes Principales
- **Primaria:** `Inter`, `Arial`, `sans-serif`
- **Secundaria:** `Roboto`, `sans-serif`

### 📌 Tamaños de Fuente
| Uso | Tamaño (px) | Ejemplo |
|-----|------------|---------|
| **Títulos (H1-H2)** | `32px - 24px` | `font-weight: bold;` |
| **Subtítulos (H3-H4)** | `20px - 18px` | `font-weight: semi-bold;` |
| **Texto Normal** | `16px` | `font-weight: normal;` |
| **Texto Secundario** | `14px` | `color: #666666;` |
| **Botones** | `16px - 14px` | `text-transform: uppercase;` |

---

## 📏 3. Espaciado y Maquetación
Para mantener consistencia en la distribución del contenido.

- **Padding y Margins:** Se usan múltiplos de `8px` (`8px`, `16px`, `24px`, `32px`)
- **Grid System:** Basado en `12 columnas`
- **Ancho Máximo de Contenido:** `1200px`

---

## 🎭 4. Componentes UI
Definición de los elementos reutilizables en el diseño.

### 📌 Botones
| Tipo | Estilo |
|------|--------|
| **Primario** | Fondo `#1E90FF`, Texto `#FFFFFF`, Borde `None` |
| **Secundario** | Fondo `None`, Texto `#1E90FF`, Borde `2px solid #1E90FF` |
| **Deshabilitado** | Fondo `#DDDDDD`, Texto `#AAAAAA` |

### 📌 Inputs y Formularios
- Bordes redondeados: `4px`
- Placeholder: Color `#AAAAAA`
- Enfoque: Borde `2px solid #1E90FF`

---

## 🖼 5. Iconografía e Imágenes

- **Íconos:** Se usará `Font Awesome` o `Lucide` para consistencia.
- **Tamaño de Iconos:** `24px` estándar.
- **Formato de Imágenes:** `SVG` preferentemente, `PNG/JPG` para fotos.

---

## ⚡ 6. Accesibilidad (A11Y)
Para garantizar una experiencia inclusiva.

- **Contraste:** Los textos deben tener al menos un contraste de `4.5:1`
- **Tamaños de texto:** No menores a `14px`
- **Etiquetas ARIA:** Se aplicarán en elementos interactivos
- **Teclado:** Toda la navegación debe ser accesible vía teclado

---

## 🔗 7. Recursos y Referencias
- [Google Fonts](https://fonts.google.com/)
- [Coolors (Generador de Paleta)](https://coolors.co/)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Lucide Icons](https://lucide.dev/)

---

📌 **Este documento debe actualizarse conforme se hagan cambios en el diseño.**
