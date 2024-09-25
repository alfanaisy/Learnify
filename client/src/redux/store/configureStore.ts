import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '../slices/loginSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { basketSlice } from '../slices/basketSlice';
import { courseSlice } from '../slices/courseSlice';
import { categorySlice } from '../slices/categorySlice';

export const store = configureStore({
  reducer: {
    login: loginSlice.reducer,
    basket: basketSlice.reducer,
    course: courseSlice.reducer,
    category: categorySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
