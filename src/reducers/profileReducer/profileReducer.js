import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import hipsatgramApi from '../../services/api'



export const fetchCurrentUser = createAsyncThunk('profile/fetchCurrentUser', async () => {
    try {
        return await hipsatgramApi.currentUser()
    } catch(error) {
    }
})

export const profileFollowingUser = createAsyncThunk('profile/profileFollowingUser', async (userId) => {
  try {
      await hipsatgramApi.followUser(userId)
      return userId;
  } catch(error) {
  }
})

export const updateCurrentUser = createAsyncThunk('profile/updateCurrentUser', async (values, { rejectWithValue }) => {
  try {
      return await hipsatgramApi.updateCurrentUser(values);
  } catch(error) {
    return rejectWithValue(error.response.data)
  }
})

export const updatePassword = createAsyncThunk('profile/updatePassword', async (values, { rejectWithValue }) => {
  try {
      return await hipsatgramApi.updateUserPassword(values);
  } catch(error) {
    return rejectWithValue(error.response.data)
  }
})

export const profileReducer = createSlice({
    
    name: 'profile',
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
        isLoading: false,
        isLoaded: false,
        isUserFollowingLoading: false,
        isUpdateLoading: false,
        updateError: '',
        isPasswordLoading: false,
        isUpdateLoaded: false,
    },
    extraReducers: builder => {
      builder
        .addCase(fetchCurrentUser.pending, (state, action) => {
          state.isLoading = true;
          state.isLoaded = false;
        })
        .addCase(fetchCurrentUser.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isLoaded = true;
          state.id = action.payload.id;
          state.firstName = action.payload.firstName;
          state.lastName = action.payload.lastName;
          state.email = action.payload.email
          state.login = action.payload.login
          state.avatar = action.payload.avatar;
          state.posts = action.payload.posts;
          state.followers = action.payload.followers;
          state.following = action.payload.following;
        })
        .addCase(fetchCurrentUser.rejected, (state, action) => {
          state.isLoading = false;
          state.isLoaded = true;
          if (action.error) {
              state.error = action.payload
          }
        })
        .addCase(profileFollowingUser.pending, (state, action) => {
          state.isUserFollowingLoading = true;
        })
        .addCase(profileFollowingUser.fulfilled, (state, action) => {
          if (state.following.find(following => following.id === action.payload)) {
            state.following = state.following.filter(following => following.id !== action.payload)
          } else {
            state.following = [...state.following, {id: action.payload}]
          }
          state.isUserFollowingLoading = false;
        })
        .addCase(updateCurrentUser.pending, (state, action) => {
          state.isUpdateLoading = true;
          state.updateError ='';
          state.isUpdateLoaded = false;
        })
        .addCase(updateCurrentUser.fulfilled, (state, action) => {
          state.id = action.payload.id;
          state.firstName = action.payload.firstName;
          state.lastName = action.payload.lastName;
          state.email = action.payload.email
          state.login = action.payload.login
          state.avatar = action.payload.avatar;
          state.isUpdateLoading = false;
          state.isUpdateLoaded = true;
        })
        .addCase(updateCurrentUser.rejected, (state, action) => {
          state.isUpdateLoading = false;
          state.isUpdateLoaded = false;
          if (action.error) {
              state.updateError = action.payload
          }
        })
        .addCase(updatePassword.pending, (state, action) => {
          state.isPasswordLoading = true;
          state.updateError ='';
          state.isUpdateLoaded = false;
        })
        .addCase(updatePassword.fulfilled, (state, action) => {
          state.isPasswordLoading = false;
          state.isUpdateLoaded = true;
        })
        .addCase(updatePassword.rejected, (state, action) => {
          state.isPasswordLoading = false;
          state.isUpdateLoaded = false;
          if (action.error) {
              state.updateError = action.payload
          }
        })
    },
    reducers: {
      togleFollowing(state, action) {
        if (state.following.find(following => following.id === action.payload)) {
          state.following = state.following.filter(following => following.id !== action.payload)
        } else {
          state.following = [...state.following, {id: action.payload}]
        }
      }
    }
  })
  export const { togleFollowing } = profileReducer.actions

  export default profileReducer.reducer