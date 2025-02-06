import mongoose from "mongoose";
import { type IPurchase } from "./purchase.dto";

const Schema = mongoose.Schema;

const PurchaseSchema = new Schema<IPurchase>(
  {
    ProjectTitle: { type: String, required: true },
    sellerId: { type: String, required: true },
    buyerId: { type: String, required: true },
    amount: { type: Number, required: true },
    OwnerCommission: { type: String, required: true },
    sellerShare: { type: Number, required: true },
    status: { type: String, required: true },
    paymentMethod: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IPurchase>("purchase", PurchaseSchema);
