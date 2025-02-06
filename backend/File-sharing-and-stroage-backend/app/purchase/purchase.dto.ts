import { type BaseSchema } from "../common/dto/base.dto";

export interface IPurchase extends BaseSchema {
  ProjectTitle: string;
  sellerId: string;
  buyerId: string;
  amount: number;
  OwnerCommission: string;
  sellerShare: number;
  status: string;
  paymentMethod: string;
}
