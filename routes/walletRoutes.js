const {createWallet, listWallets, getWallet, updateWallet, deleteWallet,
  //  deposit, Retrait 
  } = require("../controllers/walletController");

function handleWalletRoutes(req, res, body) {
  const urlParts = req.url.split("/");
  const walletId = urlParts[2];

  // GET /wallets (Liste tous les portefeuilles)
  if (req.url === "/wallets" && req.method === "GET") {
    return listWallets(req, res);
  }

  // GET /wallets/{id} (Récupérer un portefeuille)
  if (req.url.startsWith("/wallets/") && walletId && !isNaN(walletId) && req.method === "GET" && !req.url.includes("/deposit") && !req.url.includes("/Retrait")) {
    return getWallet(req, res);
  }

  // POST /wallets (Créer un portefeuille)
  if (req.url === "/wallets" && req.method === "POST") {
    return createWallet(req, res, body);
  }

  // PUT /wallets/{id} (Modifier un portefeuille)
  if (req.url.startsWith("/wallets/") && walletId && !isNaN(walletId) && req.method === "PUT") {
    return updateWallet(req, res, body);
  }

  // DELETE /wallets/{id} (Supprimer un portefeuille)
  if (req.url.startsWith("/wallets/") && walletId && !isNaN(walletId) && req.method === "DELETE") {
    return deleteWallet(req, res);
  }

//   // POST /wallets/{id}/deposit (Dépôt)
//   if (req.url.startsWith("/wallets/") && req.url.endsWith("/deposit") && req.method === "POST") {
//     return deposit(req, res, body);
//   }

//   // POST /wallets/{id}/Retraits (Retrait)
//   if (req.url.startsWith("/wallets/") && req.url.endsWith("/Retrait") && req.method === "POST") {
//     return Retrait(req, res, body);
//   }

//   res.writeHead(404, { "Content-Type": "application/json" });
//   res.end(JSON.stringify({ error: "Wallet route not found" }));
}

module.exports = handleWalletRoutes;