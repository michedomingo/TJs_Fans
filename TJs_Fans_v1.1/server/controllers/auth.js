const User = require('../models/User');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { sendNodemailer } = require('../utils/sendEmail');

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

exports.login = (req, res) => {
  const { email, password } = req.body;
  // Verify if user exists (findOne - mongoose method)
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: 'User with that email does not exist. Please register.',
      });
    }
    // Authenticate from UserSchema
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: 'Email and password do not match',
      });
    }
    // Generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    const { _id, name, email, role } = user;

    return res.json({
      token,
      user: { _id, name, email, role },
    });
  });
};

// Validate token and user info available to user
exports.requireLogin = expressJwt({
  secret: process.env.JWT_SECRET, // req.user
  algorithms: ['HS256'],
});
