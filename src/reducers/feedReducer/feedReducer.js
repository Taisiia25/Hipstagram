// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import hipsatgramApi from '../../services/api'

// export const fetchFeed = createAsyncThunk('feed/fetchFeed', async () => {
//     try {
//         return await hipsatgramApi.feedPosts()
//     } catch(error) {
//     }
// })

// export const feedReducer = createSlice({
    
//     name: 'feed',
//     initialState: [
//         _id = "",
//         imgUrl = "",
//         title = "",
//         likes = [],
//         ownerId = "",
//         isLoading = false,
//         isLoaded = false,
//     ],
//     extraReducers: builder => {
//       builder
//         .addCase(feedReducer.pending, (state, action) => {
//           state.isLoading = true;
//           state.isLoaded = false;
//         })
//         .addCase(feedReducer.fulfilled, (state, action) => {
//           state.isLoading = false;
//           state.isLoaded = true;
//           _id = action.payload._id,
//           imgUrl = action.payload.imgUrl,
//           title = action.payload.title,
//           likes = action.payload.likes,
//           ownerId = action.payload.ownerId
        
//         })
//         .addCase(feedReducer.rejected, (state, action) => {
//           state.isLoading = false;
//           state.isLoaded = true;
//           if (action.error) {
//               state.error = action.payload
//           }
//         })
//     }
//   })
  
//   export default feedReducer.reducer