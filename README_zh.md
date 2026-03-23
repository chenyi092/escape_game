[繁體中文](./README_zh.md) | [日本語](./README.md)
# 密室逃脫：距離上課15分鐘、快趕上上課！
### [實作及攻略影片](https://www.youtube.com/watch?v=p_RvpuNT_Wg)
## 概要 | Project Overview
這是一款網頁版的密室逃脫遊戲。<br>
故事講述睡過頭的主角，需在 15 分鐘內從被困的房間中逃脫，趕上學校的課程。<br>
玩家將透過探索房間、運用道具來解開謎題，提供一個充滿互動性的體驗。<br>
- **多種結局**： 根據玩家的行動，共有 3 種不同的結局。
- **附儲存功能**： 透過資料庫的應用，玩家只需輸入姓名即可從進度中斷處繼續遊戲。
## 使用技術 | Tech Stack
在本專案中，我完成了從前端到後端的完整一貫化設計。<br>
- **Frontend**: JavaScript (互動整體), HTML, CSS
- **Backend**: Ruby
- **Database**: 使用 JSON 格式進行資料傳遞，並透過資料庫進行狀態儲存
- **Deployment**: 學校 CGI 伺服器
## 系統架構 | System Architecture
#### 1. database・session管理
  設計上重視資料的一致性與使用者體驗。
  - 根據不同玩家將遊戲進度儲存至資料庫
  - 導入 Session 技術進行優化，實現在重新開始遊戲時，無需手動輸入玩家姓名即可自動恢復進度的功能
#### 2. 互動設計
  - **道具**： 使用 JavaScript 實作了道具選擇、放大顯示，以及針對特定物件（如：電話）的使用邏輯。
  - **flag管理**： 針對解開謎題後的物件狀態變化（例如：電話提示的文字更動），進行了動態的邏輯控制。
## 檔案構成 | File Structure
![file connection](/docs/08-fileconnect-zh.jpg)
## 實作亮點 | Key Features & Challenges
- **UX的優化**： 在使用者設計上特別下了功夫，以確保用戶能直覺地進行遊戲。例如：在無存檔資料時顯示警告提示，以及為 UI 按鈕加入動畫效果等。
- **後端初挑戰**： 這是我首次學習後端技術（Ruby），並實作了與前端的資料串接（JSON），藉此掌握了全端開發的基礎能力。
## 實作畫面 | Demo
<p align="center">
  <img src="/docs/02-homepage.png" width="35%" />
  <img src="/docs/03-narration.png" width="35%" />
</p>
<p align="center">
  <img src="/docs/04-game-scene.png" width="35%" />
  <img src="/docs/05-password-input.png" width="35%" />
</p>
<p align="center">
  <img src="/docs/06-item-box.png" width="35%" />
  <img src="/docs/07-menu.png" width="35%" />
</p>

### 備註
※ 目前受限於大學伺服器的規範，無法從校外網路直接存取。
