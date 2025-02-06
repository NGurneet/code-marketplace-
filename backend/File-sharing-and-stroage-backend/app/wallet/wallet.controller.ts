import { Request, Response } from "express";
import * as walletService from "./wallet.service"; // Import wallet service
import { createResponse } from "../common/helper/response.hepler"; // Assuming you have a response helper for consistent responses
import asyncHandler from "express-async-handler";

// Controller to create a wallet
export const createWallet = asyncHandler(async (req: Request, res: Response) => {
  const result = await walletService.createWallet(req.body);
  res.send(createResponse(result, "Wallet created successfully"));
});

// Controller to update a wallet
export const updateWallet = asyncHandler(async (req: Request, res: Response) => {
  const result = await walletService.updateWallet(req.params.id, req.body);
  res.send(createResponse(result, "Wallet updated successfully"));
});

// Controller to add a transaction to a wallet
export const addTransaction = asyncHandler(async (req: Request, res: Response) => {
  const { walletId, amount, type, description } = req.body;
  const result = await walletService.addTransactionToWallet(walletId, { amount, type, description });
  res.send(createResponse(result, "Transaction added successfully"));
});

// Controller to get a wallet by ID
export const getWalletById = asyncHandler(async (req: Request, res: Response) => {
  const result = await walletService.getWalletById(req.params.id);
  res.send(createResponse(result));
});
export const getWalletByUser = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;  // Get the userId from request params
  console.log('Received userId:', req.params.id);
  const result = await walletService.getWalletByUser(req.params.id);  // Call the service to fetch wallet by userId
  res.send(createResponse(result));
});

// Controller to get all wallets
export const getAllWallet = asyncHandler(async (req: Request, res: Response) => {
  const result = await walletService.getAllWallet();
  res.send(createResponse(result));
});

// Credit wallet
export const creditWallet = asyncHandler(async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;

    const result = await walletService.creditWallet(userId, amount);
    res.json(createResponse(result));
  } catch (error) {
    res.status(400).json(createResponse("Error crediting wallet"));
  }
});