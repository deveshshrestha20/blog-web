"use client";
import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiClock, FiImage, FiUser } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Post {
  id: string;
  title: string;
  body_markdown: string;
  cover_image: string;
  tag_list: string[];
  user: {
    name: string;
  };
  reading_time_minutes: number;
}

const PostSkeleton = () => (
  <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#1A1A1A] py-8 px-4">
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center text-[#1A1A1A] dark:text-white mb-6">
        <div className="w-24 h-6 bg-[#E5E5E5] dark:bg-[#333333] rounded animate-pulse" />
      </div>

      <div className="relative w-full h-64 md:h-96 mb-8 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-lg animate-pulse" />

      <div className="bg-white dark:bg-[#2A2A2A] rounded-lg p-8 shadow-lg border border-[#E5E5E5] dark:border-[#333333]">
        {/* Title skeleton */}
        <div className="w-3/4 h-8 bg-[#E5E5E5] dark:bg-[#333333] rounded mb-4 animate-pulse" />

        {/* Author and read time skeleton */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-32 h-4 bg-[#E5E5E5] dark:bg-[#333333] rounded animate-pulse" />
          <div className="w-24 h-4 bg-[#E5E5E5] dark:bg-[#333333] rounded animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="w-full h-4 bg-[#E5E5E5] dark:bg-[#333333] rounded animate-pulse" />
          <div className="w-5/6 h-4 bg-[#E5E5E5] dark:bg-[#333333] rounded animate-pulse" />
          <div className="w-4/6 h-4 bg-[#E5E5E5] dark:bg-[#333333] rounded animate-pulse" />
        </div>
      </div>
    </div>
  </div>
);

const ImageLoader = () => (
  <div className="absolute inset-0 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-lg animate-pulse flex items-center justify-center">
    <FiImage className="w-12 h-12 text-[#666666] dark:text-gray-500" />
  </div>
);

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const response = await fetch(`https://dev.to/api/articles/${id}`);
          if (!response.ok) {
            throw new Error('Post not found');
          }
          const data = await response.json() as Post;
          setPost(data);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setPost(null);
      } finally {
        // Add a minimum loading time to prevent flickering
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleShowContentToggle = () => {
    setShowFullContent((prev) => !prev);
  };

  const truncatedContent = post?.body_markdown?.split(" ").slice(0, 100).join(" ");
  const fullContent = post?.body_markdown;

  if (isLoading) {
    return <PostSkeleton />;
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] dark:bg-[#1A1A1A]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white">
            Post not found
          </h2>
          <Link
            href="/blog"
            className="mt-4 bg-[#1A1A1A] dark:bg-[#333333] text-white px-4 py-2 rounded-md hover:bg-[#333333] dark:hover:bg-[#404040] inline-block transition-colors"
          >
            Go back to posts
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#1A1A1A] py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/blog"
          className="flex items-center text-[#1A1A1A] dark:text-white mb-6 hover:opacity-80 transition-opacity"
        >
          <FiChevronLeft className="mr-2" /> Back to posts
        </Link>

        <div className="relative w-full h-64 md:h-96 mb-8 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-lg overflow-hidden">
          {!imageLoaded && !imageError && <ImageLoader />}
          {!imageError && (
            <Image
              src={post.cover_image || "/api/placeholder/800/400"}
              alt={post.title}
              fill
              className={`object-cover rounded-lg transition-opacity duration-300 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              sizes="(max-width: 768px) 100vw, 800px"
              priority
              onLoadingComplete={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          )}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <FiImage className="w-12 h-12 mx-auto text-[#666666] dark:text-gray-500" />
                <p className="mt-2 text-sm text-[#666666] dark:text-gray-400">Failed to load image</p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-[#2A2A2A] rounded-lg p-8 shadow-lg border border-[#E5E5E5] dark:border-[#333333]">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleShowContentToggle}
              className="text-[#1A1A1A] dark:text-white text-sm underline"
            >
              {showFullContent ? "Show less" : "Show all"}
            </button>
          </div>

          <h1 className="text-4xl font-bold text-[#1A1A1A] dark:text-white mb-4">{post.title}</h1>

          <div className="flex items-center space-x-4 text-[#666666] dark:text-gray-400 mb-8">
            <div className="flex items-center">
              <FiUser className="mr-2" />
              {post.user.name}
            </div>
            <div className="flex items-center">
              <FiClock className="mr-2" />
              {post.reading_time_minutes} min read
            </div>
          </div>

          <article className="prose dark:prose-invert max-w-none">
            <p className="text-[#4A4A4A] dark:text-gray-300 leading-relaxed">
              {showFullContent ? fullContent : truncatedContent + "..."}
            </p>
          </article>
        </div>
      </div>
    </div>
  );
}