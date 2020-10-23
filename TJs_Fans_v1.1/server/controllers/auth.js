exports.register = (req, res) => {
  console.log('REQ BODY ON SIGNUP', req.body);

  res.status(200).json({
    success: true,
    msg: 'hit signup register endpoint - WOOT! CONTROLLER',
  });
};
