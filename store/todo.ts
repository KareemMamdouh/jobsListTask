import { createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
  name: "todos",
  initialState: ["test"],
  reducers: {},
});

export const {} = todosSlice.actions;
export default todosSlice.reducer;
