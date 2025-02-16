const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const app = express();
const PORT = 3001;
const SECRET_KEY = "your_secret_key"; // Replace with a real secret key in production

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = "mongodb://127.0.0.1:27017/learning-platform";
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: "Learning Enthusiast" },
  profilePic: { type: String, default: "https://via.placeholder.com/100" },
  progress: { type: Number, default: 0 },
  achievements: { type: [String], default: [] },
  dailyGoal: { type: Number, default: 60 },
});

const User = mongoose.model("User", userSchema);

// Middleware to verify JWT
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden if token is invalid
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401); // Unauthorized if no token is provided
  }
};

// Signup Endpoint
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
});

// Login Endpoint
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, username: user.username, email: user.email },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

// Profile Endpoint (Protected)
app.get("/api/profile/:userId", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Profile Error:", error);
    res
      .status(500)
      .json({ message: "Error fetching profile", error: error.message });
  }
});

app.put("/api/profile/:userId", authenticateJWT, async (req, res) => {
  try {
    const { bio, profilePic } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { bio, profilePic },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
});
// Update Profile Endpoint (Protected)
app.put("/api/profile/:userId/goal", authenticateJWT, async (req, res) => {
  try {
    const { dailyGoal } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { dailyGoal },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Update Daily Goal Error:", error);
    res.status(500).json({ message: "Error updating daily goal", error: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
