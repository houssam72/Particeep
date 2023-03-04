import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { movies$ } from "../data/movies";

const initialState = {
  loading: false,
  users: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return movies$.then((res) =>
    res.map((user) => {
      let tab = user;
      tab.likeActive = false;
      tab.dislikeActive = false;
      return tab;
    })
  );
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    handleLike: (state, action) => {
      state.users.forEach((user) => {
        if (user.id == action.payload) {
          if (!user.likeActive && !user.dislikeActive) {
            user.likeActive = true;
            user.likes++;
          }
          else if(user.likeActive && !user.dislikeActive){
            user.likeActive = false;
            user.likes--;
          }
          else if(!user.likeActive && user.dislikeActive){
            user.dislikeActive = false;
            user.dislikes--;
            user.likeActive = true;
            user.likes++;
          }
        }
      });
    },
    handleDislike:(state,action)=>{
      state.users.forEach((user) => {
        if (user.id == action.payload) {
          if (!user.likeActive && !user.dislikeActive) {
            user.dislikeActive = true;
            user.dislikes++;
          }
          else if(user.dislikeActive && !user.likeActive){
            user.dislikeActive=false
            user.dislikes--;
          }
          else if(!user.dislikeActive && user.likeActive){
            user.likeActive=false;
            user.likes--;
            user.dislikeActive=true
            user.dislikes++
          }
        }})     
    },
    deleteItem: (state, action) => {
      state.users = state.users.filter((user) => user.id != action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.users = [];
      state.error = action.error.message;
    });
  },
});

export const useReducer = userSlice.reducer;
export const { deleteItem, handleLike ,handleDislike } = userSlice.actions;
