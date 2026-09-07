(function(){
  var data=window.AURORA_SHOPPING_DATA;
  if(!data)return;

  /* 卡片維持使用既有小圖，避免手機載入整頁時一次下載大量高清圖片。 */
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

  /*
   * 高清圖只在使用者點擊商品時載入。
   * imageFull 與 image 分離：image = 縮圖；imageFull = 燈箱高清圖。
   * 後續若把高清 PNG 搬進 repo，只要把下列網址改成 ../assets/shopping/...-full.png 即可，
   * 不需要再動燈箱程式。
   */
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
    'DEMEL Kandierte Veilchen 糖漬紫羅蘭':'https://www.demel.com/cdn/shop/products/Candied_Violets_04.webp?v=1681826075&width=1600',
    'Zotter 巧克力':'https://images.cdn.europe-west1.gcp.commercetools.com/723b2575-66c7-4d92-ae49-82bf1d168d26/00-899847-0105233692-_WstWtlg.jpg',
    'Kamill Hand & Nagelcreme Classic':'https://images.cdn.europe-west1.gcp.commercetools.com/723b2575-66c7-4d92-ae49-82bf1d168d26/00-14242-1543629263-J1uohDim.jpg',
    'Clinical Melatonin Forte Original':'https://products.dm-static.com/images/f_auto%2Cq_auto%2Cc_fit%2Ch_1200%2Cw_1200/v1762776486/assets/pas/images/d3c134c5-39aa-4244-9f68-5b799f73edd7/clinical-melatonin-melatonin-forte-original',
    'Balea Hyaluron Konzentrat（藍色補水款）':'https://products.dm-static.com/images/f_auto%2Cq_auto%2Cc_fit%2Ch_1200%2Cw_1200/v1771941372/assets/pas/images/3611250c-02c3-4986-89b6-abc68aa1c8dc/balea-hyaluron-konzentrat',
    'Ferrero Giotto 榛果威化小球':'https://images.cdn.europe-west1.gcp.commercetools.com/723b2575-66c7-4d92-ae49-82bf1d168d26/00-407313-0160604677-CMrA_lkC.jpg',
    'Fazer Café 巧克力':'https://en.fazer.com/cdn/shop/files/fazerxbalmuirbox-store_1600x.jpg?v=1743569771',
    'Moomin 周邊／ARABIA・Iittala・Marimekko 聯名':'https://shop.moomin.com/cdn/shop/products/6411801005578moominfriendshipmug_1600x.jpg?v=1745917403',
    'Lumene 保養品':'https://lumene.com/cdn/shop/files/297_bca3ae5d-04e5-4369-be3b-e05ee01a19b3.jpg?v=1750739654&width=1600',
    'Marttiini 馴鹿皮手套':'https://varuste.net/tiedostot/1/kuva/tuote/1200/13037701.png'
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
  var items=['Fazer Café 巧克力','Moomin 周邊／ARABIA・Iittala・Marimekko 聯名','Lumene 保養品','Marttiini 馴鹿皮手套'];
  data.souvenirs=data.souvenirs.filter(function(x){return items.indexOf(x.item)===-1});
  var rows=[
    {country:'🇫🇮 芬蘭',category:'⭐ 芬蘭代表',priority:'⭐ 必買',item:'Fazer Café 巧克力',reason:'Fazer 巧克力始祖店／咖啡館相關商品，紀念性比一般超市巧克力更高；可現場挑限定包裝、禮盒或咖啡館款巧克力。',place:'Fazer Café／Fazer 商店',tag:'巧克力始祖店',image:'https://en.fazer.com/cdn/shop/files/fazerxbalmuirbox-store_large.jpg?v=1743569771',imageFull:fullImageMap['Fazer Café 巧克力'],source:'https://en.fazer.com/products/fazer-x-balmuir-box',sourceLabel:'Fazer Store 官方商品頁'},
    {country:'🇫🇮 芬蘭',category:'🦛 嚕嚕米周邊',priority:'⭐ 必買',item:'Moomin 周邊／ARABIA・Iittala・Marimekko 聯名',reason:'芬蘭最具代表性的角色 IP；馬克杯、保溫杯、餐具、娃娃、明信片與文具都很適合收藏或送禮。',place:'Moomin Shop／Iittala／ARABIA／百貨／機場',tag:'收藏推薦',image:'https://shop.moomin.com/cdn/shop/products/6411801005578moominfriendshipmug_300x.jpg?v=1745917403',imageFull:fullImageMap['Moomin 周邊／ARABIA・Iittala・Marimekko 聯名'],source:'https://shop.moomin.com/products/moomin-friendship-mug-0-3l-moomin-arabia',sourceLabel:'Moomin 官方商店'},
    {country:'🇫🇮 芬蘭',category:'💙 芬蘭保養品牌',priority:'⭐ 必買',item:'Lumene 保養品',reason:'芬蘭國民保養品牌；Nordic Hydra 保濕系列、乳液、精華液與面膜很適合乾冷氣候保養。',place:'Lyko／藥妝店／百貨／部分超市',tag:'美妝推薦',image:'https://lumene.com/cdn/shop/files/297_bca3ae5d-04e5-4369-be3b-e05ee01a19b3.jpg?v=1750739654&width=720',imageFull:fullImageMap['Lumene 保養品'],source:'https://lumene.com/products/84907',sourceLabel:'Lumene 官方商品頁'},
    {country:'🇫🇮 芬蘭',category:'🦌 拉普蘭特色',priority:'👍 推薦',item:'Marttiini 馴鹿皮手套',reason:'羅瓦涅米在地品牌，馴鹿皮手套兼具實用與拉普蘭紀念性；刀具類只作品牌認識，不建議列為主要購買品。',place:'Rovaniemi／Lappish shops／戶外或紀念品店',tag:'拉普蘭限定',image:'https://varuste.net/tiedostot/1/kuva/tuote/600/13037701.png',imageFull:fullImageMap['Marttiini 馴鹿皮手套'],source:'https://varuste.net/en/p137774/marttiini-reindeer-leather-gloves',sourceLabel:'Varuste.net 商品頁'}
  ];
  var firstNorway=data.souvenirs.findIndex(function(x){return String(x.country||'').indexOf('挪威')>=0});
  if(firstNorway>=0)data.souvenirs.splice.apply(data.souvenirs,[firstNorway,0].concat(rows));
  else data.souvenirs=data.souvenirs.concat(rows);

  /*
   * shopping-data.js 先完成商品卡 render；本段在同一個 DOMContentLoaded 佇列的後段，
   * 只把按鈕的「放大來源」換成高清圖，卡片 img src 完全不動。
   */
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

    /* 覆蓋原燈箱尺寸：手機接近滿版、桌面仍限制最大尺寸，永遠不裁切商品。 */
    var style=document.createElement('style');
    style.textContent=[
      '#productImageModal{padding:max(10px,env(safe-area-inset-top)) 10px max(10px,env(safe-area-inset-bottom))}',
      '#productImageModal .product-modal-card{width:min(96vw,1100px);max-width:none;max-height:94dvh;display:grid;gap:10px;justify-items:center;align-items:center}',
      '#productImageModal img{display:block;width:auto;height:auto;max-width:94vw;max-height:86dvh;object-fit:contain;border-radius:14px;background:#fff;image-rendering:auto}',
      '#productImageModal .product-modal-caption{max-width:92vw;color:#fff;font-weight:800;text-align:center;line-height:1.35}',
      '@media(max-width:620px){#productImageModal .product-modal-card{width:100%;max-height:96dvh;gap:8px}#productImageModal img{max-width:96vw;max-height:86dvh;border-radius:12px}#productImageModal .product-modal-caption{font-size:14px}}'
    ].join('');
    document.head.appendChild(style);

    /* 高清來源臨時失敗時，自動退回原縮圖，避免燈箱出現破圖。 */
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
