import { type ITransactionhistory } from "./transactionhistory.dto";
import TransactionhistorySchema from "./transactionhistory.schema";

export const createTransactionhistory = async (data: ITransactionhistory) => {
  const result = await TransactionhistorySchema.create({
    ...data,
    active: true,
  });
  return result;
};

export const updateTransactionhistory = async (
  id: string,
  data: ITransactionhistory,
) => {
  const result = await TransactionhistorySchema.findOneAndUpdate(
    { _id: id },
    data,
    {
      new: true,
    },
  );
  return result;
};

export const editTransactionhistory = async (
  id: string,
  data: Partial<ITransactionhistory>,
) => {
  const result = await TransactionhistorySchema.findOneAndUpdate(
    { _id: id },
    data,
  );
  return result;
};

export const deleteTransactionhistory = async (id: string) => {
  const result = await TransactionhistorySchema.deleteOne({ _id: id });
  return result;
};

export const getTransactionhistoryById = async (id: string) => {
  const result = await TransactionhistorySchema.findById(id).lean();
  return result;
};

export const getAllTransactionhistory = async () => {
  const result = await TransactionhistorySchema.find({}).lean();
  return result;
};
