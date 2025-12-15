const mongoose = require("mongoose");
const URL = process.env.DB;

const myDB = async() => {
     try {
          await mongoose.connect(URL);
          console.log(`DB Connection Success`);
     } catch (error) {
          process.exit(1)
     }
}

module.exports = myDB