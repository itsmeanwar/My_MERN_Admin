# MERN Admin Dashboard

A full-stack Admin Dashboard application built using the MERN stack (MongoDB, Express.js, React.js, Node.js).  
This project demonstrates secure authentication, role-based authorization, and complete CRUD functionality with a scalable folder architecture.

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Fetch API
- React Toastify
- Bootstrap / Custom CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token) Authentication
- Bcrypt Password Hashing
- Environment Variables (.env)

---

## ✨ Features

- User Registration & Login System
- Secure JWT-based Authentication
- Role-Based Access Control (Admin / User)
- Protected API Routes (Middleware-based)
- Protected Frontend Routes
- Full CRUD Operations
- Form Validation
- Loading & Error State Handling
- Toast Notifications for Alerts
- Organized & Scalable Folder Structure

---

## ⚙️ Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/itsmeanwar/mern-admin-dashboard.git
   ```

2. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

4. Create a `.env` file inside the `server` folder and add:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```

5. Run the application:
   ```bash
   npm run dev
   ```

---

## 📁 Folder Structure

- `client/` → React Frontend Application  
- `server/` → Express Server, API Routes, Middleware & Database Configuration  

---

## 👨‍💻 Author

Shaik Anwar Basha  
React & MERN Stack Developer
