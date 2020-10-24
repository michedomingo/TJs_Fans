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

exports.accountActivation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION, function (
      err,
      decoded
    ) {
      if (err) {
        console.log('JWT VERIFY IN ACCOUNT ACTIVATION ERROR', err);
        return res.status(401).json({
          error: 'Activation link expired. Please signup again.',
        });
      }

      const { name, email, password } = jwt.decode(token);

      const user = new User({ name, email, password });

      user.save((err, user) => {
        if (err) {
          console.log('SAVE USER IN ACCOUNT ACTIVATION ERROR', err);
          return res.status(401).json({
            error: 'Error saving user in database. Please try again',
          });
        }
        return res.json({
          message: 'Signup success! Please login.',
        });
      });
    });
  } else {
    return res.json({
      message: 'Oops! Something went wrong. Please try again.',
    });
  }
};
