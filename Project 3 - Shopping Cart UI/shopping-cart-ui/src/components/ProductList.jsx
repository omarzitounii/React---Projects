import ProductCard from "./ProductCard"
import { useProducts } from "../context/ProductContext"

const ProductList = () => {
    const {products, loading, error} = useProducts();
  return (      
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14'>
        {products.map(product => (
            <ProductCard key={product.id} product={product}/>
        ))}
        </div>
  )
}

export default ProductList
