'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import { Pagination } from '@mui/material';
import BlogPostCard from '../components/BlogPostCard';
import BlogSkeleton from '../components/SkeletonBlog';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchPosts, setCurrentPage, setSearchTerm } from '@/store/blogSlice';

const BlogPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  const { filteredPosts, currentPage, searchTerm, postsPerPage, isLoading } = useAppSelector(
    (state) => state.blog
  );

  // Single loading state to manage all loading scenarios
  const [isPageLoading, setIsPageLoading] = useState(true);
  
  // Debounced search state
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);

  // Filter out posts with invalid image URLs
  const isValidImage = useCallback((imageUrl: string) => {
    return imageUrl && !imageUrl.includes('via.placeholder.com') && !imageUrl.includes('localhost');
  }, []);

  const validPosts = filteredPosts.filter(post => isValidImage(post.image));
  const currentPosts = validPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage);
  const totalPages = Math.ceil(validPosts.length / postsPerPage);

  // Initial posts fetch
  useEffect(() => {
    const initializePage = async () => {
      setIsPageLoading(true);
      await dispatch(fetchPosts());
      setIsPageLoading(false);
    };

    initializePage();
  }, [dispatch]);

  // Sync page number from URL
  useEffect(() => {
    const page = searchParams.get('page');
    const initialPage = page ? parseInt(page) : 1;
    if (initialPage !== currentPage) {
      dispatch(setCurrentPage(initialPage));
    }
  }, [searchParams, currentPage, dispatch]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedSearch !== searchTerm) {
        setIsPageLoading(true);
        dispatch(setSearchTerm(debouncedSearch));
        dispatch(setCurrentPage(1));
        router.push(`/blog?page=1${debouncedSearch ? `&search=${debouncedSearch}` : ''}`);
        
        // Add a small delay before removing loading state
        setTimeout(() => {
          setIsPageLoading(false);
        }, 300);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedSearch, dispatch, router, searchTerm]);

  // Handle pagination changes
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    if (value !== currentPage) {
      setIsPageLoading(true);
      dispatch(setCurrentPage(value));
      router.push(`/blog?page=${value}${searchTerm ? `&search=${searchTerm}` : ''}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Add a small delay before removing loading state
      setTimeout(() => {
        setIsPageLoading(false);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-gray-100 py-8 px-4 transition-all">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center items-center mb-8">
          <h1 className="text-3xl font-semibold text-white">Blog Posts</h1>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts by title..."
              className="w-full p-3 pl-10 rounded-lg border bg-[#2A2A2A] border-[#333333] text-white placeholder-gray-400 focus:ring-[#4A4A4A] focus:ring-2 transition-all"
              value={debouncedSearch}
              onChange={(e) => setDebouncedSearch(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        {/* Content Section */}
        <div className={`transition-opacity duration-300 ${isPageLoading ? 'opacity-50' : 'opacity-100'}`}>
          {isLoading || isPageLoading ? (
            <BlogSkeleton count={postsPerPage} />
          ) : validPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <Pagination
                    count={totalPages}
                    page={currentPage}
                    onChange={handlePageChange}
                    color="primary"
                    siblingCount={1}
                    boundaryCount={1}
                    size="large"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        backgroundColor: '#333333',
                        color: 'white',
                        borderRadius: '8px',
                        '&.Mui-selected': {
                          backgroundColor: '#4A4A4A',
                          color: 'white',
                        },
                        '&:hover': {
                          backgroundColor: '#444444',
                        },
                      },
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-white">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;