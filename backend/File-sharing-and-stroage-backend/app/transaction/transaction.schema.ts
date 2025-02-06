import mongoose from "mongoose";
import { type ITransaction } from "./transaction.dto";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema<ITransaction>(
  {
    projectId: { type: String, required: true },
    sellerId: { type: String, required: true },
    buyerId: { type: String, required: true },
    amount: { type: Number, required: true },
    OwnerCommission: { type: Number, required: true },
    sellerShare: { type: Number, required: true },
    status: { type: String, required: false, default: "pending" },
    paymentMethod: { type: String, required: false },
  },
  { timestamps: true },
);

export default mongoose.model<ITransaction>("transaction", TransactionSchema);
