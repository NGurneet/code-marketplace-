import * as purchaseService from "./purchase.service";
import { createResponse } from "../common/helper/response.hepler";
import asyncHandler from "express-async-handler";
import { type Request, type Response } from "express";

export const createPurchase = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await purchaseService.createPurchase(req.body);
    res.send(createResponse(result, "Purchase created sucssefully"));
  },
);

export const updatePurchase = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await purchaseService.updatePurchase(
      req.params.id,
      req.body,
    );
    res.send(createResponse(result, "Purchase updated sucssefully"));
  },
);

export const editPurchase = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await purchaseService.editPurchase(req.params.id, req.body);
    res.send(createResponse(result, "Purchase updated sucssefully"));
  },
);

export const deletePurchase = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await purchaseService.deletePurchase(req.params.id);
    res.send(createResponse(result, "Purchase deleted sucssefully"));
  },
);

export const getPurchaseById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await purchaseService.getPurchaseById(req.params.id);
    res.send(createResponse(result));
  },
);

export const getAllPurchase = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await purchaseService.getAllPurchase();
    res.send(createResponse(result));
  },
);
