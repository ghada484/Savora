import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { OrderProvider } from "./context/OrderContext";
import { ToastProvider } from "./context/ToastContext";

import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import AdminProtectedRoute from "./Components/AdminProtectedRoute/AdminProtectedRoute";

import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Menu from "./Pages/Menu/Menu";
import FoodDetails from "./Pages/FoodDetails/FoodDetails";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import OrderConfirmation from "./Pages/OrderConfirmation/OrderConfirmation";
import MyOrders from "./Pages/MyOrders/MyOrders";
import OrderDetails from "./Pages/OrderDetails/OrderDetails";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Profile from "./Pages/Profile/Profile";

import RestaurantDashboard from "./Pages/RestaurantDashboard/RestaurantDashboard";
import ManageMenu from "./Pages/ManageMenu/ManageMenu";
import CreateFood from "./Pages/CreateFood/CreateFood";
import EditFood from "./Pages/EditFood/EditFood";
import ManageOrders from "./Pages/ManageOrders/ManageOrders";
import AdminOrderDetails from "./Pages/AdminOrderDetails/AdminOrderDetails";

import NotFound from "./Pages/NotFound/NotFound";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <ToastProvider>
            <BrowserRouter>
              <Navbar />

              <Routes>

                {/* Public Routes */}

                <Route
                  path="/"
                  element={<Home />}
                />

                <Route
                  path="/menu"
                  element={<Menu />}
                />

                <Route
                  path="/about"
                  element={<About />}
                />

                <Route
                  path="/menu/:id"
                  element={<FoodDetails />}
                />

                <Route
                  path="/cart"
                  element={<Cart />}
                />

                <Route
                  path="/login"
                  element={<Login />}
                />

                <Route
                  path="/register"
                  element={<Register />}
                />


                {/* Customer Protected Routes */}

                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/checkout"
                  element={
                    <ProtectedRoute>
                      <Checkout />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/order-confirmation"
                  element={
                    <ProtectedRoute>
                      <OrderConfirmation />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/orders"
                  element={
                    <ProtectedRoute>
                      <MyOrders />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/orders/:id"
                  element={
                    <ProtectedRoute>
                      <OrderDetails />
                    </ProtectedRoute>
                  }
                />


                {/* Admin Routes */}

                <Route
                  path="/admin"
                  element={
                    <AdminProtectedRoute>
                      <RestaurantDashboard />
                    </AdminProtectedRoute>
                  }
                />

                <Route
                  path="/admin/menu"
                  element={
                    <AdminProtectedRoute>
                      <ManageMenu />
                    </AdminProtectedRoute>
                  }
                />

                <Route
                  path="/admin/menu/create"
                  element={
                    <AdminProtectedRoute>
                      <CreateFood />
                    </AdminProtectedRoute>
                  }
                />

                <Route
                  path="/admin/menu/edit/:id"
                  element={
                    <AdminProtectedRoute>
                      <EditFood />
                    </AdminProtectedRoute>
                  }
                />

                <Route
                  path="/admin/orders"
                  element={
                    <AdminProtectedRoute>
                      <ManageOrders />
                    </AdminProtectedRoute>
                  }
                />

                <Route
                  path="/admin/orders/:id"
                  element={
                    <AdminProtectedRoute>
                      <AdminOrderDetails />
                    </AdminProtectedRoute>
                  }
                />


                {/* 404 */}

                <Route
                  path="*"
                  element={<NotFound />}
                />

              </Routes>

              <Footer />

            </BrowserRouter>
          </ToastProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;