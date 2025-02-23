'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FiClock, FiUser } from 'react-icons/fi';
import { BlogPost } from '../../types';

interface BlogPostCardProps {
  post: BlogPost;
}

const BlogPostCard = ({ post }: BlogPostCardProps) => {
  return (
    <div className="bg-white dark:bg-[#2A2A2A] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl border border-[#E1E5EA] dark:border-[#333333] hover:border-[#D1D5DA] dark:hover:border-[#404040]">
      <div className="relative w-full h-56">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover hover:opacity-80 transition-opacity rounded-t-xl"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          loading="lazy"
        />
      </div>
      <div className="p-5 space-y-3">
        <span className="inline-block px-3 py-1 text-xs font-medium bg-[#F0F2F5] dark:bg-[#333333] text-[#1A1A1A] dark:text-white rounded-full">
          {post.category}
        </span>
        <h2 className="text-xl font-semibold text-[#1A1A1A] dark:text-white line-clamp-2">
          {post.title}
        </h2>
        <p className="text-sm text-[#4A4A4A] dark:text-gray-300 line-clamp-2">
          {post.summary}
        </p>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center space-x-2 text-[#666666] dark:text-gray-400 text-sm">
            <FiUser className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center space-x-2 text-[#666666] dark:text-gray-400 text-sm">
            <FiClock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
        </div>
        <Link
          href={`/post/${post.id}`}
          className="inline-block w-full text-center bg-[#1A1A1A] dark:bg-[#333333] text-white px-4 py-2 rounded-lg hover:bg-[#333333] dark:hover:bg-[#404040] transition-colors duration-200 text-sm font-medium"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
};

export default BlogPostCard;