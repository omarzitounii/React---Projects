import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import Navbar from './components/Navbar'
import { FavoriteMoviesProvider } from './context/FavoriteMoviesContext';


const App = () => {
  return (
    <FavoriteMoviesProvider>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>   
    </FavoriteMoviesProvider>
  )
}

export default App

