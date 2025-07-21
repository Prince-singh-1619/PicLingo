# 📸 PicLingo

PicLingo is a full-stack web app that converts images into inspirational quote-based content using AI. Users can sign up, upload an image, and receive a quote generated from the image content. Built with a React frontend and Express.js + MongoDB backend.

---

## 📌 Features

- 🧠 AI-generated quotes from images  
- 📸 Image upload and preview  
- 🔐 User authentication (Login/Signup)  
- 🌐 Deployed frontend (Vercel) + backend (Render)  
- 🔄 JSON-based communication (no cookies)  
- 🧱 Clean and scalable backend structure

---

## 🧩 Tech Stack

- **Frontend**: React, Tailwind CSS, Vercel
- **Backend**: Node.js, Express.js, MongoDB, Render
- **Other**: CORS, dotenv, mongoose

---

## 📷 Screenshots

<p align="center">
  <img src="./client/src/assets/Home.png" alt="Home" width="44%" />
  <img src="./client/src/assets/upload.png" alt="upload" width="44%" />
</p>
<p align="center">
  <img src="./client/src/assets/signup.png" alt="signup" width="44%" />
  <img src="./client/src/assets/results.png" alt="results" width="44%" />
</p>
<p align="center">
  <img src="./client/src/assets/liked captions.png" alt="liked captions" width="44%" />
  <img src="./client/src/assets/contact.png" alt="Contact" width="44%" />
</p>
<p align="center">
  <img src="./client/src/assets/user page.png" alt="user page" width="64%" />
</p>

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js & npm
- MongoDB Atlas URI or local MongoDB
- Git

---

### 🛠️ Backend Setup

1. Clone the repo:
  ```bash
    git clone https://github.com/Prince-singh-1619/PicLingo.git
    cd PicLingo/backend
  ```

2. Create a .env file:
  ```bash
    FRONTEND_URL=https://pic-lingo.vercel.app
    MONGODB_URI=<your_mongodb_connection_string>
    TOKEN_SECRET_KEY="PUT-ANYTHING"
    ADMIN_EMAIL='your@gmail.com'
    ADMIN_EMAIL_PASSWORD='generate from your profile'
  ```

3. Install dependencies:
  ```bash
    npm install
    nodemon start
  ```

--- 

### 💻 Frontend Setup
4. Go to frontend folder:
  ```bash
      cd ../frontend
      npm install
      npm run dev
  ```

--- 

### ⚙️ Deployment

5. 🌐 Backend on Render   
      Connect your GitHub repo to Render   

      Set:   
      - Build Command: npm install    
      - Start Command: npm start   
      - Environment Variables:   
        ```bash  
          FRONTEND_URL=https://pic-lingo.vercel.app
          MONGODB_URI=<your_mongo_uri>
        ```

6. 📲 Frontend on Vercel   
  - Push frontend to GitHub
  - Import to Vercel

---

7. 📁 Backend Structure
  ```bash
    /backend
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── auth.js
    ├── models/
    │   └── User.js
    ├── routes/
    │   └── index.js
    ├── index.js
    ├── package.json
    └── .env
  ```

---

8. ✨ Future Improvements
  - Image-to-text using OpenAI Vision
  - Real-time chat or community feed
  - Bookmarking quotes
  - User profile system

9. 👨‍💻 Author & Contributors   

    🛠 Developed by
      - Prince Singh
      - GitHub: https://github.com/Prince-singh-1619
      - Email: princesinghps1619@gmail.com

    🎨 Designed by
      - Tabish Javed
      - GitHub: https://github.com/tabish-27
      - Email: tabishjaved2030@gmail.com

    🤖 Machine Learning by
      - Pratham Harsh
      - GitHub: https://github.com/pratham18nov
      - Email: pratham18nov@gmail.com