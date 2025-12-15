const User = require("../models/user-model");
const jwt = require("jsonwebtoken");

const validToken = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(404).json({ msg: "Token Not Provided" });
  }

  const jwToken = token.replace("Bearer ", "").trim();

  let decoded;
  try {
    decoded = jwt.verify(jwToken, process.env.KEY);
  } catch (err) {
    return res.status(401).json({ msg: "Invalid or expired token" });
  }



  try {
    const userData = await User.findOne({ email: decoded.email }).select('-password');
    console.log(userData);
     req.user = userData;
     req.isAdmin = userData.isAdmin;
     req.id = userData._id;
     req.token = jwToken;
    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }

    next();
  } catch (error) {
    console.log("decoded", error.message);
    return res.status(500).json({ msg: "Server error" });
  }
};

module.exports = validToken;
