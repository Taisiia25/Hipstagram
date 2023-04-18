import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import hipsatgramApi from '../../services/api'

export const fetchRegistration = createAsyncThunk('reg/fetchRegistration', async (values, { rejectWithValue }) => {
    try {
        return await hipsatgramApi.registration(values)
    } catch(error) {
        return rejectWithValue(error.response.data)
    }
})

export const regReducer = createSlice({
    
    name: 'reg',
    initialState: {
      id: '',
      isLoading: false,
      error: '',
    },
    extraReducers: builder => {
      builder
        .addCase(fetchRegistration.pending, (state, action) => {
          state.isLoading = true;
        })
        .addCase(fetchRegistration.fulfilled, (state, action) => {
          state.isLoading = false;
          state.id = action.payload.id;
        })
        .addCase(fetchRegistration.rejected, (state, action) => {
          state.isLoading = false;
          if (action.error) {
              state.error = action.payload
          }
        })
    }
  })
  
  export default regReducer.reducer