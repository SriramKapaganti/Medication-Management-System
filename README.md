#  Medication Management System

A full-stack web application to help **caretakers** manage medication schedules for their **patients**. Patients can view their medications and mark them as taken, while caretakers can add/delete medications and manage multiple patients.

##  Live Demo

- **Frontend**: [Vercel Deployment](https://medication-management-system-nu.vercel.app)
- **Backend**: [Render Deployment](https://medication-management-system-42gd.onrender.com)

---

##  Demo Credentials

###  Caretaker Login
Username: Rose
Password: Rose@2021
### Patient Login
Username: Cozy
Password: Cpzy@2021



> (You can also sign up as a new user)

---

##  Features

-  **Caretaker Dashboard**:
  - View and manage all patients
  - Add, delete, and update medication schedules
-  **Patient Dashboard**:
  - View assigned medications
  - Mark medication as taken
-  JWT Authentication with cookie-based session
-  Medication adherence tracking (planned)
-  Built using:
  - Frontend: **React.js**
  - Backend: **Node.js, Express**
  - Database: **SQLite**
  - Deployment: **Vercel** & **Render**

---

##  Tech Stack

| Layer       | Tech                     |
|-------------|--------------------------|
| Frontend    | React, Axios, Vite       |
| Backend     | Express, Node.js         |
| Database    | SQLite                   |
| Auth        | JWT + HTTPOnly Cookies   |
| Deployment  | Vercel (Client), Render (Server) |

---

## Getting Started

### 1. Clone the Repo
```bash
git clone https://github.com/SriramKapaganti/Medication-Management-System.git
cd Medication-Management-System

Backend Setup
cd server
npm install
node server.js

Frontend Setup
cd client
npm install
npm start


📦 Folder Structure

Medication-Management-System/
├── client/            # React Frontend
├── server/            # Node.js Backend
│   ├── db/            # SQLite DB setup
│   ├── routes/        # Auth & Medications APIs
│   └── app.js         # Express App Config
└── README.md



