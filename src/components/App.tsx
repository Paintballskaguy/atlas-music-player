import React from "react";
import Footer from "./Footer";
import MusicPlayer from "./MusicPlayer";
import LoadingSkeleton from "./LoadingSkeleton";
import { DarkModeProvider } from '../contexts/DarkModeContext';
import { MusicPlayerProvider, useMusicPlayer } from '../contexts/MusicPlayerContext';

// Separate component to use the music player context
const AppContent = () => {
  const { isLoading, error } = useMusicPlayer();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8 bg-custom-red-100 dark:bg-custom-red-900 rounded-2xl border border-custom-red-300 dark:border-custom-red-700">
          <h2 className="text-2xl font-bold text-custom-red-800 dark:text-custom-red-200 mb-4">
            Error Loading Music Player
          </h2>
          <p className="text-custom-red-600 dark:text-custom-red-300">
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-6 py-2 bg-custom-red-600 hover:bg-custom-red-700 text-white rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between p-8 bg-gradient-to-br from-custom-teal-50 to-custom-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {isLoading ? <LoadingSkeleton /> : <MusicPlayer />}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <DarkModeProvider>
      <MusicPlayerProvider>
        <AppContent />
      </MusicPlayerProvider>
    </DarkModeProvider>
  );
}

export default App;