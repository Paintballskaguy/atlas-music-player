import React from "react";

const SongTitle = ({ title, artist }) => {
  return (
    <div className="text-center">
      <h2 className="text-black text-3xl font-bold mb-2">{title}</h2>
      <p className="text-gray-500 text-lg">{artist}</p>
    </div>
  );
};

export default SongTitle;