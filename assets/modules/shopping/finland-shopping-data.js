(() => {
  'use strict';

  const files = Object.freeze({
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
  });

  const marketOnly = Object.freeze([
    'Bonne Premium Mustikkamehu',
    'Finnair Blueberry Juice Drink',
    'Valio Hedelmätarha Luomu Puolukka-Karpalo',
    'Froosh Smoothie',
    'Kellogg’s Trésor Choco Nougat',
    'Ovomaltine Crunchy Cream'
  ]);

  const souvenirs = Object.freeze([
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
  ]);

  window.TravelFinlandShoppingData = Object.freeze({ files, marketOnly, souvenirs });
})();
