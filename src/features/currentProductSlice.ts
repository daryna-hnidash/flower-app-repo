import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getProductById } from '../helpers/api';
import { Product } from '../helpers/types';

type State = {
  currentProduct: Product | null;
  isLoading: boolean;
  hasError: boolean;
};

const initialState: State = {
  currentProduct: null,
  isLoading: false,
  hasError: false,
};

export const init = createAsyncThunk(
  'currentProduct/fetch',
  (productId: number) => {
    return getProductById(productId) || null;
  },
);

export const currentProductSlice = createSlice({
  name: 'currentProduct',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(init.pending, (state: State) => {
      state.isLoading = true;
    });
    builder.addCase(
      init.fulfilled,
      (state: State, action: PayloadAction<Product | undefined>) => {
        state.isLoading = false;
        state.currentProduct = action.payload ? action.payload : null;
      },
    );
    builder.addCase(init.rejected, (state: State) => {
      state.hasError = true;
      state.isLoading = false;
    });
  },
});

export const actions = currentProductSlice.actions;
export default currentProductSlice.reducer;
