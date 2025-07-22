import Card from "../components/Card"
import { useFavoriteMoviesContext } from '../context/FavoriteMoviesContext';

const Favorites = () => {
  const {favorites} = useFavoriteMoviesContext();
  return (
    <div className="mt-32 sm:mt-40 text-white px-7 sm:px-14">
      {/* Grid */}
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-10 my-14 sm:my-20">
          {favorites.map((movie) => {
            return <Card key={movie.id} movie={movie} />;
          })}
        </div>
      ) : (
        <>
          <h2 className="text-center text-white font-bold mt-20 text-2xl">You have no favorite movies yet</h2>
          <p className="text-center font-bold mt-8 text-xl">Start adding movies to your favorites and they will appear here!</p>
        </>
      )}
    </div>
  );
}

export default Favorites
