// const express = require("express");
// const router = express.Router();
// const Logins = require("../schemas/LoginSchema");
// router.get("/users", async (req, res) => {
//   try {
//     const users = await Logins.find();
//     res.status(200).json(users);
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Failed to fetch users", error: err.message });
//   }
// });
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password) {
//       return res
//         .status(400)
//         .json({ status: "FAIL", message: "Email and password required" });
//     }
//     const user = await Logins.findOne({ email, password });
//     if (!user) {
//       return res
//         .status(401)
//         .json({ status: "FAIL", message: "Invalid credentials" });
//     }
//     user.token = Date.now().toString();
//     await user.save();
//     res.status(200).json({
//       status: "PASS",
//       token: user.token,
//       user: {
//         id: user._id,
//         email: user.email,
//         fullname: user.fullname,
//       },
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ status: "FAIL", message: "Server error during login" });
//   }
// });
// router.post("/register", async (req, res) => {
//   try {
//     const { fullname, email, password } = req.body;
//     if (!fullname || !email || !password) {
//       return res
//         .status(400)
//         .json({ status: "FAIL", message: "All fields are required" });
//     }
//     const existingUser = await Logins.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ status: "FAIL", message: "User already exists" });
//     }
//     const newUser = new Logins({ fullname, email, password });
//     await newUser.save();
//     res
//       .status(201)
//       .json({ status: "PASS", message: "Registered successfully" });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ status: "FAIL", message: "Server error during registration" });
//   }
// });
// module.exports = router;


const express = require("express");
const router = express.Router();
const Logins = require("../schemas/LoginSchema");

// Register
router.post("/register", async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    if (!fullname || !email || !password) {
      return res.status(400).json({ status: "FAIL", message: "All fields are required" });
    }

    const existingUser = await Logins.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ status: "FAIL", message: "User already exists" });
    }

    const newUser = new Logins({ fullname, email, password });
    await newUser.save();
    res.status(201).json({ status: "PASS", message: "Registered successfully" });
  } catch (err) {
    res.status(500).json({ status: "FAIL", message: "Server error during registration" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ status: "FAIL", message: "Email and password required" });
    }

    const user = await Logins.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ status: "FAIL", message: "Invalid credentials" });
    }

    const token = Date.now().toString(); // simple session-like token
    user.token = token;
    await user.save();

    res.status(200).json({
      status: "PASS",
      token: token,
      user: {
        id: user._id,
        email: user.email,
        fullname: user.fullname,
      },
    });
  } catch (err) {
    res.status(500).json({ status: "FAIL", message: "Server error during login" });
  }
});

// Get all users (admin or debug use)
router.get("/users", async (req, res) => {
  try {
    const users = await Logins.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
});

module.exports = router;
