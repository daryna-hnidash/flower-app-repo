import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProducts } from '../helpers/api';
import { Product } from '../helpers/types';

type State = {
  products: Product[];
  isLoading: boolean;
  hasError: boolean;
};

const initialState: State = {
  products: [],
  isLoading: false,
  hasError: false,
};

export const init = createAsyncThunk('products/fetch', () => {
  return getProducts();
});

// export type PropertyParams = {
//   id: number;
//   propertyType: PropertyType;
// };

export const allProductsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, (state: State) => {
      state.isLoading = true;
    });
    builder.addCase(
      init.fulfilled,
      (state: State, action: PayloadAction<Product[]>) => {
        state.isLoading = false;
        state.hasError = false;
        state.products = action.payload;
      },
    );
    builder.addCase(init.rejected, (state: State) => {
      state.hasError = true;
      state.isLoading = false;
    });
  },
});

export const actions = allProductsSlice.actions;
export default allProductsSlice.reducer;
