const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  console.log("LOGIN DATA:", email, password);

  if (email === "ayushpatel5779@gmail.com" && password === "1234") {
    const token = jwt.sign({ email }, "secretkey123", { expiresIn: "1h" });

    return res.json({ token }); // ✅ VERY IMPORTANT
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

module.exports = router;