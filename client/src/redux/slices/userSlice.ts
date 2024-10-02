import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { Login, Register, User } from '../../models/user';
import agent from '../../actions/agent';
import { setBasket } from './basketSlice';
import { Course } from '../../models/course';
import { notification } from 'antd';

interface UserState {
  user: User | null;
  userCourses: Course[];
}

const initialState: UserState = {
  user: null,
  userCourses: [],
};

export const fetchCurrentUser = createAsyncThunk<User>(
  'user/fetchCurrentUser',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));
    try {
      const userDto = await agent.Users.currentUser();
      const { basket, courses, ...user } = userDto;
      if (basket) thunkAPI.dispatch(setBasket(basket));
      if (courses) thunkAPI.dispatch(setUserCourses(courses));
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  },
  {
    condition: () => {
      if (!localStorage.getItem('user')) return false;
    },
  }
);

export const signInUser = createAsyncThunk<User, Login>(
  'user/signin',
  async (data, thunkAPI) => {
    try {
      const userData = await agent.Users.login(data);
      const { basket, ...user } = userData;
      if (basket) thunkAPI.dispatch(setBasket(basket));
      localStorage.setItem('user', JSON.stringify(userData));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const registerUser = createAsyncThunk<User, Register>(
  'user/register',
  async (data, thunkAPI) => {
    try {
      const user = await agent.Users.register(data);
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error });
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    signOut: (state) => {
      state.user = null;
      localStorage.removeItem('user');
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserCourses: (state, action) => {
      state.userCourses = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.rejected, (state) => {
      state.user = null;
      localStorage.removeItem('user');
      notification.error({ message: 'Session has expired' });
    });

    builder.addMatcher(
      isAnyOf(
        signInUser.fulfilled,
        registerUser.fulfilled,
        fetchCurrentUser.fulfilled
      ),
      (state, action) => {
        state.user = action.payload;
      }
    );

    builder.addMatcher(
      isAnyOf(signInUser.rejected, registerUser.rejected),
      (_, action) => {
        throw action.payload;
      }
    );
  },
});

export const { signOut, setUser, setUserCourses } = userSlice.actions;
