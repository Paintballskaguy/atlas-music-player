import React, { useState, useEffect } from "react";
import Footer from "./Footer";
import MusicPlayer from "./MusicPlayer";
import LoadingSkeleton from "./LoadingSkeleton";
import { DarkModeProvider } from '../contexts/DarkModeContext';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time (remove this in real app)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 second loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <DarkModeProvider>
      <div className="min-h-screen flex flex-col justify-between p-8 bg-gradient-to-br from-custom-teal-50 to-custom-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        {isLoading ? <LoadingSkeleton /> : <MusicPlayer />}
        <Footer />
      </div>
    </DarkModeProvider>
  );
}

export default App;