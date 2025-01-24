import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    query: "",
    currentPage: 1,
    questions: [],
    totalQuestions: 0,
    itemsPerPage: 10,
    filters:[],
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
        state.questions = action.payload.questions;
        state.totalQuestions = action.payload.total;
      },
      setFilter:(state,action)=>{
        state.filters=action.payload;
      },
      removeFilter:(state,action)=>{
        state.filters=(state.filters).filter((option)=>option!==action.payload);
      }
    },
  });
  
  export const { setQuery, setCurrentPage, setQuestions,setFilter } = searchSlice.actions;
  export default searchSlice.reducer;