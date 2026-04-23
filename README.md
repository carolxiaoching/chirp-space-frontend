<p align="center">
  <img src="https://res.cloudinary.com/dtgnh1wcu/image/upload/v1776919293/logo_mld5fo.svg" alt="logo" width="150">
</p>

<h1 align="center">啾啾 | 社群平台</h1>

<p align="center">
  <a href="https://chirp-space-frontend.zeabur.app">查看 Demo</a>　|　<a href="https://github.com/carolxiaoching/chirp-space-backend">後端 Repo</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt_3-00DC82?style=for-the-badge&logo=nuxt&logoColor=white">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
</p>

![cover](https://res.cloudinary.com/dtgnh1wcu/image/upload/v1776556078/cover_of6kkb.png)

<p align="center">
啾啾是一個輕量社群平台，使用者可以發文、上傳圖片、留言、按讚，並追蹤其他會員，<br>
搭配無限滾動與即時互動反饋，讓使用體驗流暢自然
</p>

## 功能

- 貼文：建立、瀏覽、關鍵字搜尋、圖片上傳、刪除
- 互動：按讚 / 取消按讚、發表留言、追蹤 / 取消追蹤會員
- 會員：註冊 / 登入、編輯個人資料與頭像、修改密碼
- 個人頁面：貼文、按讚、留言、追蹤、粉絲列表（分頁切換）
- 圖片燈箱、全站無限滾動、RWD 響應式設計

## 技術亮點

- **無限滾動**：使用原生 Intersection Observer API 實作，元件卸載時自動清除監聽，無記憶體洩漏疑慮
- **樂觀更新**：按讚、追蹤操作後直接更新本地狀態，不重新呼叫 API，提升互動流暢度
- **路由守衛**：透過 Nuxt middleware 控制登入 / 訪客頁面存取，未登入觸發互動時顯示提示 Modal 而非強制跳轉
- **表單驗證**：Vee-Validate 搭配自訂密碼規則與繁體中文錯誤訊息，支援即時驗證
- **Git Flow**：依功能拆分分支開發，透過 PR 合併，commit message 使用語義化格式

## 使用技術

| 分類     | 技術                                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------------------- |
| 前端框架 | [Nuxt 3](https://nuxt.com/)                                                                                          |
| UI       | [Tailwind CSS](https://tailwindcss.com/)、[Headless UI](https://headlessui.com/)、[Iconify](https://iconify.design/) |
| 狀態管理 | [Pinia](https://pinia.vuejs.org/)                                                                                    |
| 表單驗證 | [Vee-Validate](https://vee-validate.logaretm.com/)                                                                   |
| 燈箱     | [Vue-Easy-Lightbox](https://github.com/XiongAmao/vue-easy-lightbox)                                                  |
| 時間處理 | [Dayjs](https://github.com/iamkun/dayjs)                                                                             |
| 加載動畫 | [Vue-Loading-Overlay](https://github.com/ankurk91/vue-loading-overlay)                                               |
| 格式工具 | [Prettier](https://prettier.io/)、[ESLint](https://eslint.org/)                                                      |
| 部署     | [Zeabur](https://zeabur.com/)                                                                                        |

## 快速開始

```bash
git clone https://github.com/carolxiaoching/chirp-space-frontend.git
cd chirp-space-frontend
npm install
cp .env.example .env
```

接著開啟 `.env` 填入後端 API 網址，再執行：

```bash
npm run dev
```

## 頁面截圖

| 首頁（貼文列表）                                                                                     | 貼文詳細頁                                                                                                                            |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| ![首頁](https://res.cloudinary.com/dtgnh1wcu/image/upload/v1776556071/%E9%A6%96%E9%A0%81_qdzy59.png) | ![貼文詳細頁](https://res.cloudinary.com/dtgnh1wcu/image/upload/v1776556072/%E8%B2%BC%E6%96%87%E8%A9%B3%E7%B4%B0%E9%A0%81_roreg7.png) |

| 新增貼文                                                                                                                   | 會員頁面                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ![新增貼文](https://res.cloudinary.com/dtgnh1wcu/image/upload/v1776556074/%E6%96%B0%E5%A2%9E%E8%B2%BC%E6%96%87_bapprj.png) | ![會員頁面](https://res.cloudinary.com/dtgnh1wcu/image/upload/v1776556075/%E6%9C%83%E5%93%A1%E9%A0%81%E9%9D%A2_r1lnf4.png) |

| 會員設定                                                                                                                   | 登入 / 註冊                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ![會員設定](https://res.cloudinary.com/dtgnh1wcu/image/upload/v1776556076/%E6%9C%83%E5%93%A1%E8%A8%AD%E5%AE%9A_txqq5q.png) | ![登入註冊](https://res.cloudinary.com/dtgnh1wcu/image/upload/v1776556072/%E7%99%BB%E5%85%A5%E8%A8%BB%E5%86%8A_eooxlm.png) |
