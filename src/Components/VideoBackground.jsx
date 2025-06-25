import React from 'react';
import trailerMap from '../utils/trailerMap';

const VideoBackground = ({ title }) => {
  const trailerId = trailerMap[title];

  if (!trailerId) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center text-white">
        <p>🎬 Trailer not available for: {title}</p>
      </div>
    );
  }

  return (
  <div className="absolute top-0 left-0 w-full h-screen -z-10 overflow-hidden">
  <iframe
    className="w-full h-full object-cover pointer-events-none"
    src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerId}&modestbranding=1&rel=0&showinfo=0`}
    title="Movie Trailer"
    frameBorder="0"
    allow="autoplay; fullscreen"
    allowFullScreen
  />
</div>



  );
};

export default VideoBackground;
