import { createSlice } from '@reduxjs/toolkit';

const sessionIndexState = {
  temp: 0,
};

const sessionSlice = createSlice({
  name: 'index',
  initialState: sessionIndexState,
  reducers: {
    
  },
});

export const sessionAction = sessionSlice.actions;

export default sessionSlice.reducer;