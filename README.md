# HackoBlast 🚀  
**An AI‑Powered Campus Super App**

HackoBlast unifies academic life, communication, and productivity into one intelligent dashboard.  
It reduces information overload by summarizing emails, organizing timetables, and generating smart study plans using AI.

---

## 🔥 Problem Statement
College students rely on multiple fragmented tools such as emails, portals, timetables, and messaging apps.  
This fragmentation causes:
- Missed important academic updates  
- Information overload  
- Poor time management and planning  

---

## 💡 Solution
HackoBlast acts as a **single nervous system for campus life** by:
- Summarizing academic emails using AI  
- Providing a centralized academic dashboard  
- Managing timetables and notifications  
- Generating AI‑assisted study plans  

---

## 🧠 Key Features (MVP)
- **AI Mail Summarization**  
- **Daily Pulse Dashboard**  
- **Academic Cockpit (Timetable)**  
- **Smart Study Planner (AI)**  
- **Secure Authentication (MVP)**  
- **Real‑time Notifications (UI‑level MVP)**  

---

## 🏗️ System Architecture

Frontend (React + TypeScript)
↓
Backend (Node.js + Express)
↓
AI Service Layer (LLM)
↓
MongoDB Atlas (Database)


### Design Principles
- Modular & scalable architecture  
- AI isolated from core logic  
- Backend as single source of truth  
- Human‑in‑the‑loop AI usage  

---

## 🧑‍💻 Tech Stack

### Frontend
- React + TypeScript  
- Vite  
- Tailwind CSS  
- Axios  

### Backend
- Node.js  
- Express  
- TypeScript  
- MongoDB + Mongoose  

### AI Layer
- LLM‑based summarization  
- Prompt‑engineered structured outputs  

---

## 📂 Project Structure

HackoBlast/
│
├── frontend/
│ ├── pages/
│ ├── components/
│ ├── services/
│ └── styles/
│
├── backend/
│ ├── routes/
│ ├── controllers/
│ ├── services/
│ ├── models/
│ └── config/
│
├── ai/
│ ├── mailSummarizer.ts
│ ├── studyPlanner.ts
│ └── prompts.ts
│
├── shared/
│ └── types.ts
│
├── docs/
│ ├── architecture.md
│ ├── ai-design.md
│ └── pitch-notes.md
│
├── .github/
│ └── CODEOWNERS
│
└── README.md


---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+  
- MongoDB Atlas account  

### Backend
```bash
cd backend
npm install
npm run dev
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```


