import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as purchaseController from "./purchase.controller";
import * as purchaseValidator from "./purchase.validation";

const router = Router();

router
  .get("/", purchaseController.getAllPurchase)
  .get("/:id", purchaseController.getPurchaseById)
  .delete("/:id", purchaseController.deletePurchase)
  .post(
    "/",
    purchaseValidator.createPurchase,
    catchError,
    purchaseController.createPurchase,
  )
  .put(
    "/:id",
    purchaseValidator.updatePurchase,
    catchError,
    purchaseController.updatePurchase,
  )
  .patch(
    "/:id",
    purchaseValidator.editPurchase,
    catchError,
    purchaseController.editPurchase,
  );

export default router;
