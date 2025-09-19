import React from "react";

const PlayListItem = ({ title, artist, length }) => {
  return (
    <div className="flex items-start justify-between py-2">
      <div className="flex-1">
        <h3 className="text-black text-lg font-bold leading-tight">{title}</h3>
        <p className="text-gray-500 text-base mt-1">{artist}</p>
      </div>
      <span className="text-gray-500 text-base ml-4 flex-shrink-0">{length}</span>
    </div>
  );
};

export default PlayListItem;