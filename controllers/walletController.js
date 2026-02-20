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

// Get Wallet by ID
function getWallet(req, res) {
  const parts = req.url.split("/");
  const walletId = parseInt(parts[2]);

  const wallet = wallets.find(w => w.id === walletId);

  if (!wallet) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Portefeuille non trouvé" }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(wallet));
}


// Update Wallet
function updateWallet(req, res, body) {
  const parts = req.url.split("/");
  const walletId = parseInt(parts[2]);

  const { name } = JSON.parse(body);

  if (!name) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Le nom est requis" }));
  }

  const walletIndex = wallets.findIndex(w => w.id === walletId);

  if (walletIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Portefeuille non trouvé" }));
  }
  // Mettre à jour le nom du portefeuille
  wallets[walletIndex].name = name;

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    message: "Portefeuille mis à jour avec succès",
    wallet: wallets[walletIndex]
  }));
}

// Delete Wallet
function deleteWallet(req, res) {
  const parts = req.url.split("/");
  const walletId = parseInt(parts[2]);

  const walletIndex = wallets.findIndex(w => w.id === walletId);

  if (walletIndex === -1) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Portefeuille non trouvé" }));
  }
  // Supprimer le portefeuille
  const deletedWallet = wallets.splice(walletIndex, 1)[0];

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    message: "Portefeuille supprimé avec succès",
    wallet: deletedWallet
  }));
}

// DEPOSIT
function deposit(req, res, body) {
  const parts = req.url.split("/");
  const walletId = parseInt(parts[2]);

  const { amount } = JSON.parse(body);

  if (!amount || amount <= 0) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Le montant doit être strictement positif" }));
  }

  const wallet = wallets.find(w => w.id === walletId);

  if (!wallet) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "wallet non trouvé" }));
  }

  wallet.sold += amount;

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    message: "Deposit successful",
    wallet
  }));
}

//Retrait
function Retrait(req, res, body) {
  const parts = req.url.split("/");
  const walletId = parseInt(parts[2]);

  const { amount } = JSON.parse(body);

  // Vérification du montant
  if (!amount || amount <= 0) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Le montant doit être strictement positif" }));
  }

  // Recherche du portefeuille
  const wallet = wallets.find(w => w.id === walletId);

  if (!wallet) {
    res.writeHead(404, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ error: "Portefeuille non trouvé" }));
  }

  // Vérification du solde suffisant
  if (wallet.sold < amount) {
    res.writeHead(400, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ 
      error: "Solde insuffisant",
      available: wallet.sold,
      requested: amount 
    }));
  }

  // Effectuer le retrait
  wallet.sold -= amount;

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    message: "Retrait effectué avec succès",
    wallet
  }));
}


module.exports = {
  createWallet,
  listWallets,
  deposit,
  Retrait,
  getWallet,
  deleteWallet,
  updateWallet
};