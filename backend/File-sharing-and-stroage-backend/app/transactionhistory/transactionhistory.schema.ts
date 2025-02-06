import mongoose, { mongo } from "mongoose";
import { type ITransactionhistory } from "./transactionhistory.dto";

const Schema = mongoose.Schema;

const TransactionhistorySchema = new Schema<ITransactionhistory>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    balance: { type: Number, required: true },

    type: { type: String, required: true },
    relatedTransactionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<ITransactionhistory>(
  "transactionhistory",
  TransactionhistorySchema,
);
