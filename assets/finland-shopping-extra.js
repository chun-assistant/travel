(function(){
  var data=window.AURORA_SHOPPING_DATA;
  if(!data)return;

  var imageMap={
    'pur Bio-Apfelchips geriffelt':'../assets/shopping/norway/SPAR Bio Apfelchips.jpg',
    'BILLA Bio Schoko Haferkekse':'../assets/shopping/vienna/billa-bio-schoko-haferkekse.webp',
    'Bonne Premium Mustikkamehu':'../assets/shopping/finland/bonne-premium-mustikkamehu.webp',
    'Finnair Blueberry Juice Drink':'../assets/shopping/finland/finnair-blueberry-juice-drink.webp',
    'Valio Hedelmätarha Luomu Puolukka-Karpalo':'../assets/shopping/norway/Valio Hedelmätarha Luomu Puolukka-Karpalo.avif',
    'Froosh Smoothie':'../assets/shopping/finland/froosh-smoothie.webp',
    'Karl Fazer Blue':'../assets/shopping/finland/karl-fazer-blue.webp',
    'Karl Fazer Dark 70%':'../assets/shopping/finland/karl-fazer-dark-70.webp',
    'Moomin Liquorice':'../assets/shopping/finland/moomin-liquorice.webp',
    'Kellogg’s Trésor Choco Nougat':'../assets/shopping/finland/kelloggs-tresor.webp',
    'Ovomaltine Crunchy Cream':'https://www.ovomaltine.com/sites/ovomaltine.com/files/07612100915233.png',
    'Paulig Juhla Mokka':'https://cdn.s-cloud.fi/v1/w720h720%40_q75/assets/dam-id/110bN8NA4gvB2pOkhk2fbB.webp',
    'Nordqvist Moomin Tea':'https://nordqvist.fi/cdn/shop/files/paeivaen-paras-hetki-pussitee-uusi-design-nordqvist-teekauppa-122.jpg?v=1757944728&width=1500',
    'Nordqvist SUOMI Blueberry Tea':'https://cdn.s-cloud.fi/v1/w720h720%40_q75/assets/dam-id/7IkephA2a4k8beGyMhiA6T.webp',
    'Fazer Cacao':'https://fazerpro.fazer.com/globalassets/fc_fi_856230_fazer-cacao-200g_web.png',
    'Kamill Hand & Nagelcreme Classic':'../assets/shopping/norway/Kamill Hand & Nagelcreme Classic.jpg',
    'Fazer Café 巧克力':'../assets/shopping/norway/Fazer Café 巧克力.jpg',
    'Moomin 周邊／ARABIA・Iittala・Marimekko 聯名':'../assets/shopping/norway/Moomin 周邊／ARABIA・Iittala・Marimekko 聯名.jpg',
    'Marttiini 馴鹿皮手套':'../assets/shopping/norway/Marttiini 馴鹿皮手套.webp',
    'Darbo Naturrein Wildheidelbeere｜野生藍莓果醬':'../assets/shopping/finland/Darbo野生藍莓果醬.webp'
  };

  var fullImageMap={
    "Kelly's Chips Classic":'https://images.cdn.europe-west1.gcp.commercetools.com/723b2575-66c7-4d92-ae49-82bf1d168d26/00-288648-0238714879-r0x0DHnP.jpg',
    'Alnatura Dinkel Mini Brezeln':'https://images.cdn.europe-west1.gcp.commercetools.com/723b2575-66c7-4d92-ae49-82bf1d168d26/00-317554-0205337684-XwaPDwoj.jpg',
    'BILLA Bio Schoko Haferkekse':'https://images.cdn.europe-west1.gcp.commercetools.com/723b2575-66c7-4d92-ae49-82bf1d168d26/00-703404-873159845-zs1AqZjq.jpg',
    'Sondey Choco Wafer Rolls Dark Chocolate':'https://sortiment.lidl.ch/media/catalog/product/1/7/171981_DarkChocolate_PSXX.jpg',
    'Ritter Sport Nussklasse Pistazie':'https://images.cdn.europe-west1.gcp.commercetools.com/723b2575-66c7-4d92-ae49-82bf1d168d26/00-762363-1106946824-9LqwSc_4.jpg',
    'Almdudler':'https://images.cdn.europe-west1.gcp.commercetools.com/723b2575-66c7-4d92-ae49-82bf1d168d26/00-770082-0195532897-9iLfag6m.jpg',
    'Bonne Premium Mustikkamehu':'https://www.bonnejuomat.fi/client/bonne2020/userfiles/bonne-mustikka-1l1348910838.png',
    'Finnair Blueberry Juice Drink':'https://public.keskofiles.com/f/k-ruoka/product/6415130048916?auto=format&cs=srgb&fit=max&fm=png&h=1400&w=1400',
    'Froosh Smoothie':'https://public.keskofiles.com/f/k-ruoka/product/7350020720758?auto=format&cs=srgb&fit=max&fm=png&h=1400&w=1400',
    'Karl Fazer Blue':'https://images.partyking.org/fit-in/1300x0/products/original/karl-fazer-mjolkchoklad-chokladkaka-2.jpg',
    'Karl Fazer Dark 70%':'https://fazerpro.fazer.com/globalassets/402162_karl_fazer_thins_dark_70_cocoa_95g.png',
    'Moomin Liquorice':'https://kouvolanlakritsi.fi/cdn/shop/files/muumimamma_1.jpg?v=1719484242&width=1445',
    'Kellogg’s Trésor Choco Nougat':'https://media.cdn.kaufland.de/product-images/2048x2048/7ae15e6938234a95cee0a422cca46fba.webp',
    'Ovomaltine Crunchy Cream':'https://www.ovomaltine.com/sites/ovomaltine.com/files/07612100915233.png',
    'Paulig Juhla Mokka':'https://cdn.s-cloud.fi/v1/w1440h1440%40_q85/assets/dam-id/110bN8NA4gvB2pOkhk2fbB.webp',
    'Nordqvist Moomin Tea':'https://nordqvist.fi/cdn/shop/files/paeivaen-paras-hetki-pussitee-uusi-design-nordqvist-teekauppa-122.jpg?v=1757944728&width=1800',
    'Nordqvist SUOMI Blueberry Tea':'https://cdn.s-cloud.fi/v1/w1440h1440%40_q85/assets/dam-id/7IkephA2a4k8beGyMhiA6T.webp',
    'Fazer Cacao':'https://fazerpro.fazer.com/globalassets/fc_fi_856230_fazer-cacao-200g_web.png',
    'Manner Original Neapolitaner 威化餅':'https://images.cdn.europe-west1.gcp.commercetools.com/723b2575-66c7-4d92-ae49-82bf1d168d26/00-790860-0728303564-6RlkpIg_.jpg',
    'Darbo Rosenmarillen Konfitüre':'https://images.cdn.europe-west1.gcp.commercetools.com/723b2575-66c7-4d92-ae49-82bf1d168d26/00-878190-0471765227-Jcm0VeKV.jpg',
    'Darbo Naturrein Wildheidelbeere｜野生藍莓果醬':'../assets/shopping/finland/Darbo野生藍莓果醬.webp',
    'DEMEL Kandierte Veilchen 糖漬紫羅蘭':'https://www.demel.com/cdn/shop/products/Candied_Violets_04.webp?v=1681826075&width=1600',
    'Zotter 巧克力':'https://images.cdn.europe-west1.gcp.commercetools.com/723b2575-66c7-4d92-ae49-82bf1d168d26/00-899847-0105233692-_WstWtlg.jpg',
    'Kamill Hand & Nagelcreme Classic':'../assets/shopping/norway/Kamill Hand & Nagelcreme Classic.jpg',
    'Clinical Melatonin Forte Original':'https://products.dm-static.com/images/f_auto%2Cq_auto%2Cc_fit%2Ch_1200%2Cw_1200/v1762776486/assets/pas/images/d3c134c5-39aa-4244-9f68-5b799f73edd7/clinical-melatonin-melatonin-forte-original',
    'Balea Hyaluron Konzentrat（藍色補水款）':'https://products.dm-static.com/images/f_auto%2Cq_auto%2Cc_fit%2Ch_1200%2Cw_1200/v1771941372/assets/pas/images/3611250c-02c3-4986-89b6-abc68aa1c8dc/balea-hyaluron-konzentrat',
    'Ferrero Giotto 榛果威化小球':'https://images.cdn.europe-west1.gcp.commercetools.com/723b2575-66c7-4d92-ae49-82bf1d168d26/00-407313-0160604677-CMrA_lkC.jpg',
    'Fazer Café 巧克力':'../assets/shopping/norway/Fazer Café 巧克力.jpg',
    'Moomin 周邊／ARABIA・Iittala・Marimekko 聯名':'../assets/shopping/norway/Moomin 周邊／ARABIA・Iittala・Marimekko 聯名.jpg',
    'Lumene 保養品':'https://lumene.com/cdn/shop/files/297_bca3ae5d-04e5-4369-be3b-e05ee01a19b3.jpg?v=1750739654&width=1600',
    'Marttiini 馴鹿皮手套':'../assets/shopping/norway/Marttiini 馴鹿皮手套.webp',
    'pur Bio-Apfelchips geriffelt':'../assets/shopping/norway/SPAR Bio Apfelchips.jpg',
    'Valio Hedelmätarha Luomu Puolukka-Karpalo':'../assets/shopping/norway/Valio Hedelmätarha Luomu Puolukka-Karpalo.avif'
  };

  /* LOCAL SHOPPING ASSET OVERRIDES START */
  var localAssetMap={
    "Kelly's Chips Classic":"../assets/shopping/vienna/kellys-chips-classic.png",
    "Alnatura Dinkel Mini Brezeln":"../assets/shopping/vienna/alnatura-dinkel-mini-brezeln.png",
    "Ritter Sport Nussklasse Pistazie":"../assets/shopping/vienna/ritter-sport-pistazie.png",
    "Lindt Dubai Style Chocolade":"../assets/shopping/vienna/lindt-dubai-style.png",
    "Almdudler":"../assets/shopping/vienna/almdudler.png",
    "Manner Original Neapolitaner 威化餅":"../assets/shopping/vienna/manner-original-neapolitaner.png",
    "Darbo Rosenmarillen Konfitüre":"../assets/shopping/vienna/darbo-rosenmarillen.png",
    "DEMEL Kandierte Veilchen 糖漬紫羅蘭":"../assets/shopping/vienna/demel-candied-violets.png",
    "Zotter 巧克力":"../assets/shopping/vienna/zotter-chocolate.png",
    "Clinical Melatonin Forte Original":"../assets/shopping/vienna/clinical-melatonin-forte.png",
    "Balea Hyaluron Konzentrat（藍色補水款）":"../assets/shopping/vienna/balea-hyaluron-konzentrat.png",
    "Ferrero Giotto 榛果威化小球":"../assets/shopping/vienna/ferrero-giotto.png",
    "Ovomaltine Crunchy Cream":"../assets/shopping/finland/ovomaltine-crunchy-cream.png",
    "Paulig Juhla Mokka":"../assets/shopping/finland/paulig-juhla-mokka.png",
    "Nordqvist Moomin Tea":"../assets/shopping/finland/nordqvist-moomin-tea.png",
    "Nordqvist SUOMI Blueberry Tea":"../assets/shopping/finland/nordqvist-suomi-blueberry-tea.png",
    "Fazer Cacao":"../assets/shopping/finland/fazer-cacao.png",
    "Lumene 保養品":"../assets/shopping/finland/lumene-skincare.png"
  };
  Object.keys(localAssetMap).forEach(function(name){imageMap[name]=localAssetMap[name];fullImageMap[name]=localAssetMap[name];});
  /* LOCAL SHOPPING ASSET OVERRIDES END */

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
    if(fullImageMap[product.item])product.imageFull=fullImageMap[product.item];
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
  var blueberryJamItem='Darbo Naturrein Wildheidelbeere｜野生藍莓果醬';

  var viennaMarket=(data.supermarkets||[]).find(function(x){return String(x.city||'').indexOf('維也納')>=0;});
  if(viennaMarket){
    viennaMarket.items=viennaMarket.items||[];
    if(viennaMarket.items.indexOf(blueberryJamItem)===-1)viennaMarket.items.push(blueberryJamItem);
    viennaMarket.groups=viennaMarket.groups||[];
    var jamGroup=viennaMarket.groups.find(function(g){return String(g.label||'').indexOf('果醬')>=0;});
    if(!jamGroup){
      jamGroup={label:'🫐 果醬／早餐抹醬',products:[]};
      viennaMarket.groups.push(jamGroup);
    }
    if(!jamGroup.products.some(function(p){return p&&p.item===blueberryJamItem;})){
      jamGroup.products.push({
        item:blueberryJamItem,
        detail:'Darbo Naturrein 野生藍莓果醬；適合早餐抹麵包、優格，也很適合當伴手禮。',
        place:'BILLA／SPAR／大型超市',
        priority:'👍 推薦｜🎁 可當伴手禮',
        image:imageMap[blueberryJamItem],
        imageFull:fullImageMap[blueberryJamItem]
      });
    }
  }

  if(!data.souvenirs.some(function(x){return x&&x.item===blueberryJamItem;})){
    var jamRow={
      country:'🇦🇹 維也納',
      category:'⭐ 維也納代表',
      priority:'👍 推薦',
      item:blueberryJamItem,
      reason:'Darbo Naturrein 野生藍莓果醬；莓果風味濃郁，適合抹麵包、優格，也很適合當伴手禮。',
      place:'BILLA／SPAR／大型超市',
      tag:'野生藍莓果醬',
      image:imageMap[blueberryJamItem],
      imageFull:fullImageMap[blueberryJamItem]
    };
    var existingDarbo=data.souvenirs.findIndex(function(x){return x&&x.item==='Darbo Rosenmarillen Konfitüre';});
    if(existingDarbo>=0)data.souvenirs.splice(existingDarbo+1,0,jamRow);
    else data.souvenirs.unshift(jamRow);
  }

  var items=['Fazer Café 巧克力','Moomin 周邊／ARABIA・Iittala・Marimekko 聯名','Lumene 保養品','Marttiini 馴鹿皮手套'];
  data.souvenirs=data.souvenirs.filter(function(x){return items.indexOf(x.item)===-1});
  var rows=[
    {country:'🇫🇮 芬蘭',category:'⭐ 芬蘭代表',priority:'⭐ 必買',item:'Fazer Café 巧克力',reason:'Fazer 巧克力始祖店／咖啡館相關商品，紀念性比一般超市巧克力更高；可現場挑限定包裝、禮盒或咖啡館款巧克力。',place:'Fazer Café／Fazer 商店',tag:'巧克力始祖店',image:imageMap['Fazer Café 巧克力'],imageFull:fullImageMap['Fazer Café 巧克力'],source:'https://en.fazer.com/products/fazer-x-balmuir-box',sourceLabel:'Fazer Store 官方商品頁'},
    {country:'🇫🇮 芬蘭',category:'🦛 嚕嚕米周邊',priority:'⭐ 必買',item:'Moomin 周邊／ARABIA・Iittala・Marimekko 聯名',reason:'芬蘭最具代表性的角色 IP；馬克杯、保溫杯、餐具、娃娃、明信片與文具都很適合收藏或送禮。',place:'Moomin Shop／Iittala／ARABIA／百貨／機場',tag:'收藏推薦',image:imageMap['Moomin 周邊／ARABIA・Iittala・Marimekko 聯名'],imageFull:fullImageMap['Moomin 周邊／ARABIA・Iittala・Marimekko 聯名'],source:'https://shop.moomin.com/products/moomin-friendship-mug-0-3l-moomin-arabia',sourceLabel:'Moomin 官方商店'},
    {country:'🇫🇮 芬蘭',category:'💙 芬蘭保養品牌',priority:'⭐ 必買',item:'Lumene 保養品',reason:'芬蘭國民保養品牌；Nordic Hydra 保濕系列、乳液、精華液與面膜很適合乾冷氣候保養。',place:'Lyko／藥妝店／百貨／部分超市',tag:'美妝推薦',image:'https://lumene.com/cdn/shop/files/297_bca3ae5d-04e5-4369-be3b-e05ee01a19b3.jpg?v=1750739654&width=720',imageFull:fullImageMap['Lumene 保養品'],source:'https://lumene.com/products/84907',sourceLabel:'Lumene 官方商品頁'},
    {country:'🇫🇮 芬蘭',category:'🦌 拉普蘭特色',priority:'👍 推薦',item:'Marttiini 馴鹿皮手套',reason:'羅瓦涅米在地品牌，馴鹿皮手套兼具實用與拉普蘭紀念性；刀具類只作品牌認識，不建議列為主要購買品。',place:'Rovaniemi／Lappish shops／戶外或紀念品店',tag:'拉普蘭限定',image:imageMap['Marttiini 馴鹿皮手套'],imageFull:fullImageMap['Marttiini 馴鹿皮手套'],source:'https://varuste.net/en/p137774/marttiini-reindeer-leather-gloves',sourceLabel:'Varuste.net 商品頁'}
  ];
  var firstNorway=data.souvenirs.findIndex(function(x){return String(x.country||'').indexOf('挪威')>=0});
  if(firstNorway>=0)data.souvenirs.splice.apply(data.souvenirs,[firstNorway,0].concat(rows));
  else data.souvenirs=data.souvenirs.concat(rows);

  document.addEventListener('DOMContentLoaded',function(){
    document.querySelectorAll('.shopping-product-image-button[data-product-name]').forEach(function(button){
      var name=button.dataset.productName||'';
      var thumb=button.querySelector('.shopping-product-image');
      var full=fullImageMap[name];
      if(thumb){
        button.dataset.productThumbnail=thumb.getAttribute('src')||'';
        thumb.decoding='async';
      }
      if(full)button.dataset.productImage=full;
    });

    var style=document.createElement('style');
    style.textContent=[
      '#productImageModal{padding:max(10px,env(safe-area-inset-top)) 10px max(10px,env(safe-area-inset-bottom))}',
      '#productImageModal .product-modal-card{width:min(96vw,1100px);max-width:none;max-height:94dvh;display:grid;gap:10px;justify-items:center;align-items:center}',
      '#productImageModal img{display:block;width:auto;height:auto;max-width:94vw;max-height:86dvh;object-fit:contain;border-radius:14px;background:#fff;image-rendering:auto}',
      '#productImageModal .product-modal-caption{max-width:92vw;color:#fff;font-weight:800;text-align:center;line-height:1.35}',
      '@media(max-width:620px){#productImageModal .product-modal-card{width:100%;max-height:96dvh;gap:8px}#productImageModal img{max-width:96vw;max-height:86dvh;border-radius:12px}#productImageModal .product-modal-caption{font-size:14px}}'
    ].join('');
    document.head.appendChild(style);

    var modal=document.getElementById('productImageModal');
    var modalImg=modal&&modal.querySelector('img');
    if(modalImg){
      document.addEventListener('click',function(e){
        var button=e.target.closest&&e.target.closest('.shopping-product-image-button[data-product-image]');
        if(!button)return;
        modalImg.dataset.fallbackThumbnail=button.dataset.productThumbnail||'';
        modalImg.dataset.fallbackUsed='0';
      },true);
      modalImg.addEventListener('error',function(){
        var fallback=modalImg.dataset.fallbackThumbnail||'';
        if(!fallback||modalImg.dataset.fallbackUsed==='1')return;
        modalImg.dataset.fallbackUsed='1';
        modalImg.src=fallback;
      });
    }
  });
})();

