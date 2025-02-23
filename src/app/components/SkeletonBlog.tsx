import React from 'react';

const SkeletonBlogCard = () => {
  return (
    <div className="bg-white dark:bg-[#2A2A2A] rounded-xl overflow-hidden transition-all duration-300 border border-[#E5E5E5] dark:border-[#333333]">
      <div className="relative w-full h-56 bg-[#E5E5E5] dark:bg-[#333333] animate-pulse" />
      <div className="p-5 space-y-3">
        {/* Category skeleton */}
        <div className="w-24 h-6 bg-[#E5E5E5] dark:bg-[#333333] rounded-full animate-pulse" />
        
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="w-3/4 h-6 bg-[#E5E5E5] dark:bg-[#333333] rounded animate-pulse" />
          <div className="w-1/2 h-6 bg-[#E5E5E5] dark:bg-[#333333] rounded animate-pulse" />
        </div>
        
        {/* Summary skeleton */}
        <div className="w-full h-4 bg-[#E5E5E5] dark:bg-[#333333] rounded animate-pulse" />
        
        {/* Author and read time skeleton */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#E5E5E5] dark:bg-[#333333] rounded-full animate-pulse" />
            <div className="w-20 h-4 bg-[#E5E5E5] dark:bg-[#333333] rounded animate-pulse" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-[#E5E5E5] dark:bg-[#333333] rounded-full animate-pulse" />
            <div className="w-16 h-4 bg-[#E5E5E5] dark:bg-[#333333] rounded animate-pulse" />
          </div>
        </div>
        
        {/* Button skeleton */}
        <div className="w-full h-10 bg-[#E5E5E5] dark:bg-[#333333] rounded-lg animate-pulse" />
      </div>
    </div>
  );
};

const BlogSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonBlogCard key={index} />
      ))}
    </div>
  );
};

export default BlogSkeleton;