import React from "react";

const MoviePoster = ({ movie }) => {
  return (
    <div className="min-w-[150px] max-w-[150px] h-[225px] mx-2 bg-gray-900 rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg"}
        alt={movie.Title}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default MoviePoster;
