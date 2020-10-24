const User = require('../models/User');

exports.register = (req, res) => {
  //   console.log('REQ BODY ON SIGNUP', req.body);

  const { name, email, password } = req.body;

  // Mongoose method
  User.findOne({ email }).exec((err, user) => {
    if (user) {
      return res.status(400).json({
        error: 'Email is already registered in the system',
      });
    }
  });

  let newUser = new User({ name, email, password });

  newUser.save((err, success) => {
    if (err) {
      console.log('SIGNUP ERROR', err);
      return res.status(400).json({
        error: err,
      });
    }
    res.json({
      message: 'Registration success! Please login',
    });
  });
};
