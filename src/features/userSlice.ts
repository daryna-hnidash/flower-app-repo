import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderInfo, User } from "../helpers/types";

type State = {
  user: User | null,
}

const initialState: State = {
  user: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = null
    },
    setOrderDerails: (state, action: PayloadAction<OrderInfo>) => {
      if (state.user) {
        state.user.orderDetails = action.payload
      }
    }
  },
});

export const actions = userSlice.actions;
export default userSlice.reducer;
