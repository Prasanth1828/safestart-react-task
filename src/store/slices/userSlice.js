import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  registeredUsers: [
    {
      name: 'Admin User',
      email: 'admin@safestart.com',
      password: '123456',
      avatar: ''
    }
  ],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
    signup: (state, action) => {
      state.registeredUsers.push(action.payload);
    },
  },
});

export const { login, logout, signup } = userSlice.actions;
export default userSlice.reducer;
