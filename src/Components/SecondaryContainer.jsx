import React from 'react';
import { useSelector } from 'react-redux';
import MovieList from './MovieList';

const SecondaryContainer = () => {
  const nowPlayingMovies = useSelector((state) => state.movies.nowPlayingMovies);

  if (!nowPlayingMovies || nowPlayingMovies.length === 0) return null;

  const groupSize = 10;
  const trending = nowPlayingMovies.slice(0, groupSize);
  const action = nowPlayingMovies.slice(groupSize, groupSize * 2);
  const topRated = nowPlayingMovies.slice(groupSize * 2, groupSize * 3);
  const anime = nowPlayingMovies.slice(groupSize * 3, groupSize * 4);

  return (
    <div className="relative z-20 bg-black">
  {/* This row should sit directly over the trailer */}
  <div className="px-4 md:px-10 -mt-24 bg-transparent ">
    <MovieList title="Trending Now" movies={trending} isOverlay={true}/>
  </div>

  {/* These rows should sit below, on black bg */}
  <div className="bg-black px-4 md:px-10 pt-10 pb-10">
    <MovieList title="Action Thrillers" movies={action} />
    <MovieList title="Top Rated" movies={topRated} />
    <MovieList title="Anime Specials" movies={anime} />
  </div>
</div>
  );
};

export default SecondaryContainer;
