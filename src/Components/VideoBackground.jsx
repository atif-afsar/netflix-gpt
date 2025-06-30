import React from 'react';
import trailerMap from '../utils/trailerMap';

const VideoBackground = ({ title }) => {
  const trailerId = trailerMap[title];

  if (!trailerId) {
    return (
      <div className="absolute top-0 left-0 w-full h-screen bg-black flex items-center justify-center text-white -z-10">
        <div className="text-center">
          <div className="text-4xl sm:text-6xl mb-4">🎬</div>
          <p className="text-sm sm:text-base md:text-lg">Trailer not available for: {title}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute top-0 left-0 w-full h-screen -z-10 overflow-hidden">
      {/* Responsive iframe container */}
      <div className="relative w-full h-full">
        <iframe
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] min-w-[100vw] min-h-[100vh] object-cover pointer-events-none"
          src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerId}&modestbranding=1&rel=0&showinfo=0&playsinline=1&enablejsapi=0&origin=${window.location.origin}`}
          title="Movie Trailer"
          frameBorder="0"
          allow="autoplay; fullscreen; encrypted-media"
          allowFullScreen
          loading="lazy"
        />
      </div>
      
      {/* Fallback gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/40 pointer-events-none"></div>
    </div>
  );
};

export default VideoBackground;
