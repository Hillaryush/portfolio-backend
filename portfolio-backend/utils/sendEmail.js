const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ name, email, message }) => {

  try {

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      replyTo: email,
      subject: "New Portfolio Message 🚀",
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      html: `
        <div style="
          font-family: Arial;
          padding: 20px;
          background: #0b1020;
          color: white;
          border-radius: 12px;
        ">

          <h1 style="color:#8c64ff;">
            New Portfolio Message 🚀
          </h1>

          <p><strong>Name:</strong> ${name}</p>

          <p><strong>Email:</strong> ${email}</p>

          <p><strong>Message:</strong></p>

          <div style="
            background:#141b34;
            padding:15px;
            border-radius:10px;
            margin-top:10px;
          ">
            ${message}
          </div>

        </div>
      `,
    });

    console.log("EMAIL SENT ✅");

    console.log(info);

  } catch (emailErr) {

    console.error("EMAIL FAILED ❌");

    console.error(emailErr);

  }

};

module.exports = sendEmail;