import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import hipsatgramApi from '../../services/api'
const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null

    export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (values, { rejectWithValue }) => {

    try {
        const { access_token } = await hipsatgramApi.login(values);
        localStorage.setItem('userToken', access_token);
        return access_token;
    } catch(error) {
        return rejectWithValue(error.response.data)
    }
})



export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    access_token: userToken,
    isLoading: false,
    error: '',
  },
  extraReducers: builder => {
    builder
      .addCase(fetchLogin.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.access_token = action.payload;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.isLoading = false;
        if (action.error) {
            state.error = action.error.message
        }
      })
  },
    reducers: {
        logOut(state) {
            localStorage.setItem('userToken', '');
            state.access_token = '';
        }
  }
})

// Action creators are generated for each case reducer function
export const { logOut } = authReducer.actions

export default authReducer.reducer

// ////////

