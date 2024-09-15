import { configureStore } from '@reduxjs/toolkit';
import serviceReducer from './slices/serviceSlice';

export const store = configureStore({
  reducer: {
    services: serviceReducer,
    // Add other reducers here as needed
  },
});

export default store;