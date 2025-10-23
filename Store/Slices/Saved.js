const { createSlice } = require("@reduxjs/toolkit");

const savedInitialState = {
  savedData: [],
};

const savedSlice = createSlice({
  name: "savedData",
  initialState: savedInitialState,
  reducers: {
    setSavedData: (state, value) => {
      state.savedData = value.payload;
    },
    addSaved: (state, value) => {
      state.savedData.push(value.payload);
    },
  },
});

export const { setSavedData, addSaved } = savedSlice.actions;
export default savedSlice;
