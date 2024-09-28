import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { Login, Register, User } from '../../models/user';
import agent from '../../actions/agent';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const signInUser = createAsyncThunk<User, Login>(
  'user/signin',
  async (data, thunkAPI) => {
    try {
      const user = await agent.Users.login(data);
      localStorage.setItem('user', JSON.stringify(user));
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
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(signInUser.fulfilled, registerUser.fulfilled),
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

export const { signOut } = userSlice.actions;
