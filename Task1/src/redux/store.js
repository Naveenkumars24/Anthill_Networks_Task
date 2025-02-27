import { configureStore } from '@reduxjs/toolkit';
import carReducer from "./carSlice"; 
import searchReducer from "./searchSlice"
const store = configureStore({
  reducer: {
    cars: carReducer,
     searchcar:searchReducer
  },
});

export default store;
