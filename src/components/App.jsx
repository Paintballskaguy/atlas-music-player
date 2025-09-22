import React from "react";
import Footer from "./Footer";
import MusicPlayer from "./MusicPlayer";
import { DarkModeProvider } from '../contexts/DarkModeContext';

function App() {
  return (
    <DarkModeProvider>
      <div className="min-h-screen flex flex-col justify-between p-8 bg-gradient-to-br from-custom-teal-50 to-custom-blue-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <MusicPlayer />
        <Footer />
      </div>
    </DarkModeProvider>
  );
}

export default App;