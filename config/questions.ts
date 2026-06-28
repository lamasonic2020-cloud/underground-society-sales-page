import type { Question } from "@/types/quiz";

// 題目、選項與調整用權重集中在這裡；scoring.ts 只負責判讀規則。
const single = (id: string, label: string, weights = {}) => ({ id, label, weights });

export const questions: Question[] = [
  { id: "relationship", section: "背景", title: "妳和他的關係比較接近哪一種？", kind: "single", options: [
    single("married", "他已婚", { reality: 4 }), single("partner", "他有女友或固定伴侶", { reality: 4 }), single("situationship", "曖昧很久，但一直沒有名分", { reality: 3 }), single("sex", "有性關係，但沒有正式交往", { reality: 3 }), single("ex", "曾經交往，現在反覆糾纏", { reality: 3, leaving: 2 }), single("soon", "他說自己快離婚或快分手", { reality: 4, leaving: 2 }), single("unclear", "我也說不清楚我們到底算什麼", { reality: 3 }) ] },
  { id: "duration", section: "背景", title: "這段關係持續多久？", kind: "single", options: [
    single("under3", "3 個月內"), single("3to6", "3 到 6 個月", { leaving: 1 }), single("6to12", "6 個月到 1 年", { leaving: 2 }), single("1to2", "1 到 2 年", { leaving: 3, reality: 1 }), single("over2", "2 年以上", { leaving: 4, reality: 2 }) ] },
  { id: "appearance", section: "背景", title: "他通常什麼時候會出現？", kind: "single", options: [
    single("whenWant", "他想見面時", { reality: 2 }), single("night", "晚上或半夜", { reality: 3 }), single("low", "他情緒低落時", { reality: 2 }), single("fight", "他和伴侶吵架時", { reality: 4 }), single("need", "他需要陪伴或性關係時", { reality: 3 }), single("disappear", "時間不固定，常常突然消失", { reality: 4, leaving: 2 }), single("stable", "平常也會穩定聯絡") ] },
  { id: "public", section: "背景", title: "他是否願意公開妳的存在？", kind: "single", options: [
    single("yes", "願意，也有讓重要的人知道"), single("delay", "嘴巴說願意，但一直拖", { reality: 3 }), single("timing", "他說現在時機不對", { reality: 3 }), single("no", "他不願意公開", { reality: 4 }), single("secret", "他要求我保密", { reality: 4 }), single("afraid", "我不敢問", { reality: 4, leaving: 1 }) ] },
  { id: "promises", section: "背景", title: "他給過妳哪些承諾？", description: "可複選", kind: "multiple", options: [
    single("divorce", "說會離婚", { reality: 2, leaving: 1 }), single("breakup", "說會和現任分手", { reality: 2, leaving: 1 }), single("title", "說以後會給我名分", { reality: 2 }), single("timing", "說目前只是時間不對", { reality: 2 }), single("love", "說他最愛的人是我", { reality: 1 }), single("conditions", "說等工作、家庭、身份或經濟問題處理完", { reality: 2 }), single("none", "沒有明確承諾"), single("many", "承諾很多，但沒有實際進度", { reality: 4, leaving: 2 }) ] },
  { id: "need", section: "位置", title: "當妳需要他時，他通常怎麼做？", kind: "single", options: [
    single("support", "會陪我，也會處理問題"), single("spare", "看情況，有空才出現", { reality: 2 }), single("words", "只會說幾句好聽話", { reality: 3 }), single("gone", "常常消失", { reality: 4, leaving: 2 }), single("blame", "反過來怪我要求太多", { reality: 4, leaving: 1 }), single("onlyneed", "只有他需要我時才會出現", { reality: 4, leaving: 2 }) ] },
  { id: "realLife", section: "位置", title: "妳是否能參與他的真實生活？", kind: "single", options: [
    single("all", "可以見朋友和家人"), single("some", "只見過少數朋友", { reality: 1 }), single("private", "只能私下見面", { reality: 3 }), single("photo", "不能留下合照", { reality: 3 }), single("comment", "不能公開留言或互動", { reality: 3 }), single("contact", "不能在特定時間聯絡他", { reality: 4 }), single("unknown", "我幾乎不知道他的真實生活", { reality: 4 }) ] },
  { id: "future", section: "位置", title: "當妳問關係未來時，他最常怎麼回？", kind: "single", options: [
    single("action", "給出明確時間與行動"), single("wait", "說再等等", { reality: 3 }), single("notnow", "說現在不適合談", { reality: 3 }), single("trust", "說我不信任他", { reality: 4 }), single("complex", "說我把事情弄複雜", { reality: 4 }), single("topic", "轉移話題", { reality: 3 }), single("cold", "消失或冷處理", { reality: 4, leaving: 2 }), single("angry", "生氣，讓我不敢再問", { reality: 4, leaving: 2 }) ] },
  { id: "positionFeelings", section: "位置", title: "妳是否常常有這些感覺？", description: "可複選", kind: "multiple", options: [
    single("girlfriend", "我像女友，但沒有女友的權利", { reality: 2, leaving: 1 }), single("schedule", "我只能配合他的時間", { reality: 2 }), single("jealous", "我不能吃醋", { reality: 2 }), single("ask", "我不能要求", { reality: 2 }), single("public", "我不能公開", { reality: 3 }), single("questions", "我不能問太多", { reality: 3 }), single("good", "我需要一直證明自己懂事", { reality: 3, leaving: 1 }), single("emotion", "我怕一有情緒，他就消失", { reality: 4, leaving: 2 }) ] },
  { id: "leaveAttempt", section: "離不開", title: "妳曾經想過離開嗎？", kind: "single", options: [
    single("no", "沒有，我目前還想繼續"), single("thought", "有想過，但沒有真的做", { leaving: 2 }), single("once", "試過一次", { leaving: 3, readiness: 1 }), single("many", "試過很多次", { leaving: 5, readiness: 2 }), single("return", "已經斷過，但每次又回去", { leaving: 6, readiness: 3, paidFit: 2 }), single("prepare", "我正在準備離開", { leaving: 2, readiness: 3 }) ] },
  { id: "returnReason", section: "離不開", title: "通常是什麼讓妳回頭？", description: "可複選", kind: "multiple", options: [
    single("kind", "他突然示好", { leaving: 2 }), single("pity", "他說自己很可憐", { leaving: 2 }), single("understand", "他說只有我懂他", { leaving: 2 }), single("soon", "他說很快就會處理好", { leaving: 2 }), single("love", "我怕再也遇不到更愛的人", { leaving: 2 }), single("sunk", "我不甘心花了這麼多時間", { leaving: 3 }), single("answer", "我想得到一個答案", { leaving: 2 }), single("miss", "我忍不住想他", { leaving: 2 }), single("abandon", "我害怕他真的離開", { leaving: 3 }), single("chosen", "我想證明自己才是他最愛的人", { leaving: 3 }) ] },
  { id: "cannotLose", section: "離不開", title: "妳最捨不得的是什麼？", kind: "single", options: [
    single("person", "他這個人", { leaving: 1 }), single("good", "他曾經對我的好", { leaving: 2 }), single("time", "我投入的時間", { leaving: 3 }), single("sex", "我們之間的性關係", { leaving: 2 }), single("special", "他給我的特殊感", { leaving: 2 }), single("fooled", "我不想承認自己被騙", { leaving: 3 }), single("empty", "我怕下船後很空", { leaving: 3 }), single("promise", "我還在等他兌現承諾", { leaving: 3 }) ] },
  { id: "fear", section: "離不開", title: "如果他今天完全不再找妳，妳最害怕什麼？", kind: "single", options: [
    single("unbearable", "我會受不了", { leaving: 4 }), single("why", "我會一直想知道原因", { leaving: 3 }), single("worthy", "我怕自己不值得被愛", { leaving: 4 }), single("happy", "我怕他回去過幸福生活", { leaving: 3 }), single("waste", "我怕這幾年的付出全部白費", { leaving: 3 }), single("feeling", "我怕再也遇不到這種感覺", { leaving: 3 }), single("relief", "我其實會鬆一口氣", { readiness: 2 }), single("unknown", "我不知道", { leaving: 1 }) ] },
  ...["我會反覆查看他的訊息或社群", "他沒有回覆時，我很難專心", "我的睡眠受到影響", "我的工作或生活效率變差", "我的情緒會被他的態度控制", "我會因為他冷淡而懷疑自己", "我為這段關係花了超出負擔的錢", "我逐漸疏遠朋友或家人", "我明知道有問題，卻沒有辦法停下來", "我曾經因為這段關係失控、崩潰或做出傷害自己的行為"].map((title, index) => ({ id: `impact${index + 1}`, section: "影響" as const, title, description: "請選擇最接近妳最近一個月的狀態", kind: "scale" as const, scaleLabels: ["完全沒有", "偶爾", "有時候", "經常", "幾乎每天"], critical: index === 9 })),
  { id: "acceptSixMonths", section: "意願", title: "如果半年後，他還是沒有離婚、沒有分手、沒有給妳名分，妳可以接受嗎？", kind: "single", options: [
    single("wait", "可以，我還想等"), single("unsure", "不確定", { readiness: 1 }), single("hard", "很難接受", { readiness: 3 }), single("no", "完全不能接受", { readiness: 4, paidFit: 1 }) ] },
  { id: "wanted", section: "意願", title: "妳現在最想得到什麼？", kind: "single", options: [
    single("love", "確認他到底愛不愛我"), single("lie", "確認他是不是在騙我", { readiness: 1 }), single("decision", "知道他什麼時候會做決定"), single("worth", "看清楚這段關係還值不值得等", { readiness: 2 }), single("leave", "找到真正離開的方法", { readiness: 4, paidFit: 2 }), single("company", "有人陪我下船", { readiness: 4, paidFit: 3 }), single("pattern", "不想再遇到同類型的男人", { readiness: 3, paidFit: 2 }) ] },
  { id: "commitment", section: "意願", title: "如果有人陪妳處理這段關係，妳願意做到什麼程度？", kind: "single", options: [
    single("look", "我只想先看看"), single("advice", "我願意聽建議", { readiness: 1 }), single("change", "我願意改變目前的互動方式", { readiness: 3 }), single("stop", "我願意停止聯絡", { readiness: 4, paidFit: 2 }), single("plan", "我願意照計畫執行", { readiness: 5, paidFit: 3 }), single("end", "我已經準備好結束這個循環", { readiness: 5, paidFit: 3 }) ] },
  { id: "processingReadiness", section: "意願", title: "在群內，妳願意先做到哪一步？", kind: "single", options: [
    single("content", "我想先繼續看內容，慢慢整理自己"), single("record", "我願意開始記錄他真正做了什麼", { readiness: 1 }), single("change", "我願意嘗試改變目前的互動方式", { readiness: 3 }), single("prepare", "我願意開始準備斷聯與下船", { readiness: 4 }), single("apply", "我願意申請一對一評估", { readiness: 5, paidFit: 3 }) ] }
];

export const questionSections = ["背景", "位置", "離不開", "影響", "意願"] as const;
