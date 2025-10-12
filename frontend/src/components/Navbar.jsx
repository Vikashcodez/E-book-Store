import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Search } from 'lucide-react';
import { Link } from 'react-router-dom'; // Add this import

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home', path: '/' },
    { name: 'Books', id: 'books', path: '/books' },
    { name: 'Blogs', id: 'blogs', path: '/blogs' },
    { name: 'About', id: 'about', path: '/about' },
    { name: 'Contact', id: 'contact', path: '/contact' }
  ];

  return (
    <>
      <nav className="fixed w-full top-0 z-50 pt-4 px-6">
        <div className={`max-w-6xl mx-auto transition-all duration-300 rounded-2xl ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-md shadow-lg border border-white/20' 
            : 'bg-white/60 backdrop-blur-sm border border-white/20'
        }`}>
          <div className="flex items-center justify-between h-20 px-6">
            
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-lavender-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-serif text-xl">SA</span>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900 tracking-tight">Safiya Abdul</div>
                <div className="text-xs text-gray-500">Digital Library</div>
              </div>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.path}
                  onClick={() => setActiveLink(link.id)}
                  className={`text-sm font-medium transition-colors relative py-1 ${
                    activeLink === link.id 
                      ? 'text-lavender-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                  {activeLink === link.id && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-lavender-600"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden lg:flex items-center gap-3">
              <button className="p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              
              <button className="relative p-2 hover:bg-gray-50 rounded-lg transition-colors">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 w-5 h-5 bg-lavender-600 text-white text-xs flex items-center justify-center rounded-full font-medium">
                    {cartCount}
                  </span>
                )}
              </button>

              <div className="w-px h-6 bg-gray-200 mx-2"></div>

              <Link to="/login">
                <button className="px-5 py-2 bg-lavender-600 text-white text-sm font-medium rounded-lg hover:bg-lavender-700 transition-colors">
                  Login
                </button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-50 rounded-lg"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-2 mx-6 rounded-2xl bg-white/80 backdrop-blur-md border border-white/20 shadow-lg">
            <div className="px-6 py-4">
              <div className="flex flex-col gap-1 mb-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={link.path}
                    onClick={() => {
                      setActiveLink(link.id);
                      setIsMenuOpen(false);
                    }}
                    className={`px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      activeLink === link.id
                        ? 'bg-lavender-50 text-lavender-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t">
                <button className="flex-1 px-4 py-3 bg-gray-50 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Cart ({cartCount})
                </button>
                <Link to="/login" className="flex-1">
                  <button className="w-full px-4 py-3 bg-lavender-600 text-white text-sm font-medium rounded-lg hover:bg-lavender-700 transition-colors">
                    Login
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

    

      <style jsx>{`
        .bg-lavender-50 { background-color: #f5f3ff; }
        .bg-lavender-600 { background-color: #9333ea; }
        .bg-lavender-700 { background-color: #7e22ce; }
        .text-lavender-600 { color: #9333ea; }
        .hover\\:bg-lavender-700:hover { background-color: #7e22ce; }
      `}</style>
    </>
  );
}