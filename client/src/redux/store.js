import { configureStore } from "@reduxjs/toolkit";
// import userSliceReducer from "./userSlice";
// export const store = configureStore({
//   reducer: {
//     user: userSliceReducer,
//   },
// });


// import {configureStore} from '@reduxjs/toolkit';
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import storage from "redux-persist/lib/storage";

 import userReducer from "./userSlice";

  const persistConfig = {
    key: "root",
    version: 1,
    storage,
  };

  const rootReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: { user: rootReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);
// export default store;
export {store, persistor};