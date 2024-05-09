import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartItem } from '../helpers/types';

const data = localStorage.getItem('cartItems');
const initialState: CartItem[] = data ? JSON.parse(data) : [];

export const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    add: (cartItems, action: PayloadAction<CartItem>) => {
      cartItems.push(action.payload);
    },
    changeItem: (cartItems, action: PayloadAction<CartItem>) => {
      return cartItems.map(item => {
        if (item.id === action.payload.id) {
          return action.payload;
        } else {
          return item;
        }
      });
    },
    remove: (cartItems, action: PayloadAction<number>) => {
      return cartItems.filter(item => item.id !== action.payload);
    },
  },
});

export const actions = cartItemsSlice.actions;
export default cartItemsSlice.reducer;
