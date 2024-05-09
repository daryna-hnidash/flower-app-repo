import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../helpers/types';

const dataFromStorage = localStorage.getItem('orders');

const initialState: Order[] = dataFromStorage
  ? JSON.parse(dataFromStorage)
  : [];

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    add: (orders, action: PayloadAction<Order>) => {
      orders.push(action.payload);
    },
  },
});

export const actions = ordersSlice.actions;
export default ordersSlice.reducer;
