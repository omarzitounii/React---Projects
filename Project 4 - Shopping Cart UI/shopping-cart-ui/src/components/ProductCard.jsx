
const ProductCard = ({product}) => {
  return (
    <div className='bg-white rounded-lg shadow-xl p-4 flex flex-col'>
        <img src={product.image} alt={product.name}  className='mb-4'/>
        <h2 className='text-xl font-semibold'>{product.name}</h2>
        <p className='text-sm text-gray-500'>{product.description}</p>
        <p className='text-lg font-bold'>€{product.price}</p>
    </div>
  )
}

export default ProductCard
