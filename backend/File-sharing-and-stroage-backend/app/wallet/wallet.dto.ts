import mongoose from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";

interface IWallet extends BaseSchema {
  userId: string; // User ID is a string
  balance: number; // Wallet balance
  transactions: Array<{ // Transactions stored as an array of objects
    amount: number; // Amount of the transaction
    type: "credit" | "debit"; // Type of transaction (credit or debit)
    date: Date; // Transaction date
    description: string; // Description of the transaction
  }>;
}

export default IWallet;