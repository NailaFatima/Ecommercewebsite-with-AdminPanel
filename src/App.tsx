import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AdminAuthProvider } from './context/AdminAuthContext';
import Header from './components/Header';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';
import ProductListingPage from './pages/ProductListingPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PaymentPage from './pages/PaymentPage';
import InvoicePage from './pages/InvoicePage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductManagement from './pages/admin/ProductManagement';
import OrderManagement from './pages/admin/OrderManagement';
import CustomerManagement from './pages/admin/CustomerManagement';
import Analytics from './pages/admin/Analytics';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AdminAuthProvider>
      <CartProvider>
        <Router>
          <div className="App">
            <Routes>
              {/* Customer Routes */}
              <Route path="/" element={
                <>
                  <Header />
                  <main>
                    <ProductListingPage />
                  </main>
                </>
              } />
              <Route path="/product/:id" element={
                <>
                  <Header />
                  <main>
                    <ProductDetailsPage />
                  </main>
                </>
              } />
              <Route path="/cart" element={
                <>
                  <Header />
                  <main>
                    <CartPage />
                  </main>
                </>
              } />
              <Route path="/checkout" element={
                <>
                  <Header />
                  <main>
                    <CheckoutPage />
                  </main>
                </>
              } />
              <Route path="/payment" element={
                <>
                  <Header />
                  <main>
                    <PaymentPage />
                  </main>
                </>
              } />
              <Route path="/invoice" element={
                <>
                  <Header />
                  <main>
                    <InvoicePage />
                  </main>
                </>
              } />
              
              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={
                  <ProtectedRoute permission="products">
                    <ProductManagement />
                  </ProtectedRoute>
                } />
                <Route path="orders" element={
                  <ProtectedRoute permission="orders">
                    <OrderManagement />
                  </ProtectedRoute>
                } />
                <Route path="customers" element={
                  <ProtectedRoute permission="customers">
                    <CustomerManagement />
                  </ProtectedRoute>
                } />
                <Route path="analytics" element={
                  <ProtectedRoute permission="analytics">
                    <Analytics />
                  </ProtectedRoute>
                } />
              </Route>
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AdminAuthProvider>
  );
}

export default App;