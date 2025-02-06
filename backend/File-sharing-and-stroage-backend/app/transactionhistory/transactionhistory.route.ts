import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as transactionhistoryController from "./transactionhistory.controller";
import * as transactionhistoryValidator from "./transactionhistory.validation";

const router = Router();

router
  .get("/", transactionhistoryController.getAllTransactionhistory)
  .get("/:id", transactionhistoryController.getTransactionhistoryById)
  .delete("/:id", transactionhistoryController.deleteTransactionhistory)
  .post(
    "/",
    transactionhistoryValidator.createTransactionhistory,
    catchError,
    transactionhistoryController.createTransactionhistory,
  )
  .put(
    "/:id",
    transactionhistoryValidator.updateTransactionhistory,
    catchError,
    transactionhistoryController.updateTransactionhistory,
  )
  .patch(
    "/:id",
    transactionhistoryValidator.editTransactionhistory,
    catchError,
    transactionhistoryController.editTransactionhistory,
  );

export default router;
