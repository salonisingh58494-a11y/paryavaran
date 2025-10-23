// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON requests

// ---------------- MongoDB Connection ----------------
mongoose.connect("mongodb://127.0.0.1:27017/paryavaran", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ DB Connection Error:", err));

// ---------------- Schemas ----------------
const profileSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  address: String,
  contact: String,
  city: String,
  state: String,
  password: String
});
const Profile = mongoose.model("Profile", profileSchema);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});
const User = mongoose.model("User", userSchema);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number
});
const Product = mongoose.model("Product", productSchema);

const orderSchema = new mongoose.Schema({
  user: String,
  product: String,
  status: { type: String, default: "Pending" }
});
const Order = mongoose.model("Order", orderSchema);

// ---------------- Profile APIs ----------------
app.post("/api/profile", async (req, res) => {
  try {
    const { email, ...profileData } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    const profile = await Profile.findOneAndUpdate(
      { email },
      { $set: { email, ...profileData } },
      { new: true, upsert: true }
    );
    res.json({ message: "Profile saved successfully", profile });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/profile/:email", async (req, res) => {
  try {
    const profile = await Profile.findOne({ email: req.params.email });
    if (!profile) return res.status(404).json({ error: "Profile not found" });
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.get("/api/profiles", async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/profile/:email", async (req, res) => {
  try {
    await Profile.findOneAndDelete({ email: req.params.email });
    res.json({ message: "Profile deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- Users APIs ----------------
app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/api/users", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "All fields are required" });
  const user = new User({ name, email, password });
  await user.save();
  res.json(user);
});

app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User deleted" });
});

// ---------------- Orders APIs ----------------
app.get("/api/orders", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

app.post("/api/orders", async (req, res) => {
  const { user, product } = req.body;
  const order = new Order({ user, product });
  await order.save();
  res.json(order);
});

app.put("/api/orders/:id", async (req, res) => {
  const { status } = req.body;
  const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(order);
});

// ---------------- Products APIs ----------------
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.post("/api/products", async (req, res) => {
  try {
    const { name, price } = req.body;
    if (!name || price == null) return res.status(400).json({ error: "All fields required" });

    const product = new Product({ name, price });
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.put("/api/products/:id", async (req, res) => {
  try {
    const { price } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { price }, { new: true });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- Start Server ----------------
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
