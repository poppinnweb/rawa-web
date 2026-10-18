// Capa de datos — catalogo desacoplado (demo). En produccion lo sustituye la Storefront API.
export const RAWA_CATALOG={
  currency:"EUR",
  // weights: etiqueta + delta de precio sobre el precio base (250 g)
  weights:[{label:"250 g",delta:0},{label:"1 kg",delta:27}],
  grinds:["Grano entero","Molido espresso","Molido filtro"],
  products:[
    {id:"nica",handle:"nicaragua-jinotega",title:"Nicaragua Jinotega",country:"Nicaragua",region:"Jinotega",process:"Honey",method:"Espresso & Filtro",notes:["Cítricos","Azúcar moreno","Cuerpo suave"],profile:["fruity","sweet"],caf:"caf",coords:"13.09°N 86.00°W",lot:"N-JIN·24",basePrice:12.50,available:true,stockLabel:"En stock"},
    {id:"brasild",handle:"brasil-turquesa-co2-descafeinado",title:"Brasil Turquesa CO₂",country:"Brasil",region:"Descafeinado",process:"Descafeinado CO₂",method:"Espresso",notes:["Dulce","Cacao","Frutos secos"],profile:["sweet","intense"],caf:"decaf",coords:"CO₂ process",lot:"BR-CO2·24",basePrice:13.00,available:true,stockLabel:"En stock"},
    {id:"brasilp",handle:"brasil-el-paraiso",title:"Brasil El Paraíso",country:"Brasil",region:"El Paraíso",process:"Natural",method:"Espresso",notes:["Cacao","Avellana","Caramelo"],profile:["intense","sweet"],caf:"caf",coords:"21.1°S 44.2°W",lot:"BR-PAR·24",basePrice:15.50,available:true,stockLabel:"Últimas unidades"},
    {id:"costa",handle:"costa-rica-entre-rios",title:"Costa Rica Entre Ríos",country:"Costa Rica",region:"Entre Ríos",process:"Lavado",method:"Filtro",notes:["Panela","Manzana roja","Floral"],profile:["fruity","sweet"],caf:"caf",coords:"9.98°N 83.9°W",lot:"CR-ENR·24",basePrice:14.00,available:true,stockLabel:"En stock"}
  ]
};
