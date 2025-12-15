require("dotenv").config();
const express = require("express");
var cors = require("cors");
const app = express();
const router = require("./router/auth-router");
const myDB = require("./utility/db");
const errorhandler = require("./middleware/errorhandler");
const adminRouter = require("./router/admin-router");

var corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/api/auth", router);
app.use("/api/admin", adminRouter);
app.use(errorhandler);

const PORT = 7000;

myDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server running in PORT:${PORT}`);
  });
});
