import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import hipsatgramApi from '../../services/api'
import { togleFollowing }  from '../profileReducer/profileReducer'

export const fetchUser = createAsyncThunk('user/fetchUser', async (id) => {
    try {
        return await hipsatgramApi.getUserById(id)
    } catch(error) {
    }
})

export const getFollowUserById = createAsyncThunk('user/getFollowUserById', async (id) => {
    try {
        return await hipsatgramApi.getFollowUserById(id)
    } catch(error) {
    }
})

export const profileFollowingUser = createAsyncThunk('user/profileFollowingUser', async ({id, isFollowing}, thunkApi) => {
    try {
        await hipsatgramApi.followUser(id)
        thunkApi.dispatch(togleFollowing(id))
        return {id, isFollowing};
    } catch(error) {
    }
  })

export const userReducer = createSlice({
    
    name: 'user',
    initialState: {
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        login: "",
        avatar: "",
        posts: [],
        followers: [],
        following: [],
        followersCount: 0,
        followingsCount: 0,
        isLoading: false,
        isLoaded: false,
        isFollowingLoading: false,
    },
    extraReducers: builder => {
      builder
        .addCase(fetchUser.pending, (state, action) => {
          state.isLoading = true;
          state.isLoaded = false;
        })
        .addCase(fetchUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isLoaded = true;
          state.id = action.payload.id;
          state.firstName = action.payload.firstName;
          state.lastName = action.payload.lastName;
          state.email = action.payload.email
          state.login = action.payload.login
          state.avatar = action.payload.avatar;
          state.posts = action.payload.posts;
          state.followersCount = action.payload.followersCount;
          state.followingsCount = action.payload.followingsCount;
        })
        .addCase(fetchUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isLoaded = true;
          if (action.error) {
              state.error = action.payload
          }
        })
        .addCase(getFollowUserById.fulfilled, (state, action) => {
            state.followers = action.payload.followers;
            state.following = action.payload.following;
          })
        .addCase(profileFollowingUser.pending, (state, action) => {
            state.isFollowingLoading = true;
          })
        .addCase(profileFollowingUser.fulfilled, (state, action) => {
            state.isFollowingLoading = false;
           if (action.payload.isFollowing) {
            state.followersCount = state.followersCount - 1
           } else {
            state.followersCount = state.followersCount + 1
           }
        })
    },
    reducers: {
        cleanUser(state) {
            state.id = '';
            state.firstName = '';
            state.lastName = '';
            state.email = '';
            state.login = '';
            state.avatar = '';
            state.posts = [];
            state.followersCount = 0;
            state.followingsCount = 0;
        }
  }
  })
  
  export const { cleanUser } = userReducer.actions

  export default userReducer.reducer