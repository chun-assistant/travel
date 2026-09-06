window.AURORA_SHOPPING_DATA = {
  supermarkets: [
    {date:'9/25', city:'維也納', use:'晚餐自理＋隔日早餐', items:['飲用水／飲料','麵包、優格、水果','旅途零食'], note:'優先選住宿或市中心沿途超市，避免特地繞路。'},
    {date:'9/26', city:'赫爾辛基', use:'隔日早餐＋夜車備糧', items:['早餐食品','夜臥火車可直接食用餐點','飲料、水果、甜點'], note:'晚餐後順路採買，夜車前一次補齊。'},
    {date:'9/27', city:'赫爾辛基', use:'夜車晚餐＋9/28 早餐', items:['三明治／麵包類','水果、優格','水與飲料'], note:'上夜臥火車前完成。'},
    {date:'9/28', city:'羅瓦涅米', use:'晚餐自理＋隔日備糧', items:['簡易晚餐','隔日早餐／零食','飲用水'], note:'聖誕老人村行程後依實際時間採買。'},
    {date:'9/29–9/30', city:'伊瓦洛', use:'自理餐＋拉普蘭備糧', items:['早餐／晚餐補充','熱飲、零食','水果與水'], note:'偏遠地區建議看到合適超市就補齊，不要拖到太晚。'},
    {date:'10/2', city:'希爾克內斯', use:'隔日早餐／旅途備用', items:['早餐食品','飲用水','挪威零食'], note:'帝王蟹晚餐後若時間允許順路補貨。'},
    {date:'10/3–10/5', city:'特羅姆瑟', use:'早餐／晚餐自理與戶外活動備糧', items:['麵包、優格、水果','可快速加熱食品','巧克力、能量零食','水／熱飲'], note:'戶外一日團前一晚先準備隔日小點心。'},
    {date:'10/8–10/9', city:'阿姆斯特丹', use:'自理餐＋回程零食＋最後伴手禮', items:['早餐食品','Stroopwafel／餅乾','巧克力與回程零食','飲用水'], note:'10/9 可把超市伴手禮一次補齊。'}
  ],
  souvenirs: [
    {country:'🇦🇹 奧地利', item:'Manner 威化餅', reason:'體積好分送、超市與市區容易買', place:'超市／Manner 店', tag:'送同事'},
    {country:'🇦🇹 奧地利', item:'Mozart 巧克力', reason:'經典奧地利伴手禮', place:'超市／伴手禮店', tag:'經典'},
    {country:'🇦🇹 奧地利', item:'維也納咖啡／餅乾', reason:'適合喜歡咖啡與甜點的人', place:'超市／咖啡品牌店', tag:'食品'},
    {country:'🇫🇮 芬蘭', item:'Fazer 巧克力', reason:'芬蘭代表性高、口味多、方便分送', place:'超市／Fazer', tag:'必買'},
    {country:'🇫🇮 芬蘭', item:'藍莓汁', reason:'本趟指定想買品項，適合自用或分享', place:'超市', tag:'必買'},
    {country:'🇫🇮 芬蘭', item:'Moomin 商品', reason:'紀念性高，文具、杯子、小物選擇多', place:'Moomin／聖誕老人村商店', tag:'紀念品'},
    {country:'🇳🇴 挪威', item:'Freia 巧克力', reason:'當地常見、價格相對容易入手', place:'超市', tag:'食品'},
    {country:'🇳🇴 挪威', item:'挪威羊毛商品', reason:'保暖實用、北歐特色強', place:'市區戶外／紀念品店', tag:'高單價'},
    {country:'🇳🇴 挪威', item:'Tromsø／北極圈紀念品', reason:'旅程紀念性高', place:'Tromsø 市區商店', tag:'紀念品'},
    {country:'🇳🇱 荷蘭', item:'Stroopwafel', reason:'經典、好帶、超市與市場都容易買', place:'Albert Cuyp／超市', tag:'必買'},
    {country:'🇳🇱 荷蘭', item:'荷蘭起司', reason:'口味選擇多，購買前確認攜帶與入境規定', place:'起司店／市場', tag:'食品'},
    {country:'🇳🇱 荷蘭', item:'HEMA／Museum Shop 小物', reason:'文具、設計小物或博物館限定品，紀念性高', place:'HEMA／Museum Shop', tag:'小物'}
  ]
};

/* Meal overview compatibility fix.
   The previous wrapper SVG referenced another SVG internally; Chromium may block
   that nested SVG when the wrapper itself is loaded through <img>, leaving only
   the highlight rectangles visible. Use the self-contained base chart directly
   and recreate the self-meal emphasis as responsive HTML overlays. */
document.addEventListener('DOMContentLoaded', function () {
  var mealButton = document.getElementById('mealZoom');
  var mealImage = mealButton && mealButton.querySelector('img');
  var modalImage = document.querySelector('#mealModal img');
  if (mealImage) mealImage.src = '../assets/meal-overview-base.svg';
  if (modalImage) modalImage.src = '../assets/meal-overview-base.svg';
  if (!mealButton || !mealImage || mealButton.querySelector('.meal-self-overlay')) return;

  mealButton.style.position = 'relative';
  mealButton.style.overflow = 'hidden';

  var style = document.createElement('style');
  style.textContent = [
    '.meal-self-overlay{position:absolute;inset:0;pointer-events:none;z-index:2}',
    '.meal-self-mark{position:absolute;border:2px solid #f0b72f;border-radius:12px;background:rgba(255,217,90,.20);box-sizing:border-box}',
    '.meal-self-mark::before{content:"";position:absolute;left:7px;top:7px;width:9px;height:9px;border-radius:50%;background:#f6b91f;box-shadow:0 0 0 2px rgba(255,255,255,.55)}'
  ].join('');
  document.head.appendChild(style);

  var marks = [
    [697,295,174,56],[327,365,170,56],[327,435,170,56],[697,435,174,56],
    [327,505,170,56],[697,505,174,56],[507,575,180,56],[697,645,174,56],
    [507,715,180,56],[507,785,180,56],[327,855,170,56],[697,855,174,56],
    [697,925,174,56],[507,995,180,56],[697,995,174,56],[697,1065,174,56],
    [697,1135,174,56],[697,1205,174,56],[327,1275,170,56],[697,1275,174,56],
    [327,1345,170,56]
  ];
  var overlay = document.createElement('span');
  overlay.className = 'meal-self-overlay';
  marks.forEach(function (m) {
    var s = document.createElement('span');
    s.className = 'meal-self-mark';
    s.style.left = (m[0] / 900 * 100).toFixed(3) + '%';
    s.style.top = (m[1] / 1760 * 100).toFixed(3) + '%';
    s.style.width = (m[2] / 900 * 100).toFixed(3) + '%';
    s.style.height = (m[3] / 1760 * 100).toFixed(3) + '%';
    overlay.appendChild(s);
  });
  mealButton.appendChild(overlay);
});
