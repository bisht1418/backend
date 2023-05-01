const { Schema, model } = require("mongoose");

const userSchema = Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  age: { type: Number, require: true },
});

const userModel = model("user", userSchema);

module.exports = { userModel };
