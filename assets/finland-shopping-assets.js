(function(){
  var data=window.AURORA_SHOPPING_DATA;
  var finlandData=window.TravelFinlandShoppingData;
  if(!data||!finlandData)return;
  var base='../assets/shopping/finland/';
  var version='?v=20260909-finland1';
  function local(path){return encodeURI(base+path)+version}
  var files=finlandData.files;
  function decorate(p){
    var file=p&&files[p.item]; if(!file)return p;
    p.image=local('thumbs/'+file); p.imageFull=local('large/'+file); p.fullImage=p.imageFull; return p;
  }
  var marketOnly=new Set(finlandData.marketOnly);
  var finland=(data.supermarkets||[]).find(function(x){return String(x.city||'').indexOf('芬蘭')>=0});
  if(finland){
    finland.items=Array.from(marketOnly);
    finland.groups=(finland.groups||[]).map(function(g){
      g.products=(g.products||[]).filter(function(p){return marketOnly.has(p.item)}).map(decorate);
      return g;
    }).filter(function(g){return g.products.length>0});
    finland.note='芬蘭超市頁只保留旅途中直接吃喝／早餐備糧；可帶回台灣的代表性商品統一放到「伴手禮推薦」，避免兩頁重複。';
  }
  data.souvenirs=(data.souvenirs||[]).filter(function(x){return String(x.country||'').indexOf('芬蘭')<0});
  var rows=finlandData.souvenirs.map(function(x){return Object.assign({},x)}).map(decorate);
  var firstNorway=data.souvenirs.findIndex(function(x){return String(x.country||'').indexOf('挪威')>=0});
  if(firstNorway>=0)data.souvenirs.splice.apply(data.souvenirs,[firstNorway,0].concat(rows)); else data.souvenirs=data.souvenirs.concat(rows);
  var largeByName={}; Object.keys(files).forEach(function(name){largeByName[name]=local('large/'+files[name])});
  function overrideButton(button){
    var name=button&&button.dataset&&button.dataset.productName||''; var full=largeByName[name]; if(!full)return;
    var img=button.querySelector&&button.querySelector('.shopping-product-image'); if(img)button.dataset.productThumbnail=img.getAttribute('src')||'';
    button.dataset.productImage=full;
  }
  document.addEventListener('DOMContentLoaded',function(){setTimeout(function(){document.querySelectorAll('.shopping-product-image-button[data-product-name]').forEach(overrideButton)},0)});
  document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.shopping-product-image-button[data-product-name]'); if(b)overrideButton(b)},true);
})();
