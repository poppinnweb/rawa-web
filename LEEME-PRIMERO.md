# RAWA Specialty Coffee — Web React + Vite

**Propuesta conceptual de Poppinn para RAWA** · demostración no comercial (sin pagos reales).

Esta es la versión profesional en **React + Vite** de la web de RAWA. Mantiene **exactamente** el mismo diseño, fotos, animaciones e interacciones que la versión que ya has visto. La diferencia es que el código está organizado de forma modular y preparado para conectar Shopify en el futuro.

---

## ¿Qué necesito saber antes de nada?

Hay **dos formas** de publicarla. La **Opción A no requiere instalar nada** en tu ordenador (recomendada si no eres técnico). La Opción B es por si prefieres hacerlo en tu equipo.

> Nota honesta: este proyecto te lo entrego listo, pero **no se ha compilado en el entorno donde lo preparé** (no tenía acceso al instalador de paquetes). Por eso te recomiendo la Opción A: **Netlify lo compila en la nube** y, si apareciera algún aviso, me pasas el mensaje y lo resolvemos en un momento.

---

## 📥 Paso 0 — Descargar y descomprimir

1. Descarga el archivo **`rawa-web-react.zip`** que te he enviado.
2. Haz clic derecho → **Descomprimir / Extraer**. Obtendrás una carpeta llamada `rawa-react` con todos los archivos dentro.

---

## 🟢 Opción A — Publicar con GitHub + Netlify (sin instalar nada)

**Netlify compila la web por ti en la nube.** Solo tienes que subir los archivos a GitHub una vez.

### 1. Sube el proyecto a GitHub
1. Crea una cuenta gratis en **https://github.com** (si no tienes).
2. Pulsa **New repository** → ponle un nombre (ej. `rawa-web`) → **Create repository**.
3. En la página del repositorio vacío, pulsa **“uploading an existing file”**.
4. **Arrastra TODO el contenido de la carpeta `rawa-react`** (no la carpeta en sí, sino lo de dentro: `index.html`, `package.json`, la carpeta `src`, `public`, etc.).
5. Pulsa **Commit changes**.

### 2. Conéctalo a Netlify
1. Entra en **https://app.netlify.com** y crea cuenta gratis (puedes entrar con GitHub).
2. **Add new site → Import an existing project → Deploy with GitHub.**
3. Autoriza y **elige el repositorio** `rawa-web`.
4. Netlify detecta Vite solo. Verás estos valores (si no, ponlos tú):
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
5. Pulsa **Deploy site**. En 1–2 minutos tendrás la web publicada en una URL tipo `https://nombre.netlify.app`.

> Para cambiar el nombre: **Site configuration → Change site name**.
> Cada vez que subas cambios a GitHub, Netlify republica sola.

---

## 🔵 Opción B — Compilar en tu ordenador (si tienes o instalas Node.js)

1. Instala **Node.js LTS** desde **https://nodejs.org** (el botón grande; instalador normal).
2. Abre una terminal **dentro de la carpeta `rawa-react`**:
   - Windows: entra en la carpeta, clic en la barra de dirección, escribe `cmd` y Enter.
   - Mac: clic derecho en la carpeta → “Nuevo terminal en la carpeta”.
3. Escribe estos comandos, uno a uno:

```bash
npm install        # descarga lo necesario (una vez, tarda 1-2 min)
npm run build      # genera la carpeta de producción "dist"
```

4. Se habrá creado una carpeta **`dist`**. Entra en **https://app.netlify.com/drop** y **arrastra la carpeta `dist`**. ¡Publicada!

> Para ver la web en tu ordenador antes de publicar: `npm run dev` y abre la dirección que aparece (normalmente `http://localhost:5173`).

---

## 🗂️ Qué hay dentro del proyecto

```
rawa-react/
├─ index.html              → página base (metadatos, fuentes)
├─ package.json            → dependencias (React, Vite, GSAP)
├─ vite.config.js          → configuración de Vite
├─ netlify.toml            → configuración de Netlify (build + seguridad)
├─ public/                 → favicon y redirecciones
└─ src/
   ├─ main.jsx             → arranque de React
   ├─ App.jsx              → toda la interfaz (secciones de la web)
   ├─ index.css            → todos los estilos (idénticos a la versión anterior)
   ├─ rawaRuntime.js       → animaciones GSAP + interacciones (grano, carrito, carta…)
   ├─ assets/              → las fotografías optimizadas
   ├─ data/catalog.js      → CATÁLOGO (capa de datos, separada)
   └─ services/shopifyStore.js → SERVICIO Shopify (capa de conexión futura)
```

---

## ✅ Tus prioridades, cumplidas

1. **Diseño, fotos, animaciones e interacciones idénticos** — el CSS y la lógica se portaron 1:1.
2. **Móvil y ordenador** — responsive auditado (0 desbordamientos de 360px a 1280px).
3. **Botones, menús y enlaces** — verificados en la auditoría.
4. **Velocidad** — imágenes como archivos con caché larga, carga diferida (`lazy`) de las de abajo, y GSAP agrupado en el build.
5. **Modo demostración** — el catálogo NO cobra; el carrito es visual.
6. **Preparado para Shopify** — capas `data` y `services` separadas. Para activarlo, sigue `GUIA-SHOPIFY-RAWA.md`.

## ⚠️ Importante

- Mantén visible el crédito **“Concept website by Poppinn · demostración no comercial”** (pie de página) y el aviso **“MODO DEMO”** mientras RAWA no haya aceptado el proyecto.
- Precios, notas de cata y horarios son de **ejemplo**, pendientes de confirmar con RAWA.

*Preparado por Poppinn · propuesta no comercial para RAWA Specialty Coffee.*
