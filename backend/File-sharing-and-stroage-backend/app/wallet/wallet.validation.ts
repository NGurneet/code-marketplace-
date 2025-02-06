import { body } from "express-validator";

export const createWallet = [
  body("userId").notEmpty().withMessage("userId is required"),
  body("balance")
    .notEmpty()
    .withMessage("balance is required")
    .isNumeric()
    .withMessage("balance must be a number"),
  body("Transactions"),
];

export const updateWallet = [
  body("userId").notEmpty().withMessage("userId is required"),
  body("balance")
    .notEmpty()
    .withMessage("balance is required")
    .isNumeric()
    .withMessage("balance must be a number"),
  body("Transactions"),
];

export const editWallet = [
  body("userId"),
  body("balance").isNumeric().withMessage("balance must be a number"),
  body("Transactions"),
];
