import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProductProvider } from "./context/ProductsContex";
import ProductPage from './pages/ProductPage';
import Navbar from './components/Navbar';
import FormProductPage from './pages/FormProductPage';
import Login from './pages/LoginPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './utils/ProtectedRoute';

export default function App(){
  return (
    <AuthProvider>
    <ProductProvider>
      <BrowserRouter>
      <div style={{ backgroundColor: '#3E425C', minHeight: '100vh' }}>
        <Navbar/>
              <Routes>
                <Route path="/" element={<Login/>}/>
                <Route element={<ProtectedRoute/>}>
                <Route path="/ProductsList" element={<ProductPage/>}/>
                <Route path="/newProduct" element={<FormProductPage/>}/>
                <Route path="/products/:id" element={<FormProductPage/>}/>
                </Route>
              </Routes>
      </div>
      </BrowserRouter>
    </ProductProvider>
    </AuthProvider>
  )
}; 
