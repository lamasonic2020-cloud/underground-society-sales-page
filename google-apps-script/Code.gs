/**
 * 壞男の臥底 入群檢驗：Google Sheets 收集端
 *
 * 1. 建立一份 Google Sheet，將網址中的試算表 ID 貼到下方。
 * 2. 在「擴充功能 → Apps Script」貼上此檔，部署成網頁應用程式。
 * 3. 將部署後的 /exec URL 貼回 HTML 的 GOOGLE_APPS_SCRIPT_URL。
 */
const CONFIG = {
  SPREADSHEET_ID: "請貼上你的 Google Sheet ID",
};

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || "{}");
    const spreadsheet = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
    const now = new Date().toISOString();

    if (payload.event === "lead_started") {
      append(spreadsheet, "會員名單", [
        "收集時間", "工作階段 ID", "Email", "Skool 名稱", "流量來源", "流量活動",
      ], [now, payload.id, payload.email, payload.skoolName, payload.utmSource, payload.utmCampaign]);
    } else if (payload.event === "quiz_completed") {
      const answers = payload.answers || {};
      const intentLabels = {
        content: "我想先繼續看內容，慢慢整理自己",
        record: "我願意開始記錄他真正做了什麼",
        change: "我願意嘗試改變目前的互動方式",
        prepare: "我願意開始準備斷聯與下船",
        apply: "我願意申請一對一評估",
      };
      append(spreadsheet, "檢驗結果", [
        "收集時間", "工作階段 ID", "Email", "Skool 名稱", "結果類型", "被吊著程度",
        "下不了船程度", "生活受損程度", "最高指標", "生活影響總分",
        "改變意願分數", "群內處理意願", "離開失敗程度", "完整作答 JSON",
      ], [
        now, payload.id, payload.email, payload.skoolName, payload.resultType, payload.hangingDegree,
        payload.leavingDegree, payload.lifeImpactDegree, payload.highestIndicator, payload.impactTotal,
        payload.changeReadiness, intentLabels[answers.processingReadiness] || "", payload.leavingFailure,
        JSON.stringify(answers),
      ]);
    } else if (payload.event === "application_submitted") {
      const application = payload.application || {};
      append(spreadsheet, "陪跑申請", [
        "收集時間", "工作階段 ID", "Email", "Skool 名稱", "暱稱", "LINE ID 或 Instagram 帳號",
        "目前關係狀態", "這段關係持續多久", "最想解決的問題", "過去試過哪些方法", "為什麼現在想處理", "時間與資源投入意願",
        "付款準備度", "一對一諮詢意願", "結果類型",
      ], [
        now, payload.id, payload.email, payload.skoolName, application.nickname, application.contact,
        application.relationshipStatus, application.duration, application.problem, application.attempts,
        application.whyNow, application.investment, application.paymentReadiness,
        application.consultation, payload.resultType,
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(error) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function append(spreadsheet, sheetName, headers, values) {
  let sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) sheet = spreadsheet.insertSheet(sheetName);
  if (sheet.getLastRow() === 0) sheet.appendRow(headers);
  sheet.appendRow(values);
}
