const User = require("../models/user-model");
const Contact = require("../models/contact-model");
const Service = require("../models/service-model");

const home = async (req, res, next) => {
  try {
    res.status(200).json({ msg: "home" });
  } catch (error) {
    next(error);
  }
};

const registration = async (req, res, next) => {
  try {
    const { name, email, password, phone } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ msg: "Email Already Exists" });
    }
    const newUser = await User.create({ name, email, password, phone });
    res
      .status(200)
      .json({ msg: "registration success", token: await newUser.genToken() });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "user not found" });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ msg: "invalid credentials" });
    }
    res
      .status(200)
      .json({ msg: "login success", token: await user.genToken() });
  } catch (error) {
    next(error);
  }
};

const contact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    const userMsg = await Contact.create({ name, email, message });
    res
      .status(200)
      .json({ msg: "message sent success", userMsg: userMsg.message });
  } catch (error) {
    next(error);
  }
};

const user = async(req,res, next) => {
  try {
    const user_data = req.user;
    if(!user_data){
      return res.status(404).json({msg:'No User Data'})
    }
    res.status(200).json(user_data)
  } catch (error) {
    next(error)
  }
}

const service = async(req,res, next) => {
  try {
    const service = await Service.find()
     if (!Array.isArray(service) || service.length === 0) {
      return res.status(404).json({msg:"Services not available"})
    }
    res.status(200).json(service)
  } catch (error) {
    next(error)
  }
}


module.exports = { home, registration, login, contact, user, service };
