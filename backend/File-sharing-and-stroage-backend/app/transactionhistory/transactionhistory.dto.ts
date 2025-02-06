import mongoose from "mongoose";
import { type BaseSchema } from "../common/dto/base.dto";

  export interface ITransactionhistory extends BaseSchema {
    userId: mongoose.Schema.Types.ObjectId;
    balance: number;

    type: "purchase"|"sell"|"refund"|"transfer"|"debit"|"credit";
    relatedTransactionId: mongoose.Schema.Types.ObjectId;
  }
