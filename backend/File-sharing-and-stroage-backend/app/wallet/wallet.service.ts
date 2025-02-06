import Wallet from "./wallet.schema"; // Import the Wallet model
import IWallet  from "./wallet.dto"; // Import the IWallet interface

// Service to create a wallet
export const createWallet = async (data: IWallet) => {
  const result = await Wallet.create({ ...data, active: true });
  return result;
};

// Service to update a wallet
export const updateWallet = async (id: string, data: IWallet) => {
  const result = await Wallet.findOneAndUpdate({ _id: id }, data, { new: true });
  return result;
};

// Service to add a transaction to a wallet
export const addTransactionToWallet = async (walletId: string, transaction: { amount: number; type: "credit" | "debit"; description: string }) => {
  // Find the wallet by user ID
  const wallet = await Wallet.findOne({ userId: walletId });

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  // Add the transaction to the wallet's transactions array
  wallet.transactions.push({
    amount: transaction.amount,
    type: transaction.type,
    date: new Date(),
    description: transaction.description,
  });

  // Update the wallet balance based on the transaction type
  if (transaction.type === "credit") {
    wallet.balance += transaction.amount;
  } else if (transaction.type === "debit") {
    wallet.balance -= transaction.amount;
  }

  // Save the updated wallet
  await wallet.save();
  return wallet;
};

// Service to get a wallet by ID
export const getWalletById = async (id: string) => {
  const result = await Wallet.findById(id).lean();
  return result;
};

// Service to get all wallets
export const getAllWallet = async () => {
  const result = await Wallet.find({}).lean();
  return result;
};

export const getWalletByUser = async (userId: string) => {
  const wallet = await Wallet.findOne({ userId }).lean();  // Find the wallet by userId
  if (!wallet) {
    throw new Error('Wallet not found for the specified user');
  }
  return wallet;
};

export const creditWallet = async (userId: string, amount: number) => {
  if (amount <= 0) {
    throw new Error('Amount must be greater than zero');
  }

  const wallet = await Wallet.findOne({ userId });
  if (!wallet) {
    throw new Error('Wallet not found for the specified user');
  }

  wallet.balance += amount;
  await wallet.save();

  

  return { message: 'Wallet credited successfully', newBalance: wallet.balance };
};
