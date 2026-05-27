const express = require("express");
const router = express.Router();

// Temporary storage (until MongoDB)
let messages = [];

router.get("/messages", (req, res) => {
  try {
    return res.json({
      success: true,
      messages
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});

// Export function to add messages
router.addMessage = (msg) => {
  messages.push(msg);
};

module.exports = router;