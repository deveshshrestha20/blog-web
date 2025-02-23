export interface BlogPost {
    id: number;
    title: string;
    summary: string;
    content: string;
    author: string;
    category: string;
    image: string;
    readTime: string;
  }
  
  export interface BlogState {
    posts: BlogPost[];
    filteredPosts: BlogPost[];
    currentPage: number;
    searchTerm: string;
    isLoading: boolean;
    darkMode: boolean;
    postsPerPage: number;
  }