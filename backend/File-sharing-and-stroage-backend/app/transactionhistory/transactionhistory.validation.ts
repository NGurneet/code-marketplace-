import { body } from "express-validator";

export const createTransactionhistory = [
  body("userId").notEmpty().withMessage("userId is required"),
  body("balance")
    .notEmpty()
    .withMessage("balance is required")
    .isNumeric()
    .withMessage("balance must be a number"),
  body("createdAt").notEmpty().withMessage("createdAt is required"),
  body("updatedAt").notEmpty().withMessage("updatedAt is required"),
  body("type")
    .notEmpty()
    .withMessage("type is required")
    .isString()
    .withMessage("type must be a string"),
  body("relatedTransactionId")
    .notEmpty()
    .withMessage("relatedTransactionId is required"),
];

export const updateTransactionhistory = [
  body("userId").notEmpty().withMessage("userId is required"),
  body("balance")
    .notEmpty()
    .withMessage("balance is required")
    .isNumeric()
    .withMessage("balance must be a number"),
  body("createdAt").notEmpty().withMessage("createdAt is required"),
  body("updatedAt").notEmpty().withMessage("updatedAt is required"),
  body("type")
    .notEmpty()
    .withMessage("type is required")
    .isString()
    .withMessage("type must be a string"),
  body("relatedTransactionId")
    .notEmpty()
    .withMessage("relatedTransactionId is required"),
];

export const editTransactionhistory = [
  body("userId"),
  body("balance").isNumeric().withMessage("balance must be a number"),
  body("createdAt"),
  body("updatedAt"),
  body("type").isString().withMessage("type must be a string"),
  body("relatedTransactionId"),
];
