import { body } from "express-validator";

export const createTransaction = [
  body("projectId")
    .notEmpty()
    .withMessage("projectId is required")
    .isString()
    .withMessage("projectId must be a string"),
  body("sellerId")
    .notEmpty()
    .withMessage("sellerId is required")
    .isString()
    .withMessage("sellerId must be a string"),
  body("buyerId")
    .notEmpty()
    .withMessage("buyerId is required")
    .isString()
    .withMessage("buyerId must be a string"),
  body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .isNumeric()
    .withMessage("amount must be a number"),
  body("OwnerCommission")
    .notEmpty()
    .withMessage("OwnerCommission is required")
    .isString()
    .withMessage("OwnerCommission must be a string"),
  body("sellerShare")
    .notEmpty()
    .withMessage("sellerShare is required")
    .isNumeric()
    .withMessage("sellerShare must be a number"),
  body("status")
    .notEmpty()
    .withMessage("status is required")
    .isString()
    .withMessage("status must be a string"),
  body("paymentMethod")
    .notEmpty()
    .withMessage("paymentMethod is required")
    .isString()
    .withMessage("paymentMethod must be a string"),
];

export const updateTransaction = [
  body("projectId")
    .notEmpty()
    .withMessage("projectId is required")
    .isString()
    .withMessage("projectId must be a string"),
  body("sellerId")
    .notEmpty()
    .withMessage("sellerId is required")
    .isString()
    .withMessage("sellerId must be a string"),
  body("buyerId")
    .notEmpty()
    .withMessage("buyerId is required")
    .isString()
    .withMessage("buyerId must be a string"),
  body("amount")
    .notEmpty()
    .withMessage("amount is required")
    .isNumeric()
    .withMessage("amount must be a number"),
  body("OwnerCommission")
    .notEmpty()
    .withMessage("OwnerCommission is required")
    .isString()
    .withMessage("OwnerCommission must be a string"),
  body("sellerShare")
    .notEmpty()
    .withMessage("sellerShare is required")
    .isNumeric()
    .withMessage("sellerShare must be a number"),
  body("status")
    .notEmpty()
    .withMessage("status is required")
    .isString()
    .withMessage("status must be a string"),
  body("paymentMethod")
    .notEmpty()
    .withMessage("paymentMethod is required")
    .isString()
    .withMessage("paymentMethod must be a string"),
];

export const editTransaction = [
  body("projectId").isString().withMessage("projectId must be a string"),
  body("sellerId").isString().withMessage("sellerId must be a string"),
  body("buyerId").isString().withMessage("buyerId must be a string"),
  body("amount").isNumeric().withMessage("amount must be a number"),
  body("OwnerCommission")
    .isString()
    .withMessage("OwnerCommission must be a string"),
  body("sellerShare").isNumeric().withMessage("sellerShare must be a number"),
  body("status").isString().withMessage("status must be a string"),
  body("paymentMethod")
    .isString()
    .withMessage("paymentMethod must be a string"),
];
