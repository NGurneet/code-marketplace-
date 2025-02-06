import { Router } from "express";
import * as walletController from "./wallet.controller"; // Import wallet controller
import { catchError } from "../common/middleware/cath-error.middleware"; // Assuming you have a middleware to handle errors
import * as walletValidator from "./wallet.validation"; // Assuming you have wallet validation

const router = Router();

router
  .get("/", walletController.getAllWallet)
  .get("/:id", walletController.getWalletById)
  .get("/user/:id", walletController.getWalletByUser)
  .post("/", walletValidator.createWallet, catchError, walletController.createWallet)
  .put("/:id", walletValidator.updateWallet, catchError, walletController.updateWallet)
  .post("/transaction",  catchError, walletController.addTransaction)
  .patch("/credit/:id/", walletController.creditWallet)

export default router;
