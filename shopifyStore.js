// Capa de servicio — adaptador Shopify Storefront API. DEMO: config.enabled=false.
import { RAWA_CATALOG } from '../data/catalog.js';

export const shopifyStore=(function(){
  var config={ enabled:false, domain:"", storefrontToken:"", apiVersion:"2025-01" };

  // --- Consultas Storefront API reales (listas para producción) ---
  var Q_PRODUCTS="query Products($first:Int!){products(first:$first){edges{node{"+
    "id handle title availableForSale "+
    "variants(first:30){edges{node{id title availableForSale sku "+
    "price{amount currencyCode} selectedOptions{name value}}}}"+
    "notas:metafield(namespace:\"rawa\",key:\"notas\"){value} "+
    "proceso:metafield(namespace:\"rawa\",key:\"proceso\"){value}}}}}";
  var M_CART_CREATE="mutation CartCreate($lines:[CartLineInput!]!){cartCreate(input:{lines:$lines}){"+
    "cart{id checkoutUrl totalQuantity} userErrors{field message}}}";

  function endpoint(){ return "https://"+config.domain+"/api/"+config.apiVersion+"/graphql.json"; }
  function gql(query,variables){
    return fetch(endpoint(),{method:"POST",headers:{
      "Content-Type":"application/json",
      "X-Shopify-Storefront-Access-Token":config.storefrontToken
    },body:JSON.stringify({query:query,variables:variables})}).then(function(r){return r.json();});
  }

  // Construye las variantes (peso × molienda) desde el catálogo demo.
  function buildVariants(p){
    var C=RAWA_CATALOG, out=[];
    C.weights.forEach(function(w){ C.grinds.forEach(function(g){
      out.push({ id:"demo:"+p.id+":"+w.label+":"+g, title:w.label+" · "+g,
        weight:w.label, grind:g, price:p.basePrice+w.delta,
        available:p.available, sku:("RAWA-"+p.id+"-"+w.label+"-"+g.split(" ")[0]).toUpperCase().replace(/[^A-Z0-9-]/g,"") });
    }); });
    return out;
  }
  function normalizeDemo(p){
    return { id:p.id, handle:p.handle, title:p.title,
      origin:p.country+" · "+p.region, country:p.country, region:p.region,
      process:p.process, method:p.method, notes:p.notes, profile:p.profile,
      caf:p.caf, coords:p.coords, lot:p.lot, available:p.available, stockLabel:p.stockLabel,
      basePrice:p.basePrice, variants:buildVariants(p) };
  }
  // Mapea un producto real de Shopify al mismo formato normalizado.
  function normalizeShopify(node){
    var vs=(node.variants.edges||[]).map(function(e){var v=e.node;
      var opt=function(n){var o=(v.selectedOptions||[]).filter(function(x){return x.name.toLowerCase().indexOf(n)>-1;})[0];return o?o.value:"";};
      return { id:v.id, title:v.title, weight:opt("peso")||opt("weight"), grind:opt("molienda")||opt("grind"),
        price:parseFloat(v.price.amount), available:v.availableForSale, sku:v.sku };
    });
    return { id:node.id, handle:node.handle, title:node.title, available:node.availableForSale,
      process:node.proceso?node.proceso.value:"", notes:node.notas?node.notas.value.split(","):[],
      variants:vs, basePrice:vs.length?Math.min.apply(null,vs.map(function(v){return v.price;})):0 };
  }

  return {
    config:config,
    isDemo:function(){ return !config.enabled; },
    // Devuelve siempre una promesa (mismo contrato en demo y producción).
    getProducts:function(){
      if(!config.enabled) return Promise.resolve(RAWA_CATALOG.products.map(normalizeDemo));
      return gql(Q_PRODUCTS,{first:20}).then(function(res){
        return (res.data.products.edges||[]).map(function(e){return normalizeShopify(e.node);});
      });
    },
    // Crea el carrito y devuelve la URL de checkout seguro (null en demo).
    checkout:function(lines){
      if(!config.enabled) return Promise.resolve({demo:true,checkoutUrl:null});
      return gql(M_CART_CREATE,{lines:lines.map(function(l){return {merchandiseId:l.variantId,quantity:l.qty};})})
        .then(function(res){ return res.data.cartCreate.cart; });
    }
  };
})();
