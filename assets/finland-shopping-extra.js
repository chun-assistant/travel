(function(){
  var data=window.AURORA_SHOPPING_DATA;
  if(!data)return;
  data.souvenirs=data.souvenirs||[];
  var items=['Moomin 周邊／ARABIA・Iittala・Marimekko 聯名','Lumene 保養品','Marttiini 馴鹿皮手套'];
  data.souvenirs=data.souvenirs.filter(function(x){return items.indexOf(x.item)===-1});
  var rows=[
    {country:'🇫🇮 芬蘭',category:'🦛 嚕嚕米周邊',priority:'⭐ 必買',item:'Moomin 周邊／ARABIA・Iittala・Marimekko 聯名',reason:'芬蘭最具代表性的角色 IP；馬克杯、保溫杯、餐具、娃娃、明信片與文具都很適合收藏或送禮。',place:'Moomin Shop／Iittala／ARABIA／百貨／機場',tag:'收藏推薦',image:'../assets/shopping/finland/moomin-souvenir.svg',source:'https://shop.moomin.com/',sourceLabel:'Moomin 官方商店'},
    {country:'🇫🇮 芬蘭',category:'💙 芬蘭保養品牌',priority:'⭐ 必買',item:'Lumene 保養品',reason:'芬蘭國民保養品牌；Nordic Hydra 保濕系列、乳液、精華液與面膜很適合乾冷氣候保養。',place:'Lyko／藥妝店／百貨／部分超市',tag:'美妝推薦',image:'../assets/shopping/finland/lumene-skincare.svg',source:'https://www.lumene.com/',sourceLabel:'Lumene 官方網站'},
    {country:'🇫🇮 芬蘭',category:'🦌 拉普蘭特色',priority:'👍 推薦',item:'Marttiini 馴鹿皮手套',reason:'羅瓦涅米在地品牌，馴鹿皮手套兼具實用與拉普蘭紀念性；刀具類只作品牌認識，不建議列為主要購買品。',place:'Rovaniemi／Lappish shops／戶外或紀念品店',tag:'拉普蘭限定',image:'../assets/shopping/finland/marttiini-reindeer-gloves.svg',source:'https://www.lamnia.com/ja/p/105084/%E3%82%A6%E3%82%A7%E3%82%A2%E3%82%84%E3%82%B7%E3%83%A5%E3%83%BC%E3%82%BA/marttiini-reindeer-leather-gloves-brown',sourceLabel:'Lamnia 商品頁'}
  ];
  var firstNorway=data.souvenirs.findIndex(function(x){return String(x.country||'').indexOf('挪威')>=0});
  if(firstNorway>=0)data.souvenirs.splice.apply(data.souvenirs,[firstNorway,0].concat(rows));
  else data.souvenirs=data.souvenirs.concat(rows);
})();
