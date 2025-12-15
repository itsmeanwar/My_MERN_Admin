const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.methods.genToken = function () {
  return jwt.sign(
    {
      id: this._id.toString(),
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.KEY,
    {
      expiresIn: "1d",
    }
  );
};

userSchema.methods.comparePassword = async function (enterPassword) {
  return await bcrypt.compare(enterPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const round = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(this.password, round);
    this.password = hash;
    next();
  } catch (error) {
    console.log(error.message);
    next(error);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
