# 🛠️ Shared Wishlist App – Backend (Express + MongoDB + Firebase Auth)

This is the backend API for the **Shared Wishlist App** – a collaborative platform where users can create, share, and manage wishlists. It uses **Node.js**, **Express**, **MongoDB**, and **Firebase Admin SDK** for authentication.

---

## 🔗 Base URL

https://your-backend.onrender.com

---

## 🔧 Features

- 🔐 Firebase Authentication (token-based)
- ✅ Protected REST API routes
- 📦 MongoDB storage (wishlists & products)
- 📨 Share wishlist with other users
- 🎉 Emoji reaction support on products

---

## 🧪 API Endpoints

| Method | Endpoint                                     | Description               |
| ------ | -------------------------------------------- | ------------------------- |
| GET    | `/api/wishlists`                             | Get wishlists for user    |
| POST   | `/api/wishlists`                             | Create a new wishlist     |
| GET    | `/api/wishlists/:id`                         | Get wishlist + products   |
| PUT    | `/api/wishlists/:id`                         | Edit wishlist name        |
| PUT    | `/api/wishlists/:id/share`                   | Share wishlist with email |
| DELETE | `/api/wishlists/:id`                         | Delete wishlist           |
| POST   | `/api/wishlists/:id/products`                | Add product to wishlist   |
| PUT    | `/api/wishlists/:id/products/:pid`           | Edit product              |
| DELETE | `/api/wishlists/:id/products/:pid`           | Delete product            |
| PUT    | `/api/wishlists/:id/products/:pid/reactions` | Toggle emoji reaction     |

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** with Mongoose
- **Firebase Admin SDK** (token verification)
- **CORS**, **dotenv**, **firebase-admin**

---

## 📁 Folder Structure

server/
├── models/ # Mongoose schemas
├── routes/ # Wishlist/product routes
├── index.js # Server entry point
├── .env # Environment variables
├── package.json

---

## 🔐 Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_service_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\n...\\n-----END PRIVATE KEY-----\\n"
```

NOTE: FIREBASE_PRIVATE_KEY must have \\n (escaped newlines)
🚀 Deployment
This backend is deployed on Render.com.
Configure all environment variables via the Render dashboard under "Environment".

Authentication
All requests must include a Firebase ID token in the Authorization header:

http
Copy
Edit
Authorization: Bearer <firebase_id_token>
Use Firebase Auth in the frontend to generate it.
