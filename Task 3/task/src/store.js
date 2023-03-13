import { configureStore, createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    fetchUsersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchUsersStart, fetchUsersSuccess, fetchUsersFailure } = usersSlice.actions;

export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersStart());

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    dispatch(fetchUsersSuccess(data));
  } catch (error) {
    dispatch(fetchUsersFailure(error.message));
  }
};

export default configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});
