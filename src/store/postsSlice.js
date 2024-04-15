import { createSlice, nanoid, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const initialState = {
  data: [],
  loading: true,
  error: null,
};

export const fetchAllposts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (limit) => {
    const res = await axios.get(`https://dummyjson.com/posts?limit=${limit}`);
    console.log(res.data);
    return res.data;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: {
      reducer: (state, { payload }) => {
        state.data = [payload, ...state.data];
        localStorage.setItem("posts", JSON.stringify(state.data));
      },
      prepare: (title, content) => ({
        payload: {
          title,
          content,
          id: nanoid(),
        },
      }),
    },
    deletePost: (state, { payload }) => {
      state.data = state.data.filter((p) => p.id !== payload);
      localStorage.setItem("posts", JSON.stringify(state.data));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllposts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllposts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchAllposts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addPost, deletePost, setLimit } = postsSlice.actions;

export const getAllPosts = (s) => {
  console.log(s.posts.data);
  return s.posts.data;
};
export const findPostById = (s, id) => s.posts.data.find((p) => p.id === id);

export default postsSlice.reducer;
