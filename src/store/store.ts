import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import { persistStore, persistReducer } from 'redux-persist';
import type { PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { videoSlice } from './slices/videoSlice';
import { notificationSlice } from './slices/notificationSlice';

const authPersistConfig: PersistConfig<ReturnType<typeof authSlice.reducer>> = {
    key: 'auth',
    storage,
    whitelist: ['token', 'loggedInUser', 'notification'],
};

const rootReducer = combineReducers({
    auth: persistReducer(authPersistConfig, authSlice.reducer),
    video: videoSlice.reducer,
    notification: notificationSlice.reducer
});

const persistedReducer = persistReducer(
    {
        key: 'root',
        storage,
        whitelist: ['auth'],
    },
    rootReducer
);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
