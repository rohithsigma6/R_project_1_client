import React from 'react'
import Header from './components/Layouts/Header';

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import LoginHeader from './components/Layouts/LoginHeader';
import Cart from './pages/Cart';
import OrderPage from './pages/Orders';
function App() {
  return (
    <div>
     
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<LoginHeader><Home/></LoginHeader>} />
          <Route path="/" element={<Header><Register/></Header>} />
          <Route path="/login" element={<Header><Login/></Header>} />
          <Route path="/cart" element={<LoginHeader><Cart/></LoginHeader>} />
          <Route path="/orders" element={<LoginHeader><OrderPage/></LoginHeader>} />
        </Routes>
      </BrowserRouter> 
      

    </div>
  );
}

export default App;
