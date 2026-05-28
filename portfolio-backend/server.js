require("dotenv").config();
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

app.get('/ping', (req, res) => {
  res.status(200).json({ status: 'alive' });
});

app.use("/api/contact", require("./routes/contact"));
app.use("/contact", require("./routes/contact"));

const adminAuth = require("./routes/adminAuth");
app.use("/api/admin", adminAuth);
app.use("/api", adminAuth);

const adminMessages = require("./routes/adminMessages");
app.use("/api/admin", adminMessages);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.listen(5000, () =>
  console.log("✅ Backend running on http://localhost:5000")
);