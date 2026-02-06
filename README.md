# HackoBlast 🚀
**An AI‑Powered Campus Super App**

HackoBlast unifies academic life, communication, and productivity into **one intelligent dashboard**.  
It reduces information overload by summarizing emails, organizing timetables, and generating smart study plans using AI.

---

## 🔥 Problem Statement
College students rely on multiple fragmented tools:
- Emails for academic notices
- Portals for timetables
- Apps for productivity
- Messaging groups for alerts

This fragmentation causes:
- Missed deadlines
- Information overload
- Poor academic planning

---

## 💡 Solution
HackoBlast acts as a **single nervous system for campus life** by:
- Summarizing academic emails using AI
- Providing a real‑time academic dashboard
- Centralizing timetables and notifications
- Generating AI‑assisted study plans

---

## 🧠 Key Features
- **AI Mail Summarization**
- **Daily Pulse Dashboard**
- **Academic Cockpit**
- **Smart Study Planner**
- **Secure Authentication (MVP)**
- **Real‑time Notifications (UI‑level)**

---

## 🏗️ System Architecture
Frontend (React + TS)
↓
Backend (Node + Express)
↓
AI Service Layer (LLM)
↓
MongoDB (Atlas)

### Design Principles
- Modular & scalable
- AI isolated from core logic
- Human‑in‑the‑loop AI usage
- Backend as single source of truth

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
├── frontend/
├── backend/
├── ai/
├── shared/
├── docs/
├── .github/
└── README.md


---


---

## ⚙️ Setup & Installation

### Prerequisites
- Node.js v18+
- MongoDB Atlas account

---

### Backend Setup
```bash
cd backend
npm install
npm run dev
