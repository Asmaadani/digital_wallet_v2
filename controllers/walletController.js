const { wallets, users } = require("../data/store");

exports.createWallet = (req, res) => {
  const { user_id, name } = req.body;

  if (!user_id || !name) {
    return res.status(400).json({ message: "user_id and name are required" });
  }

  const user = users.find(u => u.id === parseInt(user_id));

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newWallet = {
    id: wallets.length + 1,
    user_id: parseInt(user_id),
    name,
    sold: 0 
  };

  wallets.push(newWallet);

  res.status(201).json(newWallet);
};


exports.getWallets = (req, res) => {
  res.status(200).json(wallets);
};

exports.getWallet = (req, res) => {
  const id = parseInt(req.params.id);

  const wallet = wallets.find(w => w.id === id);

  if (!wallet) {
    return res.status(404).json({ message: "Wallet not found" });
  }

  res.status(200).json(wallet);
};
// _________________________________________
exports.updateWallet = (req, res) => {
  const id = parseInt(req.params.id);
  const { name } = req.body;

  const wallet = wallets.find(w => w.id === id);

  if (!wallet) {
    return res.status(404).json({ message: "Wallet not found" });
  }

  if (!name) {
    return res.status(400).json({ message: "Name is required" });
  }

  wallet.name = name;

  res.status(200).json(wallet);
};
// ______________________________________
exports.deleteWallet = (req, res) => {
  const id = parseInt(req.params.id);

  const index = wallets.findIndex(w => w.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Wallet not found" });
  }

  wallets.splice(index, 1);

  res.status(200).json({ message: "Wallet deleted successfully" });
};
// _________________________________________
exports.deposit = (req, res) => {
  const id = parseInt(req.params.id);
  const { amount } = req.body;

  const wallet = wallets.find(w => w.id === id);

  if (!wallet) {
    return res.status(404).json({ message: "Wallet not found" });
  }

  wallet.sold += amount;

  res.status(200).json(wallet);
};
// _________________________________________
exports.withdraw = (req, res) => {
  const id = parseInt(req.params.id);
  const { amount } = req.body;

  const wallet = wallets.find(w => w.id === id);

  if (!wallet) {
    return res.status(404).json({ message: "Wallet not found" });
  }

  if (wallet.sold < amount) {
    return res.status(400).json({ message: "Insufficient balance" });
  }

  wallet.sold -= amount;

  res.status(200).json(wallet);
};