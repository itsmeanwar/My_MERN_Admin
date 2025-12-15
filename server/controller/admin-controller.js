const Contact = require("../models/contact-model");
const User = require("../models/user-model");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    if (!users || users.length === 0) {
      return res.status(404).json({ msg: "Users Not Found" });
    }
    return res.status(200).json(users);
  } catch (error) {
    next();
  }
};

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    if (!contacts || contacts.length === 0) {
      return res.status(404).json({ msg: "Contacts Not Found" });
    }
    return res.status(200).json(contacts);
  } catch (error) {
    next();
  }
};

const getUserById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await User.findOne({ _id: id }).select("-password");
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const updateUserById = async(req, res, next) =>{
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedUser = await User.updateOne({_id:id},{
      $set : data
    })
   res.status(201).json({
  msg: "Successfully Updated",
  user: updatedUser
});

  } catch (error) {
    next()
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.deleteOne({ _id: id });
    res.status(201).json({ msg: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllUsers, getAllContacts, getUserById, deleteUser, updateUserById };
