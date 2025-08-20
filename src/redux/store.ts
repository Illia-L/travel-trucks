import { configureStore } from '@reduxjs/toolkit';
import productReducer from './products/slice';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';

const persistConfig = {
  key: 'favouriteProducts',
  storage,
  whitelist: ['favouriteProducts'],
};
const persistedUserReducer = persistReducer(persistConfig, productReducer);

export const store = configureStore({
  reducer: {
    products: persistedUserReducer,
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
