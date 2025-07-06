const router = require("express").Router();
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");

router.post("/", async (req, res) => {
  const wishlist = new Wishlist({ ...req.body, createdBy: req.user.email });
  await wishlist.save();
  res.send(wishlist);
});

router.get("/", async (req, res) => {
  const wishlists = await Wishlist.find({ users: req.user.email });
  res.send(wishlists);
});

router.get("/:id", async (req, res) => {
  const wishlist = await Wishlist.findById(req.params.id);
  const products = await Product.find({ wishlistId: req.params.id });
  res.send({ wishlist, products });
});

router.post("/:id/products", async (req, res) => {
  const product = new Product({
    ...req.body,
    wishlistId: req.params.id,
    addedBy: req.user.email,
  });
  await product.save();
  res.send(product);
});

module.exports = router;
router.put("/:id", async (req, res) => {
  const updated = await Wishlist.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  res.send(updated);
});

// Delete wishlist + its products
router.delete("/:id", async (req, res) => {
  await Wishlist.findByIdAndDelete(req.params.id);
  await Product.deleteMany({ wishlistId: req.params.id });
  res.send({ success: true });
});
// Update product
router.put("/:wishlistId/products/:productId", async (req, res) => {
  const updated = await Product.findByIdAndUpdate(
    req.params.productId,
    {
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
    },
    { new: true }
  );
  res.send(updated);
});

// Delete product
router.delete("/:wishlistId/products/:productId", async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId);
  res.send({ success: true });
});
// Share wishlist with another user
router.put("/:id/share", async (req, res) => {
  const wishlist = await Wishlist.findById(req.params.id);
  if (!wishlist) return res.status(404).send("Wishlist not found");

  if (!wishlist.users.includes(req.body.email)) {
    wishlist.users.push(req.body.email);
    await wishlist.save();
  }

  res.send(wishlist);
});

// Toggle emoji reaction
router.put("/:wishlistId/products/:productId/reactions", async (req, res) => {
  const { emoji } = req.body;
  const userEmail = req.user.email;
  const product = await Product.findById(req.params.productId);
  if (!product) return res.status(404).send("Product not found");

  const current = product.reactions.get(emoji) || [];

  if (current.includes(userEmail)) {
    // Remove reaction
    product.reactions.set(
      emoji,
      current.filter((e) => e !== userEmail)
    );
  } else {
    // Add reaction
    product.reactions.set(emoji, [...current, userEmail]);
  }

  await product.save();
  res.send(product);
});
