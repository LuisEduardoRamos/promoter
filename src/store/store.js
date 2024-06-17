import { configureStore } from "@reduxjs/toolkit";
import prospectReducer from "./prospect";

const store = configureStore({
  reducer: {
    prospect: prospectReducer,
  },
});

export default store;
