import { configureStore } from "@reduxjs/toolkit";
import { todoReducer } from "./features/todo.slice";
import { brandReducer } from "./features/brand.slice";

export const reduxStore = configureStore({
  reducer: {
    todo: todoReducer,
    brands: brandReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof reduxStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof reduxStore.dispatch;
