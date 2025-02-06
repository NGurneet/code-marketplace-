// src/services/walletApiSlice.ts

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// interface Transaction {
//   amount: number;
//   type: 'credit' | 'debit';
//   description: string;
// }

// interface Wallet {
//   userId: string;
//   balance: number;
//   transactions: Array<{
//     amount: number;
//     type: 'credit' | 'debit';
//     date: string;
//     description: string;
//   }>;
// }

// export const walletApi = createApi({
//   reducerPath: 'walletApi',
//   baseQuery: fetchBaseQuery({ baseUrl: '/api/' }), // Adjust base URL if needed
//   endpoints: (builder) => ({
//     getWallet: builder.query<Wallet, string>({
//       query: (userId) => `wallet/${userId}`,
//     }),
//     addTransaction: builder.mutation<Wallet, { walletId: string; amount: number; type: 'credit' | 'debit'; description: string }>({
//       query: (transaction) => ({
//         url: 'wallet/transaction',
//         method: 'POST',
//         body: transaction,
//       }),
//     }),
//   }),
// });

// export const { useGetWalletQuery, useAddTransactionMutation } = walletApi;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
 import { apiSlice } from '../../services/apiSlice';  // We'll use RTK Query API service
 interface WalletState {
    wallet: any;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: WalletState = {
    wallet: null,
    loading: false,
    error: null,
  };
  
  // Async thunk for getting wallet
  export const fetchWallet = createAsyncThunk(
    'wallet/fetchWallet',
    async (userId: string, { rejectWithValue }) => {
      try {
        // No need to use apiSlice.get, use auto-generated hooks instead
        const { data } = await apiSlice.endpoints.getWallet.initiate(userId);
        return data;  // Return the data from the query
      } catch (error: any) {
        return rejectWithValue(error.response?.data || 'Failed to fetch wallet');
      }
    }
  );
  
  // Slice to handle wallet actions
  const walletSlice = createSlice({
    name: 'wallet',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchWallet.pending, (state) => {
          state.loading = true;
        })
        .addCase(fetchWallet.fulfilled, (state, action) => {
          state.wallet = action.payload;
          state.loading = false;
        })
        .addCase(fetchWallet.rejected, (state, action) => {
        //   state.error = action.payload;
          state.loading = false;
        });
    },
  });
  
  export default walletSlice.reducer;