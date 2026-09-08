(function(){
  var data=window.AURORA_SHOPPING_DATA;
  if(!data)return;

  var base='../assets/shopping/vienna/';
  function local(file){return encodeURI(base+file)}
  function norm(value){return String(value||'').toLowerCase().replace(/[\s'’"“”()（）·・\-_/\\]+/g,'').trim()}

  var files={
    "Kelly's Chips Classic":'Kellys-Chips-Classic.png',
    'Alnatura Dinkel Mini Brezeln':'Alnatura-Dinkel-Mini-Brezeln.png',
    'pur Bio-Apfelchips geriffelt':'SPAR-Bio-Apfelchips.png',
    'BILLA Bio Schoko Haferkekse':'BILLA-Bio-Schoko-Haferkekse.png',
    'Sondey Choco Wafer Rolls Dark Chocolate':'Sondey-Choco-Wafer-Rolls.png',
    'Ritter Sport Nussklasse Pistazie':'Ritter-Sport-Pistazie.png',
    'Lindt Dubai Style Chocolade':'Lindt-Dubai-Style.png',
    'Almdudler':'Almdudler.png',
    'Manner Original Neapolitaner 威化餅':'Manner-Original-Neapolitaner.png',
    'Darbo Rosenmarillen Konfitüre':'Darbo-Rosenmarillen.png',
    'DEMEL Kandierte Veilchen 糖漬紫羅蘭':'DEMEL-Kandierte-Veilchen.png',
    'Zotter 巧克力':'Zotter-Schokolade.png',
    'Kamill Hand & Nagelcreme Classic':'Kamill-Hand-Nagelcreme.png',
    'Clinical Melatonin Forte Original':'Clinical-Melatonin-Forte.png',
    'Balea Hyaluron Konzentrat（藍色補水款）':'Balea-Hyaluron-Konzentrat.png',
    'Ferrero Giotto 榛果威化小球':'Ferrero-Giotto.png'
  };
  var fullByName={};
  function applyImage(product){
    var file=files[product.item];
    if(!file)return;
    product.image=local('thumbs/'+file);
    product.fullImage=local('large/'+file);
    fullByName[product.item]=product.fullImage;
  }

  var vienna=(data.supermarkets||[]).find(function(x){return String(x.city||'').indexOf('維也納')!==-1});
  var supermarketNames=new Set();
  if(vienna&&Array.isArray(vienna.groups)){
    vienna.groups.forEach(function(group){
      if(!Array.isArray(group.products))return;
      var seen=new Set();
      group.products=group.products.filter(function(product){
        var key=norm(product.item);
        if(!key||seen.has(key))return false;
        seen.add(key);
        supermarketNames.add(key);
        applyImage(product);
        return true;
      });
    });
  }

  var seenViennaSouvenirs=new Set();
  data.souvenirs=(data.souvenirs||[]).filter(function(product){
    if(String(product.country||'').indexOf('維也納')===-1)return true;
    var key=norm(product.item);
    if(!key||supermarketNames.has(key)||seenViennaSouvenirs.has(key))return false;
    seenViennaSouvenirs.add(key);
    applyImage(product);
    return true;
  });

  document.addEventListener('click',function(event){
    var button=event.target.closest&&event.target.closest('[data-product-image][data-product-name]');
    if(!button)return;
    var full=fullByName[button.dataset.productName];
    if(full)button.dataset.productImage=full;
  },true);
})();
