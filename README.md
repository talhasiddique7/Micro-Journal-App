# 📝 Micro Journal – 5-Minute Daily Reflections

A minimalist journaling app that allows users to log **one short journal entry per day** (max 300 characters), encouraging daily mindfulness and reflection.

## 🌟 Key Concept

> “What did I learn today?” or “What went well today?”

Unlike traditional journaling apps, this enforces a **constraint of one concise entry per day**, making reflection easy, quick, and consistent.

---

## 📂 Tech Stack

**Frontend:** React + Material UI  
**Backend:** Node.js + Express.js + MongoDB  
**Authentication:** JWT (JSON Web Tokens)

---

## 🔧 Features

### ✨ Frontend (React)
- Responsive design with Material UI
- User authentication (login/register)
- Add a single daily entry (max 300 chars)
- View all entries in a simple, clean list
- Filter entries by **month** or **year**
- Protected routes (can’t access Journal without login)

### 🔐 Backend (Node.js + Express)
- REST API for:
  - User registration & login
  - Creating journal entries
  - Fetching entries with optional filters
- JWT auth middleware
- Enforces **1 entry per user per day**

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/talhasiddique7/Micro-Journal-App.git
cd micro-journal
````

---

### 2. Setup Backend

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Then start the server:

```bash
nodemon server.js
```

---

### 3. Setup Frontend

```bash
cd client
npm install
npm run dev
```

---

## 📦 API Endpoints

| Method | Endpoint                         | Description             |
| ------ | -------------------------------- | ----------------------- |
| POST   | `/api/register`                  | Register new user       |
| POST   | `/api/login`                     | Login user & return JWT |
| POST   | `/api/entries`                   | Create today's entry    |
| GET    | `/api/entries`                   | Get all user entries    |
| GET    | `/api/entries?month=6&year=2025` | Filter entries          |

---

## 🔐 Auth Notes

* JWT token is stored in `localStorage`
* Protected frontend routes via `ProtectedRoute.jsx`
* Backend validates token using middleware

---


## 👨‍💻 Author

**Talha Siddique**
---

