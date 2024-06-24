const { default: mongoose } = require("mongoose");

const productSchema = mongoose.Schema({
  id: Number,
  name: String,
  description: String,
  cost: Number,
  image: String,
  size: String,
  color: String,
  offer1: String,
  offer2: String,
});

const productModal = mongoose.model("product", productSchema);

module.exports = productModal;
