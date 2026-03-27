import { configureStore } from "@reduxjs/toolkit";
import entitySlice from "./entity/entity.slice";

export const store = configureStore({
  reducer: {
    entity: entitySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
