const { createSlice } = require("@reduxjs/toolkit");

const savedInitialState = {
  savedData: [],
};

const savedSlice = createSlice({
  name: "savedData",
  initialState: savedInitialState,
  reducers: {
    setSavedData: (state, action ) => {
      state.savedData = action .payload;
    },
    addSaved: (state, action ) => {
      state.savedData.push(action .payload);
    },
  },
});

export const { setSavedData, addSaved } = savedSlice.actions;
export default savedSlice;
