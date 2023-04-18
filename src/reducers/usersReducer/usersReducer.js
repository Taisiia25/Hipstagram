import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import hipsatgramApi from '../../services/api'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (serchName) => {
    try {
        return await hipsatgramApi.getUsers(serchName)
    } catch(error) {
    }
})

export const followUser = createAsyncThunk('users/followUser', async (userId) => {
    try {
        await hipsatgramApi.followUser(userId)
        return userId;
    } catch(error) {
    }
})

export const usersReducer = createSlice({
    
    name: 'users',
    initialState: {
        userList: [],
        isLoading: false,
        isLoaded: false,
        isFollowIdLoading: '',
    },
    extraReducers: builder => {
      builder
        .addCase(fetchUsers.pending, (state, action) => {
          state.isLoading = true;
          state.isLoaded = false;
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.userList = action.payload;
            state.isLoading = false;
            state.isLoaded = true;
        })
        .addCase(fetchUsers.rejected, (state, action) => {
          state.isLoading = false;
          state.isLoaded = true;
          if (action.error) {
              state.error = action.payload
          }
        })
        .addCase(followUser.pending, (state, action) => {
            state.isFollowIdLoading = action.meta.arg;
          })
        .addCase(followUser.fulfilled, (state, action) => {
              state.userList = state.userList.map(user => user._id === action.payload ? {...user, isFollow: !user.isFollow} : user);
              state.isFollowIdLoading = '';
        })
    }
  })
  
  export default usersReducer.reducer