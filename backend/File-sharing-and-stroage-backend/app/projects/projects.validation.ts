import { body } from "express-validator";

export const createProjects = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string"),
  body("sellerId")
    .notEmpty()
    .withMessage("sellerId is required")
    .isString()
    .withMessage("sellerId must be a string"),
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string"),
  body("zipFile")
    .notEmpty()
    .withMessage("zipFile is required")
    .isString()
    .withMessage("zipFile must be a string"),
  body("isVerified").isString().withMessage("isVerified must be a string"),
  body("category")
    .notEmpty()
    .withMessage("category is required")
    .isString()
    .withMessage("category must be a string"),
  body("technologies").isString().withMessage("technologies must be a string"),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a number"),
];

export const updateProjects = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string"),
  body("sellerId")
    .notEmpty()
    .withMessage("sellerId is required")
    .isString()
    .withMessage("sellerId must be a string"),
  body("description")
    .notEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string"),
  body("zipFile")
    .notEmpty()
    .withMessage("zipFile is required")
    .isString()
    .withMessage("zipFile must be a string"),
  body("isVerified").isString().withMessage("isVerified must be a string"),
  body("category")
    .notEmpty()
    .withMessage("category is required")
    .isString()
    .withMessage("category must be a string"),
  body("technologies").isString().withMessage("technologies must be a string"),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be a number"),
];

export const editProjects = [
  body("title").isString().withMessage("title must be a string"),
  body("sellerId").isString().withMessage("sellerId must be a string"),
  body("description").isString().withMessage("description must be a string"),
  body("zipFile").isString().withMessage("zipFile must be a string"),
  body("isVerified").isString().withMessage("isVerified must be a string"),
  body("category").isString().withMessage("category must be a string"),
  body("technologies").isString().withMessage("technologies must be a string"),
  body("price").isNumeric().withMessage("price must be a number"),
];
