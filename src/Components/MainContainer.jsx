import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[33]; // or movies[0]
  const { Title, Plot } = mainMovie; // OMDB has `Title`, not `original_title`

  return (
    <div className="relative w-full h-screen">
      <VideoTitle title={Title} overview={Plot} />
      <VideoBackground title={Title} />
    </div>
  );
};

export default MainContainer;
