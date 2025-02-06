import * as transactionService from "./transaction.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await transactionService.createTransaction(req.body);
    res.send(createResponse(result, "Transaction created sucssefully"));
  },
);

export const updateTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await transactionService.updateTransaction(
      req.params.id,
      req.body,
    );
    res.send(createResponse(result, "Transaction updated sucssefully"));
  },
);

export const editTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await transactionService.editTransaction(
      req.params.id,
      req.body,
    );
    res.send(createResponse(result, "Transaction updated sucssefully"));
  },
);

export const deleteTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await transactionService.deleteTransaction(req.params.id);
    res.send(createResponse(result, "Transaction deleted sucssefully"));
  },
);

export const getTransactionById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await transactionService.getTransactionById(req.params.id);
    res.send(createResponse(result));
  },
);

export const getAllTransaction = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await transactionService.getAllTransaction();
    res.send(createResponse(result));
  },
);
