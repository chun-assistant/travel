/*
 * Ticket-app data boundary.
 *
 * Extracted from the legacy runtime without changing the data itself.
 */
(function (root) {
  var items = [{country:"奧地利",name:"ÖBB App",priority:"必裝",use:"查詢與購買奧地利國鐵、機場列車及部分區域交通票。",trip:"9/25：Flughafen Wien Bahnhof → Wien Hauptbahnhof（REX7／Railjet）。",setup:"建議先建立ÖBB帳號並綁定信用卡；可替同行旅客購票。",steps:"輸入起訖站與日期 → 選班次／票種 → 填旅客 → 付款 → My journeys開啟車票。",warning:"購票前確認是否已包含後段U1市區交通，避免重複買票；月台仍以現場看板為準。",source:"https://www.oebb.at/en/tickets-kundenkarten/online-mobile-ticketing/oebb-app"},
      {country:"維也納",name:"WienMobil",priority:"建議安裝",use:"維也納地鐵、電車與公車的路線規劃、即時資訊及市區票券。",trip:"9/25：Wien Hbf → Stephansplatz的U1，以及市中心臨時改道查詢。",setup:"先安裝並完成付款設定；若ÖBB聯票已包含市區段，只用來查路線。",steps:"搜尋目的地 → Tickets選票種與生效時間 → 付款 → 驗票時開啟有效票。",warning:"數位票可能記名；購買時核對旅客姓名和生效時間，不要到查票時才處理。",source:"https://www.wienerlinien.at/web/wl-en/wienmobil-enjoy-mobile-freedom"},
      {country:"赫爾辛基",name:"HSL",priority:"必裝",use:"赫爾辛基地區電車、公車、地鐵、通勤火車與渡輪的路線及票券。",trip:"9/26 HEL機場→中央車站通常需ABC區；9/27市中心多為AB區，依當日路線確認。",setup:"開啟定位、綁定付款卡；先熟悉Zones區域與Journey Planner。",steps:"Journey Planner搜尋路線 → 選正確分區票 → 付款 → 上車前確認票券已生效。",warning:"不要只看交通工具，要看完整路線跨越的區域；全員手機保留票券畫面。",source:"https://www.hsl.fi/en/tickets-and-fares/hsl-app"},
      {country:"羅瓦涅米",name:"Waltti Mobile",priority:"必裝",use:"Rovaniemi Linkkari 市區公車的路線、即時班次與行動票券。",trip:"9/28：Rovaniemi Station → Santa Claus Village／Napapiiri（Linkkari 8）。",setup:"選擇Rovaniemi／Linkkari並綁定付款卡；可在同一支手機購買多張同行票。",steps:"選票種、旅客類別與區域 → 確認數量 → 付款 → 上車時掃描票券QR。",warning:"票券付款後會立即開始計時，只在搭車前幾分鐘購買，並在上車前確認票券有效。",source:"https://linkkari.fi/In-English/Tickets-and-fares/Mobile-app"},
      {country:"芬蘭夜車",name:"VR Matkalla",priority:"必裝",use:"芬蘭國鐵票券、臥鋪訂位、月台與列車即時資訊。",trip:"9/27 Night Train 265：Helsinki → Rovaniemi。",setup:"建立VR帳號；其他管道購買的票，可用訂單號與參考號加入App。",steps:"登入 → Trips／Add ticket → 輸入訂單與參考號 → 核對265車次、日期、床位與乘客。",warning:"出發前把票券加入Apple Wallet或保留離線備份；臥鋪房號仍以正式票券為準。",source:"https://www.vr.fi/en/vr-matkalla-app"},
      {country:"芬蘭巴士",name:"Matkahuolto Matkat",priority:"必裝",use:"芬蘭長途巴士、區域交通與部分聯程票；2026新版名稱為Matkat。",trip:"9/29 Arctic Circle／Rovaniemi → Ivalo；10/1 Ivalo → Saariselkä。",setup:"安裝新版Matkat App、綁卡；用實際站名搜尋並核對上／下車站。",steps:"輸入起訖站與日期 → 選指定班次 → 填乘客 → 付款 → Tickets開啟QR／訂單。",warning:"長途巴士不要只看城市名；需核對Petsamontie 7、Kiveliontie等實際站點與行李規則。",source:"https://www.matkahuolto.fi/passengers/matkat-app"},
      {country:"特羅姆瑟",name:"Svipper",priority:"必裝",use:"Troms郡市區公車與快船的路線、即時班次和票券。",trip:"10/3–10/8市區、公車前往北極教堂／纜車；機場一般公車可查24、26、40、42。",setup:"以Vipps或簡訊一次性驗證碼登入；外國旅客建議先測試能否收到SMS並綁卡。",steps:"搜尋路線 → Buy ticket → 選單程票 → 付款 → 上車前啟用，看到有效倒數再上車。",warning:"票券必須在上車前啟用，手機要留足電；一般市區公車與機場快線不是同一種票。",source:"https://svipper.no/menu/travel/the-svipper-app/"},
      {country:"特羅姆瑟機場",name:"Bussring Airport Express",priority:"依行程購買",use:"TOS機場與市中心飯店區的機場快線；主要透過官網購票並出示QR。",trip:"10/3 TOS→飯店、10/8飯店→TOS；飯店附近站為Storgata（Scandic Grand）。",setup:"不必另裝App；把官網票券QR、日期與搭車站存成離線備份。",steps:"官網選方向／日期／人數 → 付款 → 開啟QR → 提前到站排隊並協助媽媽先上車。",warning:"官網目前標示市區車程約15分鐘；班表、價格與停靠站須在出發前7天再核對。",source:"https://www.bussring.no/bussring-airport-express/"},
      {country:"荷蘭國鐵",name:"NS",priority:"建議安裝",use:"荷蘭國鐵行程規劃、即時月台、電子票與工程異動。",trip:"10/8 Schiphol Airport → Amsterdam Sloterdijk；10/10 Sloterdijk → Schiphol。",setup:"短程可每人使用自己的感應信用卡／手機進出站；也可在NS App購買記名電子票。",steps:"查路線與月台；若用OVpay，每人固定使用同一張卡或同一裝置進、出站各感應一次。",warning:"不能一張信用卡連續替多人感應；若用NS電子票，以App內QR開閘，手機截圖不一定是有效票。",source:"https://www.ns.nl/en/travel/ns-app"},
      {country:"阿姆斯特丹",name:"GVB",priority:"建議安裝",use:"阿姆斯特丹電車、公車、地鐵路線與GVB時數／日票。",trip:"10/9 Sloterdijk、Museumplein、Albert Cuyp、Rokin與市中心移動。",setup:"先綁付款方式；若使用OVpay，原則同NS，每人需自己的卡或手機。",steps:"App查路線；需要日票時到Tickets → Buy tickets → 選時數 → 付款並加入手機票券。",warning:"GVB票不等於所有荷蘭火車票；搭乘不同營運商前先確認適用範圍。",source:"https://www.gvb.nl/en/travel-information/gvb-app"}];
  root.TravelAppsData = Object.freeze({
    getItems: function () {
      return items.slice();
    }
  });
})(window);
