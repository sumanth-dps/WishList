const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  wishlistId: String,
  name: String,
  imageUrl: String,
  price: Number,
  addedBy: String,
  reactions: {
    type: Map,
    of: [String], // array of emails per emoji
    default: {},
  },
});

module.exports = mongoose.model("Product", ProductSchema);
