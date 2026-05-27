require("dotenv").config();
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const app = express();

app.use(cors());
app.use(express.json());

app.use("/contact", require("./routes/contact"));
app.use("/api", require("./routes/contact"));
app.use("/api/contact", require("./routes/contact"));
app.use("/api", require("./routes/adminAuth"));
app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});
const adminAuth = require("./routes/adminAuth");

app.use("/api/admin", adminAuth);
const adminMessages = require("./routes/adminMessages");

app.use("/api/admin", adminMessages);
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));