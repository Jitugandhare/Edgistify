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
bash
Copy code
npm install
Configure environment variables for MongoDB and JWT secret in .env file:
makefile
Copy code
MONGO_URI=<your-mongo-uri>
JWT_SECRET=<your-jwt-secret>
PORT=5000
Run the backend server:
bash
Copy code
npm start
The backend should now be running on http://localhost:8000.

Postman Collection
A Postman collection is provided to test the API endpoints related to:

User Registration
User Login
Add Products to Cart
Place Orders
You can import the collection into Postman for easy testing of the backend endpoints.

Download the Postman Collection here:

Postman Collection

Technology Stack
Frontend:
React
Axios (for HTTP requests)
React Router (for routing)
Material UI (for UI components)
Backend:
Node.js
Express.js
MongoDB (with Mongoose ORM)
JWT (JSON Web Token) for session management
bcrypt.js for password hashing
Development Tools:

Postman (for API testing)
Non-Functional Requirements
Scalability: The backend is designed to handle an increasing number of users, products, and orders.
Security: Passwords are hashed using bcrypt.js and sensitive data is handled securely.
Performance: The backend APIs are optimized to return quick responses by using efficient queries in MongoDB and appropriate indexing.
Assumptions
Product Availability: Products are already stored in the database.
Authentication: Only authenticated users can perform actions related to cart and orders.
JWT Token Expiry: Tokens are set with an expiry time and require renewal once expired.
Future Improvements
Admin Panel: Add an admin panel to manage users, products, and orders.
Product Management: Implement CRUD operations for product management.
Payment Integration: Integrate a real payment gateway (e.g., Stripe or PayPal) for handling transactions.
Email Notifications: Add email notifications for order confirmations, shipping updates, etc.
Cart Persistence: Implement cart persistence between sessions (e.g., using a database or localStorage).
Performance Optimization: Optimize MongoDB queries and implement caching for frequently accessed data.
Contributing
Fork the repository.
Create a new branch (git checkout -b feature-name).
Commit your changes (git commit -am 'Add feature').
Push to the branch (git push origin feature-name).
Open a Pull Request.
License
This project is licensed under the MIT License - see the LICENSE file for details.

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


