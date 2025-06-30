import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const MovieList = ({ title, movies }) => {
  const scrollRef = useRef();

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mb-8 sm:mb-10 md:mb-12 px-2 sm:px-4 md:px-6">
      {/* Section Title */}
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-4 sm:mb-6 tracking-wide px-4 sm:px-0">
        {title}
      </h2>

      {/* Container with scroll buttons */}
      <div className="relative group">
        {/* Left Scroll Button */}
        <button
          onClick={scrollLeft}
          aria-label="Scroll left"
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-red-500/30"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>

        {/* Right Scroll Button */}
        <button
          onClick={scrollRight}
          aria-label="Scroll right"
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-red-600 hover:bg-red-700 text-white p-2 sm:p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-red-500/30"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
        </button>

        {/* Movie Row */}
        <div
          ref={scrollRef}
          className="flex gap-2 sm:gap-3 md:gap-4 overflow-x-auto hide-scrollbar scroll-smooth pb-4 px-4 sm:px-0"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>

        {/* Enhanced gradient fade on edges */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 bg-gradient-to-r from-black/80 via-black/40 to-transparent pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-12 md:w-16 bg-gradient-to-l from-black/80 via-black/40 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

export default MovieList;
