import React from "react";

const PlayListItem = ({ title, artist, length, isActive }) => {
  return (
    <div className={`flex items-start justify-between py-4 px-4 cursor-pointer rounded-2xl transition-all duration-300 transform hover:scale-102 ${
      isActive 
        ? 'bg-gradient-to-r from-custom-red-100 to-custom-yellow-100 dark:from-custom-red-900 dark:to-custom-yellow-900 border-l-6 border-custom-red-500 shadow-lg' 
        : 'hover:bg-custom-teal-50 dark:hover:bg-custom-teal-900/30 hover:shadow-md'
    }`}>
      <div className="flex-1">
        <h3 className={`text-lg font-bold leading-tight transition-colors duration-200 ${
          isActive 
            ? 'text-custom-red-700 dark:text-custom-red-300' 
            : 'text-custom-teal-800 dark:text-custom-teal-100 hover:text-custom-teal-600 dark:hover:text-custom-teal-300'
        }`}>
          {title}
        </h3>
        <p className={`text-base mt-1 transition-colors duration-200 ${
          isActive 
            ? 'text-custom-yellow-700 dark:text-custom-yellow-300' 
            : 'text-custom-blue-600 dark:text-custom-blue-300'
        }`}>
          {artist}
        </p>
      </div>
      <span className={`text-base ml-4 flex-shrink-0 font-semibold transition-colors duration-200 ${
        isActive 
          ? 'text-custom-red-600 dark:text-custom-red-400' 
          : 'text-custom-teal-600 dark:text-custom-teal-400'
      }`}>
        {length}
      </span>
    </div>
  );
};

export default PlayListItem;