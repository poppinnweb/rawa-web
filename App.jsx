import { useEffect } from 'react'
import { initRawa } from './rawaRuntime.js'

// Imágenes como assets (Vite les pone hash y caché larga)
import logo from './assets/logo.jpg'
import machine from './assets/machine.jpg'
import drink from './assets/drink.jpg'
import latte from './assets/latte.jpg'
import bags5 from './assets/bags5.jpg'
import bag1 from './assets/bag1.jpg'
import pastry from './assets/pastry.jpg'
import shelf from './assets/shelf.jpg'
import cake from './assets/cake.jpg'
import oranges from './assets/oranges.jpg'
import storeImg from './assets/store.jpg'
import osb from './assets/osb.jpg'

// El grano y el vapor son SVG con filtros: se insertan como HTML exacto
// (idéntico a la versión auditada) para no arriesgar la conversión a JSX.
const STAGE_HTML = `
  <div class="halo"></div>
  <div class="bring" id="ring1"></div><div class="bring r2" id="ring2"></div>
  <svg class="steam" width="80" height="90" viewBox="0 0 80 90" fill="none" aria-hidden="true">
    <path id="st1" d="M26 86 C 16 64 36 56 26 34 C 20 20 30 10 26 2" stroke="#CF9559" stroke-width="3" stroke-linecap="round"/>
    <path id="st2" d="M52 86 C 42 62 62 54 52 32 C 46 18 56 10 52 2" stroke="#CF9559" stroke-width="3" stroke-linecap="round"/>
  </svg>
  <div class="ktag">ARÁBICA <b>100%</b> · LOTE RAWA/ESP</div>
  <div class="beanScroll big" id="beanScroll"><div class="beanIntro" id="beanIntro"><div class="beanFloat" id="beanFloat"><div class="beanTilt" id="beanTilt">
    <svg class="bean" id="bean" viewBox="0 0 320 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Grano de café arábica — arrástralo para girarlo">
      <defs>
        <radialGradient id="body" cx="40%" cy="33%" r="80%"><stop offset="0%" stop-color="#9c6539"/><stop offset="33%" stop-color="#5d381f"/><stop offset="72%" stop-color="#2f1a0d"/><stop offset="100%" stop-color="#150b05"/></radialGradient>
        <linearGradient id="rim" x1="0" y1="0" x2="1" y2="1"><stop offset="78%" stop-color="#e7b77e" stop-opacity="0"/><stop offset="100%" stop-color="#eabd82" stop-opacity=".55"/></linearGradient>
        <linearGradient id="crs" x1="0" x2="1"><stop offset="0%" stop-color="#1a0f07"/><stop offset="100%" stop-color="#43291500"/></linearGradient>
        <radialGradient id="spec" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="#ffdca6" stop-opacity=".5"/><stop offset="100%" stop-color="#ffdca6" stop-opacity="0"/></radialGradient>
        <filter id="roast" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.9 0.75" numOctaves="2" seed="7"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .6 0"/></filter>
        <filter id="soft"><feGaussianBlur stdDeviation="7"/></filter>
        <clipPath id="bc"><ellipse cx="160" cy="180" rx="104" ry="140" transform="rotate(-15 160 180)"/></clipPath>
      </defs>
      <ellipse cx="164" cy="332" rx="84" ry="18" fill="#000" opacity=".4" filter="url(#soft)"/>
      <ellipse cx="160" cy="180" rx="104" ry="140" transform="rotate(-15 160 180)" fill="url(#body)" stroke="#120a05" stroke-width="2"/>
      <g clip-path="url(#bc)" opacity=".2"><rect x="30" y="20" width="260" height="320" filter="url(#roast)"/></g>
      <ellipse cx="160" cy="180" rx="104" ry="140" transform="rotate(-15 160 180)" fill="url(#rim)"/>
      <path d="M160 46 C 138 110 138 250 160 314" transform="rotate(-15 160 180)" fill="none" stroke="#130b05" stroke-width="10" stroke-linecap="round"/>
      <path d="M160 54 C 141 112 141 246 160 306" transform="rotate(-15 160 180)" fill="none" stroke="url(#crs)" stroke-width="3" stroke-linecap="round" opacity=".7"/>
      <ellipse cx="120" cy="118" rx="33" ry="50" transform="rotate(-15 120 118)" fill="url(#spec)"/>
    </svg>
  </div></div></div></div>
  <span class="beanhint" id="beanhint">↔ arrástralo</span>
`

