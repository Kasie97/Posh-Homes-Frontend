import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// State interface
interface UnitsState {
  totalUnits: number;
  availableUnits: Record<string, any>[];
  unavailableUnits: Record<string, any>[];
  totalAvailableUnits: number;
  totalUnavailableUnits: number;
}



// Initial state
const initialState: UnitsState = {
  totalUnits: 0,
  availableUnits: [],
  unavailableUnits: [],
  totalAvailableUnits: 0,
  totalUnavailableUnits: 0,
};

// Create a slice
const unitsSlice = createSlice({
  name: 'units',
  initialState,
  reducers: {
    setTotalUnits: (state, action: PayloadAction<number>) => {
      state.totalUnits = action.payload;
    },
    setAvailableUnits: (state, action: PayloadAction<Record<string, any>[]>) => {
      state.availableUnits = action.payload;
      state.totalAvailableUnits = action.payload.length;
    },

    setUnavailableUnits: (state, action: PayloadAction<Record<string, any>[]>) => {
      state.unavailableUnits = action.payload;
      state.totalUnavailableUnits = action.payload.length;
    },
  },
});

// Export actions
export const { setTotalUnits, setAvailableUnits, setUnavailableUnits } = unitsSlice.actions;

// Export reducer
export default unitsSlice.reducer;
