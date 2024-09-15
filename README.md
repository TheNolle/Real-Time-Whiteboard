# 🖌️ Real-Time Whiteboard App

A modern, fully-featured, real-time collaborative whiteboard application with room codes, passcode security, user roles, and powerful whiteboard tools like drawing, text, shapes, and image upload. This app is designed for both desktop and mobile devices, allowing multiple users to collaborate seamlessly in real-time. 🌐


## ✨ Features

- **Authentication**: [JWT](https://jwt.io/)-based authentication for user sessions.
- **Room Management**: Create and join rooms using room codes. Set optional passcodes for additional security.
- **Real-Time Collaboration**: Multiple users can draw, write text, and upload images on the whiteboard, with real-time updates.
- **Theming**: Light and dark mode with custom color palettes for drawings.
- **Cross-Device Compatibility**: Works perfectly on desktop and mobile devices, supporting gestures and touch.
- **Optional Feature - [Tesseract.js](https://tesseract.projectnaptha.com/)**: Extract text from uploaded images using OCR.
- **WebSocket Communication**: Powered by [Socket.io](https://socket.io/) for seamless real-time updates between users.


## 🚀 Tech Stack

### **Frontend**:
- **[React](https://react.dev/)**: The app's frontend is built with [React](https://react.dev/) for component-based development.
- **[TypeScript](https://www.typescriptlang.org/)**: Ensures type safety and clean code structure.
- **[SCSS](https://sass-lang.com/)/CSS**: Handles styling and theming.
- **WebSockets**: [Socket.io-client](https://npmjs.com/package/socket.io-client) is used for real-time interaction between users.
- **[Tesseract.js](https://tesseract.projectnaptha.com/)**: Optional OCR feature for extracting text from images.
- **[JWT](https://jwt.io/)**: Secure user authentication using JSON Web Tokens.

### **Backend**:
- **[Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)**: Server-side API and WebSocket handling.
- **[MongoDB](https://mongodb.com/)**: Stores user data, room information, and whiteboard content.
- **[Socket.io](https://socket.io/)**: Real-time updates between the frontend and backend via WebSockets.
- **[JWT](https://jwt.io/)**: Token-based user authentication for secure sessions.


## 🛠️ Installation and Setup

### **Prerequisites**
- **[Node.js](https://nodejs.org/)** (v14+)
- **[MongoDB](https://mongodb.com/)** (Ensure [MongoDB](https://mongodb.com/) is installed locally or use [MongoDB Atlas](https://mongodb.com/products/platform/atlas-database/))
- **[npm](https://npmjs.com/)** (comes with [Node.js](https://nodejs.org/))

### **Clone the Repository**
```bash
git clone https://github.com/your-username/whiteboard-app.git
cd whiteboard-app
```

### **Setup the Backend**
1. Navigate to the `backend` directory:
	```bash
	cd backend
	```
2. Install the dependencies:
	```bash
	npm install
	```
3. Create a `.env` file in the `backend` directory and add the following environment variables:
	```env
	PORT=5000
	MONGO_URI=your_mongodb_uri
	JWT_SECRET=your_jwt_secret
	```
4. Start the backend server:
	```bash
	npm start
	```

### **Setup the Frontend**
1. Navigate to the `frontend` directory:
	```bash
	cd frontend
	```
2. Install the dependencies:
	```bash
	npm install
	```
3. Run the frontend development server:
	```bash
	npm start
	```

### **Running the App**
- **Backend**: The backend server runs on [`http://localhost:5000`](http://localhost:5000).
- **Frontend**: The frontend development server runs on [`http://localhost:3000`](http://localhost:3000).
Ensure both the backend and frontend servers are running to fully use the application.


## 🔄 How to Use
1. **Sign Up/Login**: Create a new account or log in using the [JWT](https://jwt.io/)-based authentication system.
2. **Create/Join Room**: Create a new room with a unique room code or join an existing room using the room code.
3. **Collaborate in Real-Time**: Use the whiteboard tools to draw, write text, upload images, and collaborate with other users in real-time.
4. **Optional OCR Feature**: Upload an image and extract text using the [Tesseract.js](https://tesseract.projectnaptha.com/) OCR feature.


## 📱 Mobile Compatibility
The whiteboard app is fully responsive and works seamlessly on mobile devices. Users can draw, write text, and upload images using touch gestures.


## 💻 Project Structure
```
whiteboard-app/
│
├── backend/				# Node.js and Express backend code
│   ├── controllers/		# Contains route logic
│   ├── models/				# MongoDB models for user, room, and whiteboard data
│   ├── routes/				# API routes
│   ├── services/			# Helper services, JWT management, etc.
│   └── server.js			# Entry point for the backend server
│
├── frontend/				# React frontend code
│   ├── components/			# Reusable React components
│   ├── hooks/				# Custom hooks for managing state and logic
│   ├── context/			# React Context for global state management
│   ├── scss/				# Styles for the app with SCSS modules
│   └── App.tsx				# Main entry point for the frontend
│
└── README.md				# You are here!
```


## 🤝 Contributing
1. **Fork** the project.
2. Create the feature branch: `git checkout -b new-feature`.
3. **Commit** your changes: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin new-feature`.
5. Open a **Pull Request**.


## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


## 🛡️ Code of Conduct
Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand the behavior we expect from all contributors.


---

👨‍💻 Made with ❤️ by [Nolly](https://thenolle.com/)
