import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    search: '',
  },
  reducers: {
    setSearch(state, { payload }) {
      state.search = payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
