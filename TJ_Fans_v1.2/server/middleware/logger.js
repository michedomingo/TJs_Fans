const logger = (req, res, next) => {
  console.log(
    '=> ',
    req.method,
    req.originalUrl,
    ' || ',
    'isAuthenticated: ',
    typeof req.user === 'object',
    'is Admin: ',
    req.isAdmin
  );
  next();
};

module.exports = logger;
