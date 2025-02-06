import * as transactionhistoryService from "./transactionhistory.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createTransactionhistory = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await transactionhistoryService.createTransactionhistory(
      req.body,
    );
    res.send(createResponse(result, "Transactionhistory created sucssefully"));
  },
);

export const updateTransactionhistory = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await transactionhistoryService.updateTransactionhistory(
      req.params.id,
      req.body,
    );
    res.send(createResponse(result, "Transactionhistory updated sucssefully"));
  },
);

export const editTransactionhistory = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await transactionhistoryService.editTransactionhistory(
      req.params.id,
      req.body,
    );
    res.send(createResponse(result, "Transactionhistory updated sucssefully"));
  },
);

export const deleteTransactionhistory = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await transactionhistoryService.deleteTransactionhistory(
      req.params.id,
    );
    res.send(createResponse(result, "Transactionhistory deleted sucssefully"));
  },
);

export const getTransactionhistoryById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await transactionhistoryService.getTransactionhistoryById(
      req.params.id,
    );
    res.send(createResponse(result));
  },
);

export const getAllTransactionhistory = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await transactionhistoryService.getAllTransactionhistory();
    res.send(createResponse(result));
  },
);
