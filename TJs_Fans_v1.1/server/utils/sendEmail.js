const nodemailer = require('nodemailer');

exports.sendNodemailer = (req, res, emailData) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  });

  return transporter
    .sendMail(emailData)
    .then((info) => {
      console.log(`Message sent: ${info.response}`);
      return res.json({
        success: true,
      });
    })
    .catch((err) =>
      console.log(
        `Uh oh! Looks like there's something funky with ${err} - Please try again :)`
      )
    );
};
