import { configureStore } from "@reduxjs/toolkit";
import moveReducer from "../reducers/moveSlice";
import personReducer from "../reducers/personSlice";
import tvReducer from "../reducers/tvSlice";

export const store = configureStore({
  reducer: {
    movie: moveReducer,
    person: personReducer,
    tv: tvReducer,
  },
});
