require("dotenv").config();
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors({
  origin: "https://hillaryush-portfolio.vercel.app",
  methods: ["GET", "POST"],
  credentials: true,
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

app.get('/ping', (req, res) => {
  res.status(200).json({ status: 'alive' });
});

const contactRoute = require("./routes/contact");
const adminAuth = require("./routes/adminAuth");
const adminMessages = require("./routes/adminMessages");

app.use("/api/contact", contactRoute);
app.use("/api/admin", adminAuth);
app.use("/api/admin", adminMessages);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Backend running on http://localhost:${PORT}`)
);