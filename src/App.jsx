
import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import SellPage from './pages/Sellpage'
import ProductDetail from './pages/ProductDetail'
const App = () => {
  return (
    <div>
        
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/sell' element={<SellPage/>}/>
        <Route path='/details' element={<ProductDetail/>}/>
      </Routes>
     
    </div>
  )
}

export default App