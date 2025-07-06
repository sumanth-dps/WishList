## 🔗 Live URL

[https://wish-list-frontend.vercel.app](https://wish-list-frontend.vercel.app) ![Screenshot 2025-07-06 220326](https://github.com/user-attachments/assets/58185bfe-2d9e-43f6-af44-b32ac2faca20)
![Screenshot 2025-07-06 220301](https://github.com/user-attachments/assets/32620405-9b7b-421b-8b0a-38452810eead)
![Screenshot 2025-07-06 220221](https://github.com/user-attachments/assets/86dc2b12-1ab7-4d39-a95f-b93d925bc84a)
![Screenshot 2025-07-06 220209](https://github.com/user-attachments/assets/b9661144-2783-470a-8170-bed98ae6ab6a)
![Screenshot 2025-07-06 220157](https://github.com/user-attachments/assets/03f8ddb9-37a7-4ec0-892c-d50937269000)
![Screenshot 2025-07-06 220140](https://github.com/user-attachments/assets/0245a3f2-2649-4945-a5cf-034b37b8d951)
![Screenshot 2025-07-06 215541](https://github.com/user-attachments/assets/2539b9fd-208d-4647-a35f-20246055fdf3)


# 🎁 Shared Wishlist App – Frontend

This is the frontend for the **Shared Wishlist App**, built with **React**, **Vite**, **Tailwind CSS**, and **Firebase Authentication**.

Users can:
- 🔐 Log in via Google
- 🎁 Create, edit, delete wishlists
- 🛍️ Add, edit, delete products
- 👥 Share wishlists with others
- 🎉 React to products with emojis


_(replace this with your deployed Vercel link)_

---

## 🚀 Tech Stack

- **React + Vite**
- **Tailwind CSS**
- **Firebase Authentication**
- **Axios** for REST API calls

---

## 🛠️ Setup Instructions

### 1. Clone the repo

git clone https://github.com/sumanthdps/wishlist.git
cd client
---
## Install dependencies
npm install
---
## Create .env file

VITE_API_URL=https://your-backend.onrender.com
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id

---
## Start the app

npm run dev
---
## 👨‍💻 Author
Sumanth D

---

## ✅ `server/README.md` (Backend - Express + MongoDB + Firebase Admin)

```md
# 🛠️ Shared Wishlist App – Backend

This is the backend server for the **Shared Wishlist App**, built using **Node.js**, **Express**, **MongoDB**, and **Firebase Admin SDK** for secure token authentication.

---

## 🔗 Live URL

[https://your-backend.onrender.com](https://your-backend.onrender.com)  
_(replace this with your deployed backend URL)_

---

## 🔧 Features

- 🔐 Firebase ID Token Authentication
- 🎁 Create / Edit / Delete wishlists
- 🛍️ Add / Edit / Delete products
- 👥 Share wishlists with others
- 🎉 React to products with emojis (👍 ❤️ 😂 🤯)

---

## 🧪 API Endpoints

| Method | Endpoint                               | Description                    |
|--------|----------------------------------------|--------------------------------|
| GET    | `/api/wishlists`                       | Get all wishlists for user     |
| POST   | `/api/wishlists`                       | Create a new wishlist          |
| PUT    | `/api/wishlists/:id`                   | Edit wishlist name             |
| DELETE | `/api/wishlists/:id`                   | Delete wishlist                |
| PUT    | `/api/wishlists/:id/share`             | Share with another user email  |
| GET    | `/api/wishlists/:id`                   | Get wishlist and its products  |
| POST   | `/api/wishlists/:id/products`          | Add product to wishlist        |
| PUT    | `/api/wishlists/:id/products/:pid`     | Edit product                   |
| DELETE | `/api/wishlists/:id/products/:pid`     | Delete product                 |
| PUT    | `/api/wishlists/:id/products/:pid/reactions` | Toggle emoji reaction   |

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/your-username/wishlist-backend.git
cd wishlist-backend
---
## Install dependencies

npm install

PORT=5000
MONGO_URI=your_mongodb_uri
---
## Create .env file

FIREBASE_PROJECT_ID=your_project_id
FIREBASE_CLIENT_EMAIL=your_firebase_admin_email
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nLINE1\\nLINE2\\n...\\n-----END PRIVATE KEY-----\\n"
---
## Run the server
node index.js
##🔐 Authentication
All routes are protected by Firebase Auth.
Send the token in the headers like: Authorization: Bearer <firebase_id_token>


##🌐 Deployment (Render)
Push code to GitHub

Create a new Web Service on render.com

Use:

Build command: npm install

Start command: node index.js

Add all environment variables from .env to the Render Dashboard


