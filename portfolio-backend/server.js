require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ================= CORS =================

app.use(cors({
  origin: [
    "https://hillaryush-portfolio.vercel.app",
    "http://127.0.0.1:5500",
    "http://localhost:5500"
  ],
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
}));

// ================= MIDDLEWARE =================

app.use(express.json());

// ================= TEST ROUTES =================

app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

app.get("/ping", (req, res) => {
  res.status(200).json({
    status: "alive"
  });
});

// ================= ROUTES =================

const contactRoute = require("./routes/contact");
const adminAuth = require("./routes/adminAuth");
const adminMessages = require("./routes/adminMessages");

app.use("/api/contact", contactRoute);

app.use("/api/admin", adminAuth);

app.use("/api/admin", adminMessages);

// ================= DATABASE =================

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.log("Mongo Error ❌");
    console.log(err);
  });

// ================= SERVER =================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on PORT ${PORT}`);
});