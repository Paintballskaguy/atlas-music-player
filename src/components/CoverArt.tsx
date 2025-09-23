import React, { useState } from "react";
import { useMusicPlayer } from '../contexts/MusicPlayerContext';
import coverArtImage from '../assets/placeholder.svg';

interface CoverArtProps {
  src?: string | null;
  alt?: string;
}

const CoverArt: React.FC<CoverArtProps> = ({ alt = "Cover Art" }) => {
  const { currentSongDetails, lyrics, loadLyrics, currentSong } = useMusicPlayer();
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = async (): Promise<void> => {
    setIsHovered(true);
    if (currentSong && !lyrics) {
      await loadLyrics(currentSong.id);
    }
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
  };

  const coverSrc = currentSongDetails?.cover;

  return (
    <div 
      className="w-full aspect-square bg-gradient-to-br from-custom-teal-100 to-custom-blue-200 dark:from-custom-teal-800 dark:to-custom-blue-900 rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl border-4 border-custom-yellow-200 dark:border-custom-yellow-600 transition-all duration-300 relative cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && lyrics ? (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-10">
          <div className="text-white text-center max-h-full overflow-y-auto">
            <h3 className="font-bold text-lg mb-2">Lyrics</h3>
            <div className="text-sm whitespace-pre-line">
              {lyrics}
            </div>
          </div>
        </div>
      ) : null}
      
      <div className="w-full h-full flex items-center justify-center">
        {coverSrc ? (
          <img 
            src={coverSrc} 
            alt={alt} 
            className="w-full h-full object-cover" 
          />
        ) : (
          <img 
            src={coverArtImage} 
            alt="Placeholder cover art" 
            className="w-20 h-20 opacity-30 dark:opacity-50 filter drop-shadow-lg"
          />
        )}
      </div>
    </div>
  );
};

export default CoverArt;