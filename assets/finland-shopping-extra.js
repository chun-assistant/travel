(function(){
  var data=window.AURORA_SHOPPING_DATA;
  if(!data)return;

  var imageMap={
    'pur Bio-Apfelchips geriffelt':'../assets/shopping/vienna/bio-apfelchips.webp',
    'BILLA Bio Schoko Haferkekse':'../assets/shopping/vienna/billa-bio-schoko-haferkekse.webp',
    'Bonne Premium Mustikkamehu':'../assets/shopping/finland/bonne-premium-mustikkamehu.webp',
    'Finnair Blueberry Juice Drink':'../assets/shopping/finland/finnair-blueberry-juice-drink.webp',
    'Valio Hedelmätarha Luomu Puolukka-Karpalo':'../assets/shopping/finland/valio-puolukka-karpalo.webp',
    'Froosh Smoothie':'../assets/shopping/finland/froosh-smoothie.webp',
    'Karl Fazer Blue':'../assets/shopping/finland/karl-fazer-blue.webp',
    'Karl Fazer Dark 70%':'../assets/shopping/finland/karl-fazer-dark-70.webp',
    'Moomin Liquorice':'../assets/shopping/finland/moomin-liquorice.webp',
    'Kellogg’s Trésor Choco Nougat':'../assets/shopping/finland/kelloggs-tresor.webp',
    'Ovomaltine Crunchy Cream':'https://www.ovomaltine.com/sites/ovomaltine.com/files/07612100915233.png',
    'Paulig Juhla Mokka':'https://cdn.s-cloud.fi/v1/w720h720%40_q75/assets/dam-id/110bN8NA4gvB2pOkhk2fbB.webp',
    'Nordqvist Moomin Tea':'https://nordqvist.fi/cdn/shop/files/paeivaen-paras-hetki-pussitee-uusi-design-nordqvist-teekauppa-122.jpg?v=1757944728&width=1500',
    'Nordqvist SUOMI Blueberry Tea':'https://cdn.s-cloud.fi/v1/w720h720%40_q75/assets/dam-id/7IkephA2a4k8beGyMhiA6T.webp',
    'Fazer Cacao':'https://fazerpro.fazer.com/globalassets/fc_fi_856230_fazer-cacao-200g_web.png'
  };

  var sourceMap={
    'Ovomaltine Crunchy Cream':{source:'https://www.ovomaltine.com/en/ovomaltine-crunchy-cream-240-g',sourceLabel:'Ovomaltine 官方商品頁'},
    'Paulig Juhla Mokka':{source:'https://www.s-kaupat.fi/tuote/paulig-juhla-mokka-kahvi-suodatinjauhatus-500g/6411300000494',sourceLabel:'S-kaupat 官方販售頁'},
    'Nordqvist Moomin Tea':{source:'https://nordqvist.fi/products/paivan-parast-hetki-pussitee',sourceLabel:'Nordqvist 官方商品頁'},
    'Nordqvist SUOMI Blueberry Tea':{source:'https://www.s-kaupat.fi/tuote/nordqvist-suomi-tee-20-x-1-75-g-rfa/6413446014397',sourceLabel:'S-kaupat 官方販售頁'},
    'Fazer Cacao':{source:'https://fazerpro.fazer.com/en-fi/catalog/products/baking/cacao/fazer-cacao-200g/',sourceLabel:'Fazer Pro 官方商品頁'}
  };

  function decorateProduct(product){
    if(!product||!product.item)return;
    if(imageMap[product.item])product.image=imageMap[product.item];
    if(sourceMap[product.item]){
      product.source=sourceMap[product.item].source;
      product.sourceLabel=sourceMap[product.item].sourceLabel;
    }
  }

  function patchGroupedProducts(collection){
    (collection||[]).forEach(function(section){
      (section.groups||[]).forEach(function(group){
        (group.products||[]).forEach(decorateProduct);
      });
    });
  }
  function patchFlatProducts(collection){
    (collection||[]).forEach(decorateProduct);
  }
  patchGroupedProducts(data.supermarkets);
  patchFlatProducts(data.souvenirs);

  data.souvenirs=data.souvenirs||[];
  var items=['Fazer Café 巧克力','Moomin 周邊／ARABIA・Iittala・Marimekko 聯名','Lumene 保養品','Marttiini 馴鹿皮手套'];
  data.souvenirs=data.souvenirs.filter(function(x){return items.indexOf(x.item)===-1});
  var rows=[
    {country:'🇫🇮 芬蘭',category:'⭐ 芬蘭代表',priority:'⭐ 必買',item:'Fazer Café 巧克力',reason:'Fazer 巧克力始祖店／咖啡館相關商品，紀念性比一般超市巧克力更高；可現場挑限定包裝、禮盒或咖啡館款巧克力。',place:'Fazer Café／Fazer 商店',tag:'巧克力始祖店',image:'https://en.fazer.com/cdn/shop/files/fazerxbalmuirbox-store_large.jpg?v=1743569771',source:'https://en.fazer.com/products/fazer-x-balmuir-box',sourceLabel:'Fazer Store 官方商品頁'},
    {country:'🇫🇮 芬蘭',category:'🦛 嚕嚕米周邊',priority:'⭐ 必買',item:'Moomin 周邊／ARABIA・Iittala・Marimekko 聯名',reason:'芬蘭最具代表性的角色 IP；馬克杯、保溫杯、餐具、娃娃、明信片與文具都很適合收藏或送禮。',place:'Moomin Shop／Iittala／ARABIA／百貨／機場',tag:'收藏推薦',image:'https://shop.moomin.com/cdn/shop/products/6411801005578moominfriendshipmug_300x.jpg?v=1745917403',source:'https://shop.moomin.com/products/moomin-friendship-mug-0-3l-moomin-arabia',sourceLabel:'Moomin 官方商店'},
    {country:'🇫🇮 芬蘭',category:'💙 芬蘭保養品牌',priority:'⭐ 必買',item:'Lumene 保養品',reason:'芬蘭國民保養品牌；Nordic Hydra 保濕系列、乳液、精華液與面膜很適合乾冷氣候保養。',place:'Lyko／藥妝店／百貨／部分超市',tag:'美妝推薦',image:'https://lumene.com/cdn/shop/files/297_bca3ae5d-04e5-4369-be3b-e05ee01a19b3.jpg?v=1750739654&width=720',source:'https://lumene.com/products/84907',sourceLabel:'Lumene 官方商品頁'},
    {country:'🇫🇮 芬蘭',category:'🦌 拉普蘭特色',priority:'👍 推薦',item:'Marttiini 馴鹿皮手套',reason:'羅瓦涅米在地品牌，馴鹿皮手套兼具實用與拉普蘭紀念性；刀具類只作品牌認識，不建議列為主要購買品。',place:'Rovaniemi／Lappish shops／戶外或紀念品店',tag:'拉普蘭限定',image:'https://varuste.net/tiedostot/1/kuva/tuote/600/13037701.png',source:'https://varuste.net/en/p137774/marttiini-reindeer-leather-gloves',sourceLabel:'Varuste.net 商品頁'}
  ];
  var firstNorway=data.souvenirs.findIndex(function(x){return String(x.country||'').indexOf('挪威')>=0});
  if(firstNorway>=0)data.souvenirs.splice.apply(data.souvenirs,[firstNorway,0].concat(rows));
  else data.souvenirs=data.souvenirs.concat(rows);
})();
