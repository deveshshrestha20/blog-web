import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { BlogState, BlogPost } from './types';

// Fetch posts asynchronously using Redux Thunk
export const fetchPosts = createAsyncThunk<BlogPost[], void>(
  'blog/fetchPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_DEVTO_API}?per_page=100`);
      const data = await response.json();

      // Type-casting response data to a proper structure
      const posts: BlogPost[] = data.map((post: { 
        id: number; 
        title: string; 
        description: string; 
        body_markdown: string; 
        cover_image: string; 
        tag_list: string[]; 
        user: { name: string }; 
        reading_time_minutes: number; 
      }) => ({
        id: post.id,
        title: post.title,
        summary: post.description,
        content: post.body_markdown || '',
        image: post.cover_image || "https://via.placeholder.com/400x200",
        category: post.tag_list.join(", "),
        author: post.user.name,
        readTime: `${post.reading_time_minutes} min read`,
      }));

      return posts;
    } catch (error: unknown) {
      console.error("Error fetching posts:", error);
      return rejectWithValue("Failed to fetch posts");
    }
  }
);

const initialState: BlogState = {
  posts: [],
  filteredPosts: [],
  currentPage: 1,
  searchTerm: '',
  isLoading: false,
  darkMode: false,
  postsPerPage: 5,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredPosts = state.posts.filter((post) =>
        post.title.toLowerCase().includes(action.payload.toLowerCase())
      );
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
        state.filteredPosts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setSearchTerm, setCurrentPage, toggleDarkMode } = blogSlice.actions;
export default blogSlice.reducer;
