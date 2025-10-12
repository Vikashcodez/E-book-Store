// Footer.jsx
import React from 'react';
import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-lavender-600 text-white">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Brand Section - Matches Navbar */}
          <div className="flex-1 max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-lavender-600 font-serif text-xl font-bold">SA</span>
              </div>
              <div>
                <div className="text-lg font-semibold text-white tracking-tight">Safiya Abdul</div>
                <div className="text-xs text-lavender-100">Digital Library</div>
              </div>
            </div>
            <p className="text-lavender-100 mb-6 leading-relaxed text-sm">
              Your premier destination for quality eBooks and digital reading experiences. 
              Transform your reading journey with our carefully curated collection of books and blogs.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-lavender-100 text-sm">
                <Mail className="w-4 h-4" />
                <span>contact@safiyaabdul.com</span>
              </div>
              <div className="flex items-center gap-3 text-lavender-100 text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-lavender-100 text-sm">
                <MapPin className="w-4 h-4" />
                <span>123 Library Street, Bookville</span>
              </div>
            </div>
          </div>

          {/* Quick Links - Matches Navbar Structure */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Explore */}
            <div>
              <h3 className="text-sm font-semibold mb-4 text-white uppercase tracking-wider">Explore</h3>
              <ul className="space-y-3">
                <li><a href="#home" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Home</a></li>
                <li><a href="#books" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Books</a></li>
                <li><a href="#blogs" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Blogs</a></li>
                <li><a href="#about" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">About</a></li>
                <li><a href="#contact" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Contact</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold mb-4 text-white uppercase tracking-wider">Categories</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Fiction</a></li>
                <li><a href="#" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Non-Fiction</a></li>
                <li><a href="#" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Technology</a></li>
                <li><a href="#" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Self-Help</a></li>
                <li><a href="#" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Business</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold mb-4 text-white uppercase tracking-wider">Support</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Help Center</a></li>
                <li><a href="#" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Contact Us</a></li>
                <li><a href="#" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">FAQ</a></li>
                <li><a href="#" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Shipping Info</a></li>
                <li><a href="#" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Returns</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-lavender-500 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-5 h-5 text-lavender-100" />
                <h3 className="text-lg font-semibold text-white">Stay Updated</h3>
              </div>
              <p className="text-lavender-100 text-sm">Get the latest book releases, blog posts, and exclusive discounts.</p>
            </div>
            <div className="flex-1 max-w-md">
              <div className="flex gap-3">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-white/10 border border-lavender-400 rounded-lg text-white placeholder-lavender-200 text-sm focus:outline-none focus:border-white/30 focus:bg-white/15 transition-colors duration-300"
                />
                <button className="bg-white text-lavender-600 hover:bg-lavender-50 font-semibold px-6 py-3 rounded-lg transition-colors duration-300 whitespace-nowrap text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer - Matches Navbar Style */}
      <div className="border-t border-lavender-500">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-lavender-100 text-sm">
              © 2025 Safiya Abdul Digital Library. All rights reserved.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Terms of Service</a>
              <a href="#" className="text-lavender-100 hover:text-white transition-colors duration-300 text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-lavender-600 { background-color: #9333ea; }
        .bg-lavender-500 { background-color: #a855f7; }
        .bg-lavender-400 { background-color: #c084fc; }
        .bg-lavender-50 { background-color: #f5f3ff; }
        .text-lavender-100 { color: #ede9fe; }
        .text-lavender-200 { color: #ddd6fe; }
        .text-lavender-600 { color: #9333ea; }
        .border-lavender-500 { border-color: #a855f7; }
        .border-lavender-400 { border-color: #c084fc; }
      `}</style>
    </footer>
  );
};

export default Footer;