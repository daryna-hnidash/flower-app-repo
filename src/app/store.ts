import { configureStore } from '@reduxjs/toolkit';
import favoritesReducer from '../features/favoritesSlice';
import ordersReducer from '../features/ordersSlice';
import cartItemsReducer from '../features/cartItemsSlice';
import currentProductReduser from '../features/currentProductSlice';
import allProductsReduser from '../features/allProductsSlice';
import userReducer from '../features/userSlice';

import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
  cartItems: cartItemsReducer,
  orders: ordersReducer,
  products: allProductsReduser,
  currentProduct: currentProductReduser,
  user: userReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
