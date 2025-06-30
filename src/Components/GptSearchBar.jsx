import React, { useRef, useState } from "react";
import { Bot, Send, Sparkles } from "lucide-react";
import LANGUAGES from "../utils/LanguageConstans";
import { useSelector } from "react-redux";
import { fetchOpenAIResponse } from "../utils/gemini";
import { fetchMovieDetails } from "../utils/fetchMovieDetails";
import GptMovieSuggestion from "./GptMovieSuggestion";

const GptSearchBar = () => {
  const langKey = useSelector((store) => store.config.LANGUAGES);
  const searchText = useRef(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState([]);
  const [rawGpt, setRawGpt] = useState(""); // For debugging

  // Helper: Extract movie names from GPT response
  const extractMovieNames = (response) => {
    if (!response) return [];
    
    // Remove any extra text, keep only comma-separated names
    // e.g. "Inception, Interstellar, Tenet, Dunkirk, Memento"
    const cleanResponse = response.replace(/[^\w\s,:'\-()]/g, '').trim();
    
    // Split by comma and clean up
    const movieNames = cleanResponse
      .split(",")
      .map((name) => name.trim())
      .filter((name) => name.length > 0)
      .slice(0, 12);
    
    console.log("🎬 Extracted movie names:", movieNames);
    return movieNames;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGptSearchClick();
  };

  const handleGptSearchClick = async () => {
    if (!searchText.current.value.trim()) {
      setError("Please enter a search query");
      return;
    }

    setError("");
    setMovies([]);
    setLoading(true);

    try {
      const query =
        `You are a movie recommendation expert. Based on the user's request: "${searchText.current.value}", suggest exactly 12 popular movies that match their criteria. 
        
        Respond with ONLY the movie names separated by commas, no other text. 
        Example format: Inception, Interstellar, Tenet, Dunkirk, Memento, The Dark Knight, Blade Runner, Arrival, Ex Machina, The Martian, Gravity, Interstellar
        Make sure the movies are well-known and likely to be in movie databases.`;

      console.log("🤖 Sending query to OpenAI:", query);
      const response = await fetchOpenAIResponse(query);
      setRawGpt(response);

      if (response.startsWith("❌")) {
        setError(response);
        setLoading(false);
        return;
      }

      // Check if we're using local fallback
      if (response.includes("The Hangover") || response.includes("3 Idiots") || response.includes("The Shawshank Redemption")) {
        console.log("🔄 Using local fallback recommendations");
      }

      const movieNames = extractMovieNames(response);

      if (!movieNames.length) {
        setError("No movie names found in AI response. Please try again.");
        setLoading(false);
        return;
      }

      console.log("🔍 Fetching details for movies:", movieNames);

      // Fetch movie details in parallel
      const moviePromises = movieNames.map((name) => fetchMovieDetails(name));
      const movieResults = await Promise.all(moviePromises);

      // Filter out nulls (not found in both OMDB and TMDB)
      const validMovies = movieResults.filter(Boolean);

      console.log("✅ Found movies:", validMovies);

      if (!validMovies.length) {
        setError("No movie details found. Try searching for more popular movies or different keywords.");
      } else if (validMovies.length < movieNames.length) {
        setError(`Found ${validMovies.length} out of ${movieNames.length} movies. Some movies might not be in our database.`);
        setMovies(validMovies);
      } else {
        setMovies(validMovies);
      }
    } catch (err) {
      console.error("❌ Search error:", err);
      setError("An error occurred while searching. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col pt-16 sm:pt-20">
      {/* Header Section */}
      <div className="text-center py-3 sm:py-4 md:py-6 lg:py-8 px-3 sm:px-4 md:px-6">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="bg-red-600 p-1.5 sm:p-2 md:p-3 rounded-full shadow-lg">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 text-white" />
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white font-bold tracking-tight leading-tight">
              {LANGUAGES[langKey]?.heading || "AI Movie Assistant"}
            </h1>
          </div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-300 mb-3 sm:mb-4 md:mb-6 leading-relaxed px-2">
            Ask me anything about movies and I'll recommend the perfect films for you
          </p>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-3 sm:px-4 md:px-6 pb-4 sm:pb-6 md:pb-8">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl sm:rounded-2xl md:rounded-3xl border border-gray-700/50 overflow-hidden shadow-2xl">
          {/* Chat Messages */}
          <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6">
            {/* User Message */}
            {searchText.current?.value && (
              <div className="flex justify-end">
                <div className="bg-red-600 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl rounded-br-md max-w-[280px] sm:max-w-xs md:max-w-md shadow-lg">
                  <p className="font-medium text-xs sm:text-sm md:text-base">{searchText.current.value}</p>
                </div>
              </div>
            )}

            {/* AI Response */}
            {movies.length > 0 && (
              <div className="flex justify-start">
                <div className="bg-gray-800/60 backdrop-blur-sm text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl rounded-bl-md max-w-[280px] sm:max-w-xs md:max-w-md shadow-lg border border-gray-700/50">
                  <p className="font-medium text-xs sm:text-sm md:text-base">Here are your movie recommendations! 🎬</p>
                </div>
              </div>
            )}

            {/* Loading Message */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800/60 backdrop-blur-sm text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 rounded-xl sm:rounded-2xl rounded-bl-md max-w-[280px] sm:max-w-xs md:max-w-md shadow-lg border border-gray-700/50">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-medium text-xs sm:text-sm md:text-base">Searching for movies...</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="p-3 sm:p-4 md:p-6 bg-gray-900/50 border-t border-gray-700/50">
            <form onSubmit={handleSubmit} className="flex items-center gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <input
                  ref={searchText}
                  type="text"
                  placeholder={LANGUAGES[langKey]?.placeholder || "e.g. funny indian movies, sci-fi thrillers, romantic comedies..."}
                  className="w-full bg-gray-800/60 text-white placeholder-gray-400 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-600/50 focus:border-red-500/50 focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all duration-300 text-xs sm:text-sm md:text-base"
                  disabled={loading}
                />
                <div className="absolute right-2 sm:right-3 md:right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <Bot className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                </div>
              </div>
              <button
                type="submit"
                aria-label="Search movies"
                className="bg-red-600 hover:bg-red-700 text-white p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg hover:shadow-xl"
                disabled={loading}
              >
                <Send className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mt-3 sm:mt-4 md:mt-6 text-red-400 text-center p-2.5 sm:p-3 md:p-4 bg-red-900/20 border border-red-500/30 rounded-lg sm:rounded-xl md:rounded-2xl backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 mb-1.5 sm:mb-2">
              <span className="text-red-400">⚠️</span>
              <span className="font-semibold text-xs sm:text-sm md:text-base">Search Error</span>
            </div>
            <p className="text-xs sm:text-sm">{error}</p>
          </div>
        )}

        {/* Debug: Show raw GPT response (uncomment to debug) */}
        {rawGpt && (
          <div className="mt-3 sm:mt-4 text-xs text-gray-400 bg-gray-800/50 p-2.5 sm:p-3 rounded-lg sm:rounded-xl md:rounded-2xl border border-gray-700">
            <div className="flex items-center gap-2 mb-1.5 sm:mb-2">
              <span className="text-blue-400">🔍</span>
              <span className="font-medium text-gray-300">AI Response</span>
            </div>
            <p className="text-gray-400">{rawGpt}</p>
          </div>
        )}
      </div>

      {/* Movie Suggestions */}
      <GptMovieSuggestion movies={movies} loading={loading} />
    </div>
  );
};

export default GptSearchBar;
