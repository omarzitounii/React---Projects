import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';


const Navbar = () => {
  const location = useLocation();
  return (
    <nav className='fixed top-0 left-0 right-0 bg-black text-rose-700 text-xl sm:text-2xl font-bold py-5 border-b-2 shadow-2xl z-50'>
      <div className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>
        <Link to="/"><FontAwesomeIcon icon={faSkullCrossbones} className="text-3xl sm:text-5xl hover:text-white active:scale-95 transition-all duration-200" /></Link>
        <ul className='flex flex-row gap-6'>
          <li className={`${location.pathname === '/' ? 'text-white' : ''} hover:text-white active:scale-95 transition-all duration-200`}><Link to="/">Home</Link></li>
          <li className={`${location.pathname === '/favorites' ? 'text-white' : ''} hover:text-white active:scale-95 transition-all duration-200`}><Link to="/favorites">Favorite</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
