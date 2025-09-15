import React from "react";

const PlayListItem = ({ title, artist, length }) => {
  return (
    <div className="flex items-center justify-between p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
      <div className="flex-1">
        <h3 className="text-white text-lg font-medium">{title}</h3>
        <p className="text-gray-400 text-sm">{artist}</p>
      </div>
      <span className="text-gray-400 text-sm ml-4">{length}</span>
    </div>
  );
};

export default PlayListItem;