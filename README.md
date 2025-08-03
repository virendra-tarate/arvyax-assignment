# 🧘‍♀️ Wellness Sessions – Full Stack App

A secure, interactive platform for creating, managing, and publishing wellness sessions like yoga and meditation.

---

## 🚀 Tech Stack

- **Frontend**: React (JavaScript)
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Auth**: JWT-based authentication

---

## 📁 Project File Structure

wellness-sessions/  
├── 📁 public/ # React public assets  
├── 📁 src/ # React frontend code  
│ └── 📁 components/  
│ ├── 🔸 App.css # Global styles  
│ ├── 🔸 App.jsx # Main app routing  
│ ├── 🔸 Navbar.jsx # Navigation bar (auth-aware)  
│ ├── 🔸 LoginRegister.jsx # Combined Login/Register form  
│ ├── 🔸 Dashboard.jsx # Public sessions  
│ ├── 🔸 MySessions.jsx # View & edit user's sessions  
│ └── 🔸 SessionEditor.jsx # Create/Edit sessions (auto-save)  
│  
├── 📁 models/ # Mongoose schemas  
│ ├── 🔸 User.js  
│ └── 🔸 Session.js  
│  
├── 📁 controllers/ # Business logic for routes  
│ ├── 🔸 authController.js  
│ └── 🔸 sessionController.js  
│  
├── 📁 routes/ # Express route definitions  
│ ├── 🔸 authRoutes.js  
│ └── 🔸 sessionRoutes.js  
│  
├── 📁 middleware/ # JWT authentication middleware  
│ └── 🔸 authMiddleware.js  
│  
├── 🔸 server.js # Main Express server entry point  
├── 🔸 .env # Environment variables (NOT pushed)  
├── 🔸 .env.example # Example env file (safe to share)  
├── 🔸 package.json # Project config & scripts  
└── 🔸 README.md # You're reading it :)  

## 🧑‍💻 Setup Instructions

1. **Clone the repo**
```bash
git clone https://github.com/your-username/arvyax-assignment.git
cd wellness-sessions
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```bash
cp .env.example .env
```

4. **Start the backend**
```bash
node server.js
```

5. **Start the frontend (React dev server)**
```bash
npm start
```
---

## 🔐 Required Environment Variables
```env
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret_key
```
---

## Features:
  - JWT-based authentication
  - Save & publish custom sessions
  - Auto-save draft after 3s inactivity
  - Protected routes (frontend)
  - Live feedback messages (success/error)
  - Fully styled responsive UI
  - Secure password hashing
  - MongoDB schema validation

---

## Contact:
  - maintainer: Virendra Tarate
  - github: https://github.com/virendra-tarate
  - contribute: Feel free to fork or raise issues!
