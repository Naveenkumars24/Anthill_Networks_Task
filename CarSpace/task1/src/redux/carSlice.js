import { createSlice } from '@reduxjs/toolkit';
import { carData } from "../cars"; // Import car data from cars.js

// Create Car Slice
const carSlice = createSlice({
  name: 'cars',
  initialState: { cars: carData }, // Set JSON data as initial state
  reducers: {
    addCar: (state, action) => {
      state.cars.push(action.payload);
    },
  },
});

// Export Actions
export const { addCar } = carSlice.actions;

// ✅ Fix: Default export the reducer, not the object itself
export default carSlice.reducer;
