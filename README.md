# SpeakX Search

SpeakX Search is a modern query search application designed with a robust tech stack for a seamless user experience. It features a user-friendly interface, real-time query handling, and a scalable architecture.

## Features

- **User-Friendly Interface**: Intuitive and responsive design for effortless query searching.
- **Real-Time Query Handling**: Fast and efficient query responses through an optimized backend.
- **Scalable Architecture**: Modular design for easy scalability.
- **Modern Tech Stack**: Integration of React, Vite, and Node.js for a smooth development and user experience.

---

## Tech Stack

### Frontend
- **React**: For building dynamic user interfaces.
- **Vite**: A fast build tool and development server.
- **Axios**: For handling API requests.
- **Tailwind CSS**: A utility-first CSS framework.

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Minimal and flexible web application framework.
- **MongoDB**: NoSQL database for data storage.

---

## Installation and Setup

### Prerequisites
Ensure you have the following installed on your system:
- Node.js (v16 or higher)
- npm or yarn
- MongoDB

---

### Clone the Repository

```bash
git clone https://github.com/Pawan-kumar47129/SpeakX.git
cd SpeakX
```

---

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory and add the following variables:

   ```env
   PORT=8000
   CORS_ORIGIN=your frontend url (http://localhost:5173)
   MONGODB_URI=your_database_connection_string
   ```

4. Start the backend server:

   ```bash
   npm start
   ```

   The backend will run on [http://localhost:8000](http://localhost:8000).

---

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the `frontend` directory and add the following variable:

   ```env
   VITE_BACKEND_URL=http://localhost:8000
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

   The frontend will run on [http://localhost:5173](http://localhost:5173).

---

## Project Structure

```
SpeakX
├── backend
│   ├── src
│   │   ├── models
│   │   ├── controllers
│   │   ├── routers
│   │   ├── util
│   │   ├── db
│   │   ├── index.js
│   │   └── app.js
│   └── .env
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── .env
└── README.md
```
