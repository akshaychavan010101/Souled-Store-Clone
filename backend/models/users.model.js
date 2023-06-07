const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  gender: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  this.password = bcrypt.hashSync(this.password, 5);
  next();
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };
