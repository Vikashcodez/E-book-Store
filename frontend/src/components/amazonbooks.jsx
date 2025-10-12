// BookStoreSection.jsx
import React from 'react';

const BookStoreSection = () => {
  const books = [
    {
      id: 1,
      title: "The Art of Mindful Reading",
      author: "Elena Simmons",
      price: "$24.99",
      originalPrice: "$34.99",
      discount: "28% OFF",
      image: "/api/placeholder/300/400",
      amazonLink: "#",
      rating: 4.8,
      reviews: 1247,
      description: "Discover the transformative power of mindful reading and how it can enhance your focus and comprehension."
    },
    {
      id: 2,
      title: "Digital Wisdom in Modern Age",
      author: "Marcus Chen",
      price: "$29.99",
      originalPrice: "$39.99",
      discount: "25% OFF",
      image: "/api/placeholder/300/400",
      amazonLink: "#",
      rating: 4.9,
      reviews: 892,
      description: "Navigate the digital world with insights from technology, philosophy, and modern innovation."
    },
    {
      id: 3,
      title: "Contemporary Stories Collection",
      author: "Sarah Johnson",
      price: "$19.99",
      originalPrice: "$29.99",
      discount: "33% OFF",
      image: "/api/placeholder/300/400",
      amazonLink: "#",
      rating: 4.7,
      reviews: 1563,
      description: "A collection of modern narratives that capture the essence of our interconnected world."
    }
  ];

  const StarRating = ({ rating }) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-gray-600 text-sm ml-1">({rating})</span>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-br from-lavender-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Buy Our Books from 
            <span className="text-lavender-600 block mt-2">Amazon</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our bestselling collection available on Amazon. Get exclusive discounts and fast delivery on all your favorite reads.
          </p>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {books.map((book) => (
            <div
              key={book.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group"
            >
              {/* Book Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-80 bg-gradient-to-br from-lavender-200 to-purple-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-32 bg-white/20 rounded-lg mx-auto mb-4"></div>
                    <span className="text-white font-semibold text-lg">Book Cover</span>
                  </div>
                </div>
                
                {/* Discount Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-lavender-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {book.discount}
                  </span>
                </div>
              </div>

              {/* Book Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                  {book.title}
                </h3>
                <p className="text-gray-600 mb-3">by {book.author}</p>
                
                <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                  {book.description}
                </p>

                {/* Rating */}
                <div className="flex items-center justify-between mb-4">
                  <StarRating rating={book.rating} />
                  <span className="text-gray-500 text-sm">{book.reviews} reviews</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-lavender-600">{book.price}</span>
                  <span className="text-lg text-gray-500 line-through">{book.originalPrice}</span>
                </div>

                {/* Amazon Button */}
                <a
                  href={book.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10.605 0h2.606v5.527h2.723V7.34H10.605V0zm-2.283 2.282H5.456v5.058H3.545V2.282H0V0h7.322v2.282zM9.926 8.227a3.571 3.571 0 01-1.392-.28 3.851 3.851 0 01-1.143-.784 4.1 4.1 0 01-.784-1.143 3.57 3.57 0 01-.28-1.392c0-.49.093-.95.28-1.38a3.85 3.85 0 01.784-1.143 4.1 4.1 0 011.143-.784A3.57 3.57 0 019.926 0c.49 0 .95.093 1.38.28a3.85 3.85 0 011.143.784 4.1 4.1 0 01.784 1.143c.187.43.28.89.28 1.38 0 .49-.093.95-.28 1.38a3.85 3.85 0 01-.784 1.143 4.1 4.1 0 01-1.143.784 3.57 3.57 0 01-1.38.28zm0-2.282c.34 0 .66-.066.96-.2a2.57 2.57 0 00.784-.544 2.57 2.57 0 00.544-.784c.134-.3.2-.62.2-.96 0-.34-.066-.66-.2-.96a2.57 2.57 0 00-.544-.784 2.57 2.57 0 00-.784-.544 2.57 2.57 0 00-.96-.2c-.34 0-.66.066-.96.2a2.57 2.57 0 00-.784.544 2.57 2.57 0 00-.544.784 2.57 2.57 0 00-.2.96c0 .34.066.66.2.96.134.3.32.56.544.784.224.224.484.4.784.544.3.134.62.2.96.2z"/>
                  </svg>
                  Buy on Amazon
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Can't Decide Which Book to Choose?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Explore our complete collection on Amazon and discover thousands of other readers' favorites. 
              All books come with our quality guarantee and fast delivery.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-lavender-600 hover:bg-lavender-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <span>View All Books on Amazon</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-lavender-50 { background-color: #f5f3ff; }
        .bg-lavender-200 { background-color: #ddd6fe; }
        .bg-lavender-600 { background-color: #9333ea; }
        .bg-lavender-700 { background-color: #7e22ce; }
        .from-lavender-50 { --tw-gradient-from: #f5f3ff; }
        .from-lavender-200 { --tw-gradient-from: #ddd6fe; }
        .to-purple-50 { --tw-gradient-to: #faf5ff; }
        .to-purple-300 { --tw-gradient-to: #d8b4fe; }
        .text-lavender-600 { color: #9333ea; }
        .hover\\:bg-lavender-700:hover { background-color: #7e22ce; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default BookStoreSection;