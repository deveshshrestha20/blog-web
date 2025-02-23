// src/app/[page]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Pagination } from "@mui/material";
import BlogPostCard from "../components/BlogPostCard";
import { blogData } from "../lib/data";
import BlogSkeleton from "../components/SkeletonBlog";
import { useRouter, useParams } from "next/navigation";


const BlogPage = () => {
    const params = useParams();
    const pageNumber = params?.page ? parseInt(params.page as string) : 1;
    
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPosts, setFilteredPosts] = useState(blogData);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(pageNumber);
    const router = useRouter();
  
    const POSTS_PER_PAGE = 5;
  
    // Calculate the starting and ending index for the current page
    const indexOfLastPost = currentPage * POSTS_PER_PAGE;
    const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  
    // Separate effect for search term changes
    useEffect(() => {
      const timeout = setTimeout(() => {
        setIsLoading(true);
        const filtered = blogData.filter((post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(filtered);
        setIsLoading(false);
        
        // Only redirect to page 1 if there's an actual search term
        if (searchTerm) {
          setCurrentPage(1);
          router.push('/1');
        }
      }, 500);
  
      return () => clearTimeout(timeout);
    }, [searchTerm, router]);
  
    // Separate effect for page number changes from URL
    useEffect(() => {
      if (pageNumber !== currentPage) {
        setCurrentPage(pageNumber);
      }
    }, [pageNumber]);
  
    // Handle page change
    const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
      if (value !== currentPage) {
        setCurrentPage(value);
        router.push(`/${value}`);
      }
    };
  
    // Calculate total pages
    const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  
    return (
      <div className="min-h-screen bg-[#1A1A1A] text-gray-100 py-8 px-4 transition-all">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold text-white">Blog Posts</h1>
          </div>
  
          {/* Search Input */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts by title..."
                className="w-full p-3 pl-10 rounded-lg border bg-[#2A2A2A] border-[#333333] text-white placeholder-gray-400 focus:ring-[#4A4A4A] focus:ring-2 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>
  
          {/* Posts or Skeleton Loader */}
          {isLoading ? (
            <BlogSkeleton count={POSTS_PER_PAGE} />
          ) : filteredPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
  
              {/* Pagination */}
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
        </div>
      </div>
    );
  };
  
  export default BlogPage;