const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
});

const UserModal = mongoose.model("user", UserSchema);

module.exports = UserModal;
