import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({user: userReducer});
const persistConfig = {
  key: 'root',
  version: 1,
  storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
  // devTools:true    //used for hide the redux store extenshion
});

export const persistor = persistStore(store)