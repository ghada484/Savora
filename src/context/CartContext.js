import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

const DELIVERY_FEE = 50;

const FOOD_PRICES = {
  1: 220,
  2: 180,
  3: 160,
  4: 195,
  5: 240,
  6: 175,
  7: 210,
  8: 190,
  9: 230,
  10: 165,
};

const getFoodPrice = (recipe) => {
  return FOOD_PRICES[recipe.id] || 180;
};

const getSavedCart = () => {
  try {
    return (
      JSON.parse(
        localStorage.getItem("savoraCart")
      ) || []
    );
  } catch (error) {
    return [];
  }
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    getSavedCart
  );


  // Save cart
  useEffect(() => {
    localStorage.setItem(
      "savoraCart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);


  // Add item to cart
  const addToCart = (recipe) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) => item.id === recipe.id
      );

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === recipe.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...recipe,
          price: getFoodPrice(recipe),
          quantity: 1,
        },
      ];
    });
  };


  // Remove item
  const removeFromCart = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== id
      )
    );
  };


  // Increase quantity
  const increaseQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };


  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter(
          (item) => item.quantity > 0
        )
    );
  };


  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };


  // Cart count
  const cartCount = cartItems.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );


  // Cart subtotal
  const cartSubtotal = cartItems.reduce(
    (total, item) =>
      total +
      item.quantity * item.price,
    0
  );


  // Cart total
  const cartTotal =
    cartSubtotal + DELIVERY_FEE;


  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        deliveryFee: DELIVERY_FEE,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}