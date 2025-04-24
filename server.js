// Load environment variables
require('dotenv').config();

// Import modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const { ObjectId } = require('mongodb');

const app = express();

// Middleware
let corsOptions = {
  origin: ['http://127.0.0.1:5500'],
  credentials: true // ✅ Allow cookies to be sent
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

// ✅ Setup session for storing logged-in user
app.use(session({
  secret: 'yourSecretHere', // Use strong secret in production
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: 'lax',
    secure: false // Set to true if using HTTPS
  }
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => {
  console.error("❌ MongoDB connection error:", err.message);
  process.exit(1);
});

// User Schema & Model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  skills: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ['mentor', 'mentee'], required: true }
});

const User = mongoose.model('User', userSchema);

// Routes
app.get("/", (req, res) => {
  res.send("Hello from EduConnect (with MongoDB)!");
});

// Login route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  console.log("🔐 Login Request:", req.body);

  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password." });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // ✅ Save user ID in session
    req.session.userId = user._id;

    console.log("✅ User logged in:", user.email);
    res.status(200).json({
      message: "Login successful!",
      user: {
        id:user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        skills: user.skills,
      }
    });
  } catch (err) {
    console.error("❌ Login error:", err.message);
    res.status(500).json({ message: "Something went wrong during login." });
  }
});
// Register route
app.post("/api/register", async (req, res) => {
  const { name, email, skills, password, role } = req.body;

  console.log("📥 Registration Request:", req.body);

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "Please fill in all required fields." });
  }

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({ name, email, skills, password, role });
    const savedUser = await newUser.save();

    console.log("✅ User saved:", savedUser);
    res.status(201).json({ 
      message: "User registered successfully!",
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email,
        role: savedUser.role,
        skills: savedUser.skills
      }
    });
  } catch (err) {
    console.error("❌ Registration error:", err.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
});

// ✅ Profile route using session and Mongoose
app.get('/api/profile', async (req, res) => {
  const userId = req.query.userId; // 👈 userId is pulled from query parameters

  if (!userId) {
    return res.status(400).json({ error: "User ID not provided." });
  }

  try {
    const user = await User.findById(userId); // 👈 used to fetch user from MongoDB

    if (!user) return res.status(404).json({ error: "User not found." });

    res.json({
      name: user.name,
      email: user.email,
      role: user.role,
      skills: user.skills || []
    });
  } catch (err) {
    console.error("❌ Error fetching profile:", err.message);
    res.status(500).json({ error: "Failed to fetch profile." });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
