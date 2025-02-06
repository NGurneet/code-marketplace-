import { type IPurchase } from "./purchase.dto";
import PurchaseSchema from "./purchase.schema";

export const createPurchase = async (data: IPurchase) => {
  const result = await PurchaseSchema.create({ ...data, active: true });
  return result;
};

export const updatePurchase = async (id: string, data: IPurchase) => {
  const result = await PurchaseSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const editPurchase = async (id: string, data: Partial<IPurchase>) => {
  const result = await PurchaseSchema.findOneAndUpdate({ _id: id }, data);
  return result;
};

export const deletePurchase = async (id: string) => {
  const result = await PurchaseSchema.deleteOne({ _id: id });
  return result;
};

export const getPurchaseById = async (id: string) => {
  const result = await PurchaseSchema.findById(id).lean();
  return result;
};

export const getAllPurchase = async () => {
  const result = await PurchaseSchema.find({}).lean();
  return result;
};
