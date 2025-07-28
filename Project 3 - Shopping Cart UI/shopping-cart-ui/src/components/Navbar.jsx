import { useState } from "react";
import { useCart } from "../context/Cart";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { cart, removeFromCart, clearCart } = useCart();
  const itemsCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const totalPrice = cart
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center z-49">
      <h1 className="text-2xl font-bold text-blue-600">Shopping</h1>
      <div className="relative">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="cursor-pointer"
        >
          <FaShoppingCart className="text-2xl text-gray-700" />
          {itemsCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex justify-center items-center">
              {itemsCount}
            </span>
          )}
        </button>
        {showMenu && (
          <div className="absolute mt-2 right-1 w-80 bg-white border rounded shadow-lg p-3 z-50">
            <h2 className="font-bold text-lg mb-5">Cart Items</h2>
            {itemsCount >  0 ? (
                <>
                    <ul className="max-h-60 overflow-y-auto">
                        {cart.map(item => (
                            <li key={item.id} className="flex items-center justify-between my-4">
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-gray-500 text-sm">{item.qty} x €{item.price}</p>
                                </div>
                                <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm hover:underline cursor-pointer active:text-white transition-all duration-75">Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-between items-center mt-5">
                        <span className="font-semibold">Total:</span>
                        <span className="font-semibold">€{totalPrice}</span>
                    </div>
                    <button onClick={clearCart} className="bg-red-500 text-white font-semibold w-full mt-3 py-2 px-4 rounded cursor-pointer hover:bg-red-600 transition-all active:scale-95 duration-75">Clear Cart</button>
                </>
            ) : (<p className="text-gray-500">Your cart is empty</p>)}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
