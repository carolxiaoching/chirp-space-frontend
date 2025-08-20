<p align="center">
  <img src="https://raw.githubusercontent.com/carolxiaoching/chrip-space-frontend/refs/heads/develop/assets/images/logo.svg" alt="logo" width="300">
</p>

<h1 align="center">啾啾 | 社群平台</h1>

<p align="center">
  <strong>
  ⭐ 此為「啾啾」的前端前台 ⭐
  </strong>
</p>

<p align="center">
  <a href="https://chrip-space-frontend.onrender.com">
  👉 查看 Demo
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Nuxt_3-brightgreen?style=for-the-badge&logo=nuxt&logoColor=white&color=00DC82">
  <img src="https://img.shields.io/badge/tailwind_css-brightgreen?style=for-the-badge&logo=tailwindcss&logoColor=white&color=06B6D4">
  <img src="https://img.shields.io/badge/vite-brightgreen?style=for-the-badge&logo=vite&logoColor=white&color=646CFF">
</p>

## 📒 專案簡介

「啾啾」是一個輕量型社群分享平台，大家可以新增貼文、上傳圖片、發表評論互動、追蹤其他會員，並使用無限滾動瀏覽內容
整體介面以直覺、好上手為設計核心，讓使用者能輕鬆分享生活，並與他人建立連結

![cover](https://i.postimg.cc/qM9wbrr6/cover.png)

## 🧑‍💻 開發動機與心得

### 💭 為什麼會做這個網站？

我想做一個具備核心互動功能的輕量社群平台，並透過這個專案加強自己在 Nuxt 3 前端開發與後端 API 串接的能力，同時練習 Git Flow 與 PR 流程的應用

### 🙌 我的學習與成長

這是由個人獨立完成的前後端作品，從資料庫設計、API 開發、前端 UI 製作到部署皆親自實作
在開發過程中，我熟悉了：

- Nuxt 3 頁面與元件架構設計
- 使用 Pinia 進行狀態管理與 API 串接
- 無限滾動與前端資料更新（按讚、追蹤等互動反映）
- 使用 Tailwind CSS 快速實作響應式設計
- 前後端驗證與授權機制
- Git Flow 分支管理與 PR 流程

## ✨ 功能與特色

- 📝 建立、瀏覽、搜尋貼文（支援上傳圖片與無限滾動載入）
- ❤️ 貼文互動（按讚、追蹤 / 取消追蹤會員、發表評論）
- 👤 會員系統（編輯個人資料、頭像上傳、更新密碼、查看會員貼文 / 按讚 / 評論 / 粉絲 / 追蹤列表）
- 📄 表單驗證（Vee-Validate）與 🔄 加載動畫（Vue-Loading-Overlay）
- 🖼️ 圖片燈箱效果、📱 響應式設計（RWD）、🎨 Iconify 圖示整合

## 🛠️ 使用技術

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
| 部署     | [GitHub](https://github.com/)、[Render](https://render.com/)                                                         |

## 📦 安裝與執行

```bash
# 1. 複製專案
git clone https://github.com/carolxiaoching/chrip-space-frontend.git

# 2. 安裝依賴
cd chrip-space-frontend
npm install

# 3. 啟動開發伺服器
npm run dev

# 4. 編譯建構
npm run build
```

## 📸 頁面展示

### 🏠 首頁(貼文列表頁)

可透過關鍵字搜尋貼文，並支援無限滾動載入

![貼文列表頁](https://i.postimg.cc/sX69pdKX/index.png)

### 📜 貼文詳細頁

顯示貼文內容與評論，可新增評論，評論列表同樣支援無限滾動載入

![貼文詳細頁](https://i.postimg.cc/fR4MCVr4/post.png)

### ✏️ 新增貼文頁

可建立新貼文並上傳圖片

![新增貼文頁](https://i.postimg.cc/9fBBQq7y/edit.png)

### 👤 會員頁面

顯示會員個人資料，以及該會員的（皆支援無限滾動載入）：

- 所有貼文
- 按讚貼文
- 評論列表
- 追蹤列表
- 粉絲列表

若為本人頁面，可刪除自己的資料

![會員頁面](https://i.postimg.cc/6QK0Khy9/profile.png)

### 🔧 會員設定頁

可編輯個人資訊（含頭像上傳）與更新密碼

![會員設定頁面](https://i.postimg.cc/MHn05PrY/setting.png)

### 🔐 註冊 / 登入

會員註冊與登入功能

![註冊與登入頁](https://i.postimg.cc/tTzbCDqp/account.png)

## 📁 專案結構

| 專案     | 連結                                                                                                                       |
| -------- | -------------------------------------------------------------------------------------------------------------------------- |
| 前端前台 | [GitHub Repo](https://github.com/carolxiaoching/chrip-space-frontend) 🌞 [Demo](https://chrip-space-frontend.onrender.com) |
| 後端     | [GitHub Repo](https://github.com/carolxiaoching/chrip-space-backend)                                                       |

## 📷 圖片來源

- [unsplash](https://unsplash.com/)

## 📌 備註

本專案僅作為學習與展示用途，無任何商業營利行為
