const twilio = require("twilio");

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendWhatsApp = async ({ name, email, message }) => {
  try {
    await client.messages.create({
      from: "whatsapp:" + process.env.TWILIO_WHATSAPP_FROM,
      to: "whatsapp:" + process.env.ADMIN_WHATSAPP_TO,
      body: `📩 New Portfolio Message\n\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`,
    });

    console.log("📲 WhatsApp sent");
  } catch (err) {
    console.error("❌ WhatsApp error:", err.message);
    throw err;
  }
};

module.exports = sendWhatsApp;

// Debug (optional)
console.log(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN,
  process.env.TWILIO_WHATSAPP_FROM,
  process.env.ADMIN_WHATSAPP_TO
);