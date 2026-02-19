const { createWallet, listWallets } = require("../controllers/walletController");

function handleWalletRoutes(req, res, body) {

//   if (req.url === "/wallets" && req.method === "POST") {
if (req.url.startsWith("/wallets") && req.method === "POST"){ 
    return createWallet(req, res, body);
  }

  if (req.url === "/wallets" && req.method === "GET") {
    return listWallets(req, res);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Wallet route not found" }));
}

module.exports = handleWalletRoutes;
