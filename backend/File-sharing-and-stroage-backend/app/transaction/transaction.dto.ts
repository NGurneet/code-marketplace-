import mongoose, { mongo } from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";

export interface ITransaction extends BaseSchema {
  projectId: mongoose.Schema.Types.ObjectId;
  sellerId: string;
  buyerId: string;
  amount: number;
  OwnerCommission: number;
  sellerShare: number;
  status: "pending" | "approved" | "rejected";
  paymentMethod: string;
}
