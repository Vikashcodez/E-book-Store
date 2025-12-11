import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SalesTimerRibbon from './components/Ribon';
import BookStoreSection from './components/amazonbooks';
import EbookStoreSection from './components/ebooks';
import Footer from './components/Footer';
import Home from './Pages/Home';
import LoginPage from './Pages/Login';
import SignupPage from './Pages/Signup';
import AdminDashboard from './Pages/AdminDashboard.';

// Dummy components for other routes (replace with your actual components)
const Blogs = () => <div className="min-h-screen pt-24 px-6">Blogs Page</div>;
const About = () => <div className="min-h-screen pt-24 px-6">About Page</div>;
const Contact = () => <div className="min-h-screen pt-24 px-6">Contact Page</div>;

const App = () => {
  const location = useLocation();
  const isLoginOrSignupPageOrAdminDashboard =
    location.pathname === '/login' ||
    location.pathname === '/signup' ||
    location.pathname === '/admin/dashboard';

  return (
    <>
      {!isLoginOrSignupPageOrAdminDashboard && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<BookStoreSection />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
      {!isLoginOrSignupPageOrAdminDashboard && <Footer />}
    </>
  );
};

export default App;