const express = require("express");
const userRoutes = require("./routes/userRoutes");
const walletRoutes = require("./routes/walletRoutes");
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/wallets", walletRoutes);

// 404 handler
app.use((req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

// Global error handler
app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});