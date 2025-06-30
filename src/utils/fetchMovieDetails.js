import axios from "axios";
import { OMDB_API_KEY, OMDB_BASE_URL } from "./Constants";

// Normalize OMDB response to a common format
const normalizeOmdb = (data) => {
  if (!data || data.Response === "False") return null;
  return {
    imdbID: data.imdbID,
    title: data.Title,
    year: data.Year,
    poster: data.Poster !== "N/A" ? data.Poster : null,
    rating: data.imdbRating,
    source: "omdb",
  };
};

// Fallback: Use OMDB search instead of exact title match
const searchOmdbFallback = async (movieName) => {
  try {
    // Try search first (more flexible)
    const searchRes = await axios.get(
      `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(movieName)}`
    );
    
    if (searchRes.data.Response === "True" && searchRes.data.Search.length > 0) {
      // Get the first result's full details
      const firstResult = searchRes.data.Search[0];
      const detailRes = await axios.get(
        `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${firstResult.imdbID}`
      );
      return normalizeOmdb(detailRes.data);
    }
  } catch (err) {
    console.log(`Fallback search failed for: ${movieName}`);
  }
  return null;
};

// Alternative fallback: RapidAPI Movie Database (free tier available)
const searchRapidApiFallback = async (movieName) => {
  try {
    const options = {
      method: 'GET',
      url: 'https://movie-database-alternative.p.rapidapi.com/',
      params: {s: movieName, r: 'json', page: '1'},
      headers: {
        'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY', // Optional: Get free key from rapidapi.com
        'X-RapidAPI-Host': 'movie-database-alternative.p.rapidapi.com'
      }
    };

    const response = await axios.request(options);
    
    if (response.data.Search && response.data.Search.length > 0) {
      const movie = response.data.Search[0];
      return {
        imdbID: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster !== "N/A" ? movie.Poster : null,
        rating: null, // RapidAPI doesn't provide rating in search
        source: "rapidapi",
      };
    }
  } catch (err) {
    console.log(`RapidAPI fallback failed for: ${movieName}`);
  }
  return null;
};

export const fetchMovieDetails = async (movieName) => {
  // 1. Try exact title match with OMDB
  try {
    const omdbRes = await axios.get(
      `${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&t=${encodeURIComponent(movieName)}`
    );
    const omdbMovie = normalizeOmdb(omdbRes.data);
    if (omdbMovie) {
      console.log(`✅ Found movie: ${movieName} via exact match`);
      return omdbMovie;
    }
  } catch (err) {
    console.log(`Exact match failed for: ${movieName}`);
  }

  // 2. Fallback: Try OMDB search (more flexible)
  const fallbackMovie = await searchOmdbFallback(movieName);
  if (fallbackMovie) {
    console.log(`✅ Found movie: ${movieName} via search fallback`);
    return fallbackMovie;
  }

  // 3. Alternative fallback: RapidAPI (optional - requires API key)
  // const rapidApiMovie = await searchRapidApiFallback(movieName);
  // if (rapidApiMovie) {
  //   console.log(`✅ Found movie: ${movieName} via RapidAPI fallback`);
  //   return rapidApiMovie;
  // }

  console.log(`❌ No movie found for: ${movieName}`);
  return null;
}; 