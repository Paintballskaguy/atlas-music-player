import React from "react";

const PlayListItem = ({ title, artist, length, isActive }) => {
  const itemClasses = `flex items-center justify-between p-2 rounded-lg cursor-pointer ${
    isActive ? 'bg-gray-700' : 'hover:bg-gray-800'
  }`;

  return (
    <div className={itemClasses}>
      <div className="flex-1">
        <h3 className="text-white text-lg font-medium">{title}</h3>
        <p className="text-gray-400 text-sm">{artist}</p>
      </div>
      <span className="text-gray-400 text-sm ml-4">{length}</span>
    </div>
  );
};

export default PlayListItem;