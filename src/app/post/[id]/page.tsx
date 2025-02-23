"use client";

import React, { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiChevronLeft, FiUser, FiClock, FiShare2, FiImage } from "react-icons/fi";
import { blogData } from "../../lib/data";
import type { BlogPost } from "../../types";

interface PageProps {
  params: Promise<{ id: string }>;
}

const ImageLoader = () => (
  <div className="absolute inset-0 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-lg animate-pulse flex items-center justify-center">
    <FiImage className="w-12 h-12 text-[#666666] dark:text-gray-500" />
  </div>
);

const ContentLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded w-1/4" />
    <div className="h-12 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded w-3/4" />
    <div className="h-4 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded w-1/4" />
    <div className="space-y-2">
      <div className="h-4 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded" />
      <div className="h-4 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded w-11/12" />
      <div className="h-4 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded w-3/4" />
    </div>
  </div>
);

export default function BlogPost({ params }: PageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const BlogContent = () => {
    const resolvedParams = React.use(params);
    const post = blogData.find((p) => p.id === parseInt(resolvedParams.id));

    if (!post) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#F5F5F5] dark:bg-[#1A1A1A]">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-[#1A1A1A] dark:text-white">
              Post not found
            </h2>
            <Link
              href="/"
              className="mt-4 bg-[#1A1A1A] dark:bg-[#333333] text-white px-4 py-2 rounded-md hover:bg-[#333333] dark:hover:bg-[#404040] inline-block transition-colors"
            >
              Go back to posts
            </Link>
          </div>
        </div>
      );
    }

    const handleShare = async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: post.title,
            text: post.summary,
            url: window.location.href,
          });
        } catch (error) {
          console.error('Error sharing:', error);
        }
      }
    };

    return (
      <div className="min-h-screen bg-[#F5F5F5] dark:bg-[#1A1A1A] py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/"
            className="flex items-center text-[#1A1A1A] dark:text-white mb-6 hover:opacity-80 transition-opacity"
          >
            <FiChevronLeft className="mr-2" /> Back to posts
          </Link>

          <div className="relative w-full h-64 md:h-96 mb-8 bg-[#E5E5E5] dark:bg-[#2A2A2A] rounded-lg overflow-hidden">
            {!imageLoaded && !imageError && <ImageLoader />}
            {!imageError && (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className={`object-cover rounded-lg transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
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
            <Suspense fallback={<ContentLoader />}>
              <div className="flex justify-between items-center mb-6">
                <span className="px-3 py-1 bg-[#F5F5F5] dark:bg-[#333333] text-[#1A1A1A] dark:text-white rounded-full text-sm font-medium">
                  {post.category}
                </span>
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full hover:bg-[#F5F5F5] dark:hover:bg-[#333333] transition-colors"
                  aria-label="Share post"
                >
                  <FiShare2 className="w-5 h-5 text-[#666666] dark:text-gray-400" />
                </button>
              </div>

              <h1 className="text-4xl font-bold text-[#1A1A1A] dark:text-white mb-4">
                {post.title}
              </h1>

              <div className="flex items-center space-x-4 text-[#666666] dark:text-gray-400 mb-8">
                <div className="flex items-center">
                  <FiUser className="mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <FiClock className="mr-2" />
                  {post.readTime}
                </div>
              </div>

              <article className="prose dark:prose-invert max-w-none">
                <p className="text-[#4A4A4A] dark:text-gray-300 leading-relaxed">
                  {post.content}
                </p>
              </article>
            </Suspense>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Suspense fallback={<ContentLoader />}>
      <BlogContent />
    </Suspense>
  );
}