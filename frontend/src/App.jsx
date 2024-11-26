import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Pages and Components
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import SellerDashboard from './pages/SellerDashboard';
import Categories from './components/Categories';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Booking from './components/Booking';
import Login from './pages/Login';
import ContactPage from './pages/Contact';
import TextBook from './pages/Text-Book';
function App() {
    return (
        <> {/* Only one Router wrapping the entire app */}
            <Navbar />
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/booking" element={<Booking />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/seller-dashboard" element={<SellerDashboard />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/books" element={<TextBook />} />
                
            </Routes>
            <Footer />
        </>
    );
}

export default App;
