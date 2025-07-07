# 🎯 Quiz Builder – Full-Stack JS Assessment

Quiz Builder is a full-stack web app that allows users to create custom quizzes, list them on a dashboard, and view each quiz in detail.

## 📁 Project Structure

```
quiz-builder/
├── backend/         # Express.js + Prisma + SQLite
│   ├── src/
│   └── prisma/
├── frontend/        # React + Vite + SCSS Modules
│   ├── pages/
│   ├── styles/
│   └── components/
└── README.md
```

## 🧪 Technologies Used

**Backend**:
- Express.js
- TypeScript
- Prisma ORM
- SQLite
- RESTful API

**Frontend**:
- React (Vite)
- React Router DOM
- SCSS Modules
- Axios

## 🚀 Getting Started

### 🔧 1. Clone the Repository

```bash
git clone https://github.com/your-username/quiz-builder.git
cd quiz-builder
```

### ⚙️ 2. Backend Setup

#### 📦 Install dependencies:

```bash
cd backend
npm install
```

#### 📄 Create a `.env` file:

```
DATABASE_URL="file:./dev.db"
```

> ⚠️ Do not commit `.env` files to version control.

#### 🔌 Prisma Setup:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

#### ▶️ Run the backend server:

```bash
npm run dev
```

> Backend runs on: `http://localhost:5000`

---

### 🎨 3. Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

> Frontend runs on: [http://localhost:5173](http://localhost:5173)

---

## 📄 Main Pages

| Route            | Description             |
|------------------|--------------------------|
| `/create`        | Create a new quiz        |
| `/quizzes`       | List all quizzes         |
| `/quizzes/:id`   | View quiz details        |

---

## 🔗 API Endpoints

| Method   | Route             | Description                    |
|----------|------------------|--------------------------------|
| `POST`   | `/quizzes`        | Create a new quiz              |
| `GET`    | `/quizzes`        | Get list of quizzes            |
| `GET`    | `/quizzes/:id`    | Get a specific quiz            |
| `DELETE` | `/quizzes/:id`    | Delete a quiz                  |

---

## 🧹 Features

- [x] Fully responsive UI (mobile-first)
- [x] Modular code structure
- [x] Complete quiz CRUD operations
- [x] Axios-based API integration
- [x] SQLite database with Prisma ORM

---

## ✨ Author

Created by **Your Name**  
📧 aliyevzakir814@gmail.com(mailto:aliyevzakir814@gmail.com)  
💼 [linkedin.com/in/zakiraliyev](https://www.linkedin.com/in/zakiraliyev)