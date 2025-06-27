import React from 'react';
import GptMovieSuggestion from './GptMovieSuggestion';
import GptSearchBar from './GptSearchBar';
import { BGIMAGE } from '../utils/Constants';

const GptSearch = () => {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <img
        src={BGIMAGE}
        alt="bg"
        className="absolute top-0 left-0 h-full w-full object-cover -z-10"
      />

      {/* Overlay Content */}
      <div className="relative z-10 px-4 pt-18"> 
        <GptSearchBar />
        <GptMovieSuggestion />
      </div>
    </div>
  );
};

export default GptSearch;
