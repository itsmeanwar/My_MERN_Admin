const adminMiddleware = async (req, res, next) => {
  try {
    const adminRole = req.user.isAdmin;
    if (!adminRole) {
      return res
        .status(401)
       .json({ msg: "Access Denied, You Are Not An Admin" });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = adminMiddleware;
