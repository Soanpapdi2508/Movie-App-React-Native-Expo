import { combineReducers } from "@reduxjs/toolkit";
import savedSlice from "../Slices/Saved";

export const rootReducer = combineReducers({
  savedData: savedSlice.reducer,
});
