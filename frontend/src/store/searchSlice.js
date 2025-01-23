import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    query: "",
    currentPage: 1,
    questions: [],
    totalQuestions: 0,
    itemsPerPage: 10,
  };
  const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
      setQuery(state, action) {
        state.query = action.payload;
      },
      setCurrentPage(state, action) {
        state.currentPage = action.payload;
      },
      setQuestions(state, action) {
        console.log(action);
        state.questions = action.payload.questions;
        state.totalQuestions = action.payload.total;
      },
    },
  });
  
  export const { setQuery, setCurrentPage, setQuestions } = searchSlice.actions;
  export default searchSlice.reducer;