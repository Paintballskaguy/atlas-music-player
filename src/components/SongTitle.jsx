import React from "react";

const SongTitle = ({ title, artist }) => {
  return (
    <div className="text-center">
      <h2 className="text-black text-xl font-bold">{title}</h2>
      <p className="text-gray-400 text-sm">{artist}</p>
    </div>
  );
};

export default SongTitle;