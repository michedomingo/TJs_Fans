const withAdminPermission = (req, res, next) => {
  req.isAdmin = req.user && req.user.data && req.user.data.role === 'admin';
  next();
};

module.exports = withAdminPermission;
