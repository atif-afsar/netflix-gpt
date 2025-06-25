import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";

const Browse = () => {
  useNowPlayingMovies();

  return (
   
      <div>
        <Header />
        <MainContainer />
        
        <div className="bg-black"><SecondaryContainer /></div>
      </div>
   
  );
};

export default Browse;