export default function App() {
  useEffect(() => {
    initRawa(osb)
  }, [])

  return (
    <>
      {/* NAV */}
      <header className="nav">
        <div className="wrap">
          <a className="brand" href="#top" aria-label="RAWA — inicio"><img src={logo} alt="Logotipo RAWA" /><span>RAWA<small>SPECIALTY COFFEE</small></span></a>
          <nav className="navlinks" id="navlinks" aria-label="Principal">
            <a href="#story">El café</a><a href="#cafes">Nuestros cafés</a><a href="#finder">Encuentra tu café</a>
            <a href="#carta">Carta</a><a href="#visit">Visítanos</a><a href="#store">Tienda</a>
            <button className="themebtn" id="themebtn" title="Cambiar tema" aria-label="Cambiar tema claro/oscuro">◐</button>
            <a href="#visit" className="btn btn-red magnetic">Ven a RAWA</a>
          </nav>
          <button className="navtoggle" id="navtoggle" aria-label="Abrir menú" aria-expanded="false">☰</button>
        </div>
      </header>

      {/* A · HERO */}
      <section className="hero" id="top">
        <div className="hero-bg"><img src={machine} alt="Barra de RAWA" /></div>
        <div className="wrap">
          <div className="hero-copy">
            <span className="h-eyebrow pre">◉ RAWA · Specialty Coffee · Granada</span>
            <h1><span className="line"><span className="ln pre">GOOD COFFEE.</span></span><span className="line"><span className="ln r pre">NO SHORTCUTS.</span></span></h1>
            <p className="hero-sub pre">Café de especialidad. Hecho para disfrutarlo de verdad.</p>
            <div className="hero-cta pre">
              <a href="#cafes" className="btn btn-red magnetic">Descubre nuestro café</a>
              <a href="#visit" className="btn btn-ghost magnetic">Ven a RAWA →</a>
            </div>
            <div className="hero-meta pre"><span><b>ARÁBICA</b> 100%</span><span><b>HALAL</b> · VEGAN · GF</span><span><b>AV. DE MADRID</b> 20</span></div>
          </div>
          <div className="stage" id="stage" dangerouslySetInnerHTML={{ __html: STAGE_HTML }} />
        </div>
        <div className="scrollcue" aria-hidden="true"><span></span>SCROLL</div>
      </section>

      <div className="seam"><div className="seamstrip"><span>FROM BEAN TO EXPERIENCE</span><span className="dot">●</span><span>TOSTADO PARA DISFRUTAR</span><span className="dot">●</span><span>GRANADA</span></div></div>

      {/* B · STORY */}
      <section className="band story" id="story">
        <div className="wrap">
          <span className="eyebrow reveal">El café es el protagonista</span>
          <h2 className="reveal">EVERY BEAN<br />HAS A STORY.</h2>
          <p className="lead reveal">Del grano al vaso, cada paso cuenta. Esto es lo que hay detrás de una taza bien hecha — presentado como muestra visual de la experiencia RAWA.</p>
          <div className="journey">
            <article className="jcard rvup"><img src={bags5} alt="Café de origen" loading="lazy" /><div className="jcard-body"><span className="jnum">01</span><h3>Origen</h3><p>Cafés de especialidad de distintos orígenes, elegidos por su perfil.</p></div></article>
            <article className="jcard rvup"><img src={machine} alt="Molienda" loading="lazy" /><div className="jcard-body"><span className="jnum">02</span><h3>Molienda</h3><p>Punto de molido ajustado a cada método, al momento.</p></div></article>
            <article className="jcard rvup"><img src={drink} alt="Extracción" loading="lazy" /><div className="jcard-body"><span className="jnum">03</span><h3>Extracción</h3><p>Espresso equilibrado, cuerpo y dulzor cuidados en barra.</p></div></article>
            <article className="jcard rvup"><img src={latte} alt="En la taza" loading="lazy" /><div className="jcard-body"><span className="jnum">04</span><h3>En la taza</h3><p>Listo para disfrutarlo sin prisa, aquí o para llevar.</p></div></article>
          </div>
        </div>
      </section>

      {/* C · PRODUCTS */}
      <section className="band shop" id="cafes">
        <div className="wrap">
          <div className="shop-head">
            <div><span className="eyebrow reveal">Nuestros cafés</span><h2 className="reveal">YOUR NEXT<br />FAVOURITE COFFEE.</h2></div>
            <p className="lead reveal">Café en grano para llevarte RAWA a casa. <b>Catálogo de demostración</b> — orígenes y notas de referencia, pendientes de confirmar con RAWA.</p>
          </div>
          <div className="prodgrid" id="prodgrid"></div>
        </div>
      </section>

      {/* D · INTERACTIVE BAG */}
      <section className="band bagsec" id="bag">
        <div className="wrap">
          <div className="bagstage">
            <div className="glow"></div>
            <div className="bagwrap3d" id="bagwrap3d">
              <img src={bag1} alt="Bolsa de café RAWA — Brasil Turquesa CO₂ descafeinado" />
              <button className="hotspot hs1" data-info="origin" aria-label="Ver origen">+</button>
              <button className="hotspot hs2" data-info="process" aria-label="Ver proceso">+</button>
              <button className="hotspot hs3" data-info="notes" aria-label="Ver notas">+</button>
            </div>
          </div>
          <div className="bag-info">
            <span className="eyebrow reveal">Interactúa con la bolsa</span>
            <h2 className="reveal">Mira de cerca.</h2>
            <p className="lead reveal">Mueve el cursor sobre la bolsa para girarla, o toca los puntos <b>+</b> para descubrir cada detalle. En móvil, usa los botones.</p>
            <div className="bagctrls" role="group" aria-label="Detalles de la bolsa">
              <button className="chip" data-info="origin">Origen</button><button className="chip" data-info="process">Proceso</button>
              <button className="chip" data-info="notes">Notas de cata</button><button className="chip" data-info="weight">Formato</button>
            </div>
            <div className="bag-readout" id="bagReadout" aria-live="polite"><div className="k">Brasil · Turquesa CO₂</div><div className="v">Descafeinado con proceso CO₂, sin químicos. Toca un detalle para explorar.</div></div>
            <p className="bag-hint">* Imagen real de producto RAWA. Datos mostrados como demostración.</p>
          </div>
        </div>
      </section>

      {/* E · FINDER */}
      <section className="band finder" id="finder">
        <div className="wrap">
          <span className="eyebrow reveal">Encuentra tu café</span>
          <h2 className="reveal">Dinos cómo lo tomas.</h2>
          <p className="lead reveal">Tres preguntas y te proponemos un café de nuestra selección, con el porqué. Recomendación basada en el catálogo de demostración.</p>
          <div className="quiz">
            <div className="qsteps" id="qsteps">
              <div className="qstep" data-q="method"><span className="qlabel">01 — Método</span><h3>¿Cómo preparas tu café?</h3>
                <div className="qopts" role="group" aria-label="Método"><button className="qopt" data-v="espresso">Espresso / cafetera</button><button className="qopt" data-v="filter">Filtro / V60 / goteo</button></div></div>
              <div className="qstep" data-q="profile"><span className="qlabel">02 — Perfil</span><h3>¿Qué perfil prefieres?</h3>
                <div className="qopts" role="group" aria-label="Perfil"><button className="qopt" data-v="fruity">Afrutado y vivo</button><button className="qopt" data-v="sweet">Dulce y equilibrado</button><button className="qopt" data-v="intense">Intenso y con cuerpo</button></div></div>
              <div className="qstep" data-q="caffeine"><span className="qlabel">03 — Cafeína</span><h3>¿Con o sin cafeína?</h3>
                <div className="qopts" role="group" aria-label="Cafeína"><button className="qopt" data-v="caf">Con cafeína</button><button className="qopt" data-v="decaf">Descafeinado</button></div></div>
            </div>
            <div className="result" id="finderResult"><div className="result-empty">Responde las tres preguntas para ver tu recomendación ☕</div></div>
          </div>
        </div>
      </section>

      {/* F · UNIVERSE */}
      <section className="band universe" id="universe">
        <div className="wrap">
          <span className="eyebrow reveal">El universo RAWA</span>
          <h2 className="reveal">UN LUGAR CON ALMA.</h2>
          <div className="umosaic">
            <div className="utile u-a rvup"><img src={storeImg} alt="Fachada de RAWA" loading="lazy" /><span className="cap">Av. de Madrid 20</span></div>
            <div className="utile u-b rvup"><img src={shelf} alt="Estantería con tazas" loading="lazy" /><span className="cap">Cerámica & grano</span></div>
            <div className="u-quote rvup"><p>"Un lugar para los que creen que el café merece algo más que prisas."</p></div>
            <div className="utile u-c rvup"><img src={oranges} alt="Zumos naturales" loading="lazy" /><span className="cap">Zumos naturales</span></div>
            <div className="utile u-c rvup"><img src={cake} alt="Repostería casera" loading="lazy" /><span className="cap">Repostería casera</span></div>
            <div className="utile u-b rvup"><img src={pastry} alt="Vitrina" loading="lazy" /><span className="cap">Honest food</span></div>
          </div>
        </div>
      </section>

      {/* G · MENU */}
      <section className="band menu" id="carta">
        <div className="wrap">
          <span className="eyebrow reveal">Nuestra carta</span>
          <h2 className="reveal">Para tomar aquí.</h2>
          <p className="lead reveal">Carta por categorías, como nuestra pizarra. Las bebidas provienen de la carta real de RAWA; <b>los precios son de ejemplo</b> y quedan pendientes de validar.</p>
          <div className="menucats" id="menucats" role="group" aria-label="Categorías"></div>
          <div className="menulist" id="menulist"></div>
          <p className="menu-foot">¿Prefieres ver la carta vigente? <a href="https://www.instagram.com/rawa_arabika/" target="_blank" rel="noopener">Consúltala en @rawa_arabika →</a></p>
        </div>
      </section>

      {/* H · VISIT */}
      <section className="band visit" id="visit">
        <div className="wrap">
          <div>
            <span className="eyebrow reveal">Visítanos en Granada</span>
            <h2 className="reveal">Te esperamos<br />con un buen café.</h2>
            <div className="infoblock">
              <div className="inforow"><div className="k">Dirección</div><div className="v"><a href="https://maps.google.com/?q=RAWA+Specialty+Coffee+Avenida+de+Madrid+20+Granada" target="_blank" rel="noopener">Av. de Madrid 20, Granada</a></div></div>
              <div className="inforow"><div className="k">Horario <span className="hoursnote">· pendiente de validar</span></div><div className="v">Lun–Vie 8:00–19:00 · Sáb–Dom 8:30–19:00</div></div>
              <div className="inforow"><div className="k">Teléfono</div><div className="v"><span id="tel">+34 641 175 663</span><button className="copybtn" data-copy="+34641175663">copiar</button></div></div>
              <div className="inforow"><div className="k">Instagram</div><div className="v"><a href="https://www.instagram.com/rawa_arabika/" target="_blank" rel="noopener">@rawa_arabika</a></div></div>
            </div>
            <div className="visit-cta">
              <a href="https://maps.google.com/?q=RAWA+Specialty+Coffee+Avenida+de+Madrid+20+Granada" target="_blank" rel="noopener" className="btn btn-dark magnetic">Cómo llegar →</a>
              <a href="https://www.instagram.com/rawa_arabika/" target="_blank" rel="noopener" className="btn btn-line magnetic">Síguenos en Instagram</a>
            </div>
          </div>
          <div className="mapcard"><img src={storeImg} alt="Local de RAWA en Granada" loading="lazy" /><div className="mapinfo"><div className="pin">◉ GRANADA · ESPAÑA</div><h3>RAWA Specialty Coffee</h3></div></div>
        </div>
      </section>

      {/* I · STORE DEMO */}
      <section className="band store" id="store">
        <div className="wrap">
          <span className="demobar">● <b>MODO DEMO</b> — sin pagos reales. Checkout preparado para Shopify Storefront API.</span>
          <div className="store-head">
            <div><span className="eyebrow reveal">Futura tienda online</span><h2 className="reveal">Llévate RAWA a casa.</h2></div>
            <p className="lead reveal">Catálogo y servicio desacoplados de la interfaz. Elige peso y molienda, añade al carrito y ábrelo para probarlo.</p>
          </div>
          <div className="storegrid" id="storegrid"></div>
          <div className="arch">
            <div className="archcard rvup"><div className="an">Capa de datos</div><p>El catálogo vive en <code>RAWA_CATALOG</code>, separado de la interfaz. En producción lo sustituyen las respuestas de la Storefront API sin tocar el diseño.</p></div>
            <div className="archcard rvup"><div className="an">Capa de servicio</div><p><code>shopifyStore</code> normaliza producto y variantes (peso × molienda) y crea el carrito. En demo no hay pago; con <code>enabled:true</code> redirige al checkout seguro de Shopify.</p></div>
            <div className="archcard rvup"><div className="an">Suscripciones (futuro)</div><p>Preparado para café por suscripción (Selling Plans de Shopify), sin activar en esta demo.</p></div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="band foot">
        <div className="wrap">
          <div className="foot-cols">
            <div className="fc foot-brandcol"><div className="fb"><img src={logo} alt="RAWA" />RAWA</div><p>Café de especialidad, desayunos, brunch y zumos naturales. Healthy · Halal · Gluten free · Vegan.</p></div>
            <div className="fc"><h4>Explora</h4><a href="#story">El café</a><a href="#cafes">Nuestros cafés</a><a href="#finder">Encuentra tu café</a><a href="#carta">Carta</a></div>
            <div className="fc"><h4>Visítanos</h4><a href="https://maps.google.com/?q=RAWA+Specialty+Coffee+Avenida+de+Madrid+20+Granada" target="_blank" rel="noopener">Av. de Madrid 20, Granada</a><p>Lun–Vie 8–19h · Sáb–Dom 8:30–19h</p><p>+34 641 175 663</p></div>
            <div className="fc"><h4>Síguenos</h4><a href="https://www.instagram.com/rawa_arabika/" target="_blank" rel="noopener">Instagram @rawa_arabika</a><a href="https://www.instagram.com/rawa_arabika/" target="_blank" rel="noopener">Threads rawa_arabika</a></div>
          </div>
          <div className="giant" aria-hidden="true">RAWA</div>
          <div className="foot-bottom"><span>© <span id="yr"></span> RAWA Specialty Coffee · Granada</span><span className="poppinn">Concept website by <b>Poppinn</b> · demostración no comercial</span></div>
        </div>
      </footer>

      <button className="cartbtn magnetic" id="cartbtn" aria-label="Abrir carrito">🛍 Carrito <span className="cc" id="cartCount">0</span></button>
      <div className="drawer" id="drawer" role="dialog" aria-modal="true" aria-label="Carrito">
        <div className="drawer-bg" data-close></div>
        <div className="drawer-panel">
          <div className="drawer-head"><h3>Tu carrito <span className="demo-pill">DEMO</span></h3><button className="xbtn" data-close aria-label="Cerrar">×</button></div>
          <div className="cartitems" id="cartitems"><div className="cart-empty">Tu carrito está vacío.</div></div>
          <div className="drawer-foot">
            <div className="totalrow"><span>Total</span><span id="cartTotal">0,00 €</span></div>
            <p className="demoNote">Modo demostración: no se procesan pagos ni se completan pedidos. En producción, el pago se gestiona de forma segura con Shopify (Storefront API + gastos de envío).</p>
            <button className="checkout" id="checkoutBtn">Finalizar compra (DEMO)</button>
          </div>
        </div>
      </div>
      <div className="toast" id="toast"></div>
    </>
  )
}
