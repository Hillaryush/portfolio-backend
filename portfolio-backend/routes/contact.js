const express = require("express");
const router = express.Router();

const Message = require("../models/Message");
const sendEmail = require("../utils/sendEmail");

// ================= CONTACT =================

router.post("/", async (req, res) => {

  try {

    const { name, email, message } = req.body;

    console.log("Saving to DB...", name, email, message);

    // SAVE TO DATABASE
    const newMessage = new Message({
      name,
      email,
      message,
    });

    await newMessage.save();

    console.log("DATABASE SAVE SUCCESS ✅");

    res.status(200).json({
      success: true,
    });

    // email in background
    sendEmail({
      name,
      email,
      message,
    });

  } catch (err) {

    console.error("CONTACT ERROR ❌");

    console.error(err);

    res.status(500).json({
      error: "Server error",
    });

  }

});

// ================= GET MESSAGES =================

router.get("/messages", async (req, res) => {

  try {

    const messages = await Message.find().sort({
      time: -1,
    });

    res.json(messages);

  } catch (err) {

    res.status(500).json({
      error: "Failed to fetch messages",
    });

  }

});

// ================= DELETE MESSAGE =================

router.delete("/messages/:id", async (req, res) => {

  try {

    await Message.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
    });

  } catch (err) {

    res.status(500).json({
      error: "Delete failed",
    });

  }

});

module.exports = router;