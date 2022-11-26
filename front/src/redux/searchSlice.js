import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    search: '',
    memorySort: 'createdAt,desc',
    path: '/',
  },
  reducers: {
    setSearch(state, { payload }) {
      state.search = payload;
    },
    setSort(state, { payload }) {
      state.memorySort = payload;
    },
    setPath(state, { payload }) {
      state.path = payload;
    },
  },
});

export const searchActions = searchSlice.actions;

export default searchSlice.reducer;
