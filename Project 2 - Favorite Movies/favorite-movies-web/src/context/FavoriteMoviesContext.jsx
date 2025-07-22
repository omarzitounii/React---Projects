import { createContext, useContext, useEffect, useState } from "react";

const FavoriteMoviesContext = createContext();

export const useFavoriteMoviesContext = () => useContext(FavoriteMoviesContext);

export const FavoriteMoviesProvider = ({children}) => {
    const [favorites, setFavorites] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
        setIsInitialized(true); 
    }, []);

    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        }
    }, [favorites, isInitialized]);


    const addToFavorites = (movie) => {
        setFavorites(prev => [...prev, movie]);
    }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId));
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    }

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };
    return (
        <FavoriteMoviesContext.Provider value={value}>
            {children}
        </FavoriteMoviesContext.Provider>
    );

}
