
import { DailyPlan, EventType } from './types';

// Helper to create IDs
const id = () => Math.random().toString(36).substr(2, 9);

// NOTE: Remote Image Configuration (GitHub Raw)
// 定義你 GitHub 專案的 Raw 圖片基礎網址
const GITHUB_BASE = "https://raw.githubusercontent.com/ShirinLiu/20260224-0303-Tokyo-Korea/main/20260224-0303-japan-%26-korea/assets";

const IMAGES = {
  flight_tpe_nrt: `${GITHUB_BASE}/flight_tpe_nrt.jpg`,
  train_nex_asama: `${GITHUB_BASE}/train_nex_asama.jpg`,
  hotel_coco: `${GITHUB_BASE}/hotel_coco.jpg`,
  train_0225: `${GITHUB_BASE}/train_0225.jpg`,
  train_0226_1: `${GITHUB_BASE}/train_0226_1.jpg`,
  train_0226_2: `${GITHUB_BASE}/train_0226_2.jpg`,
  sushi_ishiyama: `${GITHUB_BASE}/sushi_ishiyama.jpg`,
  hotel_omo5: `${GITHUB_BASE}/hotel_omo5.jpg`,
  imahan: `${GITHUB_BASE}/imahan.jpg`,
  flight_nrt_icn: `${GITHUB_BASE}/flight_nrt_icn.jpg`,
  hotel_wecostay: `${GITHUB_BASE}/hotel_wecostay.jpg`,
  flight_icn_tpe: `${GITHUB_BASE}/flight_icn_tpe.jpg`,
  ramen_tamaki: `${GITHUB_BASE}/ramen_tamaki.jpg`,
  dinner_227: `${GITHUB_BASE}/227dinner.png`,
  // New Ginza Shopping Images
  ginza_mitsukoshi: `${GITHUB_BASE}/ginza_mitsukoshi.jpg`,
  ginza_lumine: `${GITHUB_BASE}/ginza_lumine.jpg`,
  ginza_matsukiyo: `${GITHUB_BASE}/ginza_matsukiyo.jpg`,
  ginza_onitsuka: `${GITHUB_BASE}/ginza_onitsuka.jpg`,
  ginza_donki: `${GITHUB_BASE}/ginza_donki.jpg`,
};

