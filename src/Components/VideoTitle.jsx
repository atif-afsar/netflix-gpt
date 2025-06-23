import React from 'react';
import { Play, Info } from 'lucide-react';

const VideoTitle = ({ title, overview }) => {
  return (
   <div className="absolute top-0 left-0 w-full h-screen flex items-center px-12 bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10">
  <div className="p-6 rounded-lg max-w-2xl">
    <h1 className="text-5xl text-gray-200 font-bold mb-4 drop-shadow-lg">{title}</h1>
    <p className="text-lg text-gray-300 w-xl mb-5">{overview}</p>

        <div className="flex gap-4">
          {/* ▶ Play Button */}
          <button className="flex items-center gap-2 bg-white text-black text-lg font-semibold px-6 py-2 rounded hover:bg-red-700 hover:text-white transition duration-300">
            <Play className="w-5 h-5" />
            <span>Play</span>
          </button>

          {/* ℹ️ More Info Button */}
          <button className="flex items-center gap-2 bg-gray-700 bg-opacity-80 text-white text-lg font-semibold px-6 py-2 rounded hover:bg-opacity-90 transition duration-300">
            <Info className="w-5 h-5" />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
