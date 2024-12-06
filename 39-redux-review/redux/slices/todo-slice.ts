import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const limit = 10;
export const fetchTodos = createAsyncThunk(
  "bank/fetchingProducts",
  async (page?: number): Promise<ITodoRes | Error> => {
    const skip = limit * (page || 1) - limit;
    const response = await fetch(
      `https://dummyjson.com/todos?skip=${skip}&limit=${limit}`
    );
    if (!response.ok) return new Error("Something went wrong");
    return await response.json();
  }
);

export interface TodoState {
  todos: ITodo[];
  error: string;
  isError: boolean;
  success: boolean;
  isLoading: boolean;
}

const initialState: TodoState = {
  todos: [],
  error: "",
  isError: false,
  success: false,
  isLoading: false,
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.isLoading = true;
      state.success = false;
      state.isError = false;
    });
    builder.addCase(
      fetchTodos.fulfilled,
      (state, action: PayloadAction<ITodoRes | Error>) => {
        if (action.payload instanceof Error) {
          state.isLoading = false;
          state.success = false;
          state.isError = true;
          state.error = action.payload.message;
          return;
        }
        state.isLoading = false;
        state.success = true;
        state.isError = false;
        state.todos = action.payload.todos;
      }
    );
  },
});

export const todoActions = todoSlice.actions;

export default todoSlice.reducer;
