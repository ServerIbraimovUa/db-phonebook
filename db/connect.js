const mongoose = require("mongoose");

const { DB_HOST } = process.env;

async function dbConnect() {
  try {
    await mongoose.connect(DB_HOST);
    console.log("Db was connected success");
  } catch (error) {
    console.log(error);
  }
}

module.exports = dbConnect;
