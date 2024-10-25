import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { ITodo } from "../../types/todo.type";

export interface TodoListState {
  list: ITodo[];
}

const initialState: TodoListState = {
  list: [],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<ITodo>) => {
      state.list.push(action.payload);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((el) => el.id !== action.payload);
    },
    complete: (state, action: PayloadAction<string>) => {
      state.list = state.list.map((el) => {
        if (el.id === action.payload) {
          return { ...el, completed: true };
        }
        return el;
      });
    },
    inprogress: (state, action: PayloadAction<string>) => {
      state.list = state.list.map((el) => {
        if (el.id === action.payload) {
          return { ...el, completed: false };
        }
        return el;
      });
    },
  },
});

// Action creators are generated for each case reducer function
export const todoActions = todoSlice.actions;
export const todoReducer = todoSlice.reducer;
