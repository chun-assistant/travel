/* Extracted from the legacy runtime. Keep the data shape unchanged. */
(function (root) {
  const PRINT_GROUPS = [
      {group:"個人列印｜每位團員各自準備",tag:"每人1份",items:[
        {item:"護照彩色影本2份",note:"1份隨身、1份與正本分開放；護照正本不可交由他人保管"},
        {item:"本人姓名的航班電子機票／行李額度頁",note:"含去回程與區域航班；手機仍保留離線PDF"},
        {item:"英文旅遊保險證明與緊急救援資料",note:"入境備查；寫上保單號與24小時聯絡方式"},
        {item:"個人處方藥英文藥單／過敏與飲食卡",note:"有需要者列印；餐食卡註明不吃牛肉與game meat"},
        {item:"個人緊急聯絡卡",note:"列飯店、團長電話、保險公司與112"}
      ]},
      {group:"團長列印｜全團共用資料",tag:"完整2套",items:[
        {item:"18天完整行程表＋全程住宿地址",note:"1套團長隨身、1套交備援團員分開保管"},
        {item:"全員航班訂位／電子票與行李規則",note:"CI0063、AY1472、WF993、SAS、CI0074依日期排序"},
        {item:"所有飯店訂房確認單",note:"含訂房人、入住人數、房型、早餐、付款狀態與飯店電話"},
        {item:"長途交通票券與接送憑證",note:"VR265、Matkahuolto、跨境包車、機場交通與AMS 7人van"},
        {item:"活動票券、餐廳訂位與集合資訊",note:"Nellim、Senja、Kvaløya、Capella、極光團、梵谷與Smidtje"},
        {item:"團員名單、護照英文名與緊急聯絡表",note:"敏感資料不放公開群組；紙本用完妥善銷毀"},
        {item:"三張流程圖的紙本精簡版",note:"維也納入境、挪威OSL退稅、AMS退稅各印1份；HTML內仍可放大查看"}
      ]}
    ];;
  root.TravelPrintData = Object.freeze({
    getGroups: function () { return PRINT_GROUPS; }
  });
})(window);
