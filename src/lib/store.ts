import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './features/example/exampleSlice';
import { registerSlice } from './features/user/registerSlice';
import cartReducer from './features/cart/cartSlice';

const rootReducer = combineReducers({
  counter: counterSlice.reducer,
  register: registerSlice.reducer,
  cart: cartReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
