const { sendNodemailer } = require('../utils/sendEmail');

exports.contactForm = (req, res) => {
  console.log(req.body);
  const { name, email, message } = req.body;

  const emailData = {
    from: 'michedomingo@gmail.com', // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
    to: 'michedomingo@gmail.com', // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
    subject: 'Website Contact Form',
    text: `Email received from contact from \n Sender name: ${name} \n Sender email: ${email} \n Sender message: ${message}`,
    html: `
        <h4>Email received from contact form:</h4>
        <p>Sender name: ${name}</p>
        <p>Sender email: ${email}</p>
        <p>Sender message: ${message}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>https://tjsfans.com</p>
    `,
  };

  sendNodemailer(req, res, emailData);
};
