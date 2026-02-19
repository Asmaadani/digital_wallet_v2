const { wallets, users } = require("../data/data");

// Create Wallet
function createWallet(req, res, body) {
  const { user_id, name } = JSON.parse(body);

  // Validation
  if (!user_id || !name) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "user_id and name are required" }));
  }

  // Check if user exists
  const userExists = users.find(u => u.id === user_id);

  if (!userExists) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "User does not exist" }));
  }

  const newWallet = {
    id: wallets.length + 1,
    user_id,
    name,
    sold: 0
  };

  wallets.push(newWallet);

  res.writeHead(201, { "Content-Type": "application/json" });
  res.end(JSON.stringify(newWallet));
}

// Get All Wallets
function listWallets(req, res) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(wallets));
}

module.exports = {
  createWallet,
  listWallets
};
