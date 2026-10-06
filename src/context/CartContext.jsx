import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { initialMockOrders } from '../data/products.js';
import { useToast } from './ToastContext.jsx';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'novamart_cart_v1';
const ORDERS_STORAGE_KEY = 'novamart_orders_v1';
const USER_STORAGE_KEY = 'novamart_user_v1';

const defaultUser = {
  name: 'Piyush Pant',
  email: 'piyush.pant@novamart.in',
  mobile: '+91 98765 43210',
  gender: 'Male',
  memberSince: 'October 2024',
  isLoggedIn: true,
  addresses: [
    {
      id: 'addr-1',
      type: 'Home',
      fullName: 'Piyush Pant',
      mobile: '9876543210',
      address: 'Flat 402, Skylark Residency, 100ft Road, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560038',
      isDefault: true
    },
    {
      id: 'addr-2',
      type: 'Work',
      fullName: 'Piyush Pant',
      mobile: '9876543210',
      address: 'Tower B, 5th Floor, Cyber Greens Tech Park, DLF Phase 3',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
      isDefault: false
    }
  ],
  paymentMethods: [
    {
      id: 'pm-1',
      type: 'UPI',
      label: 'piyushpant@okicici',
      provider: 'Google Pay / ICICI Bank',
      isDefault: true
    },
    {
      id: 'pm-2',
      type: 'Card',
      label: 'HDFC Regalia Visa •••• 4829',
      provider: 'Expires 08/29',
      isDefault: false
    }
  ]
};

export function CartProvider({ children }) {
  const { showToast } = useToast();

  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : initialMockOrders;
    } catch {
      return initialMockOrders;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : defaultUser;
    } catch {
      return defaultUser;
    }
  });

  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // Ignore storage errors
    }
  }, [cartItems]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {
      // Ignore storage errors
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch {
      // Ignore storage errors
    }
  }, [user]);

  const addToCart = (product, quantity = 1) => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(10, updated[existingIndex].quantity + quantity)
        };
        return updated;
      }
      return [...prev, { ...product, quantity }];
    });
    showToast('Added to cart', 'success');
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
    showToast('Removed from cart', 'remove');
  };

  const increaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(10, item.quantity + 1) }
          : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = (silent = false) => {
    setCartItems([]);
    if (!silent) {
      showToast('Cart cleared', 'remove');
    }
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.id === productId);
  };

  const getItemQuantity = (productId) => {
    const found = cartItems.find((item) => item.id === productId);
    return found ? found.quantity : 0;
  };

  const priceSummary = useMemo(() => {
    const originalTotal = cartItems.reduce(
      (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
      0
    );
    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const totalDiscount = Math.max(0, originalTotal - subtotal);
    const deliveryCharge = subtotal === 0 ? 0 : subtotal >= 499 ? 0 : 49;
    const tax = Math.round(subtotal * 0.05);
    const finalTotal = subtotal + deliveryCharge + tax;
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return {
      originalTotal,
      subtotal,
      totalDiscount,
      deliveryCharge,
      tax,
      finalTotal,
      totalItems
    };
  }, [cartItems]);

  const placeOrder = ({ address, paymentMethod }) => {
    const randomNum = Math.floor(100000 + Math.random() * 900000);
    const orderId = `ORD-${randomNum}`;
    const today = new Date();
    const deliveryDateObj = new Date(today);
    deliveryDateObj.setDate(today.getDate() + 3);

    const formattedDate = today.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
    const formattedDelivery = deliveryDateObj.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });

    const newOrder = {
      id: orderId,
      date: formattedDate,
      deliveryDate: `Estimated by ${formattedDelivery}`,
      estimatedDateRaw: formattedDelivery,
      status: 'Processing',
      paymentMethod,
      totalAmount: priceSummary.finalTotal,
      priceBreakdown: { ...priceSummary },
      address: `${address.fullName}, ${address.address}, ${address.city}, ${address.state} - ${address.pincode} (Phone: ${address.mobile})`,
      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      }))
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLastPlacedOrder(newOrder);
    clearCart(true);
    showToast('Order placed successfully!', 'success');
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((ord) =>
        ord.id === orderId
          ? {
              ...ord,
              status: 'Cancelled',
              deliveryDate: 'Cancelled by user · Refund initiated'
            }
          : ord
      )
    );
    showToast(`Order ${orderId} cancelled`, 'remove');
  };

  const loginUser = ({ emailOrMobile, name }) => {
    setUser((prev) => ({
      ...prev,
      name: name || prev.name || 'Piyush Pant',
      email: emailOrMobile.includes('@') ? emailOrMobile : prev.email,
      mobile: !emailOrMobile.includes('@') ? emailOrMobile : prev.mobile,
      isLoggedIn: true
    }));
    showToast('Signed in successfully', 'success');
  };

  const logoutUser = () => {
    setUser((prev) => ({ ...prev, isLoggedIn: false }));
    showToast('Signed out of your account', 'info');
  };

  const updateProfile = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile details updated', 'success');
  };

  const addAddress = (addr) => {
    const newAddr = {
      ...addr,
      id: `addr-${Date.now()}`,
      isDefault: user.addresses.length === 0
    };
    setUser((prev) => ({
      ...prev,
      addresses: [...prev.addresses, newAddr]
    }));
    showToast('New delivery address saved', 'success');
    return newAddr;
  };

  const removeAddress = (addrId) => {
    setUser((prev) => ({
      ...prev,
      addresses: prev.addresses.filter((a) => a.id !== addrId)
    }));
    showToast('Address removed', 'remove');
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        isInCart,
        getItemQuantity,
        ...priceSummary,
        orders,
        placeOrder,
        cancelOrder,
        lastPlacedOrder,
        user,
        loginUser,
        logoutUser,
        updateProfile,
        addAddress,
        removeAddress
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
