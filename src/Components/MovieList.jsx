import React, { useRef } from "react";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react"; // or any icon

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
    <div className="relative mb-10 px-6">
      <h2 className="text-3xl text-white font-bold mb-4">{title}</h2>

      {/* Scroll Buttons */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-32 z-10 bg-red-500 hover:bg-red-600 p-2 rounded-full"
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-32 z-10 bg-red-500 hover:bg-red-600 p-2 rounded-full"
      >
        <ChevronRight className="text-white" />
      </button>

      {/* Movie Row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto hide-scrollbar scroll-smooth"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
