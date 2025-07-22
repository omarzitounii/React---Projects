import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useFavoriteMoviesContext } from '../context/FavoriteMoviesContext';

const Card = ({movie}) => {
  const {addToFavorites, removeFromFavorites, isFavorite} = useFavoriteMoviesContext();

  const handleToggleFavorite = () => {
    isFavorite(movie.id) ? removeFromFavorites(movie.id) : addToFavorites(movie); 
  }

  return (
    <div onClick={handleToggleFavorite} className="bg-stone-950 rounded-lg overflow-hidden cursor-pointer group relative">

      {/* Overlay on Hover */}
      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Heart Icon */}
      <div className="absolute top-3 right-3  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <FontAwesomeIcon icon={faHeart} className={`text-xl p-2 bg-zinc-600 rounded-full group-active:scale-110 transition-transform duration-150 ${isFavorite(movie.id) ? `text-rose-700` : `text-white`}`} />
      </div>
  
      <img
        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
        alt="Movie Poster"
        className='rounded-t-lg'
      />

      <div className='ps-3'>
        <h3 className="mt-2 text-lg font-semibold">{movie.title}</h3>
        <p className="text-sm text-gray-400 pb-3">{movie.release_date.slice(0, 4)}</p>
      </div>
    </div>
  );
};

export default Card;

