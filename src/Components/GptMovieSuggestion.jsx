import React from "react";

const GptMovieSuggestion = ({ movies = [], loading }) => {
  if (loading) {
    return (
      <div className="mt-8 text-center">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Loading animation */}
          <div className="relative">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-red-400 rounded-full animate-ping"></div>
          </div>
          
          {/* Loading text */}
          <div className="text-white">
            <p className="text-lg font-semibold mb-2">Searching for movies...</p>
            <p className="text-sm text-gray-400">This may take a few seconds</p>
          </div>
        </div>
      </div>
    );
  }

  if (!movies.length) return null;

  return (
    <div className="mt-6 sm:mt-8 max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
      {/* Success message */}
      <div className="mb-6 sm:mb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-green-900/20 border border-green-500/30 text-green-400 px-4 sm:px-6 py-2 sm:py-3 rounded-full">
          <span className="text-green-400">✓</span>
          <span className="text-xs sm:text-sm font-medium">Found {movies.length} movie recommendations</span>
        </div>
      </div>
      
      {/* Movie Grid - Responsive layout with larger cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-6">
        {movies.map((movie, index) => (
          <div 
            key={movie.imdbID} 
            className="group relative bg-gray-800/60 backdrop-blur-sm rounded-xl sm:rounded-2xl overflow-hidden border border-gray-600/30 hover:border-red-500/50 transition-all duration-300 hover:bg-gray-700/60 hover:shadow-2xl hover:shadow-red-500/20 cursor-pointer transform hover:scale-105"
          >
            {/* Movie Poster */}
            <div className="relative">
              {movie.poster && movie.poster !== "N/A" ? (
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
              ) : (
                <div className="w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-1 sm:mb-2">🎬</div>
                    <div className="text-xs sm:text-sm lg:text-base">No Image</div>
                  </div>
                </div>
              )}
              
              {/* Rating badge */}
              {movie.rating && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-black px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-2.5 md:py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                  <span className="text-xs">⭐</span>
                  <span className="text-xs">{movie.rating}</span>
                </div>
              )}

              {/* Recommendation number badge */}
              <div className="absolute top-2 left-2 bg-red-600 text-white px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-2.5 md:py-1.5 rounded-full text-xs font-bold shadow-lg">
                #{index + 1}
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Movie Info */}
            <div className="p-2 sm:p-3 md:p-4 lg:p-5">
              <h4 className="text-white font-semibold text-xs sm:text-sm md:text-base lg:text-lg line-clamp-2 group-hover:text-red-400 transition-colors mb-2 leading-tight">
                {movie.title}
              </h4>
              
              <div className="flex items-center justify-between">
                {movie.year && (
                  <span className="text-gray-300 bg-gray-700/50 px-1.5 py-0.5 sm:px-2 sm:py-1 md:px-2.5 md:py-1.5 rounded text-xs md:text-sm">
                    {movie.year}
                  </span>
                )}
                <span className="text-gray-400 text-xs md:text-sm">
                  {movie.source || "OMDB"}
                </span>
              </div>
            </div>

            {/* Bottom gradient overlay */}
            <div className="absolute bottom-0 left-0 right-0 h-6 sm:h-8 md:h-10 bg-gradient-to-t from-gray-800/60 to-transparent pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Additional info */}
      <div className="mt-6 sm:mt-8 text-center">
        <p className="text-gray-400 text-xs sm:text-sm">
          Click on any movie card to learn more about it
        </p>
      </div>
    </div>
  );
};

export default GptMovieSuggestion;
