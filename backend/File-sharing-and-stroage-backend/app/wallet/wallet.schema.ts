import mongoose, { Schema, Document } from "mongoose";
import  IWallet  from "./wallet.dto"; // Import IWallet interface

// Define the Wallet schema
const WalletSchema = new Schema<IWallet>({
  userId: { type: String, required: true, unique: true }, // Ensure userId is unique
  balance: { type: Number, default: 0 }, // Default balance is 0
  transactions: [
    {
      amount: { type: Number, required: true }, // Amount is required
      type: { type: String, enum: ["credit", "debit"], required: true }, // Type can either be credit or debit
      date: { type: Date, default: Date.now }, // Default to current date if not provided
      description: { type: String, required: true }, // Description is required
    },
  ],
}, { timestamps: true }); // Add timestamps for created and updated dates

// Create and export the Wallet model
const Wallet = mongoose.model<IWallet>("Wallet", WalletSchema);
export default Wallet;
