const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(data) {
  console.log('Preparing to send email with user:', process.env.EMAIL_USER);
  console.log('Review data received:', data);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: 'New Review Submitted',
    html: `
      <h2>New Review from ${data.name || 'N/A'}</h2>
      <p><strong>Company:</strong> ${data.company || 'N/A'}</p>
      <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
      <p><strong>Product Used:</strong> ${data.product || 'N/A'}</p>
      <p><strong>Rating:</strong> ${data.rating || 'N/A'}</p>
      <p><strong>Review:</strong> ${data.content || 'N/A'}</p>
      <p><strong>Consent to publish:</strong> ${data.consent ? 'Yes' : 'No'}</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}

module.exports = sendEmail;
