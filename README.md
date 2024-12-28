# E-commerce Platform - Full Stack Development

This repository contains the implementation of an e-commerce platform with user registration, login, cart management, and order placement. It is a full-stack application with a frontend built using React and a backend built using Node.js, Express, MongoDB, and JWT for session management.

## Table of Contents

1. [System Overview](#system-overview)
2. [Features](#features)
3. [Frontend Setup](#frontend-setup)
4. [Backend Setup](#backend-setup)
5. [Postman Collection](#postman-collection)
6. [Technology Stack](#technology-stack)
7. [Non-Functional Requirements](#non-functional-requirements)
8. [Assumptions](#assumptions)
9. [Future Improvements](#future-improvements)
10. [Contributing](#contributing)

---
### deployment links: 
[Frontend] https://frontend-5z52vxbkk-jitu-gandhares-projects.vercel.app/

[backend] https://backend-g6ct.onrender.com
## System Overview

This e-commerce platform allows users to:

- **Register**: Create an account with a unique email, full name, and password.
- **Login**: Authenticate using a registered email and password via JWT token.
- **Add products to Cart**: Users can add products to their shopping cart.
- **Place Orders**: Users can place an order from the cart with all the necessary details.

The backend is built using **Node.js**, **Express**, and **MongoDB** for data storage. The frontend is built using **React**.

---

## Features

### 1. User Registration
- The user provides full name, email address, and password.
- Password is securely hashed before storing in the database.
- Email is validated and must be unique.

### 2. User Login
- Users can log in by providing their email address and password.
- JWT tokens are used for session management.

### 3. Add Products to Cart
- Users must be authenticated to add products to their cart.
- Cart items include product ID, quantity, and user ID.
- Product availability is validated before adding to the cart.

### 4. Place Orders
- Users can place orders for the products in their cart.
- The order contains product details, total price, shipping address, payment status, and order status.
- The cart is cleared after the order is placed.

---

## Frontend Setup

### Prerequisites
- Node.js
- NPM/Yarn

### Steps to Setup

1. Clone the repository:

git clone  'https://github.com/Jitugandhare/Edgistify'
cd frontend

Install dependencies:

npm install
Run the application:
npm start

The frontend should now be running on http://localhost:3000.

### Backend Setup;

Prerequisites
Node.js
MongoDB instance (can be local or use a cloud database like MongoDB Atlas)
Postman for API testing
Steps to Setup
Clone the repository:

### git clone 'https://github.com/Jitugandhare/Edgistify'
cd backend
Install dependencies:
npm install
Configure environment variables for MongoDB and JWT secret in .env file:
makefile
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
PORT=8000

### Postman workshop: 
https://app.getpostman.com/join-team?invite_code=bd8f067c1e33da1d1e38a88820fbb21fbf3981fbcf90b570cb65c2330470ce52&target_code=cb4e9fb9f708fd88a08715b270fb2352

Backend API Routes
Here are the key routes exposed by the backend:

User Registration:

POST /api/users/register: Registers a new user.
Request body: { fullName, email, password }
User Login:

POST /api/users/login: Authenticates a user and returns a JWT token.
Request body: { email, password }
Add Product to Cart:

POST /api/cart: Adds a product to the cart.
Request body: { productId, quantity }
Place Order:

POST /api/orders: Places an order and clears the cart.
Request body: { shippingAddress, cartItems, totalPrice }
bash
Copy code

### How to Use this `README.md` file:

1. **Create a new repository** on GitHub if you haven’t already.
2. **Clone the repository** on your local machine:
   ```bash
   git clone https://github.com/Jitugandhare/Edgistify.git


