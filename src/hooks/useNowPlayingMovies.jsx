import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { OMDB_API_KEY, OMDB_BASE_URL } from "../utils/Constants";
import { addNowPlayingMovies } from "../utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const fetchMovies = async () => {
    try {
      const keywords =  ["Avatar", "Transformers",  "Fall", "Inception", "John Wick",  "Avengers", "Star Wars", "Hobbit", "Inu-Oh", "One Piece", "Lion King"]


      // Fetch search results in parallel
      const searchPromises = keywords.map((keyword) =>
        axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&s=${keyword}`)
      );

      const searchResponses = await Promise.all(searchPromises);

      // Collect first 3–5 movies per search (optional limit)
      const movieIDs = [];
      searchResponses.forEach((response) => {
        const movies = response.data.Search;
        if (response.data.Response === "True") {
          movies.slice(0, 4).forEach((movie) => {
            movieIDs.push(movie.imdbID);
          });
        }
      });

      // Fetch full movie details in parallel
      const detailPromises = movieIDs.map((id) =>
        axios.get(`${OMDB_BASE_URL}?apikey=${OMDB_API_KEY}&i=${id}`)
      );

      const detailResponses = await Promise.all(detailPromises);
      const fullMovies = detailResponses
        .map((res) => res.data)
        .filter((movie) => movie.Response === "True");

      // Remove duplicates
      const uniqueMovies = Array.from(
        new Map(fullMovies.map((movie) => [movie.imdbID, movie])).values()
      );

      console.log("🎬 Optimized Movies:", uniqueMovies);
      dispatch(addNowPlayingMovies(uniqueMovies));
    } catch (err) {
      console.error("❌ Optimized fetch error:", err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);
};

export default useNowPlayingMovies;
