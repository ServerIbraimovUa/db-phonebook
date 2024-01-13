const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    avatar: {
      type: String,
    },
    token: {
      type: String,
    },
  },
  {
    versionKey: false,
  }
);

userSchema.methods.hashPassword = async function () {
    this.password = await bcrypt.hash(this.password, 10);
}

const User = model("user", userSchema);

module.exports = User;