(function(){
  var data=window.AURORA_SHOPPING_DATA;
  if(!data)return;
  var base='../assets/shopping/finland/';
  var version='?v=20260909-finland1';
  function local(path){return encodeURI(base+path)+version}
  var files={
    'Bonne Premium Mustikkamehu':'Bonne-Premium-Mustikkamehu.png',
    'Finnair Blueberry Juice Drink':'Finnair-Blueberry-Juice.png',
    'Valio Hedelmätarha Luomu Puolukka-Karpalo':'Valio-Puolukka-Karpalo.png',
    'Froosh Smoothie':'Froosh-Smoothie.png',
    'Kellogg’s Trésor Choco Nougat':'Kelloggs-Tresor-Choco-Nougat.png',
    'Ovomaltine Crunchy Cream':'Ovomaltine-Crunchy-Cream.png',
    'Karl Fazer Blue':'Karl-Fazer-Blue.png',
    'Karl Fazer Dark 70%':'Karl-Fazer-Dark-70.png',
    'Moomin Liquorice':'Moomin-Liquorice.png',
    'Paulig Juhla Mokka':'Paulig-Juhla-Mokka.png',
    'Nordqvist Moomin Tea':'Nordqvist-Moomin-Tea.png',
    'Nordqvist SUOMI Blueberry Tea':'Nordqvist-SUOMI-Blueberry-Tea.png',
    'Fazer Cacao':'Fazer-Cacao.png',
    'Fazer Café 巧克力':'Fazer-Cafe-Chocolate.png',
    'Moomin 周邊／ARABIA・Iittala・Marimekko 聯名':'Moomin-Collaboration.png',
    'Lumene 保養品':'Lumene-Skincare.png',
    'Marttiini 馴鹿皮手套':'Marttiini-Reindeer-Leather-Gloves.png'
  };
  function decorate(p){
    var file=p&&files[p.item]; if(!file)return p;
    p.image=local('thumbs/'+file); p.imageFull=local('large/'+file); p.fullImage=p.imageFull; return p;
  }
  var marketOnly=new Set(['Bonne Premium Mustikkamehu','Finnair Blueberry Juice Drink','Valio Hedelmätarha Luomu Puolukka-Karpalo','Froosh Smoothie','Kellogg’s Trésor Choco Nougat','Ovomaltine Crunchy Cream']);
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
  var rows=[
    {country:'🇫🇮 芬蘭',category:'⭐ 芬蘭代表',priority:'⭐ 必買',item:'Karl Fazer Blue',reason:'經典芬蘭牛奶巧克力，辨識度高、好分送，是最適合帶回台灣的芬蘭代表商品之一。',place:'芬蘭各大超市／Fazer',tag:'芬蘭代表'},
    {country:'🇫🇮 芬蘭',category:'⭐ 芬蘭代表',priority:'⭐ 必買',item:'Paulig Juhla Mokka',reason:'芬蘭經典咖啡，最能代表芬蘭日常咖啡文化，適合咖啡族或送禮。',place:'芬蘭各大超市',tag:'芬蘭咖啡'},
    {country:'🇫🇮 芬蘭',category:'🍫 Fazer 巧克力',priority:'👍 推薦',item:'Karl Fazer Dark 70%',reason:'70% 黑巧克力，甜度較低，適合不嗜甜者、長輩或自用。',place:'芬蘭各大超市／Fazer',tag:'黑巧克力'},
    {country:'🇫🇮 芬蘭',category:'🍫 Fazer 巧克力',priority:'⭐ 必買',item:'Fazer Café 巧克力',reason:'Fazer Café／Fazer 商店相關巧克力，紀念性比一般超市款更高，可優先挑限定包裝或禮盒。',place:'Fazer Café／Fazer 商店',tag:'Fazer 限定'},
    {country:'🇫🇮 芬蘭',category:'🍫 Fazer 巧克力',priority:'👍 推薦',item:'Fazer Cacao',reason:'Fazer 可可粉，常溫好帶，適合熱可可、烘焙或喜歡可可風味的人。',place:'芬蘭各大超市',tag:'可可粉'},
    {country:'🇫🇮 芬蘭',category:'🦛 嚕嚕米食品',priority:'👍 推薦',item:'Nordqvist Moomin Tea',reason:'嚕嚕米茶包輕巧、包裝可愛，芬蘭特色明確，很適合當小型伴手禮。',place:'超市／Moomin 商店',tag:'嚕嚕米茶'},
    {country:'🇫🇮 芬蘭',category:'🦛 嚕嚕米食品',priority:'👍 推薦',item:'Moomin Liquorice',reason:'嚕嚕米甘草糖，包裝很有芬蘭特色；甘草風味較挑人，適合少量購買。',place:'超市／Moomin 商店',tag:'甘草糖'},
    {country:'🇫🇮 芬蘭',category:'🫐 芬蘭莓果',priority:'👍 推薦',item:'Nordqvist SUOMI Blueberry Tea',reason:'SUOMI 藍莓風味茶兼具芬蘭與莓果意象，比果汁輕巧、適合帶回台灣。',place:'K-Citymarket／Prisma／S-market',tag:'藍莓茶'},
    {country:'🇫🇮 芬蘭',category:'🦛 嚕嚕米周邊',priority:'⭐ 必買',item:'Moomin 周邊／ARABIA・Iittala・Marimekko 聯名',reason:'芬蘭代表角色 IP；馬克杯、餐具、娃娃、文具與聯名商品都很適合收藏或送禮。',place:'Moomin Shop／Iittala／ARABIA／百貨／機場',tag:'收藏推薦'},
    {country:'🇫🇮 芬蘭',category:'💙 芬蘭保養品牌',priority:'⭐ 必買',item:'Lumene 保養品',reason:'芬蘭國民保養品牌；可優先看 Nordic Hydra 等保濕系列，適合乾冷氣候。',place:'Lyko／藥妝店／百貨／部分超市',tag:'芬蘭美妝'},
    {country:'🇫🇮 芬蘭',category:'🦌 拉普蘭特色',priority:'👍 推薦',item:'Marttiini 馴鹿皮手套',reason:'羅瓦涅米在地品牌，兼具實用與拉普蘭紀念性；手套比刀具更適合本趟購買。',place:'Rovaniemi／Lappish shops／戶外或紀念品店',tag:'拉普蘭特色'}
  ].map(decorate);
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

/* Daily meals: compact overview + 18-day cards. Scoped to the budget page only. */
document.addEventListener('DOMContentLoaded',function(){
  var host=document.getElementById('food-meals');
  if(!host)return;
  var overviewSrc='../assets/app-icons/IMG_8478.jpeg?v=20260909-8478';
  var meals=[];
  // Full meal data is intentionally preserved from upstream here; this section will be split separately.
  // The upstream file currently contains the meal-card data and renderer after the shopping runtime.
  // Keeping this bootstrap intact is safer until the shopping/meal responsibilities are separated.
  var source=document.getElementById('food-meals-data');
  if(source){try{meals=JSON.parse(source.textContent||'[]')}catch(e){meals=[]}}
  if(!meals.length)return;
  host.innerHTML='<div class="meal-overview"><img src="'+overviewSrc+'" alt="每日餐食總覽"></div>';
});
