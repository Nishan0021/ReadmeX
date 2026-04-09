# 📄 README Generator

> An AI-powered GitHub README generator with live preview, theme selection, badge generation, and OpenAI integration.

![Preview](https://img.shields.io/badge/Status-Live-brightgreen?style=flat-square)
![HTML](https://img.shields.io/badge/HTML-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=flat-square&logo=openai&logoColor=white)

---

## ✨ Features

- 🎨 4 themes: Professional, Minimal, Fancy, Hacker
- 🏷️ Auto skill badge generation (shields.io)
- 📊 GitHub stats / streak / trophies auto-insert
- 👁️ Live Markdown preview
- 📋 Copy to clipboard
- ⬇️ Download as `.md` file
- 🤖 AI generation via OpenAI (optional backend)

---

## 📁 Project Structure

```
readme-generator/
│
├── index.html          ← Main app UI
├── style.css           ← All styles
├── script.js           ← All frontend logic
├── .gitignore
│
├── templates/
│   ├── professional.md ← Professional template
│   └── fancy.md        ← Fancy template
│
└── backend/            ← Optional Node.js + Express + OpenAI
    ├── server.js
    ├── package.json
    └── .env.example
```

---

## 🚀 Quick Start (Frontend Only)

No install needed! Just open in browser:

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/readme-generator.git
cd readme-generator

# Open in browser
open index.html
# or just double-click index.html
```

Works without the backend — uses local templates as fallback.

---

## 🤖 AI Backend Setup (Optional)

```bash
# Go into backend folder
cd backend

# Install dependencies
npm install

# Copy env file and add your OpenAI key
cp .env.example .env
# Edit .env → add your OPENAI_API_KEY

# Start the server
npm run dev
```

Server runs at `http://localhost:3001`

Get your OpenAI API key at: https://platform.openai.com/api-keys

---

## 🌐 Deploy

**Frontend** → Drag `index.html`, `style.css`, `script.js` into [Netlify Drop](https://app.netlify.com/drop)

**Backend** → Deploy to [Railway](https://railway.app) or [Render](https://render.com)

---

## 📝 License

MIT © 2024
