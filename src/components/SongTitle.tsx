import React from "react";

interface SongTitleProps {
  title: string;
  artist: string;
}

const SongTitle: React.FC<SongTitleProps> = ({ title, artist }) => {
  return (
    <div className="text-center">
      <h2 className="text-custom-teal-800 dark:text-custom-teal-100 text-4xl font-black mb-3 tracking-tight leading-tight drop-shadow-sm">
        {title}
      </h2>
      <p className="text-custom-blue-600 dark:text-custom-blue-300 text-xl font-medium tracking-wide">
        {artist}
      </p>
    </div>
  );
};

export default SongTitle;