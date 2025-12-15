const express = require("express");
const adminRouter = express.Router();
const authAdmin = require("../controller/admin-controller");
const validToken = require("../middleware/validToken");
const adminMiddleware = require("../middleware/admin-middleware");


adminRouter.get("/users", validToken, adminMiddleware, authAdmin.getAllUsers);
adminRouter.get("/contacts", validToken, adminMiddleware, authAdmin.getAllContacts);
adminRouter.get("/users/:id", validToken, adminMiddleware, authAdmin.getUserById);
adminRouter.patch("/users/update/:id", validToken, adminMiddleware, authAdmin.updateUserById);
adminRouter.delete("/users/delete/:id", validToken, adminMiddleware, authAdmin.deleteUser);


module.exports = adminRouter