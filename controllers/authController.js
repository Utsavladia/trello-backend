const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  console.log("request to signup ", name, email, password);

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already registered. Please log in." });
    }

    const user = new User({ name, email, password });
    await user.save();

    // Generate a token for the new user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, name, userId: user._id });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "No account found with this email. Please sign up." });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate a token for the logged-in user
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, name: user.name, userId: user._id });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ error: "Server error" });
  }
};
