# Sistema de Diseño - Movilidad EAFIT

## Paleta de colores profesional (Azul Rey)

### Colores primarios
- **Azul Rey Oscuro (Primary):** `#003DA5`
  - Uso: Encabezados, botones principales, enlaces activos
  
- **Azul Rey Medio (Secondary):** `#0052CC`
  - Uso: Estados hover, botones secundarios, énfasis

- **Azul Rey Claro (Tertiary):** `#005CE6`
  - Uso: Gradientes, efectos interactivos

### Colores de fondo
- **Azul Muy Claro (Light):** `#F0F4FF`
  - Uso: Fondos de tarjetas, secciones
  
- **Azul Casi Blanco (Lighter):** `#F8FAFF`
  - Uso: Fondo principal de la aplicación

- **Gris Claro:** `#F9FAFB`, `#FAFBFF`
  - Uso: Secciones alternadas

### Colores de contenido
- **Gris Oscuro (Ink):** `#1F2937`
  - Uso: Texto principal, contenido

- **Gris Medio (Muted):** `#6B7280`
  - Uso: Subtextos, ayuda

- **Gris Bordes:** `#E5E7EB`
  - Uso: Bordes y divisiones

### Color de acento
- **Naranja (Accent):** `#FF6B35`
  - Uso: Alertas, elementos destacados (uso futuro)

## Tipografía

- **Fuente:** Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- **Tamaños:**
  - Títulos (h1): 2.5rem, peso 700
  - Subtítulos (h2): 2rem, peso 700
  - Subencabezados (h3): 1.25rem, peso 600
  - Cuerpo: 1rem, peso 400

## Componentes

### Tarjetas (Cards)
- Borde: 1px sólido #E5E7EB
- Esquinas redondeadas: 0.8rem
- Sombra: `0 4px 12px rgba(0, 61, 165, 0.08)`
- Sombra hover: `0 8px 20px rgba(0, 61, 165, 0.12)`

### Botones
- Primary: Fondo azul rey, sin borde
  - Hover: Azul rey secundario
- Outline Primary: Borde azul rey, fondo transparente
  - Hover: Fondo azul rey, texto blanco
- Secondary: Gris, uso para cancelas

### Sección Hero
- Gradiente: De azul rey oscuro a azul rey claro
- Padding: 2.5rem 2rem
- Color de texto: Blanco (#FFFFFF)
- Sombra: `0 16px 32px rgba(0, 61, 165, 0.15)`

### Tarjetas de Información
- Borde izquierdo: 4px sólido azul rey
- Sombra: `0 2px 8px rgba(0, 61, 165, 0.06)`
- Transición smooth en hover

### Mapas de Calor (Heatmap)
- Gradiente de colores:
  - 0 usuarios: #F0F4FF (azul muy claro)
  - 1-2 usuarios: #C7E0FF (azul claro)
  - 3-5 usuarios: #5BA3FF (azul medio)
  - 6+ usuarios: #003DA5 (azul rey)

## Espaciado
- Padding pequeño: 0.75rem
- Padding estándar: 1rem
- Padding grande: 1.5rem
- Gap entre elementos: 0.75rem a 1rem

## Sombras
- Sombra sutil: `0 2px 8px rgba(0, 61, 165, 0.06)`
- Sombra estándar: `0 4px 12px rgba(0, 61, 165, 0.08)`
- Sombra elevada: `0 8px 20px rgba(0, 61, 165, 0.12)`
- Sombra hero: `0 16px 32px rgba(0, 61, 165, 0.15)`

## Animaciones
- Reveal (aparición): 500ms, ease-out
- Hover (elevación): transform 0.3s ease, box-shadow 0.3s ease

## Variables CSS disponibles
```css
--brand-primary: #003DA5
--brand-secondary: #0052CC
--brand-tertiary: #005CE6
--brand-light: #F0F4FF
--brand-lighter: #F8FAFF
--brand-accent: #FF6B35
--brand-ink: #1F2937
--brand-muted: #6B7280
```
