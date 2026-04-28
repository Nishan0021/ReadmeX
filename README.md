# GitHub Profile README Generator 

This is a simple full-stack web application that helps developers create a clean and professional **GitHub README.md** without spending hours writing and formatting it manually.

I built this project to make it easier for students and developers to showcase their work properly on GitHub.

🌐 Live Demo: https://readmex.netlify.app/  
📂 GitHub Repo: https://github.com/Nishan0021/ReadmeX 

---

## What this project does

Instead of writing a README from scratch, you just fill in your details like project name, description, skills, and links. The app then generates a structured and ready-to-use README file for you.

---

## Features

- Easy-to-use interface  
- Multiple templates (Professional & Fancy)  
- Dark and Light mode  
- Predefined skills and social links  
- Backend-based README generation  
- Clean markdown output ready for GitHub  

---

## Tech Stack

Frontend:
- HTML
- CSS
- JavaScript

Backend:
- Node.js
- Express.js

---

## Project Structure

```
readme-generator/
├── index.html
├── style.css
├── script.js
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env.example
├── templates/
│   ├── fancy.md
│   └── professional.md
└── data/
    ├── skills.js
    └── social.js
```

## How to run this project locally

1. Clone the repository

git clone https://github.com/Nishan0021/ReadmeX
cd readme-generator

2. Install backend dependencies

cd backend  
npm install  

3. Start the server

node server.js  

4. Open the frontend

Just open index.html in your browser

---

## How it works

- You enter your project details in the UI  
- The frontend sends data to the backend  
- The backend processes a template  
- A complete README.md is generated  
- You can copy and use it directly in your GitHub repo  

---

## Future improvements

- Add GitHub API integration (auto fetch profile info)  
- Add download README button  
- Convert frontend into React  
- Add authentication system  
- Deploy backend for full online usage  

---

## Author

Nishan  

---

## License

MIT License
