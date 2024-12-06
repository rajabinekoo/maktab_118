import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

import bankSliceReducer from "./slices/bank-slice";
import todoSliceReducer from "./slices/todo-slice";

const reducers = combineReducers({
  bank: bankSliceReducer,
  todo: todoSliceReducer,
});

const persistedReducer = persistReducer(
  { key: "root", storage, blacklist: ["todo"] },
  reducers
);

export const reduxStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof reduxStore.getState>;
export type AppDispatch = typeof reduxStore.dispatch;
