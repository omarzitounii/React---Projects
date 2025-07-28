import { useState, useEffect } from 'react'
import ProductList from './components/ProductList';
import { useProducts } from './context/ProductContext';
import Navbar from './components/Navbar';

function App() {
  const {loading, error} = useProducts();
  return (
    <>
      <Navbar />
      <div className='min-h-screen bg-gray-100 p-6 pb-14'>
        <h1 className='text-3xl font-bold mb-10'>🛒 Products Catalog</h1>
        {loading && <p>Loading...</p>}
        {error && <div className='text-xl text-red-400'>❌ {error}</div>}
        {!loading && !error && <ProductList />
        }
      </div>
    </>
  )
}

export default App
