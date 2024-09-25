import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { Course } from '../../models/course';
import { PaginatedData } from '../../models/paginatedData';
import agent from '../../actions/agent';
import { RootState } from '../store/configureStore';

const coursesAdapter = createEntityAdapter<Course>();

export const getCoursesAsync = createAsyncThunk<
  PaginatedData<Course> | undefined,
  void
>('course/getCoursesAsync', async () => {
  try {
    return await agent.Courses.list();
  } catch (error) {
    console.log(error);
  }
});

export const getCourseAsync = createAsyncThunk<
  Course | undefined,
  { courseId: string }
>('course/getCourseAsync', async ({ courseId }) => {
  try {
    return await agent.Courses.getById(courseId);
  } catch (error) {
    console.log(error);
  }
});

export const courseSlice = createSlice({
  name: 'course',
  initialState: coursesAdapter.getInitialState({
    coursesLoaded: false,
    status: 'idle',
  }),
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCoursesAsync.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getCoursesAsync.fulfilled, (state, action) => {
      coursesAdapter.setMany(state, action.payload!.data);
      state.status = 'idle';
      state.coursesLoaded = true;
    });
    builder.addCase(getCoursesAsync.rejected, (state) => {
      state.status = 'idle';
    });

    builder.addCase(getCourseAsync.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(getCourseAsync.fulfilled, (state, action) => {
      coursesAdapter.upsertOne(state, action.payload!);
      state.status = 'idle';
    });
    builder.addCase(getCourseAsync.rejected, (state) => {
      state.status = 'idle';
    });
  },
});

export const coursesSelector = coursesAdapter.getSelectors(
  (state: RootState) => state.course
);
