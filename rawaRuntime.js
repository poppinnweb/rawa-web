// Runtime de interacciones y animaciones (portado 1:1 de la version auditada).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { RAWA_CATALOG } from './data/catalog.js';
import { shopifyStore } from './services/shopifyStore.js';

export function initRawa(osbUrl){
  try{ document.documentElement.style.setProperty('--osb-img','url('+osbUrl+')'); }catch(e){}
  (function(){
  "use strict";
  var reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
  var fine=matchMedia("(pointer:fine)").matches;
  var hasGsap=true;
  if(reduce||!hasGsap)document.documentElement.classList.remove("anim");
  function eur(n){return n.toFixed(2).replace(".",",")+" €";}
  var PRODUCTS=[]; // cache normalizado

  /* ===== C · product cards ===== */
  function renderProducts(list){
    PRODUCTS=list; var grid=document.getElementById("prodgrid"); grid.innerHTML="";
    list.forEach(function(c){
      var low=(c.stockLabel||"").indexOf("Últimas")>-1;
      var el=document.createElement("article"); el.className="prod rvup";
      el.innerHTML='<div class="bagart"><span class="valve"></span><div class="sticker">'+
        '<div class="brandline">RAWA<small>SPECIALTY COFFEE</small></div>'+
        '<div class="porigin">'+c.country.toUpperCase()+'<small>'+c.region+'</small></div>'+
        '<div class="pnotes">'+c.notes.join(" · ")+'</div>'+
        '<div class="plot"><span>LOTE '+c.lot+'</span><span>'+c.process+'</span></div></div></div>'+
        '<div class="prod-body"><div class="pname">'+c.title+'</div><div class="pmeta">'+c.method+' · desde 250 g</div>'+
        '<div class="prod-foot"><div class="price">'+eur(c.basePrice)+'<span class="dm">PRECIO DEMO</span></div><span class="stock'+(low?' low':'')+'">'+c.stockLabel+'</span></div>'+
        '<button class="linkbtn" aria-expanded="false">+ Detalle</button>'+
        '<div class="prod-detail"><div class="inner"><b>Notas:</b> '+c.notes.join(", ")+'.<br><b>Proceso:</b> '+c.process+'. <b>Origen:</b> '+c.coords+'.<br><b>Variantes:</b> '+c.variants.length+' (peso × molienda).<br><span style="color:var(--accent)">Datos de demostración, pendientes de confirmar.</span></div></div>';
      var btn=el.querySelector(".linkbtn"),det=el.querySelector(".prod-detail");
      btn.addEventListener("click",function(){var o=det.classList.toggle("open");btn.setAttribute("aria-expanded",o);btn.textContent=o?"− Cerrar":"+ Detalle";});
      grid.appendChild(el);
    });
    if(hasGsap&&!reduce&&ScrollTrigger)ScrollTrigger.refresh();
  }

  /* ===== I · store cards (variantes peso × molienda) ===== */
  function renderStore(list){
    var sg=document.getElementById("storegrid"); sg.innerHTML="";
    list.forEach(function(c){
      var el=document.createElement("div"); el.className="scard rvup";
      var wopts=RAWA_CATALOG.weights.map(function(w){return '<option value="'+w.label+'">'+w.label+(w.delta?' (+'+w.delta+' €)':'')+'</option>';}).join("");
      var gopts=RAWA_CATALOG.grinds.map(function(g){return "<option>"+g+"</option>";}).join("");
      el.innerHTML='<div class="sorigin">'+c.origin+'</div><div class="sname">'+c.title+'</div>'+
        '<label>Peso</label><select class="vw" aria-label="Peso del café">'+wopts+'</select>'+
        '<label>Molienda</label><select class="vg" aria-label="Molienda del café">'+gopts+'</select>'+
        '<div class="ssku" data-sku></div>'+
        '<div class="srow"><span class="sprice">'+eur(c.basePrice)+'</span><button class="addbtn">Añadir</button></div>';
      var vw=el.querySelector(".vw"),vg=el.querySelector(".vg"),pr=el.querySelector(".sprice"),skuEl=el.querySelector("[data-sku]");
      function current(){ var wl=vw.value, gl=vg.value;
        return c.variants.filter(function(v){return v.weight===wl&&v.grind===gl;})[0]||c.variants[0]; }
      function sync(){ var v=current(); pr.textContent=eur(v.price); skuEl.textContent="SKU "+v.sku; }
      vw.addEventListener("change",sync); vg.addEventListener("change",sync); sync();
      el.querySelector(".addbtn").addEventListener("click",function(ev){
        var v=current(); addToCart(v.id,c.title,v.weight+" · "+v.grind,v.price);
        if(hasGsap&&!reduce)gsap.fromTo(ev.target,{scale:.9},{scale:1,duration:.3,ease:"back.out(2)"});
      });
      sg.appendChild(el);
    });
    if(hasGsap&&!reduce&&ScrollTrigger)ScrollTrigger.refresh();
  }

  // Cargar catálogo desde la capa de servicio (promesa: demo o Shopify real)
  shopifyStore.getProducts().then(function(list){ renderProducts(list); renderStore(list); })
    .catch(function(){ /* en producción: mostrar estado de error */ });

  /* ===== D · bag ===== */
  var bagwrap=document.getElementById("bagwrap3d"),bagStage=bagwrap.parentElement,readout=document.getElementById("bagReadout");
  var BAGINFO={origin:{k:"Origen",v:"Brasil. Un origen clásico para descafeinados de carácter dulce y achocolatado."},process:{k:"Proceso · CO₂",v:"Descafeinado con CO₂ a presión: elimina la cafeína conservando aroma y sabor, sin disolventes."},notes:{k:"Notas de cata",v:"Dulce · Cacao · Frutos secos. Un perfil redondo, para cualquier hora."},weight:{k:"Formato",v:"Bolsa de 250 g con válvula de desgasificación. En grano o molido."}};
  function setInfo(key){var d=BAGINFO[key];if(!d)return;readout.innerHTML='<div class="k">'+d.k+'</div><div class="v">'+d.v+'</div>';}
  document.querySelectorAll("[data-info]").forEach(function(b){b.addEventListener("click",function(){setInfo(b.getAttribute("data-info"));document.querySelectorAll(".chip").forEach(function(c){c.setAttribute("aria-pressed",c===b);});});});
  if(!reduce&&fine){
    bagStage.addEventListener("pointermove",function(e){var r=bagStage.getBoundingClientRect();var px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;bagwrap.style.transform="rotateY("+(px*26)+"deg) rotateX("+(-py*18)+"deg)";});
    bagStage.addEventListener("pointerleave",function(){bagwrap.style.transform="rotateY(0) rotateX(0)";});
  }

  /* ===== E · finder ===== */
  var answers={method:null,profile:null,caffeine:null};
  document.querySelectorAll("#qsteps .qopt").forEach(function(o){o.addEventListener("click",function(){
    var q=o.closest(".qstep").getAttribute("data-q");
    o.parentElement.querySelectorAll(".qopt").forEach(function(x){x.setAttribute("aria-pressed",x===o);});
    answers[q]=o.getAttribute("data-v");evaluate();});});
  function evaluate(){
    if(!answers.method||!answers.profile||!answers.caffeine||!PRODUCTS.length)return;
    var best=null,bs=-1;
    PRODUCTS.forEach(function(c){var s=0;
      if(answers.caffeine==="decaf"){s+=c.caf==="decaf"?100:-100;}else if(c.caf==="caf")s+=40;
      if(c.profile.indexOf(answers.profile)>-1)s+=30;
      if(answers.method==="espresso"&&c.method.indexOf("Espresso")>-1)s+=20;
      if(answers.method==="filter"&&c.method.indexOf("Filtro")>-1)s+=20;
      if(s>bs){bs=s;best=c;}});
    var why="Encaja con un perfil "+({fruity:"afrutado y vivo",sweet:"dulce y equilibrado",intense:"intenso y con cuerpo"}[answers.profile])+", en "+(answers.method==="espresso"?"espresso":"filtro")+(answers.caffeine==="decaf"?", y además descafeinado.":".");
    var r=document.getElementById("finderResult");
    r.innerHTML='<div class="result-top"><div class="k">Tu café</div><h3>'+best.title+'</h3><div class="ro">'+best.origin+' · '+best.process+'</div></div><div class="result-body"><p class="why">'+why+'</p><div class="notes">'+best.notes.map(function(n){return '<span class="tag">'+n+'</span>';}).join("")+'</div><p style="margin-top:16px;font-family:var(--mono);font-size:11px;color:#6a6a7e">Recomendación sobre catálogo de demostración.</p></div>';
    if(hasGsap&&!reduce)gsap.from(r,{scale:.96,opacity:0,duration:.5,ease:"back.out(1.6)"});
  }

  /* ===== G · menu ===== */
  var MENU={
    "Café de especialidad":[["Espresso","",1],["Cortado / Macchiato","",1],["Flat white","",1],["Capuccino","",1],["Latte","",1],["Americano","",1],["Café con leche","",1]],
    "Bebidas & tés":[["Matcha latte","RAWA matcha",1],["Chai latte","Especiado",1],["Mocha","Café + cacao",1],["Tés e infusiones","Selección",1],["Batidos de frutas","De temporada",1]],
    "Zumos naturales":[["Zumo Rojo","Tomate · zumo · AOVE",4],["Zumo Verde","Aguacate · tomate · mezclum",4],["Zumo Vegano","Pesto · manzana",4],["Naranja natural","Recién exprimido",1]],
    "Brunch & tostadas":[["Tostada de aguacate","Healthy",1],["Tostada hummus & falafel","Vegano",1],["Brunch del día","Pregunta en barra",0],["Opción sin gluten","Disponible",1]],
    "Dulce":[["Tarta casera","Del día",1],["Alfajores dulce de leche","Caseros",1],["Repostería vegana","Sin gluten disp.",1]]
  };
  var cats=Object.keys(MENU),mc=document.getElementById("menucats"),ml=document.getElementById("menulist");
  cats.forEach(function(cat,i){var b=document.createElement("button");b.className="mcat";b.textContent=cat;b.setAttribute("aria-pressed",i===0);
    b.addEventListener("click",function(){mc.querySelectorAll(".mcat").forEach(function(x){x.setAttribute("aria-pressed",x===b);});renderMenu(cat);});mc.appendChild(b);});
  function renderMenu(cat){ml.innerHTML="";MENU[cat].forEach(function(it){var row=document.createElement("div");row.className="mitem";
    var price=it[2]===0?'<span class="mp tbd">s/ carta</span>':(it[2]===1?'<span class="mp tbd">precio demo</span>':'<span class="mp">'+eur(it[2])+'</span>');
    row.innerHTML='<span class="mn">'+it[0]+'</span><span class="md">'+it[1]+'</span><span class="dots"></span>'+price;ml.appendChild(row);});
    if(hasGsap&&!reduce)gsap.from(ml.children,{opacity:0,y:12,duration:.4,stagger:.04,ease:"power2.out"});}
  renderMenu(cats[0]);

  /* ===== cart (visual) ===== */
  var cart={};try{var s=localStorage.getItem("rawa_cart");if(s)cart=JSON.parse(s);}catch(e){}
  function save(){try{localStorage.setItem("rawa_cart",JSON.stringify(cart));}catch(e){}}
  function addToCart(variantId,name,variant,price){if(cart[variantId])cart[variantId].q++;else cart[variantId]={variantId:variantId,name:name,variant:variant,price:price,q:1};save();renderCart();showToast(name+" añadido");
    if(hasGsap&&!reduce)gsap.fromTo("#cartCount",{scale:1.6},{scale:1,duration:.4,ease:"back.out(3)"});}
  function renderCart(){var items=Object.keys(cart),n=0,total=0,box=document.getElementById("cartitems");
    if(!items.length){box.innerHTML='<div class="cart-empty">Tu carrito está vacío.</div>';}
    else{box.innerHTML="";items.forEach(function(k){var it=cart[k];n+=it.q;total+=it.price*it.q;var row=document.createElement("div");row.className="citem";
      row.innerHTML='<div class="ci-main"><div class="ci-name">'+it.name+'</div><div class="ci-var">'+it.variant+'</div><div class="qtyctl"><button data-m="-" aria-label="Menos">−</button><span>'+it.q+'</span><button data-m="+" aria-label="Más">+</button></div></div><div class="ci-price">'+eur(it.price*it.q)+'</div>';
      row.querySelector('[data-m="-"]').addEventListener("click",function(){if(--it.q<=0)delete cart[k];save();renderCart();});
      row.querySelector('[data-m="+"]').addEventListener("click",function(){it.q++;save();renderCart();});box.appendChild(row);});}
    document.getElementById("cartCount").textContent=n;document.getElementById("cartTotal").textContent=eur(total);}
  renderCart();
  var drawer=document.getElementById("drawer");
  document.getElementById("cartbtn").addEventListener("click",function(){drawer.classList.add("open");});
  drawer.querySelectorAll("[data-close]").forEach(function(x){x.addEventListener("click",function(){drawer.classList.remove("open");});});
  document.addEventListener("keydown",function(e){if(e.key==="Escape")drawer.classList.remove("open");});
  document.getElementById("checkoutBtn").addEventListener("click",function(){
    var lines=Object.keys(cart).map(function(k){return {variantId:cart[k].variantId,qty:cart[k].q};});
    if(!lines.length){showToast("Tu carrito está vacío");return;}
    shopifyStore.checkout(lines).then(function(res){
      if(res&&res.demo){showToast("Demo: aquí Shopify abriría el pago seguro 🔒");}
      else if(res&&res.checkoutUrl){window.location.href=res.checkoutUrl;}
    });
  });

  /* ===== toast + copy ===== */
  var toast=document.getElementById("toast"),tt;
  function showToast(m){toast.textContent=m;toast.classList.add("show");clearTimeout(tt);tt=setTimeout(function(){toast.classList.remove("show");},2200);}
  document.querySelectorAll("[data-copy]").forEach(function(b){b.addEventListener("click",function(){var t=b.getAttribute("data-copy");
    if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(function(){showToast("Teléfono copiado");},fb);}else fb();
    function fb(){var r=document.createRange();r.selectNodeContents(document.getElementById("tel"));var sel=getSelection();sel.removeAllRanges();sel.addRange(r);showToast("Selecciona y copia");}});});

  /* ===== nav + theme ===== */
  var toggle=document.getElementById("navtoggle"),links=document.getElementById("navlinks");
  toggle.addEventListener("click",function(){var o=links.classList.toggle("open");toggle.setAttribute("aria-expanded",o);toggle.textContent=o?"✕":"☰";});
  links.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){links.classList.remove("open");toggle.textContent="☰";toggle.setAttribute("aria-expanded",false);});});
  var root=document.documentElement,tb=document.getElementById("themebtn");
  try{var sv=localStorage.getItem("rawa_theme");if(sv)root.setAttribute("data-theme",sv);}catch(e){}
  tb.addEventListener("click",function(){var cur=root.getAttribute("data-theme");var isDark=cur?cur==="dark":matchMedia("(prefers-color-scheme:dark)").matches;var next=isDark?"light":"dark";root.setAttribute("data-theme",next);try{localStorage.setItem("rawa_theme",next);}catch(e){}});
  document.getElementById("yr").textContent=new Date().getFullYear();

  /* ===== HERO BEAN — interacción (arrastrar para girar) ===== */
  var beanTilt=document.getElementById("beanTilt"),stage=document.getElementById("stage"),hint=document.getElementById("beanhint");
  (function(){
    var rotY=0,rotX=0,targetY=0,targetX=0,dragging=false,startX=0,startY=0,baseY=0,baseX=0,raf=null,used=false;
    function clamp(v,a,b){return Math.max(a,Math.min(b,v));}
    function apply(){ beanTilt.style.transform="rotateY("+rotY.toFixed(2)+"deg) rotateX("+rotX.toFixed(2)+"deg)"; }
    function loop(){ rotY+=(targetY-rotY)*0.12; rotX+=(targetX-rotX)*0.12; apply();
      if(Math.abs(targetY-rotY)>0.05||Math.abs(targetX-rotX)>0.05){raf=requestAnimationFrame(loop);}else{rotY=targetY;rotX=targetX;apply();raf=null;} }
    function kick(){ if(!raf)raf=requestAnimationFrame(loop); }
    function markUsed(){ if(!used){used=true;if(hint)hint.style.opacity="0";} }
    // Arrastrar (móvil + escritorio)
    stage.addEventListener("pointerdown",function(e){dragging=true;startX=e.clientX;startY=e.clientY;baseY=targetY;baseX=targetX;beanTilt.classList.add("grabbing");markUsed();});
    window.addEventListener("pointermove",function(e){
      if(dragging){ targetY=clamp(baseY+(e.clientX-startX)*0.6,-55,55); targetX=clamp(baseX-(e.clientY-startY)*0.35,-30,30); kick(); }
      else if(fine){ var r=stage.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)return;
        var px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5; targetY=px*24;targetX=-py*16;kick(); }
    });
    window.addEventListener("pointerup",function(){ if(!dragging)return; dragging=false; beanTilt.classList.remove("grabbing");
      if(!fine){ targetY=0;targetX=0;kick(); } }); // en móvil vuelve al centro al soltar
    if(fine){ stage.addEventListener("pointerleave",function(){ if(!dragging){targetY=0;targetX=0;kick();} }); }
  })();

  /* ===== ANIMATIONS ===== */
  if(hasGsap&&!reduce){
    gsap.registerPlugin(ScrollTrigger);
    var tl=gsap.timeline({defaults:{ease:"power3.out"}});
    tl.set(".pre",{opacity:1})
      .from(".bring",{scale:.4,opacity:0,duration:1,stagger:.12},0)
      .from("#beanIntro",{scale:.55,opacity:0,rotation:-26,duration:1.2,transformOrigin:"50% 55%"},.1)
      .from(".ktag",{x:20,opacity:0,duration:.6},.7)
      .from(".beanhint",{opacity:0,duration:.6},1)
      .from(".h-eyebrow",{y:18,opacity:0,duration:.6},.3)
      .from(".hero h1 .ln",{y:46,opacity:0,duration:.9,stagger:.12},.35)
      .from(".hero-sub",{y:20,opacity:0,duration:.7},.7)
      .from(".hero-cta",{y:18,opacity:0,duration:.7},.82)
      .from(".hero-meta span",{y:14,opacity:0,duration:.5,stagger:.09},.95);
    // failsafe: fuerza visibilidad por si algún tween no completara
    gsap.delayedCall(2.2,function(){gsap.set(".pre",{clearProps:"opacity"});document.documentElement.classList.remove("anim");});

    // capas independientes (ningún tween comparte elemento → no se pisan)
    gsap.to("#beanFloat",{y:"+=14",rotation:3,duration:3.4,ease:"sine.inOut",repeat:-1,yoyo:true,transformOrigin:"50% 50%"});
    gsap.to("#ring1",{rotate:360,duration:48,ease:"none",repeat:-1,transformOrigin:"50% 50%"});
    gsap.to("#ring2",{rotate:-360,duration:36,ease:"none",repeat:-1,transformOrigin:"50% 50%"});
    gsap.fromTo([".steam #st1",".steam #st2"],{strokeDasharray:"4 120",strokeDashoffset:120,opacity:.5},{strokeDashoffset:-120,duration:3.4,ease:"none",repeat:-1,stagger:.6});
    gsap.to("#beanScroll",{yPercent:-24,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:.6}});
    gsap.to(".hero-bg img",{yPercent:14,ease:"none",scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}});
    gsap.to(".hero-copy",{yPercent:-8,opacity:.35,ease:"none",scrollTrigger:{trigger:".hero",start:"center top",end:"bottom top",scrub:true}});

    ScrollTrigger.batch(".reveal",{start:"top 86%",once:true,onEnter:function(b){gsap.from(b,{y:34,opacity:0,duration:.8,stagger:.08,ease:"power3.out"});}});
    ScrollTrigger.batch(".rvup",{start:"top 88%",once:true,onEnter:function(b){gsap.from(b,{y:46,opacity:0,duration:.7,stagger:.08,ease:"power2.out"});}});
    if(fine){gsap.utils.toArray(".utile img").forEach(function(img){gsap.fromTo(img,{yPercent:-6},{yPercent:6,ease:"none",scrollTrigger:{trigger:img.parentElement,start:"top bottom",end:"bottom top",scrub:true}});});}
    gsap.from(".giant",{opacity:0,scale:.92,duration:1,ease:"power2.out",scrollTrigger:{trigger:".foot",start:"top 72%",once:true}});
    if(fine){document.querySelectorAll(".magnetic").forEach(function(btn){
      var xT=gsap.quickTo(btn,"x",{duration:.4,ease:"power3"}),yT=gsap.quickTo(btn,"y",{duration:.4,ease:"power3"});
      btn.addEventListener("pointermove",function(e){var r=btn.getBoundingClientRect();xT((e.clientX-r.left-r.width/2)*.35);yT((e.clientY-r.top-r.height/2)*.35);});
      btn.addEventListener("pointerleave",function(){xT(0);yT(0);});});}
    ScrollTrigger.refresh();
  }
})();
}
