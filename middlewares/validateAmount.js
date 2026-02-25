module.exports = (req, res, next) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: "Amount must be positive" });
  }

  next();
};