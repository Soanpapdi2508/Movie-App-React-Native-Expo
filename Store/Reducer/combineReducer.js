import { combineReducers } from "@reduxjs/toolkit";
import savedSlice from "../Slices/Saved";

export default rootReducer = combineReducers({
  savedData: savedSlice.reducer,
});
