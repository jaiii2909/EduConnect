
# EduConnect

**EduConnect** is a web platform designed to bridge the gap between **mentors** and **mentees** by providing a simple, intuitive interface for connection and collaboration. Built with **Node.js**, **Express**, and **MongoDB**, it enables users to register, log in, and connect based on shared skills and interests.

---

## 🚀 Features

- 🧑‍🏫 **User Roles**: Select between `Mentor` or `Mentee` during onboarding.
- 📝 **Registration & Login**: Unified form for both roles with role-specific data storage.
- 🧠 **Skill Matching**: Users can enter their skills to facilitate better connections.
- 💾 **MongoDB Integration**: Efficient data handling and storage with user roles and skills.
- 🎨 **Frontend**: Responsive interface built with HTML, CSS, and JavaScript.

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Server Port**: 5000

---

## 📁 Project Structure

```
EduConnect/
├── public/                 # Static frontend files
│   └── res-lib.html        # Login/Registration page
├── routes/
│   └── auth.js             # Authentication routes
├── models/
│   └── User.js             # Mongoose user schema
├── server.js               # Main backend server
└── README.md
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/educonnect.git
   cd educonnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**

   Create a `.env` file in the root directory and add your MongoDB URI:
   ```
   MONGO_URI=mongodb://localhost:27017/educonnect
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Access the app**  
   Open your browser and navigate to `http://localhost:5000`

---

## 👨‍💻 Contributing

Contributions are welcome! Please fork the repository, make your changes, and submit a pull request.
