import { useCart } from "../context/Cart";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="bg-white rounded-lg shadow-xl p-4 flex flex-col hover:scale-105 hover:shadow-2xl transition-all duration-200">
      <img src={product.image} alt={product.name} className="mb-4" />
      <h2 className="text-xl font-semibold">{product.name}</h2>
      <p className="text-sm text-gray-500">{product.description}</p>
      <p className="text-lg font-bold">€{product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="text-white font-semibold bg-blue-600 mt-3 py-2 px-4 rounded transition-all hover:bg-blue-700 cursor-pointer ease-in-out active:scale-95 active:bg-blue-800 duration-100"
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductCard;
