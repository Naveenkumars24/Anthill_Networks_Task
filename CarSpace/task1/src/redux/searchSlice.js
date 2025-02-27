// import { createSlice } from "@reduxjs/toolkit";
// import { carData } from "../cars";

// const initialState = {
//   cars: carData,
//   filteredCars: carData.filter(car => car.type === "used"), 
//   selectedCategory: "used",
//   selectedMake: "",
//   selectedModel: "",
//   selectedPriceRanges: [],
// };

// const searchSlice = createSlice({
//   name: "searchcar",
//   initialState,
//   reducers: {
//     setCategory: (state, action) => {
//       state.selectedCategory = action.payload;
//       state.selectedMake = "";
//       state.selectedModel = "";
//       state.selectedPriceRanges = [];
//       state.filteredCars = state.cars.filter(car => car.type === action.payload);
//     },
//     setMake: (state, action) => {
//       state.selectedMake = action.payload;
//       state.filteredCars = state.cars.filter(
//         (car) =>
//           car.type === state.selectedCategory && // Ensure category matches
//           (car.make === action.payload || action.payload === "")
//       );
//     },
//     setModel: (state, action) => {
//       state.selectedModel = action.payload;
//       state.filteredCars = state.cars.filter(
//         (car) =>
//           car.type === state.selectedCategory && // Ensure category matches
//           (state.selectedMake ? car.make === state.selectedMake : true) &&
//           (car.model === action.payload || action.payload === "")
//       );
//     },
//     setPriceRange: (state, action) => {
//       state.selectedPriceRanges = action.payload;
//       state.filteredCars = state.cars.filter(
//         (car) =>
//           car.type === state.selectedCategory && // Ensure category matches
//           (state.selectedMake ? car.make === state.selectedMake : true) &&
//           (state.selectedModel ? car.model === state.selectedModel : true) &&
//           (action.payload.length === 0 || action.payload.includes(car.priceRange))
//       );
//     },
//   },
// });

// export const { setMake, setModel, setPriceRange, setCategory } = searchSlice.actions;
// export default searchSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../firebase/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

// Async thunk to fetch cars from Firestore
export const fetchCars = createAsyncThunk("searchcar/fetchCars", async () => {
  const querySnapshot = await getDocs(collection(db, "cars"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

const initialState = {
  cars: [],
  filteredCars: [],
  selectedCategory: "used",
  selectedMake: "",
  selectedModel: "",
  selectedPriceRanges: [],
  status: "idle", // "idle" | "loading" | "succeeded" | "failed"
};

const searchSlice = createSlice({
  name: "searchcar",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedMake = "";
      state.selectedModel = "";
      state.selectedPriceRanges = [];
      state.filteredCars = state.cars.filter((car) => car.type === action.payload);
    },
    setMake: (state, action) => {
      state.selectedMake = action.payload;
      state.filteredCars = state.cars.filter(
        (car) =>
          car.type === state.selectedCategory &&
          (car.make === action.payload || action.payload === "")
      );
    },
    setModel: (state, action) => {
      state.selectedModel = action.payload;
      state.filteredCars = state.cars.filter(
        (car) =>
          car.type === state.selectedCategory &&
          (state.selectedMake ? car.make === state.selectedMake : true) &&
          (car.model === action.payload || action.payload === "")
      );
    },
    setPriceRange: (state, action) => {
      state.selectedPriceRanges = action.payload;
      state.filteredCars = state.cars.filter(
        (car) =>
          car.type === state.selectedCategory &&
          (state.selectedMake ? car.make === state.selectedMake : true) &&
          (state.selectedModel ? car.model === state.selectedModel : true) &&
          (action.payload.length === 0 || action.payload.includes(car.priceRange))
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cars = action.payload;
        state.filteredCars = action.payload.filter((car) => car.type === state.selectedCategory);
      })
      .addCase(fetchCars.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setMake, setModel, setPriceRange, setCategory } = searchSlice.actions;
export default searchSlice.reducer;