export const INITIAL_ITINERARY: DailyPlan[] = [
  {
    date: "2/24 (二)",
    items: [
      {
        id: id(),
        date: "2/24 (二)",
        type: EventType.FLIGHT,
        title: "飛機 (酷航)",
        startLocation: "桃園機場 (TPE)",
        endLocation: "成田機場 (NRT)",
        startTime: "14:00",
        endTime: "18:00",
        code: "TR874",
        notes: "飛行時間 3h 0m。波音 787-9。",
        attachments: [IMAGES.flight_tpe_nrt]
      },
      {
        id: id(),
        date: "2/24 (二)",
        type: EventType.TRAIN,
        title: "成田特快 (N'EX)",
        startLocation: "成田機場第一航廈",
        endLocation: "東京車站",
        startTime: "19:49",
        endTime: "20:51",
        code: "Narita-Express 50",
        notes: "座位: 3號車 14C, 14D (指定席)",
        tags: [{ label: "座位 14C/14D", type: "info" }],
        walkingRoute: "入境大廳(1F) ➜ B1鐵道層 ➜ 紅色JR改札口",
        detailedWalkingGuide: {
            steps: [
                "入境手續完成後，您會位於第一航廈 1樓 (南翼或北翼)。",
                "跟隨「鐵道 / Trains」標示，搭乘手扶梯或電梯下樓至 B1。",
                "在 B1 尋找紅色的「JR East」標示 (注意：藍色是京成電鐵，不要走錯)。",
                "若需領取/兌換 JR Pass，請至紅色的「JR 東日本旅行服務中心」；若已有車票，直接前往紅色 JR 改札口。",
                "通過改札口後，搭乘手扶梯下至月台 (通常為 1號月台往東京/新宿方向)。"
            ]
        },
        attachments: [IMAGES.train_nex_asama]
      },
      {
        id: id(),
        date: "2/24 (二)",
        type: EventType.TRAIN,
        title: "北陸新幹線",
        startLocation: "東京車站",
        endLocation: "高崎車站",
        startTime: "22:08",
        endTime: "22:58",
        code: "Asama 633",
        notes: "座位: 10號車 20D, 20E (指定席)",
        tags: [{ label: "座位 20D/20E", type: "info" }],
        walkingRoute: "總武線地下月台(B5F) ➜ 1F 轉乘口 ➜ 新幹線月台",
        detailedWalkingGuide: {
            steps: [
                "成田特快 (N'EX) 抵達東京車站後，位於深處的「總武線地下月台 (B5F)」。",
                "下車後請務必跟隨「新幹線 / Shinkansen」的綠色指標，搭乘多次手扶梯往上至 1F 大廳 (路程約 5-8 分鐘)。",
                "抵達 1F 後，尋找「新幹線北轉乘口」或「新幹線南轉乘口」。",
                "將「乘車券」與「新幹線特急券」疊在一起放入改札機 (若是使用 JR Pass 則走人工通道出示)。",
                "通過轉乘口後，查看電子看板確認「Asama 633」的月台 (通常是 20~23 號月台)。",
                "搭乘手扶梯上樓至月台候車。"
            ]
        },
        attachments: [IMAGES.train_nex_asama]
      },
      {
        id: id(),
        date: "2/24 (二)",
        type: EventType.STAY,
        title: "抵達飯店",
        startLocation: "高崎車站",
        endLocation: "高崎可可大飯店",
        startTime: "23:00",
        endTime: "23:05",
        notes: "辦理入住 高崎可可大飯店。預約號碼: 3297-3002-9684。",
        tags: [{ label: "Res: 3297...", type: "reservation" }],
        walkingRoute: "高崎站「東口」2樓天橋直達 (步行3分)",
        attachments: [IMAGES.hotel_coco]
      }
    ]
  },
  {
    date: "2/25 (三)",
    items: [
      {
        id: id(),
        date: "2/25 (三)",
        type: EventType.TRANSFER,
        title: "從飯店出發",
        startLocation: "高崎可可大飯店",
        endLocation: "高崎車站",
        startTime: "07:20",
        endTime: "07:25",
        walkingRoute: "高崎站「東口」2樓天橋直達 (步行3分)"
      },
      {
        id: id(),
        date: "2/25 (三)",
        type: EventType.TRAIN,
        title: "往越後湯澤",
        startLocation: "高崎車站",
        endLocation: "越後湯澤",
        startTime: "07:35",
        endTime: "08:02",
        code: "Tanigawa 401",
        notes: "座位: 8號車 2D, 2E (指定席)",
        tags: [{ label: "座位 2D/2E", type: "info" }],
        walkingRoute: "高崎站東口(2F) ➜ 新幹線改札口(2F) ➜ 11/12月台",
        detailedWalkingGuide: {
          steps: [
            "從高崎可可大飯店經由 2F 天橋直接進入高崎站東口。",
            "直走進入車站大廳，尋找綠色的「新幹線 (Shinkansen)」改札口指標。",
            "通過改札口 (投入車票或刷 IC 卡/QR)。",
            "查看電子看板確認「Tanigawa 401」的月台 (通常是往新潟方向，11/12號月台)。",
            "搭乘手扶梯下樓至月台候車。"
          ]
        },
        attachments: [IMAGES.train_0225]
      },
      {
        id: id(),
        date: "2/25 (三)",
        type: EventType.ACTIVITY,
        title: "青達雪具租借",
        startLocation: "越後湯澤車站",
        endLocation: "Chenda Rental Yuzawa",
        startTime: "08:10",
        notes: "青達雪具 (全中文服務/免費接送)。",
        walkingRoute: "西口步行約1~5分"
      },
      {
        id: id(),
        date: "2/25 (三)",
        type: EventType.TRANSFER,
        title: "還雪具&前往車站",
        startLocation: "Chenda Rental Yuzawa",
        endLocation: "越後湯澤車站",
        startTime: "17:00",
        endTime: "17:45",
        notes: "歸還租借裝備，搭乘接駁車返回越後湯澤車站，準備搭乘新幹線。",
        walkingRoute: "搭乘接駁車"
      },
      {
        id: id(),
        date: "2/25 (三)",
        type: EventType.TRAIN,
        title: "往高崎車站",
        startLocation: "越後湯澤車站",
        endLocation: "高崎車站",
        startTime: "18:12",
        endTime: "18:39",
        code: "Toki 334",
        notes: "座位: 8號車 20D, 20E (指定席)",
        tags: [{ label: "座位 20D/20E", type: "info" }],
        walkingRoute: "車站大廳(2F) ➜ 新幹線改札口 ➜ 13/14月台",
        detailedWalkingGuide: {
          steps: [
            "搭乘接駁車抵達越後湯澤車站後，請前往 2F 車站大廳 (CoCoLo 湯澤市集旁)。",
            "尋找綠色的「新幹線 (Shinkansen)」改札口。",
            "通過改札口後，查看電子看板確認「Toki 334」的月台 (往東京/高崎方向，通常是 13/14號月台)。",
            "搭乘手扶梯上樓至月台候車。"
          ]
        },
        attachments: [IMAGES.train_0225]
      },
      {
        id: id(),
        date: "2/25 (三)",
        type: EventType.ACTIVITY,
        title: "鶏白湯泡ramen たまき",
        startLocation: "高崎車站",
        endLocation: "Tori Paitan Awa Ramen Tamaki",
        startTime: "18:50",
        endTime: "19:50",
        notes: "高崎人氣第一的泡系雞白湯拉麵。距離車站西口步行約 5-8 分鐘。",
        tags: [{ label: "必吃拉麵", type: "food" }, { label: "排隊名店", type: "alert" }],
        walkingRoute: "高崎站西口步行約 8 分鐘",
        guideRecommendation: {
          mustOrder: "1. 特製泡鶏白湯 (招牌泡系雞白湯)\n2. 和え玉 (調味替玉/加麵)\n3. 炙りチャーシュー丼 (炙燒叉燒飯)",
          tips: "湯頭像卡布奇諾一樣綿密細緻，使用國產雞熬煮。建議先喝原味，中途加入檸檬改變風味。舒肥雞肉叉燒非常軟嫩！"
        }
      },
      {
        id: id(),
        date: "2/25 (三)",
        type: EventType.STAY,
        title: "返回飯店",
        startLocation: "Tamaki Ramen (西口)",
        endLocation: "高崎可可大飯店 (東口)",
        startTime: "20:00",
        endTime: "20:15",
        notes: "晚餐後返回飯店。需穿越車站自由通道回到東口。",
        walkingRoute: "高崎站西口 ➜ 東口天橋直達 (步行約10-15分)"
      }
    ]
  },
  {
    date: "2/26 (四)",
    items: [
      {
        id: id(),
        date: "2/26 (四)",
        type: EventType.TRANSFER,
        title: "退房出發",
        startLocation: "高崎可可大飯店",
        endLocation: "高崎車站",
        startTime: "07:20",
        endTime: "07:25",
        notes: "辦理退房、行李寄放",
        tags: [{ label: "Check-out", type: "alert" }],
        walkingRoute: "高崎站「東口」2樓天橋直達 (步行3分)"
      },
      {
        id: id(),
        date: "2/26 (四)",
        type: EventType.TRAIN,
        title: "往越後湯澤",
        startLocation: "高崎車站",
        endLocation: "越後湯澤",
        startTime: "07:35",
        endTime: "08:02",
        code: "Tanigawa 401",
        notes: "座位: 10號車 2D, 2E (指定席)",
        tags: [{ label: "座位 2D/2E", type: "info" }],
        walkingRoute: "高崎站東口(2F) ➜ 新幹線改札口(2F) ➜ 11/12月台",
        detailedWalkingGuide: {
          steps: [
            "從高崎可可大飯店經由 2F 天橋直接進入高崎站東口。",
            "直走進入車站大廳，尋找綠色的「新幹線 (Shinkansen)」改札口指標。",
            "通過改札口 (投入車票或刷 IC 卡/QR)。",
            "查看電子看板確認「Tanigawa 401」的月台 (通常是往新潟方向，11/12號月台)。",
            "搭乘手扶梯下樓至月台候車。"
          ]
        },
        attachments: [IMAGES.train_0226_1]
      },
      {
        id: id(),
        date: "2/26 (四)",
        type: EventType.ACTIVITY,
        title: "青達雪具租借",
        startLocation: "越後湯澤車站",
        endLocation: "Chenda Rental Yuzawa",
        startTime: "08:10",
        notes: "青達雪具 (接送至岩原滑雪場)",
        walkingRoute: "西口步行約1~5分"
      },
      {
        id: id(),
        date: "2/26 (四)",
        type: EventType.TRANSFER,
        title: "還雪具&前往車站",
        startLocation: "Chenda Rental Yuzawa",
        endLocation: "越後湯澤車站",
        startTime: "17:00",
        endTime: "17:45",
        notes: "歸還租借裝備，搭乘接駁車返回越後湯澤車站，準備搭乘新幹線。",
        walkingRoute: "搭乘接駁車"
      },
      {
        id: id(),
        date: "2/26 (四)",
        type: EventType.TRAIN,
        title: "往高崎車站",
        startLocation: "越後湯澤",
        endLocation: "高崎車站",
        startTime: "18:05",
        endTime: "18:30",
        code: "Tanigawa 92",
        notes: "回高崎領取行李。座位: 10號車 19B, 19C (指定席)",
        tags: [{ label: "座位 19B/19C", type: "info" }],
        walkingRoute: "車站大廳(2F) ➜ 新幹線改札口 ➜ 13/14月台",
        detailedWalkingGuide: {
          steps: [
            "歸還雪具後，搭乘接駁車回到越後湯澤車站。",
            "前往車站 2F 大廳 (CoCoLo 湯澤市集旁)。",
            "持票通過綠色的「新幹線 (Shinkansen)」改札口。",
            "查看看板確認 Tanigawa 92 (18:05發車) 的月台，通常為 13/14 號月台 (往東京方面)。",
            "搭乘手扶梯上樓至月台候車。"
          ]
        },
        attachments: [IMAGES.train_0226_1, IMAGES.train_0226_2]
      },
      {
        id: id(),
        date: "2/26 (四)",
        type: EventType.TRANSFER,
        title: "領取行李",
        startLocation: "高崎車站",
        endLocation: "高崎可可大飯店 ➜ 高崎車站",
        startTime: "18:35",
        endTime: "19:00",
        notes: "回飯店領取寄放的行李，整理後準備搭乘北陸新幹線。",
        walkingRoute: "高崎站東口(2F) ➜ 天橋直達飯店 ➜ 原路折返",
        detailedWalkingGuide: {
            steps: [
                "抵達高崎站 (18:30)，下車後搭乘手扶梯下至 2F 改札口層。",
                "出新幹線改札口後，向左轉往「東口」方向。",
                "走出戶外，沿著 2F 天橋直走，左前方即是「高崎可可大飯店」。",
                "進入飯店櫃檯領取行李。",
                "領取後，走原路天橋回到高崎車站 2F。"
            ]
        }
      },
      {
        id: id(),
        date: "2/26 (四)",
        type: EventType.TRAIN,
        title: "往上野車站",
        startLocation: "高崎車站",
        endLocation: "上野車站",
        startTime: "19:13",
        endTime: "19:54",
        code: "Hakutaka 572",
        notes: "轉乘JR山手線前往大塚。座位: 8號車 20D, 20E (指定席)",
        tags: [{ label: "座位 20D/20E", type: "info" }],
        walkingRoute: "高崎站東口(2F) ➜ 新幹線改札口 ➜ 11/12月台",
        detailedWalkingGuide: {
            steps: [
                "拖著行李回到高崎車站 2F 大廳。",
                "前往綠色的「新幹線」改札口。",
                "將車票放入改札機通過。",
                "查看電子看板確認 Hakutaka 572 (19:13發車) 的月台，通常為 11/12 號月台 (往東京/上野方面)。",
                "搭乘電梯或手扶梯上至 3F 月台候車。"
            ]
        },
        attachments: [IMAGES.train_0226_1, IMAGES.train_0226_2]
      },
      {
        id: id(),
        date: "2/26 (四)",
        type: EventType.ACTIVITY,
        title: "Aidaya あいだや",
        startLocation: "上野車站",
        endLocation: "Aidaya Ueno",
        startTime: "20:00",
        endTime: "21:00",
        notes: "御徒町新崛起的沾麵名店。主打黑毛和牛壽喜燒沾麵與各種特色沾醬。",
        tags: [{ label: "人氣沾麵", type: "food" }, { label: "排隊店", type: "alert" }],
        walkingRoute: "JR御徒町站步行約 3-5 分鐘",
        guideRecommendation: {
          mustOrder: "1. 黑毛和牛沙朗壽喜燒沾麵 (招牌必點)\n2. 豚骨魚介沾麵 (經典濃厚)\n3. 冷製蜆湯沾麵 (清爽限定)",
          tips: "沾麵有四種沾醬可選（豚骨魚介、冷製蜆湯、坦坦、蝦油）。麵條Q彈，吃完麵後可以加湯（Soup wari）。"
        }
      },
      {
        id: id(),
        date: "2/26 (四)",
        type: EventType.TRANSFER,
        title: "JR山手線 (轉乘)",
        startLocation: "御徒町站",
        endLocation: "大塚車站",
        startTime: "21:00",
        endTime: "21:15",
        notes: "吃飽後前往飯店。使用 JR Pass 進站。",
        tags: [{ label: "JR Pass可用", type: "info" }, { label: "山手線內回", type: "info" }],
        walkingRoute: "Aidaya ➜ JR御徒町站 ➜ 山手線(池袋/新宿方面) ➜ 大塚站",
        detailedWalkingGuide: {
          steps: [
            "從 Aidaya 步行約 3 分鐘至「JR 御徒町站」。",
            "持 JR Pass (周遊卷)：若是磁卡式票券，請直接投入改札機票口 (記得取回)；若是紙本憑證，請走人工通道出示給站務員。",
            "注意：JR Pass 不能像 Suica/IC卡那樣感應(刷)，必須投入或出示。",
            "進站後，尋找綠色標示的「山手線 (Yamanote Line)」。",
            "前往 2號月台 (內回：上野、池袋、新宿方向)。",
            "搭乘約 12 分鐘，於「大塚站」下車 (只有一個改札口，位於北口/南口之間)。"
          ]
        }
      },
      {
        id: id(),
        date: "2/26 (四)",
        type: EventType.STAY,
        title: "抵達飯店",
        startLocation: "大塚車站",
        endLocation: "OMO5 東京大塚",
        startTime: "21:15",
        endTime: "21:20",
        notes: "辦理入住 OMO5 東京大塚。訂房代號: 482930。房型: YAGURA Room。",
        tags: [{ label: "Res: 482930", type: "reservation" }],
        walkingRoute: "JR大塚站「北口」過馬路即達 (步行1分)",
        attachments: [IMAGES.hotel_omo5]
      }
    ]
  },
  {
    date: "2/27 (五)",
    items: [
      {
        id: id(),
        date: "2/27 (五)",
        type: EventType.TRANSFER,
        title: "前往御徒町",
        startLocation: "OMO5 東京大塚",
        endLocation: "御徒町 (Egg Baby Cafe)",
        startTime: "09:00",
        endTime: "09:30",
        walkingRoute: "JR大塚站 ➜ JR御徒町站 (南口)"
      },
      {
        id: id(),
        date: "2/27 (五)",
        type: EventType.ACTIVITY,
        title: "Egg Baby Cafe",
        startLocation: "御徒町",
        endLocation: "Egg Baby Cafe",
        startTime: "09:30",
        endTime: "10:15",
        notes: "超人氣排隊名店。建議速戰速決，以免耽誤後面行程。",
        tags: [{ label: "必吃早餐", type: "food" }, { label: "排隊店", type: "alert" }],
        walkingRoute: "JR御徒町站南口步行3分 (高架橋下)",
        guideRecommendation: {
          mustOrder: "1. Egg Baby Sand (半熟蛋三明治)\n2. Classic Pudding (昭和硬布丁)\n3. French Toast (鐵鍋法式吐司)",
          tips: "布丁是限量極品。吃完立刻前往根津神社。"
        }
      },
      {
        id: id(),
        date: "2/27 (五)",
        type: EventType.ACTIVITY,
        title: "根津神社",
        startLocation: "Egg Baby Cafe",
        endLocation: "Nezu Shrine",
        startTime: "10:30",
        endTime: "11:30",
        notes: "東京十社之一。為了趕上壽司預約，請於 11:30 準時離開。",
        tags: [{ label: "11:30前離開", type: "alert" }, { label: "強運御守", type: "shopping" }, { label: "千本鳥居", type: "info" }],
        walkingRoute: "建議搭計程車前往(約10分) 或 步行20分",
        guideRecommendation: {
          mustOrder: "強運御守 (厄除), 月次花御札 (每月花卉木牌)",
          tips: "必拍境內的『乙女稻荷神社』千本鳥居。這裡氣場很強，適合祈求除厄運。"
        }
      },
      {
        id: id(),
        date: "2/27 (五)",
        type: EventType.ACTIVITY,
        title: "Sushi Ishiyama",
        startLocation: "根津神社",
        endLocation: "Sushi Ishiyama Ginza",
        startTime: "12:30",
        endTime: "14:00",
        notes: "銀座 Morita大樓 4F。預約代號: UNQXV2。*絕對不可遲到*",
        tags: [{ label: "Res: UNQXV2", type: "reservation" }, { label: "準時抵達", type: "alert" }],
        walkingRoute: "根津站(千代田線) ➜ 日比谷站 ➜ 步行約5分",
        guideRecommendation: {
          mustOrder: "1. Omakase Course (主廚發辦套餐)\n2. 鮪魚大腹 (Otoro)\n3. 季節海膽 (Seasonal Uni)",
          tips: "壽司師傅的節奏非常優雅。請務必預留充足交通時間。"
        },
        attachments: [IMAGES.sushi_ishiyama]
      },
      {
        id: id(),
        date: "2/27 (五)",
        type: EventType.SHOPPING,
        title: "銀座購物攻略 (6大精選)",
        startLocation: "Sushi Ishiyama",
        endLocation: "Ginza Area",
        startTime: "14:15",
        endTime: "19:00",
        notes: "點擊查看 6 大必逛攻略（Prada/e大餅, 3COINS, 隱形眼鏡, 藥妝, Uniqlo客製, 鬼塚虎）。",
        tags: [{ label: "精準打擊", type: "shopping" }, { label: "6個站點", type: "info" }],
        walkingRoute: "銀座區域步行移動",
        subItems: [
          {
            id: id(),
            date: "2/27 (五)",
            type: EventType.SHOPPING,
            title: "1. 銀座三越 (Prada/Elegance/MiuMiu)",
            startLocation: "Sushi Ishiyama",
            endLocation: "Ginza Mitsukoshi",
            startTime: "14:15",
            endTime: "15:15",
            notes: "⏰ 營業時間: 10:00 - 20:00\n【B1F 化妝品層】\n● Prada Beauty: 氣墊粉餅、護唇膏。\n● Elegance (Albion櫃位): 傳說中的「e大餅」(極致歡顏蜜粉餅)，建議一到就先抽號碼牌。\n\n【1F/2F 精品層】\n● Miu Miu: 1F 是包包配件，2F 是女鞋區。",
            tags: [{ label: "B1F美妝", type: "shopping" }, { label: "1F/2F精品", type: "shopping" }],
            walkingRoute: "步行約 3-5 分鐘",
            navLink: "https://www.google.com/maps/search/?api=1&query=Ginza+Mitsukoshi",
            guideRecommendation: {
                mustOrder: "Prada 氣墊粉餅, Elegance e大餅 (蜜粉)",
                tips: "Elegance 專櫃人潮通常很多，建議一到就先拿號碼牌或詢問貨況。"
            }
          },
          {
            id: id(),
            date: "2/27 (五)",
            type: EventType.SHOPPING,
            title: "2. LUMINE & Bic Camera",
            startLocation: "Ginza Mitsukoshi",
            endLocation: "LUMINE Yurakucho",
            startTime: "15:30",
            endTime: "16:30",
            notes: "⏰ 營業時間: LUMINE 11:00-21:00 / Bic Camera 10:00-22:00\n【LUMINE 1館 7F】\n● 3COINS+plus: 日本平價雜貨天堂。\n\n【Bic Camera 有樂町】\n● 隱形眼鏡: 免處方籤，需知道度數與BC(基弧)。",
            tags: [{ label: "Lumine 1館7F", type: "shopping" }, { label: "隱形眼鏡", type: "shopping" }],
            walkingRoute: "往有樂町方向步行約 5-8 分鐘",
            navLink: "https://www.google.com/maps/search/?api=1&query=LUMINE+Yurakucho",
            referenceLink: {
                url: "http://xhslink.com/o/AIyK5UIg1W3",
                label: "小紅書：3COINS 失心瘋必買"
            },
            guideRecommendation: {
                mustOrder: "3COINS 廚房/收納小物, 隱形眼鏡 (各大品牌)",
                tips: "買隱形眼鏡時，只需填寫簡單表格，建議先將自己度數照片存好方便對照。"
            }
          },
          {
            id: id(),
            date: "2/27 (五)",
            type: EventType.SHOPPING,
            title: "3. 松本清 銀座旗艦店",
            startLocation: "LUMINE Yurakucho",
            endLocation: "Matsumoto Kiyoshi Ginza",
            startTime: "16:40",
            endTime: "17:10",
            notes: "⏰ 營業時間: 10:00 - 22:00\n藥妝補貨站。\n重點目標: 消水腫好物 (Qtto 襪, DHC, 防風通聖散)。",
            tags: [{ label: "Qtto美腿襪", type: "shopping" }, { label: "消水腫", type: "shopping" }],
            walkingRoute: "步行約 5 分鐘",
            navLink: "https://www.google.com/maps/search/?api=1&query=Matsumoto+Kiyoshi+Ginza",
            guideRecommendation: {
                mustOrder: "1. Qtto 睡眠機能美腿襪 (紫色)\n2. DHC メリロート (消水腫)\n3. 漢方 防風通聖散",
                tips: "這家是旗艦店，貨源最齊全。建議下載松本清 APP 或出示優惠券。"
            }
          },
          {
            id: id(),
            date: "2/27 (五)",
            type: EventType.SHOPPING,
            title: "4. Uniqlo 銀座旗艦店 (UTme!)",
            startLocation: "Matsumoto Kiyoshi",
            endLocation: "Uniqlo Ginza",
            startTime: "17:15",
            endTime: "17:45",
            notes: "⏰ 營業時間: 11:00 - 21:00\n全球最大旗艦店 (12層樓)。\nUTme! 客製化專區位於【5F】(MY UNIQLO 專區內)。\n⚠️ 注意：銀座有兩間大型 Uniqlo，這是 12 層樓獨棟的「銀座旗艦店」，請勿跑去 Marronnier Gate 的 Uniqlo Tokyo。",
            tags: [{ label: "5F客製化", type: "shopping" }, { label: "12層樓旗艦店", type: "info" }],
            walkingRoute: "沿中央通往 6 丁目方向 (步行 2 分鐘)",
            navLink: "https://www.google.com/maps/search/?api=1&query=Uniqlo+Ginza",
            referenceLink: {
                url: "http://xhslink.com/o/7CFGoD6etyg",
                label: "小紅書：UTme! 摳圖教學"
            },
            guideRecommendation: {
                mustOrder: "UTme! 客製化托特包, 銀座限定聯名 T恤",
                tips: "強烈建議先在手機把照片去背好 (參考小紅書教學)。一進店先衝【5F】操作機台，等待印製時間 (約 20-40 分) 再去 12F 買杯咖啡或逛其他樓層。"
            }
          },
          {
            id: id(),
            date: "2/27 (五)",
            type: EventType.SHOPPING,
            title: "5. Onitsuka Tiger 旗艦店",
            startLocation: "Uniqlo Ginza",
            endLocation: "Onitsuka Tiger Ginza",
            startTime: "17:50",
            endTime: "18:20",
            notes: "⏰ 營業時間: 11:00 - 20:00\n銀座 7 丁目整棟旗艦店。款式極全，空間大好試穿。",
            tags: [{ label: "Mexico 66", type: "shopping" }, { label: "旗艦店", type: "info" }],
            walkingRoute: "沿中央通往 7 丁目走 (約 3-5 分鐘)",
            navLink: "https://www.google.com/maps/search/?api=1&query=Onitsuka+Tiger+Ginza",
            guideRecommendation: {
                mustOrder: "Mexico 66 (經典款), 厚底系列",
                tips: "旗艦店有許多限定款，如果不確定尺寸，店員通常很有耐心協助試穿。"
            }
          },
          {
            id: id(),
            date: "2/27 (五)",
            type: EventType.SHOPPING,
            title: "6. 唐吉訶德 銀座本館",
            startLocation: "Onitsuka Tiger",
            endLocation: "Don Quijote Ginza",
            startTime: "18:25",
            endTime: "19:00",
            notes: "⏰ 營業時間: 24小時營業\n位於銀座 8 丁目。最後補貨機會 (零食/漏買藥妝)。視體力決定是否進入。",
            tags: [{ label: "最後補貨", type: "shopping" }],
            walkingRoute: "就在旁邊 (步行 1 分鐘)",
            navLink: "https://www.google.com/maps/search/?api=1&query=Don+Quijote+Ginza+Honkan",
            referenceLink: {
                url: "http://xhslink.com/o/3e61iDUCuf1",
                label: "小紅書：Donki 京喚羽實測"
            },
            guideRecommendation: {
                mustOrder: "京喚羽 (Tokio Inkarami) 護髮, 藥妝, 零食",
                tips: "京喚羽在日本買比台灣便宜非常多，金色系列最受歡迎。"
            }
          }
        ]
      },
      {
        id: id(),
        date: "2/27 (五)",
        type: EventType.TRANSFER,
        title: "返回飯店 (放戰利品)",
        startLocation: "銀座/新橋",
        endLocation: "OMO5 東京大塚",
        startTime: "19:15",
        endTime: "20:00",
        notes: "滿載而歸！搭乘 JR 山手線返回大塚 (約 30 分)，先將戰利品放回房間，稍作休息準備吃燒肉。",
        walkingRoute: "新橋站 (JR山手線) ➜ 大塚站 (北口)",
        tags: [{ label: "放行李", type: "info" }]
      },
      {
        id: id(),
        date: "2/27 (五)",
        type: EventType.ACTIVITY,
        title: "和牛一頭焼肉 房家 (大塚店)",
        startLocation: "OMO5 東京大塚",
        endLocation: "Bouya Otsuka",
        startTime: "21:00",
        endTime: "22:30",
        notes: "預約時間: 21:00。就在飯店附近的人氣燒肉店 (步行 2 分鐘)。",
        tags: [{ label: "Res: 21:00", type: "reservation" }, { label: "A5和牛", type: "food" }],
        walkingRoute: "JR大塚站北口步行約 2 分鐘 (Starbucks 旁巷子)",
        navLink: "https://www.google.com/maps/search/?api=1&query=Bouya+Otsuka",
        guideRecommendation: {
            mustOrder: "1. 房家一頭盛り (和牛拼盤)\n2. 盛岡練り出し手打冷麺 (手工冷麵)\n3. 炙りユッケ (炙燒生牛肉)",
            tips: "這家店買下整頭和牛，CP值極高。特別推薦最後一定要點手工冷麵收尾，麵條非常有嚼勁！"
        },
        attachments: [IMAGES.dinner_227]
      },
      {
        id: id(),
        date: "2/27 (五)",
        type: EventType.STAY,
        title: "返回飯店休息",
        startLocation: "Bouya Otsuka",
        endLocation: "OMO5 東京大塚",
        startTime: "22:40",
        notes: "吃飽喝足，回飯店休息。準備明天前往新宿。",
        walkingRoute: "步行 2 分鐘"
      }
    ]
  },
  {
    date: "2/28 (六)",
    items: [
      {
        id: id(),
        date: "2/28 (六)",
        type: EventType.TRANSFER,
        title: "從飯店出發",
        startLocation: "OMO5 東京大塚",
        endLocation: "大塚車站",
        startTime: "10:15",
        endTime: "10:20",
        walkingRoute: "JR大塚站「北口」過馬路即達 (步行1分)"
      },
      {
        id: id(),
        date: "2/28 (六)",
        type: EventType.ACTIVITY,
        title: "人形町今半",
        startLocation: "大塚車站",
        endLocation: "Ningyocho Imahan Shinjuku",
        startTime: "10:20",
        endTime: "11:00",
        notes: "新宿南方之星塔店 4F (極上壽喜燒)。預約代號: T95G7W。",
        navLink: "https://maps.app.goo.gl/FJ8HSS2tAdzJLdZA7",
        tags: [{ label: "Res: T95G7W", type: "reservation" }, { label: "極上壽喜燒", type: "food" }],
        walkingRoute: "搭JR山手線至新宿站「新南改札」步行約3分",
        guideRecommendation: {
          mustOrder: "1. 極上黑毛和牛壽喜燒套餐\n2. 結尾滑蛋蓋飯 (ふわとろ丼)\n3. 特選和牛握壽司 (炙燒/生食)",
          tips: "全程由女將服務。肉片沾滿蛋液入口即化，最後的『滑蛋蓋飯 (Fu-watro bowl)』吸滿肉汁精華，絕對不能錯過。"
        },
        attachments: [IMAGES.imahan]
      },
      {
        id: id(),
        date: "2/28 (六)",
        type: EventType.SHOPPING,
        title: "新宿逛街攻略",
        startLocation: "Shinjuku South",
        endLocation: "Shibuya",
        startTime: "11:15",
        endTime: "19:00",
        notes: "從新宿南口出發，一路逛到澀谷的黃金路線。\n涵蓋：新宿伊勢丹伴手禮、LUMINE 女裝、原宿戶外機能、澀谷潮流。",
        tags: [{ label: "黃金路線", type: "shopping" }, { label: "3大區域", type: "info" }],
        walkingRoute: "新宿 ➜ 原宿 (電車) ➜ 澀谷 (步行)",
        subItems: [
          {
            id: id(),
            date: "2/28 (六)",
            type: EventType.SHOPPING,
            title: "1. BEAMS JAPAN (新宿店)",
            startLocation: "Shinjuku South",
            endLocation: "BEAMS JAPAN Shinjuku",
            startTime: "11:30",
            endTime: "12:15",
            notes: "⏰ 營業時間: 11:00 - 20:00\n高達 6 層樓的旗艦店，完美結合潮流與日本傳統工藝，男裝部選品極佳。",
            tags: [{ label: "6層樓", type: "shopping" }, { label: "日本工藝", type: "info" }],
            walkingRoute: "新宿南口步行約 5 分鐘",
            navLink: "https://www.google.com/maps/search/?api=1&query=BEAMS+JAPAN+Shinjuku",
            guideRecommendation: {
                mustOrder: "Beams Japan Logo 小物, 日本傳統聯名工藝品",
                tips: "1F 的伴手禮區非常適合買禮物。"
            }
          },
          {
            id: id(),
            date: "2/28 (六)",
            type: EventType.SHOPPING,
            title: "2. 伊勢丹百貨 (Isetan)",
            startLocation: "BEAMS JAPAN",
            endLocation: "Isetan Shinjuku",
            startTime: "12:30",
            endTime: "13:30",
            notes: "⏰ 營業時間: 10:00 - 20:00\n直奔 B1 美食街買最高級的伴手禮。",
            tags: [{ label: "B1伴手禮", type: "food" }],
            walkingRoute: "步行約 5-8 分鐘",
            navLink: "https://www.google.com/maps/search/?api=1&query=Isetan+Shinjuku",
            guideRecommendation: {
                mustOrder: "Noix de Beurre (現烤費南雪), Fika (北歐風果醬餅乾)",
                tips: "Noix de Beurre 通常排隊很長，建議先去抽號碼牌或觀察排隊狀況。"
            }
          },
          {
            id: id(),
            date: "2/28 (六)",
            type: EventType.SHOPPING,
            title: "3. LUMINE 1 / 2 / EST",
            startLocation: "Isetan Shinjuku",
            endLocation: "LUMINE Shinjuku",
            startTime: "13:45",
            endTime: "15:00",
            notes: "⏰ 營業時間: 11:00 - 21:00\n新宿車站周邊的無敵服飾聚落。\n● LUMINE 2: SNIDEL、Mila Owen、STUDIOUS (女裝)。\n● LUMINE EST: FREAK'S STORE (潮流)。",
            tags: [{ label: "日系女裝", type: "shopping" }, { label: "EST潮流", type: "shopping" }],
            walkingRoute: "步行回新宿車站周邊",
            navLink: "https://www.google.com/maps/search/?api=1&query=LUMINE+Shinjuku",
            guideRecommendation: {
                mustOrder: "SNIDEL (洋裝), FREAK'S STORE (工裝/休閒)",
                tips: "如果不確定要逛哪棟，LUMINE EST 比較年輕潮流，LUMINE 2 比較輕熟女。"
            }
          },
          {
            id: id(),
            date: "2/28 (六)",
            type: EventType.TRANSFER,
            title: "前往澀谷/神南 (Clinic)",
            startLocation: "Shinjuku Station",
            endLocation: "Shibuya Jinnan",
            startTime: "15:00",
            endTime: "15:25",
            walkingRoute: "搭乘 JR 山手線至澀谷站 (約 7 分鐘)，步行至神南",
            notes: "移動到澀谷神南區域，先前往診所採購。"
          },
          {
            id: id(),
            date: "2/28 (六)",
            type: EventType.SHOPPING,
            title: "4. 渋谷きむらクリニック",
            startLocation: "Shibuya Station",
            endLocation: "Shibuya Kimura Clinic",
            startTime: "15:30",
            endTime: "16:00",
            notes: "⏰ 營業時間: 09:30–12:30, 15:00–18:30\n位於神南區域 (靠近 Tower Records)。\n重點目標: 猛建樂 (Bonjinra)。",
            tags: [{ label: "猛建樂", type: "shopping" }, { label: "診所", type: "info" }],
            walkingRoute: "澀谷站步行約 5-8 分鐘",
            navLink: "https://www.google.com/maps/search/?api=1&query=Shibuya+Kimura+Clinic",
            guideRecommendation: {
                mustOrder: "猛建樂 (Bonjinra)",
                tips: "需現場掛號看診購買，建議準備好護照。"
            }
          },
          {
            id: id(),
            date: "2/28 (六)",
            type: EventType.SHOPPING,
            title: "5. niko and... TOKYO",
            startLocation: "Shibuya Jinnan",
            endLocation: "niko and... TOKYO",
            startTime: "16:15",
            endTime: "16:45",
            notes: "⏰ 營業時間: 11:00 - 21:00\n從神南區往原宿方向走，就在附近。原宿全球旗艦店。",
            tags: [{ label: "旗艦店", type: "shopping" }, { label: "雜貨", type: "info" }],
            walkingRoute: "神南區域步行即達",
            navLink: "https://www.google.com/maps/search/?api=1&query=niko+and...+TOKYO",
            guideRecommendation: {
                mustOrder: "品牌雜貨, 露營小物, 聯名服飾",
                tips: "店內陳列非常有趣，2F 的生活雜貨區很好逛。"
            }
          },
          {
            id: id(),
            date: "2/28 (六)",
            type: EventType.SHOPPING,
            title: "6. 戶外機能 (Arc'teryx / Salomon)",
            startLocation: "niko and...",
            endLocation: "Harajuku Outdoor Area",
            startTime: "16:50",
            endTime: "17:20",
            notes: "⏰ 營業時間: 11:00 - 20:00\n繼續往明治通原宿方向走。山系品牌一級戰區。",
            tags: [{ label: "始祖鳥", type: "shopping" }, { label: "Salomon", type: "shopping" }],
            walkingRoute: "明治通沿線步行",
            navLink: "https://www.google.com/maps/search/?api=1&query=Arcteryx+Harajuku",
            guideRecommendation: {
                mustOrder: "Arc'teryx Beta Jacket, Salomon XT-6",
                tips: "始祖鳥如果缺貨，可以去附近的 Salomon 看看，款式通常比台灣齊全。"
            }
          },
          {
            id: id(),
            date: "2/28 (六)",
            type: EventType.SHOPPING,
            title: "7. 貓街: nanamica / TNF紫標",
            startLocation: "Harajuku",
            endLocation: "nanamica Mountain",
            startTime: "17:25",
            endTime: "18:00",
            notes: "⏰ 營業時間: 11:00 - 20:00\n折返進入步行區「貓街」，一路往南走回澀谷方向。這裡是 TNF 紫標的大本營。",
            tags: [{ label: "TNF紫標", type: "shopping" }, { label: "貓街", type: "info" }],
            walkingRoute: "貓街 (Cat Street) 往澀谷方向",
            navLink: "https://www.google.com/maps/search/?api=1&query=nanamica+Mountain",
            guideRecommendation: {
                mustOrder: "Purple Label 褲款, nanamica 襯衫",
                tips: "紫標是日本限定線，版型更適合亞洲人。"
            }
          },
          {
            id: id(),
            date: "2/28 (六)",
            type: EventType.SHOPPING,
            title: "8. 澀谷 PARCO (Shibuya PARCO)",
            startLocation: "Shibuya",
            endLocation: "Shibuya PARCO",
            startTime: "18:10",
            endTime: "19:00",
            notes: "⏰ 營業時間: 11:00 - 21:00\n回到澀谷。東京目前最具指標性的潮流百貨。\n● 5F: 超大戶外品牌特區。\n● 1F/2F: Sacai, Human Made 等高端潮流。",
            tags: [{ label: "潮流聖地", type: "shopping" }, { label: "Nintendo/Pokemon", type: "info" }],
            walkingRoute: "抵達澀谷",
            navLink: "https://www.google.com/maps/search/?api=1&query=Shibuya+PARCO",
            guideRecommendation: {
                mustOrder: "Human Made 配件, 5F 戶外選物",
                tips: "6F 是任天堂和寶可夢中心，如果這兩個沒興趣可以專攻 1-5F 的潮流服飾。"
            }
          },
          {
            id: id(),
            date: "2/28 (六)",
            type: EventType.SHOPPING,
            title: "9. FREAK'S STORE 澀谷旗艦店",
            startLocation: "Shibuya PARCO",
            endLocation: "FREAK'S STORE Shibuya",
            startTime: "19:05",
            endTime: "19:35",
            notes: "⏰ 營業時間: 12:00 - 20:00\n抵達澀谷車站前的最後一站。獨立旗艦店，品項豐富，美式復古與山系混搭氛圍強烈。",
            tags: [{ label: "美式復古", type: "shopping" }, { label: "旗艦店", type: "info" }],
            walkingRoute: "步行約 5 分鐘",
            navLink: "https://www.google.com/maps/search/?api=1&query=FREAKS+STORE+Shibuya",
            guideRecommendation: {
                mustOrder: "Nautica 聯名款, 軍工裝外套",
                tips: "這裡的選品風格比 LUMINE EST 店更硬派一點，男裝選擇很多。"
            }
          }
        ]
      },
      {
        id: id(),
        date: "2/28 (六)",
        type: EventType.ACTIVITY,
        title: "晚餐: 牛たん荒 (Gyutan Ara)",
        startLocation: "Shibuya",
        endLocation: "Gyutan Ara Shinjuku",
        startTime: "20:00",
        endTime: "21:30",
        notes: "新宿西口人氣厚切牛舌居酒屋。口感脆彈，炭火香氣十足。",
        tags: [{ label: "必吃牛舌", type: "food" }, { label: "Res: 20:00", type: "reservation" }],
        walkingRoute: "從澀谷搭乘 JR 山手線至新宿站 (約 7 分鐘)，西口步行 5 分鐘",
        navLink: "https://www.google.com/maps/search/?api=1&query=Gyutan+Ara+Shinjuku",
        guideRecommendation: {
            mustOrder: "1. 牛たん定食 (牛舌定食)\n2. ゆでたん (燉煮牛舌)\n3. テールスープ (牛尾湯)",
            tips: "這家是居酒屋風格，可以點單品配酒。燉煮牛舌非常軟嫩，建議嘗試！"
        }
      },
      {
        id: id(),
        date: "2/28 (六)",
        type: EventType.STAY,
        title: "返回飯店",
        startLocation: "大塚車站",
        endLocation: "OMO5 東京大塚",
        notes: "續住 OMO5 東京大塚",
        walkingRoute: "JR大塚站「北口」過馬路即達 (步行1分)"
      }
    ]
  },
      {
        date: "3/1 (日)",
        items: [
          {
            id: id(),
            date: "3/1 (日)",
            type: EventType.TRANSFER,
            title: "退房出發 (往機場)",
            startLocation: "OMO5 東京大塚",
            endLocation: "日暮里站 (Skyliner)",
            startTime: "07:30",
            endTime: "07:50",
            mapType: 'google', // FORCE GOOGLE MAP
            notes: "建議 07:30 退房。搭乘 JR 山手線至『日暮里』站轉車 (約 10 分)。",
            tags: [{ label: "Check-out 07:30", type: "alert" }],
            walkingRoute: "JR大塚站 ➜ 日暮里站"
          },
          {
            id: id(),
            date: "3/1 (日)",
            type: EventType.TRANSFER,
            title: "Skyliner (Keisei)",
            startLocation: "日暮里站 (Nippori)",
            endLocation: "成田機場 (NRT)",
            startTime: "08:10",
            endTime: "08:50",
            mapType: 'google', // FORCE GOOGLE MAP
            notes: "搭乘 Keisei Skyliner (往成田機場)。建議搭乘 08:00~08:20 之間的班次，確保 09:30 前抵達。",
            tags: [{ label: "Skyliner", type: "info" }],
            detailedWalkingGuide: {
                steps: [
                    "抵達 JR 日暮里站後，依照藍色「京成線 / Skyliner」指標。",
                    "經過「JR・京成 轉乘改札口」。",
                    "前往 1 號月台 (Skyliner 專用)。",
                    "車程約 36-40 分鐘直達機場。"
                ]
            }
          },
          {
            id: id(),
            date: "3/1 (日)",
            type: EventType.FLIGHT,
            title: "飛機 (Air Premia)",
            startLocation: "成田機場 (NRT)",
            endLocation: "仁川機場 (ICN)",
            startTime: "12:30",
            endTime: "15:20",
            mapType: 'google', // FORCE GOOGLE MAP
            code: "YP732",
            notes: "請於 09:30 左右抵達機場櫃檯報到。",
            tags: [{ label: "起飛前3hr抵達", type: "alert" }],
            attachments: [IMAGES.flight_nrt_icn]
          },
          {
            id: id(),
            date: "3/1 (日)",
            type: EventType.STAY,
            title: "飯店寄放行李",
            startLocation: "忠武路站",
            endLocation: "Wecostay Namsan",
            startTime: "17:00",
            endTime: "17:30",
            navLink: "https://naver.me/G2EwQEal",
            notes: "抵達飯店辦理入住或寄放行李。\n地址: 서울 중구 충무로 3 111호 (WeCostay Namsan)。",
            tags: [{ label: "PIN: 9466", type: "reservation" }],
            walkingRoute: "地鐵忠武路站「6號出口」步行約 3 分鐘",
            attachments: [IMAGES.hotel_wecostay]
          },
          {
            id: id(),
            date: "3/1 (日)",
            type: EventType.ACTIVITY,
            title: "金豬食堂 (抽號碼牌)",
            startLocation: "Wecostay Namsan",
            endLocation: "Geumdaeji Shikdang",
            startTime: "17:40",
            endTime: "18:00",
            navLink: "https://naver.me/FKGF8vbb",
            notes: "放置行李後，立刻搭計程車或地鐵 (藥水站) 前往餐廳抽取號碼牌/登記候位。\n地址: 首爾特別市 中區 新堂洞 370-69",
            tags: [{ label: "必先抽號碼", type: "alert" }],
            walkingRoute: "計程車約 5-8 分鐘"
          },
          {
            id: id(),
            date: "3/1 (日)",
            type: EventType.SHOPPING,
            title: "東大門逛街 (等叫號)",
            startLocation: "Geumdaeji",
            endLocation: "Dongdaemun (Nyunyu)",
            startTime: "18:00",
            endTime: "20:00",
            navLink: "https://map.naver.com/p/search/Nyunyu%20Dongdaemun",
            notes: "等待叫號時的購物攻略：\n1. **Nyunyu (飾品批發)**: 就在 DDP 後面。整棟都是飾品，款式超多且便宜 (營業至凌晨 5 點)。\n2. **現代百貨 Outlet**: B1 書店/Cafe 休息，1F Nike/Adidas Factory Store 挖寶。\n3. **Doota Mall**: 1F Shake Shack, B1 Nike Custom (可客製化帽子/T恤), 4F No Brand 超市買零食。",
            tags: [{ label: "車程約5分", type: "info" }, { label: "Nyunyu必逛", type: "shopping" }],
            walkingRoute: "從藥水站搭計程車至東大門約 5-8 分鐘 ($5000-6000 KRW)"
          },
          {
            id: id(),
            date: "3/1 (日)",
            type: EventType.ACTIVITY,
            title: "晚餐: 金豬食堂 (Geumdaeji)",
            startLocation: "Dongdaemun",
            endLocation: "Geumdaeji Shikdang",
            startTime: "20:00",
            endTime: "21:30",
            navLink: "https://naver.me/FKGF8vbb",
            notes: "米其林必比登推薦，首爾三大烤肉之一。\n地址: 首爾特別市 中區 新堂洞 370-69",
            tags: [{ label: "必吃烤肉", type: "food" }, { label: "排隊名店", type: "alert" }],
            guideRecommendation: {
              mustOrder: "1. 本五花肉 (Bon Samgyeopsal)\n2. 雪花豬頸肉 (Nunkkot Moksal)\n3. 泡菜豬肉鍋 (Kimchi Jjigae)",
              tips: "如果過號會被取消，請隨時留意手機通知 (CatchTable)。肉質鮮美，店員會幫忙烤到完美狀態。泡菜鍋非常濃郁，必點！"
            }
          },
          {
            id: id(),
            date: "3/1 (日)",
            type: EventType.TRANSFER,
            title: "返回飯店",
            startLocation: "Geumdaeji Shikdang",
            endLocation: "Wecostay Namsan",
            startTime: "22:00",
            navLink: "https://naver.me/G2EwQEal",
            notes: "返回 Wecostay 休息。",
            walkingRoute: "計程車約 5-10 分鐘，或地鐵藥水站 -> 忠武路站"
          }
        ]
      },
  {
    date: "3/2 (一)",
    items: [
      {
        id: id(),
        date: "3/2 (一)",
        type: EventType.TRANSFER,
        title: "從飯店出發",
        startLocation: "Wecostay Namsan",
        endLocation: "Seongsu Station",
        startTime: "10:30",
        endTime: "11:00",
        walkingRoute: "地鐵忠武路站 ➜ 聖水站 (約 30 分)"
      },
      {
        id: id(),
        date: "3/2 (一)",
        type: EventType.SHOPPING,
        title: "聖水洞逛街攻略",
        startLocation: "Seongsu Station",
        endLocation: "Seongsu Area",
        startTime: "11:00",
        endTime: "18:00",
        notes: "韓國布魯克林，廢棄工廠改建的潮流聖地。建議路線：聖水站 3 號出口開始，順時針逛一圈。",
        tags: [{ label: "潮流聖地", type: "shopping" }, { label: "11個站點", type: "info" }],
        walkingRoute: "聖水洞區域步行",
        subItems: [
            {
                id: id(),
                date: "3/2 (一)",
                type: EventType.FOOD,
                title: "1. 韓貞仙 (Hanjeonseon)",
                startLocation: "Seongsu Stn.",
                endLocation: "Hanjeonseon",
                startTime: "11:00",
                endTime: "11:20",
                navLink: "https://naver.me/FxCEj0hI",
                notes: "超人氣水果大福專賣店。適合買來當開胃甜點。",
                tags: [{ label: "杜拜巧克力", type: "food" }],
                guideRecommendation: {
                    mustOrder: "杜拜巧克力大福 (熱門), 草莓大福",
                    tips: "杜拜巧克力口味非常搶手，建議一到聖水洞先來買。"
                }
            },
            {
                id: id(),
                date: "3/2 (一)",
                type: EventType.SHOPPING,
                title: "2. Musinsa Empty Seongsu",
                startLocation: "Hanjeonseon",
                endLocation: "Musinsa Empty",
                startTime: "11:30",
                endTime: "12:15",
                navLink: "https://naver.me/5KqFeSSU",
                notes: "韓國最大時尚電商 Musinsa 的實體選物店。工業風裝潢非常有特色。",
                tags: [{ label: "小眾品牌", type: "shopping" }, { label: "選物店", type: "info" }]
            },
            {
                id: id(),
                date: "3/2 (一)",
                type: EventType.SHOPPING,
                title: "3. Nyunyu Seongsu",
                startLocation: "Musinsa Empty",
                endLocation: "Nyunyu Seongsu",
                startTime: "12:20",
                endTime: "12:50",
                navLink: "https://naver.me/Giarn1e8",
                notes: "東大門飾品批發的聖水店。陳列比東大門店更有質感，款式極多。",
                tags: [{ label: "飾品批發", type: "shopping" }, { label: "平價", type: "info" }]
            },
            {
                id: id(),
                date: "3/2 (一)",
                type: EventType.SHOPPING,
                title: "4. Stand Oil",
                startLocation: "Nyunyu",
                endLocation: "Stand Oil",
                startTime: "13:00",
                endTime: "13:40",
                navLink: "https://naver.me/5zXijpCx",
                notes: "韓國國民包包品牌。必逛旗艦店，店內有旋轉輸送帶展示，非常好拍。",
                tags: [{ label: "必買包包", type: "shopping" }, { label: "Chubby Bag", type: "shopping" }],
                guideRecommendation: {
                    mustOrder: "Chubby Bag (保齡球包), Oblong Bag (經典方包)",
                    tips: "店內人潮通常很多，建議先在官網看好款式，現場直接試背結帳。"
                }
            },
            {
                id: id(),
                date: "3/2 (一)",
                type: EventType.SHOPPING,
                title: "5. 29CM Seongsu",
                startLocation: "Stand Oil",
                endLocation: "Igu Home (29CM)",
                startTime: "13:50",
                endTime: "14:20",
                navLink: "https://naver.me/GPlQw0UT",
                notes: "高質感生活選物店。從文具、香氛到服飾都有。",
                tags: [{ label: "生活質感", type: "shopping" }]
            },
            {
                id: id(),
                date: "3/2 (一)",
                type: EventType.ACTIVITY,
                title: "6. DIOR Seongsu (拍照)",
                startLocation: "29CM",
                endLocation: "DIOR Seongsu",
                startTime: "14:25",
                endTime: "14:40",
                navLink: "https://naver.me/I5yulb3q",
                notes: "聖水洞著名地標。建議在門口拍照打卡即可 (入內需預約)。",
                tags: [{ label: "網美打卡", type: "info" }]
            },
            {
                id: id(),
                date: "3/2 (一)",
                type: EventType.SHOPPING,
                title: "7. Hetras",
                startLocation: "DIOR",
                endLocation: "Hetras Seongsu",
                startTime: "14:45",
                endTime: "15:15",
                navLink: "https://naver.me/xt4PPmUF",
                notes: "CP值極高的香氛品牌。擴香瓶容量大且便宜，送禮自用兩相宜。",
                tags: [{ label: "平價擴香", type: "shopping" }],
                guideRecommendation: {
                    mustOrder: "Flower Shop (花店香), Hotel Wood (木質調)",
                    tips: "擴香瓶頗重，建議留到最後或確認行李重量再購買。"
                }
            },
            {
                id: id(),
                date: "3/2 (一)",
                type: EventType.SHOPPING,
                title: "8. Blue Elephant",
                startLocation: "Hetras",
                endLocation: "Blue Elephant",
                startTime: "15:20",
                endTime: "15:50",
                navLink: "https://naver.me/GdlG5IuI",
                notes: "被稱為「平價版 Gentle Monster」。設計感強但價格親民 (約 GM 的 1/3)。",
                tags: [{ label: "平價墨鏡", type: "shopping" }]
            },
            {
                id: id(),
                date: "3/2 (一)",
                type: EventType.SHOPPING,
                title: "9. Rieti",
                startLocation: "Blue Elephant",
                endLocation: "Rieti",
                startTime: "15:55",
                endTime: "16:15",
                navLink: "https://naver.me/5NMX7yUN",
                notes: "另一家平價墨鏡選擇。位於 Matin Kim 對面小店 2 樓。",
                tags: [{ label: "徐睿知同款", type: "shopping" }]
            },
            {
                id: id(),
                date: "3/2 (一)",
                type: EventType.SHOPPING,
                title: "10. Shiro Seongsu",
                startLocation: "Rieti",
                endLocation: "Shiro",
                startTime: "16:20",
                endTime: "16:40",
                navLink: "https://naver.me/GXgeNslR",
                notes: "來自日本北海道的純淨保養品牌。店內充滿白茶與皂香的療癒香氣。",
                tags: [{ label: "白茶香水", type: "shopping" }]
            },
            {
                id: id(),
                date: "3/2 (一)",
                type: EventType.SHOPPING,
                title: "11. Gentle Monster Haus Nowhere",
                startLocation: "Shiro",
                endLocation: "Gentle Monster",
                startTime: "16:50",
                endTime: "17:30",
                navLink: "https://naver.me/GbAqTby0",
                notes: "不僅是眼鏡店，更像是一座美術館。集結 Tamburins (香氛) 與 Nudake (甜點)。",
                tags: [{ label: "必逛地標", type: "shopping" }, { label: "Jennie同款", type: "shopping" }]
            }
        ]
      },
      {
        id: id(),
        date: "3/2 (一)",
        type: EventType.STAY,
        title: "返回飯店",
        startLocation: "聖水洞",
        endLocation: "Wecostay Namsan",
        notes: "續住 Wecostay 南山住宿",
        navLink: "https://naver.me/G2EwQEal",
        walkingRoute: "地鐵聖水站 ➜ 忠武路站"
      }
    ]
  },
  {
    date: "3/3 (二)",
    items: [
      {
        id: id(),
        date: "3/3 (二)",
        type: EventType.TRANSFER,
        title: "退房出發",
        startLocation: "Wecostay Namsan",
        endLocation: "Egg Clinic (Sinsa)",
        startTime: "10:30",
        endTime: "11:00",
        notes: "退房、行李寄放後前往診所。",
        tags: [{ label: "Check-out 11:00", type: "alert" }],
        navLink: "https://naver.me/FoXC2teg",
        walkingRoute: "前往新沙洞 Egg Clinic"
      },
      {
        id: id(),
        date: "3/3 (二)",
        type: EventType.ACTIVITY,
        title: "Egg Clinic (Sinsa Egeu)",
        startLocation: "Sinsa Egeu医院",
        endLocation: "首尔特别市 瑞草区 蚕院洞 12-22",
        startTime: "11:00",
        endTime: "15:00",
        navLink: "https://naver.me/FoXC2teg",
        notes: "醫美預約。Sinsa Egeu医院 (에그의원)。\n地址: 首尔特别市 瑞草区 蚕院洞 12-22。",
        tags: [{ label: "醫美預約", type: "reservation" }, { label: "需素顏", type: "info" }],
        walkingRoute: "建議搭乘計程車前往 (約 20-30 分)"
      },
      {
        id: id(),
        date: "3/3 (二)",
        type: EventType.ACTIVITY,
        title: "Ggupdang",
        startLocation: "Egg Clinic",
        endLocation: "Ggupdang Sinsa",
        startTime: "15:00",
        endTime: "16:30",
        navLink: "https://naver.me/IDkcrg7Q",
        notes: "米其林必比登推薦。就在診所隔壁 (12-21)。\n地址: 首尔特别市 瑞草区 蚕院洞 12-21。",
        tags: [{ label: "必吃烤肉", type: "food" }, { label: "KOKUMI里脊", type: "food" }],
        walkingRoute: "就在隔壁 (步行1分鐘)",
        guideRecommendation: {
          mustOrder: "1. KOKUMI Moksal (KOKUMI 熟成梅花豬)\n2. KOKUMI Rice (松露飯/KOKUMI飯)\n3. Gabrisal (背脊肉)",
          tips: "KOKUMI Rice 是這裡的靈魂，據說是用日式高湯煮的，單吃就非常美味。肉品會有專人代烤，建議第一口先沾鹽吃原味。"
        }
      },
      {
        id: id(),
        date: "3/3 (二)",
        type: EventType.SHOPPING,
        title: "London Bagel Museum Dosan",
        startLocation: "Ggupdang",
        endLocation: "London Bagel Museum Dosan",
        startTime: "17:00",
        endTime: "18:00",
        navLink: "https://naver.me/5Nek3Xh2",
        referenceLink: {
          url: "https://www.catchtable.net/zh-TW/explore/shop/london_bagel_museum_dosan",
          label: "CatchTable 候位/訂位"
        },
        notes: "首爾最紅的貝果名店。就在島山公園附近。若無法內用，建議外帶去機場吃。\n地址: 首爾特別市 江南區 新沙洞 642-25",
        tags: [{ label: "必買貝果", type: "food" }, { label: "排隊名店", type: "alert" }],
        guideRecommendation: {
          mustOrder: "1. Potato Cheese Bagel (馬鈴薯起司)\n2. Spring Onion Pretzel (蔥韭菜貝果)\n3. Brick Lane (蜂蜜奶油)",
          tips: "建議一開放遠端候位就先登記 (CatchTable)。馬鈴薯起司是絕對招牌，口感像麻糬一樣Q彈。店內裝潢非常有英倫風，很適合拍照。"
        },
        walkingRoute: "從 Ggupdang 步行約 10-15 分鐘"
      },
      {
        id: id(),
        date: "3/3 (二)",
        type: EventType.TRANSFER,
        title: "前往仁川機場 (機場巴士 6009)",
        startLocation: "Egg Clinic (行李領取)",
        endLocation: "仁川機場 (ICN)",
        startTime: "18:15",
        endTime: "20:00",
        navLink: "https://naver.me/FpMPzF7v",
        notes: "回診所領取行李，步行至新沙站搭乘機場巴士 6009。\n目標: 20:30 前抵達機場櫃檯。",
        tags: [{ label: "20:30前抵達", type: "alert" }, { label: "巴士6009", type: "info" }],
        detailedWalkingGuide: {
          steps: [
            "回到 Egg Clinic 領取寄放的行李。",
            "步行至「新沙站 (Sinsa Stn.)」機場巴士站 (位於 6 號出口附近，中央車道或路邊請確認標示)。",
            "搭乘機場巴士【6009】往仁川機場 (費用約 17,000 KRW，可刷 T-Money)。",
            "車程約 70-80 分鐘。請在第一航廈 (T1) 下車 (酷航 Scoot)。"
          ]
        }
      },
      {
        id: id(),
        date: "3/3 (二)",
        type: EventType.FLIGHT,
        title: "飛機 (酷航)",
        startLocation: "仁川機場 (ICN)",
        endLocation: "桃園機場 (TPE)",
        startTime: "23:00",
        endTime: "00:45",
        code: "TR897",
        notes: "座位: 4D, 4E。結束旅程",
        tags: [{ label: "座位 4D/4E", type: "info" }],
        attachments: [IMAGES.flight_icn_tpe]
      }
    ]
  }
];

export const FLIGHT_INFO = [
  { no: 'TR874', route: 'TPE -> NRT', time: '2/24 14:00' },
  { no: 'YP732', route: 'NRT -> ICN', time: '3/1 12:30' },
  { no: 'TR897', route: 'ICN -> TPE', time: '3/3 23:00' }
];

export const ACCOMMODATION = [
  { name: '高崎可可大飯店', address: '高崎站「東口」2樓天橋直達', dates: '2/24 - 2/26' },
  { name: 'OMO5 東京大塚', address: 'JR大塚站「北口」', dates: '2/26 - 3/1' },
  { name: 'Wecostay 南山住宿', address: '서울 중구 충무로 3 111호', dates: '3/1 - 3/3' }
];
