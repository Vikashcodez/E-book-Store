// EbookStoreSection.jsx
import React, { useState, useEffect } from 'react';

const EbookStoreSection = () => {
  const [ebooks, setEbooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEbooks();
  }, []);

  const fetchEbooks = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost/digital-library/api/ebooks');
      const data = await response.json();
      
      if (data.success) {
        setEbooks(data.ebooks || []);
      } else {
        setError('Failed to load ebooks');
      }
    } catch (error) {
      console.error('Error fetching ebooks:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get correct image URL
  const getImageUrl = (url) => {
    if (!url) return null;
    
    // Remove any duplicate /digital-library if present
    let cleanUrl = url.replace(/^\/digital-library\/digital-library/, '/digital-library');
    
    // Ensure it starts with /digital-library
    if (!cleanUrl.startsWith('/digital-library')) {
      cleanUrl = '/digital-library' + cleanUrl;
    }
    
    return `http://localhost${cleanUrl}`;
  };

  // Format price with dollar sign
  const formatPrice = (price) => {
    return `$${parseFloat(price).toFixed(2)}`;
  };

  // Calculate discount percentage
  const calculateDiscount = (actualPrice, discountPrice) => {
    if (!discountPrice) return null;
    const discount = ((actualPrice - discountPrice) / actualPrice) * 100;
    return `${Math.round(discount)}% OFF`;
  };

  // Get features based on book data
  const getFeatures = (ebook) => {
    const features = ["Lifetime Access", "Printable PDF", "Mobile Friendly"];
    
    // Add format-specific features
    if (ebook.pdf_url) {
      features.push("Instant Download");
    }
    
    // Add additional features if available
    const imageUrls = ebook.image_urls ? JSON.parse(ebook.image_urls) : [];
    if (imageUrls.length > 0) {
      features.push("High Quality Images");
    }
    
    return features;
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-br from-lavender-50 to-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto"></div>
            </div>
            <div className="mt-12 space-y-8">
              {[1, 2].map((item) => (
                <div key={item} className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
                  <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-shrink-0 lg:w-48">
                      <div className="w-full h-64 bg-gray-300 rounded-xl"></div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                      <div className="space-y-2">
                        <div className="h-3 bg-gray-300 rounded"></div>
                        <div className="h-3 bg-gray-300 rounded w-5/6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gradient-to-br from-lavender-50 to-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-red-800 mb-2">Error Loading eBooks</h3>
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchEbooks}
              className="mt-4 bg-lavender-600 hover:bg-lavender-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-lavender-50 to-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our Premium
            <span className="text-lavender-600 block mt-2">eBook Collection</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Instant digital delivery. Read on any device. Lifetime access with free updates.
          </p>
        </div>

        {/* eBooks Flex Container */}
        <div className="flex flex-col gap-8 mb-12">
          {ebooks.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white rounded-2xl shadow-lg p-12">
                <div className="w-24 h-24 bg-lavender-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-lavender-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">No eBooks Available</h3>
                <p className="text-gray-600 mb-4">Check back soon for our latest eBook releases.</p>
                <p className="text-sm text-gray-500">New eBooks are being added regularly.</p>
              </div>
            </div>
          ) : (
            ebooks.map((ebook) => {
              const discount = calculateDiscount(ebook.actual_price, ebook.discount_price);
              const features = getFeatures(ebook);
              const thumbnailUrl = getImageUrl(ebook.thumbnail_url);

              return (
                <div
                  key={ebook.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-lavender-100"
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* eBook Cover */}
                      <div className="flex-shrink-0 lg:w-48">
                        {thumbnailUrl ? (
                          <img
                            src={thumbnailUrl}
                            alt={ebook.title}
                            className="w-full h-64 object-cover rounded-xl shadow-lg group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              // If image fails to load, show fallback
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'flex';
                            }}
                          />
                        ) : null}
                        
                        {/* Fallback when no thumbnail or image fails to load */}
                        <div 
                          className={`w-full h-64 bg-gradient-to-br from-lavender-400 to-purple-500 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300 ${
                            thumbnailUrl ? 'hidden' : 'flex'
                          }`}
                        >
                          <div className="text-center text-white">
                            <div className="w-16 h-20 bg-white/20 rounded-lg mx-auto mb-3"></div>
                            <span className="font-semibold text-lg">eBook</span>
                          </div>
                        </div>
                      </div>

                      {/* eBook Content */}
                      <div className="flex-1 min-w-0">
                        {/* Category */}
                        <div className="inline-block bg-lavender-100 text-lavender-700 px-3 py-1 rounded-full text-sm font-medium mb-4">
                          {ebook.category}
                        </div>

                        {/* Title & Author */}
                        <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                          {ebook.title}
                        </h3>
                        <p className="text-gray-600 mb-4">by {ebook.author}</p>

                        {/* Short Description Only */}
                        {ebook.short_description && (
                          <p className="text-gray-700 mb-6 leading-relaxed">
                            {ebook.short_description}
                          </p>
                        )}

                        {/* Features */}
                        <div className="flex flex-wrap gap-4 mb-6">
                          {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-lavender-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span className="text-sm text-gray-600 whitespace-nowrap">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Format & Pages */}
                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            PDF Format
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                            Instant Download
                          </div>
                        </div>

                        {/* Price & CTA */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className="text-3xl font-bold text-lavender-600">
                              {formatPrice(ebook.discount_price || ebook.actual_price)}
                            </span>
                            {ebook.discount_price && (
                              <>
                                <span className="text-lg text-gray-500 line-through">
                                  {formatPrice(ebook.actual_price)}
                                </span>
                                <span className="bg-lavender-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                  {discount}
                                </span>
                              </>
                            )}
                          </div>
                          <button className="bg-lavender-600 hover:bg-lavender-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 w-full sm:w-auto">
                            Get eBook
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-lavender-100">
          <div className="flex flex-col md:flex-row gap-8 justify-between">
            <div className="text-center flex-1">
              <div className="w-12 h-12 bg-lavender-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-lavender-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Secure Payment</h4>
              <p className="text-gray-600 text-sm">SSL encrypted payments. 100% secure transaction.</p>
            </div>
            <div className="text-center flex-1">
              <div className="w-12 h-12 bg-lavender-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-lavender-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Instant Download</h4>
              <p className="text-gray-600 text-sm">Get immediate access after purchase. No waiting.</p>
            </div>
            <div className="text-center flex-1">
              <div className="w-12 h-12 bg-lavender-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-lavender-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Lifetime Access</h4>
              <p className="text-gray-600 text-sm">Free updates forever. Download on all your devices.</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-lavender-50 { background-color: #f5f3ff; }
        .bg-lavender-100 { background-color: #ddd6fe; }
        .bg-lavender-400 { background-color: #a78bfa; }
        .bg-lavender-600 { background-color: #9333ea; }
        .bg-lavender-700 { background-color: #7e22ce; }
        .from-lavender-50 { --tw-gradient-from: #f5f3ff; }
        .from-lavender-400 { --tw-gradient-from: #a78bfa; }
        .to-purple-500 { --tw-gradient-to: #a855f7; }
        .text-lavender-600 { color: #9333ea; }
        .text-lavender-700 { color: #7e22ce; }
        .border-lavender-100 { border-color: #ddd6fe; }
        .hover\\:bg-lavender-700:hover { background-color: #7e22ce; }
      `}</style>
    </section>
  );
};

export default EbookStoreSection;