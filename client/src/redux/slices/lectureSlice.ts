import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { Lecture } from '../../models/lecture';
import agent from '../../actions/agent';

interface LectureState {
  lecture: Lecture | null;
  currentLecture: number;
  currentVideo: string;
  lectureLoaded: boolean;
}

const lecturesAdapter = createEntityAdapter<Lecture>();

export const getLecturesAsync = createAsyncThunk<
  Lecture | undefined,
  { courseId: string }
>('lecture/getLecturesAsync', async ({ courseId }, thunkAPI) => {
  try {
    return await agent.Lectures.getLectures(courseId);
  } catch (error) {
    return thunkAPI.rejectWithValue({ error });
  }
});

export const setCurrentLectureAsync = createAsyncThunk<
  void,
  { lectureId: number; courseId: string }
>(
  'lecture/setCurrentLectureAsync',
  async ({ lectureId, courseId }, thunkAPI) => {
    try {
      await agent.Lectures.setCurrentLecture({ lectureId, courseId });
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const lectureSlice = createSlice({
  name: 'lecture',
  initialState: lecturesAdapter.getInitialState<LectureState>({
    lecture: null,
    lectureLoaded: false,
    currentLecture: 0,
    currentVideo: '',
  }),
  reducers: {
    setCurrentLecture: (state, action) => {
      state.currentLecture = action.payload;
    },
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getLecturesAsync.pending, (state) => {
      state.lectureLoaded = false;
    });
    builder.addCase(getLecturesAsync.fulfilled, (state, action) => {
      state.lectureLoaded = true;
      state.lecture = action.payload!;
      state.currentLecture = action.payload!.currentLecture!;
    });
    builder.addCase(getLecturesAsync.rejected, (state) => {
      state.lectureLoaded = true;
    });
  },
});

export const { setCurrentLecture, setCurrentVideo } = lectureSlice.actions;
