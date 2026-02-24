const express = require("express");

const userRoutes = require("./routes/userRoutes");
const walletRoutes = require("./routes/walletRoutes");

const app = express();

// Middleware باش نقراو JSON
app.use(express.json());

// Routes
app.use("/users", userRoutes);
app.use("/wallets", walletRoutes);

// Global 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});