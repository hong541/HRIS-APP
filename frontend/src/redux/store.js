import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice.js";
import checkOutReducer, { checkInReducer } from "./checkin/checkInReducer.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    checkIn: checkInReducer,
    checkOut: checkOutReducer,
  },
});
