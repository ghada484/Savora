import { createContext, useContext, useState } from "react";

import { useAuth } from "./AuthContext";

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const { user } = useAuth();

  const [orders, setOrders] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savoraOrders")) || [];
    } catch (error) {
      return [];
    }
  });

  const saveOrders = (updatedOrders) => {
    setOrders(updatedOrders);

    localStorage.setItem("savoraOrders", JSON.stringify(updatedOrders));
  };

  const createOrder = ({
    items,
    customer,
    paymentMethod,
    subtotal,
    deliveryFee,
    total,
  }) => {
    const savedOrders = JSON.parse(localStorage.getItem("savoraOrders")) || [];

    const newOrder = {
      id: `order-${Date.now()}`,

      userId: user?.id || null,

      customer: {
        fullName: customer?.fullName || user?.name || "",

        email: customer?.email || user?.email || "",

        phone: customer?.phone || user?.phone || "",

        address: customer?.address || "",

        city: customer?.city || "",

        notes: customer?.notes || "",
      },

      items: items || [],

      subtotal: Number(subtotal) || 0,

      deliveryFee: Number(deliveryFee) || 0,

      total: Number(total) || 0,

      paymentMethod: paymentMethod || "Cash on Delivery",

      status: "Pending",

      createdAt: new Date().toISOString(),
    };

    const updatedOrders = [newOrder, ...savedOrders];

    saveOrders(updatedOrders);

    return newOrder;
  };

  const getUserOrders = () => {
    if (!user) {
      return [];
    }

    return orders.filter((order) => String(order.userId) === String(user.id));
  };

  const getOrderById = (orderId) => {
    return orders.find((order) => String(order.id) === String(orderId));
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const savedOrders = JSON.parse(localStorage.getItem("savoraOrders")) || [];

    const updatedOrders = savedOrders.map((order) =>
      String(order.id) === String(orderId)
        ? {
            ...order,
            status: newStatus,
          }
        : order,
    );

    saveOrders(updatedOrders);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        createOrder,
        getUserOrders,
        getOrderById,
        updateOrderStatus,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  return useContext(OrderContext);
}
