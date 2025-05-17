import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SellPage from './pages/Sellpage';
import ProductDetail from './pages/ProductDetail';

const App = () => {
  
  const username = localStorage.getItem('username');
console.log(username);

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
          element={<ProductDetail/>}
        />
      </Routes>
    </div>
  );
};

export default App;
