const mongoose = require("mongoose");

const WishlistSchema = new mongoose.Schema({
  name: String,
  users: [String],
  createdBy: String,
});

module.exports = mongoose.model("Wishlist", WishlistSchema);
