// EbookStoreSection.jsx
import React from 'react';

const EbookStoreSection = () => {
  const ebooks = [
    {
      id: 1,
      title: "Mindful Reading Mastery",
      author: "Dr. Elena Simmons",
      price: "$14.99",
      originalPrice: "$24.99",
      discount: "40% OFF",
      category: "Personal Development",
      format: "PDF + EPUB",
      pages: "285 pages",
      features: ["Lifetime Access", "Printable PDF", "Mobile Friendly", "Audio Excerpts"],
      description: "Master the art of mindful reading with proven techniques to enhance focus, retention, and comprehension. Transform your reading habits and absorb knowledge more effectively."
    },
    {
      id: 2,
      title: "Digital Wisdom Guide",
      author: "Marcus Chen",
      price: "$16.99",
      originalPrice: "$29.99",
      discount: "43% OFF",
      category: "Technology & Philosophy",
      format: "PDF + EPUB + MOBI",
      pages: "320 pages",
      features: ["All Formats", "Case Studies", "Community Access", "Updates Included"],
      description: "Navigate the digital age with wisdom. Learn to balance technology with meaningful human connections and make informed decisions in our rapidly evolving world."
    }
  ];

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
          {ebooks.map((ebook) => (
            <div
              key={ebook.id}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-lavender-100"
            >
              <div className="p-8">
                <div className="flex flex-col lg:flex-row gap-8">
                  {/* eBook Cover */}
                  <div className="flex-shrink-0 lg:w-48">
                    <div className="w-full h-64 bg-gradient-to-br from-lavender-400 to-purple-500 rounded-xl shadow-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
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

                    {/* Description */}
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {ebook.description}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-4 mb-6">
                      {ebook.features.map((feature, index) => (
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
                        {ebook.format}
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        {ebook.pages}
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-3xl font-bold text-lavender-600">{ebook.price}</span>
                        <span className="text-lg text-gray-500 line-through">{ebook.originalPrice}</span>
                        <span className="bg-lavender-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                          {ebook.discount}
                        </span>
                      </div>
                      <button className="bg-lavender-600 hover:bg-lavender-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 w-full sm:w-auto">
                        Get eBook
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
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