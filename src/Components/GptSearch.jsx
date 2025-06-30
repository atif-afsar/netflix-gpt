import React from 'react';
import GptMovieSuggestion from './GptMovieSuggestion';
import GptSearchBar from './GptSearchBar';

const GptSearch = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated background pattern - positioned to avoid header */}
      <div className="absolute inset-0 overflow-hidden pt-20">
        <div className="absolute top-20 -right-40 w-80 h-80 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Content with proper spacing */}
      <div className="relative z-10 pt-20">
        <GptSearchBar />
      </div>
    </div>
  );
};

export default GptSearch;
