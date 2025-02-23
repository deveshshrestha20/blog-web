"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiSearch } from "react-icons/fi";
import { Pagination } from "@mui/material";
import BlogPostCard from "../components/BlogPostCard";
import BlogSkeleton from "../components/SkeletonBlog";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setSearchTerm, setCurrentPage } from "@/store/blogSlice";

const BlogPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  
  const {
    filteredPosts,
    currentPage,
    searchTerm,
    postsPerPage
  } = useAppSelector((state) => state.blog);

  const [isLocalLoading, setIsLocalLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);


  useEffect(() => {
    const page = searchParams.get("page");
    const initialPage = page ? parseInt(page) : 1;
    if (initialPage !== currentPage) {
      dispatch(setCurrentPage(initialPage));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run on mount

  // Initial load
  useEffect(() => {
    setIsLocalLoading(true);
    setShowContent(false);

    const loadTimer = setTimeout(() => {
      setIsLocalLoading(false);
      setShowContent(true);
    }, 500);

    return () => clearTimeout(loadTimer);
  }, []);

  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    setIsLocalLoading(true);
    setShowContent(false);

    const searchTimer = setTimeout(() => {
      dispatch(setSearchTerm(searchTerm));
      
      // Reset to page 1 when searching
      dispatch(setCurrentPage(1));
      router.push(`/blog?page=1${searchTerm ? `&search=${searchTerm}` : ''}`);

      setTimeout(() => {
        setIsLocalLoading(false);
        setShowContent(true);
      }, 500);
    }, 500);

    return () => clearTimeout(searchTimer);
  }, [searchTerm, dispatch, router]);

  // Handle page change with URL update
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    if (value !== currentPage) {
      setIsLocalLoading(true);
      setShowContent(false);
      
      dispatch(setCurrentPage(value));
      router.push(`/blog?page=${value}${searchTerm ? `&search=${searchTerm}` : ''}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      setTimeout(() => {
        setIsLocalLoading(false);
        setShowContent(true);
      }, 500);
    }
  };

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-gray-100 py-8 px-4 transition-all">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-semibold text-white">Blog Posts</h1>
        </div>

        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts by title..."
              className="w-full p-3 pl-10 rounded-lg border bg-[#2A2A2A] border-[#333333] text-white placeholder-gray-400 focus:ring-[#4A4A4A] focus:ring-2 transition-all"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
            <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
          </div>
        </div>

        {isLocalLoading ? (
          <BlogSkeleton count={postsPerPage} />
        ) : showContent && (
          <>
            {filteredPosts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {currentPosts.map((post) => (
                    <BlogPostCard key={post.id} post={post} />
                  ))}
                </div>

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
                      "& .MuiPaginationItem-root": {
                        backgroundColor: "#333333",
                        color: "white",
                        borderRadius: "8px",
                        "&.Mui-selected": {
                          backgroundColor: "#4A4A4A",
                          color: "white",
                        },
                        "&:hover": {
                          backgroundColor: "#444444",
                        },
                      },
                    }}
                  />
                </div>
              </>
            ) : (
              <p className="text-center text-white">No posts found.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BlogPage;