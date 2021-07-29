import { configureStore } from '@reduxjs/toolkit';
import layoutReducer from './features/layoutSlice';
import taskReducer from './features/tasksSlice';

export default configureStore({
    reducer: {
        layout: layoutReducer,
        tasks: taskReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});
