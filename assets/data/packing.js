/* Extracted from the legacy runtime. Keep the data shape unchanged. */
(function (root) {
  const PACKING_GROUPS = [
      {group:"證件與財務",items:[
        {item:"護照正本",owner:"每人",note:"效期至少6個月、本人簽名；正本全程隨身"},
        {item:"護照影本與備用證件照",owner:"每人",note:"紙本份數與保管方式見「行前待辦」"},
        {item:"信用卡2張＋少量EUR／NOK現金",owner:"每人",note:"兩張卡分開保管；刷卡拒絕DCC"},
        {item:"旅遊保險資料與緊急聯絡卡",owner:"每人",note:"紙本與手機離線各一份"},
        {item:"原子筆、隨身防盜小包",owner:"每人",note:"入境填寫、票券與護照集中收納"}
      ]},
      {group:"電子設備與網路",items:[
        {item:"手機與充電器",owner:"每人",note:"出發前更新系統、開啟尋找裝置"},
        {item:"行動電源",owner:"每人",note:"只可放隨身行李，不可托運；端子做好防短路"},
        {item:"充電線、備用充電線與多孔延長線",owner:"每人／共用",note:"共用品指定2人分開攜帶"},
        {item:"C／F型插頭轉接器",owner:"每人",note:"奧地利、芬蘭、挪威、荷蘭均為230V"},
        {item:"eSIM或實體SIM卡",owner:"每人",note:"eSIM使用者另把QR／APN離線保存；實體卡帶退卡針與原門號卡盒"},
        {item:"Apple Watch／智慧手錶與充電線",owner:"使用者",note:"勿漏專用充電線"},
        {item:"耳機、手機用小腳架",owner:"需要者",note:"夜車與極光拍攝使用"}
      ]},
      {group:"北歐保暖與雨雪",items:[
        {item:"排汗／羊毛保暖衣褲2–3套",owner:"每人",note:"貼身層避免棉質"},
        {item:"刷毛或薄羽絨中層1–2件",owner:"每人",note:"車內可快速穿脫"},
        {item:"防風防水外套＋保暖羽絨",owner:"每人",note:"海岸與追光時外層防風最重要"},
        {item:"防風防潑水長褲＋保暖褲",owner:"每人",note:"依溫度疊穿"},
        {item:"防水止滑鞋2雙＋羊毛襪4–5雙",owner:"每人",note:"新鞋先穿熟；鞋襪濕立即更換"},
        {item:"毛帽、脖圍、防水外手套、薄內手套",owner:"每人",note:"拍照時只脫外手套"},
        {item:"護膝、折疊杖、彈性襪、暖暖包",owner:"需要者",note:"長走路、航班與結冰地面使用"},
        {item:"輕便雨具、防水袋與太陽眼鏡",owner:"每人",note:"海上活動與風雨備用"}
      ]},
      {group:"藥品與健康",items:[
        {item:"處方藥與英文藥單",owner:"每人",note:"分裝於兩件隨身行李，保留原包裝"},
        {item:"止痛、腸胃、過敏與感冒用藥",owner:"每人",note:"依個人使用習慣準備"},
        {item:"暈車／暈船藥與暈船袋",owner:"每人",note:"10/7海釣前依醫囑提前服用"},
        {item:"口罩、酒精濕巾、護唇膏、護手霜",owner:"每人",note:"乾冷環境與長程交通使用"},
        {item:"OK繃、足部防磨用品與個人醫材",owner:"每人",note:"每日長走路前先處理摩擦點"}
      ]},
      {group:"盥洗／夜車／共用品",items:[
        {item:"牙刷牙膏、洗面乳與個人盥洗品",owner:"每人",note:"液體依航空手提規定分裝"},
        {item:"夜車小包：盥洗、藥、充電線、水",owner:"每人",note:"9/27上車前完成，不翻大行李"},
        {item:"9/27晚餐與9/28早餐",owner:"每人",note:"上VR265前採買可常溫保存食物"},
        {item:"行李秤、行李束帶與姓名牌",owner:"每人／共用",note:"姓名牌避免寫完整住址"},
        {item:"摺疊購物袋、夾鏈袋與紙巾",owner:"每人",note:"採買、退稅單與濕物分裝"},
        {item:"共用藥品與備援充電線",owner:"指定2人",note:"分開攜帶，避免單點遺失"}
      ]}
    ];;
  root.TravelPackingData = Object.freeze({
    getGroups: function () { return PACKING_GROUPS; }
  });
})(window);
