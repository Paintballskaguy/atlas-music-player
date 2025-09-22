import React from "react";

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-pulse">
      {/* Currently Playing Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gradient-to-b from-gray-100 to-gray-50 dark:from-gray-700 dark:to-gray-800">
        <div className="flex flex-col items-center space-y-8 p-8 max-w-md mx-auto w-full">
          {/* Cover Art Skeleton */}
          <div className="w-full max-w-80 aspect-square bg-gray-300 dark:bg-gray-600 rounded-3xl"></div>
          
          {/* Song Information Skeleton */}
          <div className="text-center space-y-3 w-full">
            {/* Song Title */}
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-lg w-3/4 mx-auto"></div>
            {/* Artist */}
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-1/2 mx-auto"></div>
          </div>
          
          {/* Play Controls Skeleton */}
          <div className="flex items-center justify-center space-x-8 w-full">
            {/* Speed */}
            <div className="h-6 w-6 bg-gray-300 dark:bg-gray-600 rounded"></div>
            {/* Previous */}
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            {/* Play Button */}
            <div className="h-16 w-16 bg-gray-400 dark:bg-gray-500 rounded-2xl"></div>
            {/* Next */}
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            {/* Repeat */}
            <div className="h-8 w-8 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          </div>
          
          {/* Volume Controls Skeleton */}
          <div className="flex items-center space-x-4 w-full">
            {/* Volume Icon */}
            <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            {/* Volume Slider */}
            <div className="flex-1 h-3 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
            {/* Volume Percentage */}
            <div className="h-5 w-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
      
      {/* Playlist Section Skeleton */}
      <div className="w-full md:w-1/2 bg-white dark:bg-gray-800 p-8">
        {/* Playlist Title */}
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded-lg w-32 mb-8"></div>
        
        {/* Playlist Items */}
        <div className="flex w-full flex-col space-y-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex items-start justify-between py-4 px-4 rounded-2xl">
              <div className="flex-1">
                {/* Song Title */}
                <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2"></div>
                {/* Artist */}
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              </div>
              {/* Duration */}
              <div className="h-4 w-12 bg-gray-300 dark:bg-gray-600 rounded ml-4"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;