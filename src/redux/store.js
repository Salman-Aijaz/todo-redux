import { configureStore } from "@reduxjs/toolkit";
import { reducer as todoReducer} from "./reducer";

const store = configureStore({
  reducer:{
    todos:todoReducer
  },
});

export default store;