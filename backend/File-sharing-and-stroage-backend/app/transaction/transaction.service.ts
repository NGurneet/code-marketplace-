import { type ITransaction } from "./transaction.dto";
import TransactionSchema from "./transaction.schema";

export const createTransaction = async (data: ITransaction) => {
  const result = await TransactionSchema.create({ ...data, active: true });
  return result;
};

export const updateTransaction = async (id: string, data: ITransaction) => {
  const result = await TransactionSchema.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

export const editTransaction = async (
  id: string,
  data: Partial<ITransaction>,
) => {
  const result = await TransactionSchema.findOneAndUpdate({ _id: id }, data);
  return result;
};

export const deleteTransaction = async (id: string) => {
  const result = await TransactionSchema.deleteOne({ _id: id });
  return result;
};

export const getTransactionById = async (id: string) => {
  const result = await TransactionSchema.findById(id).lean();
  return result;
};

export const getAllTransaction = async () => {
  const result = await TransactionSchema.find({}).lean();
  return result;
};
