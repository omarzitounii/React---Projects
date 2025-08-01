import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState(() => {
        const stored = localStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(cart));
    },[cart]);

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            
            if (existing) {
                return prev.map(item => item.id === product.id ? {...item, qty: item.qty + 1} : item);
            }

            return [...prev, {...product, qty: 1}];
        });
    }

    const removeFromCart = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    }

    const clearCart = () => {
        setCart([]);
    }

    const value = {cart, addToCart, removeFromCart, clearCart};
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    return useContext(CartContext);
}