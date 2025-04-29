import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SellPage from './pages/Sellpage';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  
  const username = localStorage.getItem('username');

  return (
    <div>
      <Routes>
        
        <Route path="/" element={<Home />} />

        
        <Route
          path="/login"
          element={username ? <Navigate to="/" replace /> : <Login />}
        />

       
        <Route
          path="/sell"
          element={username ? <SellPage /> : <Navigate to="/login" replace />}
        />

      
        <Route
          path="/details/:docId"
          element={username ? <ProductDetail /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
};

export default App;
