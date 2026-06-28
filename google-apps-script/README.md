# Google Sheets 名單收集設定

此資料夾的 `Code.gs` 可將單檔 HTML 的名單、檢驗結果與陪跑申請寫入同一份 Google Sheet。

## 設定步驟

1. 用你的 Google 帳號建立一份新的 Google Sheet。
2. 從網址複製試算表 ID；它位於 `/d/` 與下一個 `/` 之間。
3. 在試算表中選擇「擴充功能 → Apps Script」，以 `Code.gs` 內容取代預設程式。
4. 在 `CONFIG.SPREADSHEET_ID` 貼上剛複製的 ID，並儲存。
5. 按「部署 → 新增部署 → 網頁應用程式」：
   - 執行身分：我
   - 存取權：任何人
6. 第一次部署時，依 Google 畫面授權腳本存取你的試算表。複製部署完成的 Web App `/exec` 網址。
7. 開啟 `壞男の臥底-入群檢驗.html`，找到 `GOOGLE_APPS_SCRIPT_URL=''`，將網址貼進兩個單引號中。

部署後會自動建立三個中文工作表：

- `會員名單`：群內會員填寫的 Email、Skool 名稱、UTM。
- `檢驗結果`：完成後的 A/B/C/D、三個指標與「在群內願意先做到哪一步」。
- `陪跑申請`：C/D 型進一步送出的陪跑申請。

使用者不需要登入 Google；資料會以你的 Apps Script 身分寫入你的試算表。
