const express = require("express");
const router = express.Router();

const {createWallet, getWallets, getWallet,updateWallet,deleteWallet,deposit, withdraw} = require("../controllers/walletController");

const validateAmount = require("../middlewares/validateAmount");

router.post("/", createWallet);
router.get("/", getWallets);
router.get("/:id", getWallet);
router.put("/:id", updateWallet);
router.delete("/:id", deleteWallet);

router.post("/:id/deposit", validateAmount, deposit);
router.post("/:id/withdraw", validateAmount, withdraw);

module.exports = router;