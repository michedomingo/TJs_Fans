const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { sendNodemailer } = require('../utils/sendEmail');

// exports.register = (req, res) => {
//   //   console.log('REQ BODY ON SIGNUP', req.body);

//   const { name, email, password } = req.body;

//   // Mongoose method
//   User.findOne({ email }).exec((err, user) => {
//     if (user) {
//       return res.status(400).json({
//         error: 'Email is already registered in the system',
//       });
//     }
//   });

//   let newUser = new User({ name, email, password });

//   newUser.save((err, success) => {
//     if (err) {
//       console.log('SIGNUP ERROR', err);
//       return res.status(400).json({
//         error: err,
//       });
//     }
//     res.json({
//       message: 'Registration success! Please login',
//     });
//   });
// };

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is already registered in the system',
      });
    }

    const token = jwt.sign(
      { name, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: '10m' }
    );

    const emailData = {
      from: process.env.SMTP_EMAIL,
      to: email,
      subject: "TJ's Fans - ACCOUNT ACTIVATION LINK",
      html: `
                  <h1>Click the following link to activate your account:</h1>
                  <p>http://localhost:3000/auth/activate/${token}</p>
                  <hr />
                  <p>This email may contain sensitive information</p>
                  <p>http://localhost:3000</p>
              `,
    };

    sendNodemailer(req, res, emailData);
  });
};
