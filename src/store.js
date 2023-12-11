import { configureStore } from "@reduxjs/toolkit";
import location from "./store/reducers/locations";
export default configureStore({
  reducer: { location },
});
