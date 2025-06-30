import React from "react";

const MovieCard = ({ movie }) => {
  // Handle both old OMDB format and new normalized format
  const title = movie.Title || movie.title;
  const poster = movie.Poster || movie.poster;
  const year = movie.Year || movie.year;
  const rating = movie.imdbRating || movie.rating;
  const imdbID = movie.imdbID;

  const hasValidPoster = poster && poster !== "N/A" && poster !== "";

  return (
    <div className="group relative min-w-[140px] sm:min-w-[160px] md:min-w-[180px] lg:min-w-[200px] xl:min-w-[220px] h-[200px] sm:h-[240px] md:h-[280px] lg:h-[320px] xl:h-[340px] mx-1 sm:mx-2 bg-gray-900 rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-110 hover:shadow-2xl cursor-pointer border border-gray-800/50 hover:border-red-500/50">
      {/* Movie Poster */}
      {hasValidPoster ? (
        <img
          src={poster}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
      ) : null}
      
      {/* Fallback placeholder */}
      <div 
        className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 ${hasValidPoster ? 'hidden' : 'flex'}`}
        style={{ display: hasValidPoster ? 'none' : 'flex' }}
      >
        <div className="text-center text-gray-400">
          <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">🎬</div>
          <div className="text-xs sm:text-sm font-medium">No Image</div>
        </div>
      </div>

      {/* Rating badge */}
      {rating && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <span className="text-xs">⭐</span>
          <span className="text-xs">{rating}</span>
        </div>
      )}

      {/* Year badge */}
      {year && (
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm text-white px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-medium shadow-lg">
          {year}
        </div>
      )}

      {/* Overlay with movie info */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3">
          <h3 className="text-white text-xs sm:text-sm font-bold mb-1 line-clamp-2 leading-tight">{title}</h3>
          <div className="flex items-center justify-between">
            {year && <span className="text-gray-300 text-xs">{year}</span>}
            {rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-400 text-xs">⭐</span>
                <span className="text-white text-xs font-medium">{rating}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom info bar (always visible on mobile) */}
      <div className="absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-sm p-2 group-hover:hidden sm:group-hover:block">
        <h3 className="text-white text-xs font-semibold truncate">{title}</h3>
        <div className="flex items-center justify-between mt-1">
          {year && <span className="text-gray-300 text-xs">{year}</span>}
          {rating && (
            <div className="flex items-center gap-1">
              <span className="text-yellow-400 text-xs">⭐</span>
              <span className="text-white text-xs">{rating}</span>
            </div>
          )}
        </div>
      </div>

      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 rounded-full shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;

