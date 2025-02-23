import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BlogState } from './types';
import { blogData } from '@/app/lib/data';

const initialState: BlogState = {
  posts: blogData,
  filteredPosts: blogData,
  currentPage: 1,
  searchTerm: '',
  isLoading: false,
  darkMode: false,
  postsPerPage: 5
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.isLoading = true;
      state.filteredPosts = state.posts.filter((post) =>
        post.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.currentPage = 1;
      state.isLoading = false;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    }
  }
});

export const { setSearchTerm, setCurrentPage, setLoading, toggleDarkMode } = blogSlice.actions;
export default blogSlice.reducer;