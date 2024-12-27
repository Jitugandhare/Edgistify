import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "../pages/Home"
import Register from './Register';
import Login from './Login';
import Cart from './Cart';
import Orders from './Orders';
import Navbar from './NavBar';

const AllRoutes = () => {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path='/home' element={<Home/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/orders" element={<Orders />} />
            </Routes>
        </Router>
    );
}

export default AllRoutes;
