import { useState, useRef, useEffect } from "react";
import Card from "../components/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isPopularMoviesButtonDisabled, setIsPopularMoviesButtonDisabled] = useState(true);
  const inputRef = useRef(null);

  const handleLoadPopularMovies = async () => {
    if (loading) return
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=7cf219ac3066412fb56941cc8c7f6a24`
      );
      const data = await response.json();
      const popularMovies = data.results;
      setMovies(popularMovies);
      setIsPopularMoviesButtonDisabled(true);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleLoadPopularMovies();
  }, []);

  const handleQuery = async (e) => {
    e.preventDefault();
    const query = inputRef.current.value;
    if (!query.trim()) {
      alert("Please enter movie name");
      return;
    }
    if (loading) return;
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=7cf219ac3066412fb56941cc8c7f6a24`
      );
      const data = await response.json();
      const queryResults = data.results;
      setMovies(queryResults);
      setIsPopularMoviesButtonDisabled(false);
    } catch (err) {
      console.log(err);
    } finally {
      inputRef.current.value = "";
      setLoading(false);
    }
  };

  return (
    <div className="mt-36 sm:mt-40 text-white px-7 sm:px-14 relative">
      <button onClick={handleLoadPopularMovies} className={`absolute -top-12 left-1 lg:left-14 lg:top-1 text-xs lg:text-base font-bold px-4 py-2 rounded-xl transition-all duration-300 ${isPopularMoviesButtonDisabled ? 'bg-gray-500 cursor-not-allowed' : 'bg-rose-700 hover:bg-white hover:text-rose-700 active:scale-90 cursor-pointer'}`}>Show Popular</button>
      {/* Input */}
      <form onSubmit={handleQuery} className="flex justify-center gap-6">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for movies..."
          className="py-2 ps-4 w-[200px] sm:w-[450px] text-md sm:text-2xl border-1 border-rose-400 rounded-2xl placeholder:text-gray-300 placeholder:tracking-widest outline-none tracking-widest"
        />
        <button>
          <FontAwesomeIcon
            icon={faSearch}
            className={`text-xl p-3 rounded-full bg-rose-700 cursor-pointer hover:bg-white hover:text-rose-700 active:scale-90 transition-all duration-300`}
          />
        </button>
      </form>

      {/* Grid */}
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-10 my-14 sm:my-20">
          {movies.map((movie) => {
            return <Card key={movie.id} movie={movie} />;
          })}
        </div>
      ) : (
        <p className="text-center text-white font-bold my-20 text-2xl">No results found</p>
      )}
    </div>
  );
};

export default Home;
