const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ name, email, message }) => {
  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'ayushpatel5779@gmail.com',
      subject: `New message from ${name}`,
      html: `
        <h3>New Portfolio Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `
    });
    console.log('EMAIL SENT ✅');
  } catch (err) {
    console.error('EMAIL FAILED ❌', err);
  }
};

module.exports = sendEmail;