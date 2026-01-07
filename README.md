# Talk Live – Real-Time Chat Application 

Talk Live is a modern, scalable, and full-featured real-time chatting platform built using the MERN Stack. The project focuses on delivering seamless instant communication with secure authentication, media sharing, and interactive user experience similar to industry-leading chat applications.

---

## Project Overview

This application enables users to connect and chat in real time with support for text and image messages. It uses WebSocket-based architecture to maintain fast and synchronized communication between clients and server.

---

## Tech Stack

### Frontend

* ReactJS
* JavaScript (ES6+)
* Axios for API calls
* React Router for navigation
* Tailwind CSS for responsive UI
* React Hot Toast for alerts

### Backend

* Node.js
* Express.js
* MongoDB with Mongoose
* Socket.io for real-time messaging
* JSON Web Token (JWT) authentication
* bcrypt for password hashing

### Cloud & Storage

* Cloudinary for media uploads

### Development Tools

* Git & GitHub
* Postman for API testing
* Vite as build tool

---

## Key Features

* Real-time one-to-one chat
* User authentication and authorization
* Online/Offline status tracking
* Image sharing support
* Push notifications
* Typing indicators
* Message timestamps
* Mobile-first responsive design
* Secure REST APIs

---

## Industrial Application

Talk Live demonstrates core concepts used in production chat systems:

* Event-driven architecture with WebSockets
* Scalable backend design
* Secure handling of user credentials
* Cloud-based file management
* Optimized API communication
* Modular folder structure

This project can be extended into:

* Customer support platforms
* Team collaboration tools
* Social networking chat modules
* E-learning communication systems

---

## Installation & Setup

### Prerequisites

* Node.js installed
* MongoDB running
* Cloudinary account

### Steps

1. Clone the repository
2. Install dependencies in both client and server folders
3. Configure environment variables
4. Start backend and frontend

---

## Environment Variables

Create a .env file in server root and add:

* MongoDB URI
* JWT Secret
* Cloudinary credentials

Make sure to keep this file ignored using .gitignore.

---

## Folder Structure

```
Talk-Live/
├── Client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
├── Server/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│   ├── config/
│   ├── utils/
│   └── index.js
└── README.md
```

---

## Screenshots & Demo

* Live Demo: 
* Real-time Chat Interface
* Media Upload Preview
* Authentication Flow

---

## API Documentation

### Authentication APIs

* POST /api/auth/register – Create new user
* POST /api/auth/login – User login

### Chat APIs

* GET /api/users – Fetch users list
* GET /api/messages/:id – Get chat history
* POST /api/messages – Send new message

### Real-Time Events (Socket.io)

* connect
* send_message
* receive_message
* typing
* online_users

---

## Environment Variables Setup

Create a `.env` file in Server root:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Add `.env` to .gitignore to secure credentials.

---

## Deployment Guide

### Backend Deployment

* Host server on Render/Heroku/AWS
* Configure MongoDB Atlas
* Set Cloudinary credentials in platform env

### Frontend Deployment

* Deploy React app via Render, Vercel, or Netlify
* Add backend URL in Client .env

### Final Steps

* Enable WebSocket port
* Test APIs with Postman
* Monitor logs

---

## Conclusion

Talk Live is an excellent portfolio-ready MERN project showcasing real-time communication, security practices, and cloud integration. It reflects practical skills required for full-stack developers building interactive modern web applications.

---

### Made with using MERN Stack