/* 商品推薦與「我的購物清單」雙向同步：加入後留在原頁、可取消加入，並避免重複。 */
(function(){
  var KEY='aurora-shopping-list-v1';
  var LINK_KEY='aurora-shopping-links-v1';
  var suppressAutoJump=false;
  var toastTimer=0;

  function normalizeCountry(value){
    return String(value||'其他').replace(/^[^A-Za-z\u3400-\u9fff]+/,'').trim()||'其他';
  }
  function readItems(){
    try{var rows=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(rows)?rows:[];}catch(e){return [];}
  }
  function readLinks(){
    try{var value=JSON.parse(localStorage.getItem(LINK_KEY)||'{}');return value&&typeof value==='object'&&!Array.isArray(value)?value:{};}catch(e){return {};}
  }
  function saveLinks(links){
    try{localStorage.setItem(LINK_KEY,JSON.stringify(links));}catch(e){}
  }
  function hashText(value){
    var s=String(value||''),h=2166136261;
    for(var i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619);}
    return (h>>>0).toString(36);
  }
  function recommendationId(name,country){
    var data=window.AURORA_SHOPPING_DATA||{},targetName=String(name||'').trim(),targetCountry=normalizeCountry(country),matches=[];
    (data.supermarkets||[]).forEach(function(section){
      if(normalizeCountry(section.city)!==targetCountry)return;
      (section.groups||[]).forEach(function(group){
        (group.products||[]).forEach(function(product){if(String(product.item||'').trim()===targetName)matches.push(product);});
      });
    });
    (data.souvenirs||[]).forEach(function(product){
      if(normalizeCountry(product.country)===targetCountry&&String(product.item||'').trim()===targetName)matches.push(product);
    });
    var preferred=matches.find(function(p){return p&&p.source;})||matches.find(function(p){return p&&p.image;})||matches[0]||{};
    var base=preferred.source?'src:'+preferred.source:preferred.image?'img:'+preferred.image:'item:'+targetCountry+'|'+targetName;
    return 'rec-'+hashText(base);
  }
  function itemMatchIndex(items,name,country){
    var targetName=String(name||'').trim(),targetCountry=normalizeCountry(country);
    return items.findIndex(function(item){return item&&String(item.name||'').trim()===targetName&&normalizeCountry(item.country)===targetCountry;});
  }
  function findForButton(button,items,links){
    var name=String(button&&button.dataset.addItem||'').trim(),country=normalizeCountry(button&&button.dataset.addCountry||'其他'),id=recommendationId(name,country),linked=links[id],index=-1;
    if(linked)index=itemMatchIndex(items,linked.name,linked.country);
    if(index<0)index=itemMatchIndex(items,name,country);
    if(index>=0){
      var next={name:String(items[index].name||name),country:normalizeCountry(items[index].country||country)};
      if(!linked||linked.name!==next.name||linked.country!==next.country){links[id]=next;saveLinks(links);}
    }else if(linked){delete links[id];saveLinks(links);}
    return {id:id,index:index,name:name,country:country};
  }
  function ensureStyle(){
    if(document.getElementById('shoppingSyncStyle'))return;
    var style=document.createElement('style');
    style.id='shoppingSyncStyle';
    style.textContent=[
      '.add-shopping.is-added{background:#eef8f5!important;color:#174a69!important;border-color:#7fb6be!important;cursor:default!important}',
      '.add-shopping.is-added:disabled{opacity:1!important}',
      '.remove-shopping{border:0;background:transparent;color:#b85c57;font-weight:800;cursor:pointer;padding:5px 8px}',
      '.shopping-product-row>.remove-shopping{grid-column:3;justify-self:end;margin-top:2px}',
      '.shopping-sync-toast{position:fixed;left:50%;bottom:calc(92px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:160;width:min(92vw,520px);box-sizing:border-box;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:11px 14px;border:1px solid rgba(127,182,190,.7);border-radius:16px;background:rgba(250,255,253,.98);color:#174a69;box-shadow:0 8px 24px rgba(16,45,62,.16);font-size:13px;font-weight:800}',
      '.shopping-sync-toast[hidden]{display:none}',
      '.shopping-sync-toast button{border:0;background:transparent;color:#278dbb;font-weight:850;white-space:nowrap;cursor:pointer}',
      '@media(max-width:620px){.shopping-product-row>.remove-shopping{grid-column:2;justify-self:start;margin-top:-4px}}'
    ].join('');
    document.head.appendChild(style);
  }
  function showToast(message,showView){
    var toast=document.getElementById('shoppingSyncToast');
    if(!toast){
      toast=document.createElement('div');toast.id='shoppingSyncToast';toast.className='shopping-sync-toast';toast.hidden=true;
      toast.innerHTML='<span></span><button type="button">查看清單</button>';
      document.body.appendChild(toast);
      toast.querySelector('button').addEventListener('click',function(){
        var segment=Array.prototype.find.call(document.querySelectorAll('#foodSegments .segment'),function(x){return x.dataset.foodView==='shopping';});
        if(segment)segment.click();
        toast.hidden=true;
      });
    }
    toast.querySelector('span').textContent=message;
    toast.querySelector('button').hidden=!showView;
    toast.hidden=false;
    clearTimeout(toastTimer);
    toastTimer=setTimeout(function(){toast.hidden=true;},2200);
  }
  function syncButtons(){
    var items=readItems(),links=readLinks();
    document.querySelectorAll('#supermarketList [data-add-item],#souvenirList [data-add-item]').forEach(function(button){
      button.dataset.addCountry=normalizeCountry(button.dataset.addCountry||'其他');
      var match=findForButton(button,items,links),added=match.index>=0,row=button.parentElement;
      button.textContent=added?'✓ 已加入清單':'＋ 加入購物清單';
      button.classList.toggle('is-added',added);
      button.disabled=added;
      button.setAttribute('aria-pressed',added?'true':'false');
      if(!row)return;
      row.querySelectorAll('.remove-shopping').forEach(function(x){if(x.dataset.productId!==match.id||!added)x.remove();});
      if(added&&!row.querySelector('.remove-shopping[data-product-id="'+match.id+'"]')){
        var remove=document.createElement('button');
        remove.type='button';remove.className='remove-shopping';remove.dataset.productId=match.id;remove.textContent='取消加入';
        row.appendChild(remove);
      }
    });
  }
  function linkAfterAdd(button){
    var items=readItems(),links=readLinks(),match=findForButton(button,items,links);
    if(match.index>=0){links[match.id]={name:String(items[match.index].name||match.name),country:normalizeCountry(items[match.index].country||match.country)};saveLinks(links);}
  }
  function proxyAdd(button){
    var list=document.getElementById('souvenirList');
    if(!list)return false;
    var proxy=document.createElement('button');
    proxy.type='button';proxy.hidden=true;proxy.dataset.addItem=button.dataset.addItem||'';proxy.dataset.addCountry=normalizeCountry(button.dataset.addCountry||'其他');proxy.dataset.shoppingSyncProxy='1';
    list.appendChild(proxy);proxy.click();proxy.remove();return true;
  }
  function cancelForButton(button){
    var items=readItems(),links=readLinks(),match=findForButton(button,items,links);
    if(match.index<0){syncButtons();return;}
    var deleteButton=document.querySelector('#shoppingList [data-delete="'+match.index+'"]');
    if(!deleteButton){showToast('暫時無法取消，請到購物清單刪除此商品',true);return;}
    var removedName=items[match.index]&&items[match.index].name||match.name;
    deleteButton.click();
    setTimeout(function(){syncButtons();showToast(removedName+' 已從購物清單移除',false);},0);
  }

  ensureStyle();
  document.addEventListener('click',function(event){
    var shoppingSegment=event.target.closest&&event.target.closest('#foodSegments .segment[data-food-view="shopping"]');
    if(shoppingSegment&&suppressAutoJump&&!event.isTrusted){
      event.preventDefault();event.stopImmediatePropagation();suppressAutoJump=false;return;
    }

    var remove=event.target.closest&&event.target.closest('.remove-shopping');
    if(remove){
      var row=remove.parentElement,addButton=row&&row.querySelector('[data-add-item]');
      if(addButton){event.preventDefault();event.stopImmediatePropagation();cancelForButton(addButton);}return;
    }

    var add=event.target.closest&&event.target.closest('#supermarketList [data-add-item],#souvenirList [data-add-item]');
    if(!add)return;
    if(add.dataset.shoppingSyncProxy==='1')return;
    add.dataset.addCountry=normalizeCountry(add.dataset.addCountry||'其他');
    var existing=findForButton(add,readItems(),readLinks());
    if(existing.index>=0){event.preventDefault();event.stopImmediatePropagation();syncButtons();return;}

    suppressAutoJump=true;
    var isSupermarket=!!add.closest('#supermarketList');
    if(isSupermarket){
      event.preventDefault();event.stopImmediatePropagation();
      if(!proxyAdd(add)){suppressAutoJump=false;showToast('加入失敗，請稍後再試',false);return;}
    }
    setTimeout(function(){
      suppressAutoJump=false;linkAfterAdd(add);syncButtons();showToast('✓ '+String(add.dataset.addItem||'商品')+' 已加入購物清單',true);
    },0);
  },true);

  document.addEventListener('click',function(event){
    if(event.target.closest&&event.target.closest('#shoppingList [data-delete],#clearBought,#saveShopItem'))setTimeout(syncButtons,0);
  },false);
  document.addEventListener('change',function(event){
    if(event.target&&event.target.id==='shoppingRestoreFile')setTimeout(syncButtons,50);
  },false);
  document.addEventListener('DOMContentLoaded',function(){
    setTimeout(syncButtons,0);
    var list=document.getElementById('shoppingList');
    if(list&&'MutationObserver' in window)new MutationObserver(function(){syncButtons();}).observe(list,{childList:true,subtree:true});
  });
})();

/* 載入購物清單圖片分享功能；獨立檔案避免影響既有購物互動。 */
(function(){
  if(document.getElementById('shoppingShareImageLoader'))return;
  var script=document.createElement('script');
  script.id='shoppingShareImageLoader';
  script.src='../assets/shopping-share-image.js?v=20260908-share1';
  document.head.appendChild(script);
})();
