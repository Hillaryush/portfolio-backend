const express = require("express");

const router = express.Router();

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    console.log("LOGIN DATA:", email, password);

    if (
      email === "ayushpatel5779@gmail.com" &&
      password === "1234"
    ) {

      return res.json({
        success: true,
        token: "admin-token"
      });

    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials"
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Server error"
    });

  }

});

module.exports = router;