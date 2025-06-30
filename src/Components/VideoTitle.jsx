import React from "react";
import { Play, Info } from "lucide-react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen flex items-center px-1 mt-20 md:mt-0 sm:px-3 md:px-4 lg:px-6 xl:px-8 bg-gradient-to-r from-black/60 via-black/30 to-transparent z-10">
      <div className="p-2 sm:p-3 md:p-4 lg:p-6 rounded-lg max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[500px]">
        <h1 className="text-2xl sm:text-base md:text-3xl lg:text-2xl xl:text-2xl text-white font-bold mb-1 sm:mb-2 md:mb-3 leading-tight drop-shadow-2xl">
          {title}
        </h1>

        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 mb-2 sm:mb-3 md:mb-4 leading-relaxed line-clamp-2 sm:line-clamp-2 md:line-clamp-3 drop-shadow-lg">
          {overview}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 md:gap-3">
        
          {/* ▶️ Play Button */}
          <button className="w-fit max-w-[120px] sm:max-w-[150px] md:max-w-none flex items-center justify-center gap-1 bg-white text-black text-xs sm:text-xs md:text-sm lg:text-base font-semibold px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            aria-label="Play trailer"
            onClick={() => console.log('Play button clicked')}
          >
            <Play className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5" />
            <span>Play</span>
          </button>

          {/* ℹ️ More Info Button */}
          <button className="w-fit max-w-[120px] sm:max-w-[150px] md:max-w-none flex items-center justify-center gap-1 bg-gray-700/80 backdrop-blur-sm text-white text-xs sm:text-xs md:text-sm lg:text-base font-semibold px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-5 lg:py-2 rounded-lg hover:bg-gray-600/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            aria-label="Show more information"
            onClick={() => console.log('More Info button clicked')}
          >
            <Info className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 lg:w-5 lg:h-5" />
            <span>More Info</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoTitle;
