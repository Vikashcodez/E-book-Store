import React, { useState, useEffect } from 'react';
import { Upload, X, Plus, BookOpen, Edit, Trash2, Eye } from 'lucide-react';

const EbookManagement = () => {
  const [ebooks, setEbooks] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingEbook, setEditingEbook] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    short_description: '',
    full_description: '',
    actual_price: '',
    discount_price: '',
    category: ''
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([null, null, null]);
  const [pdfFile, setPdfFile] = useState(null);

  const categories = [
    'Fiction', 'Non-Fiction', 'Technology', 'Science', 'Business',
    'Self-Help', 'Biography', 'History', 'Romance', 'Fantasy'
  ];

  // Fetch ebooks on component mount
  useEffect(() => {
    fetchEbooks();
  }, []);

  const fetchEbooks = async () => {
    try {
      const response = await fetch('http://localhost/digital-library/api/ebooks');
      const data = await response.json();
      if (data.success) {
        setEbooks(data.ebooks || []);
      }
    } catch (error) {
      console.error('Error fetching ebooks:', error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleThumbnailChange = (e) => {
    setThumbnail(e.target.files[0]);
  };

  const handleImageChange = (index, e) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const removeImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      short_description: '',
      full_description: '',
      actual_price: '',
      discount_price: '',
      category: ''
    });
    setThumbnail(null);
    setImages([null, null, null]);
    setPdfFile(null);
    setEditingEbook(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const submitData = new FormData();
    
    // Add form data
    Object.keys(formData).forEach(key => {
      if (formData[key]) {
        submitData.append(key, formData[key]);
      }
    });

    // Add files
    if (thumbnail) submitData.append('thumbnail', thumbnail);
    if (pdfFile) submitData.append('pdf_file', pdfFile);
    images.forEach((image, index) => {
      if (image) submitData.append(`image_${index + 1}`, image);
    });

    try {
      const url = editingEbook 
        ? `http://localhost/digital-library/api/ebooks/${editingEbook.id}`
        : 'http://localhost/digital-library/api/ebooks';
      
      const method = editingEbook ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        body: submitData,
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage(editingEbook ? 'Ebook updated successfully!' : 'Ebook added successfully!');
        resetForm();
        setShowAddForm(false);
        fetchEbooks(); // Refresh the list
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error saving ebook:', error);
      setMessage('Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (ebook) => {
    setEditingEbook(ebook);
    setFormData({
      title: ebook.title,
      author: ebook.author,
      short_description: ebook.short_description,
      full_description: ebook.full_description,
      actual_price: ebook.actual_price,
      discount_price: ebook.discount_price || '',
      category: ebook.category
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this ebook?')) return;

    try {
      const response = await fetch(`http://localhost/digital-library/api/ebooks/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();
      
      if (data.success) {
        setMessage('Ebook deleted successfully!');
        fetchEbooks(); // Refresh the list
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error('Error deleting ebook:', error);
      setMessage('Network error. Please try again.');
    }
  };

  const cancelEdit = () => {
    resetForm();
    setShowAddForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">eBook Management</h1>
          <p className="text-gray-600 mt-1">Manage your digital library collection</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowAddForm(true);
          }}
          className="bg-lavender-600 hover:bg-lavender-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Book
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.includes('successfully') 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {message}
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-lavender-100 rounded-lg">
                <BookOpen className="w-6 h-6 text-lavender-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                {editingEbook ? 'Edit eBook' : 'Add New eBook'}
              </h2>
            </div>
            <button
              onClick={cancelEdit}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Form fields remain the same as before */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Book Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                  placeholder="Enter book title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author Name *
                </label>
                <input
                  type="text"
                  name="author"
                  required
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                  placeholder="Enter author name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Actual Price ($) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="actual_price"
                  required
                  value={formData.actual_price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="discount_price"
                  value={formData.discount_price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description *
              </label>
              <textarea
                name="short_description"
                required
                rows="3"
                value={formData.short_description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                placeholder="Brief description (appears in listings)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Description
              </label>
              <textarea
                name="full_description"
                rows="6"
                value={formData.full_description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lavender-500 focus:border-lavender-500"
                placeholder="Detailed description about the book"
              />
            </div>

            {/* File Uploads */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thumbnail Image {!editingEbook && '*'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    id="thumbnail"
                    required={!editingEbook}
                  />
                  <label htmlFor="thumbnail" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {thumbnail ? thumbnail.name : 'Click to upload thumbnail'}
                    </p>
                    <p className="text-xs text-gray-500">JPG, PNG, GIF, WEBP (Max 5MB)</p>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  PDF File {!editingEbook && '*'}
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handlePdfChange}
                    className="hidden"
                    id="pdf"
                    required={!editingEbook}
                  />
                  <label htmlFor="pdf" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {pdfFile ? pdfFile.name : 'Click to upload PDF'}
                    </p>
                    <p className="text-xs text-gray-500">PDF only (Max 20MB)</p>
                  </label>
                </div>
              </div>
            </div>

            {/* Additional Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Images (Optional - Up to 3)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(index, e)}
                      className="hidden"
                      id={`image-${index}`}
                    />
                    <label htmlFor={`image-${index}`} className="cursor-pointer block">
                      {image ? (
                        <div className="relative">
                          <p className="text-sm text-gray-600 truncate">{image.name}</p>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              removeImage(index);
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <Plus className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                          <p className="text-xs text-gray-500">Image {index + 1}</p>
                        </>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={cancelEdit}
                className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="bg-lavender-600 hover:bg-lavender-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    {editingEbook ? 'Updating...' : 'Adding eBook...'}
                  </>
                ) : (
                  <>
                    <BookOpen className="w-4 h-4" />
                    {editingEbook ? 'Update eBook' : 'Add eBook'}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* eBooks List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="text-lg font-semibold text-gray-900">
            All eBooks ({ebooks.length})
          </h3>
        </div>

        {ebooks.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No eBooks Found</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first eBook to the library.</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-lavender-600 hover:bg-lavender-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
            >
              Add Your First eBook
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Book
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {ebooks.map((ebook) => (
                  <tr key={ebook.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-lavender-100 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-lavender-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {ebook.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {ebook.short_description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ebook.author}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-lavender-100 text-lavender-800">
                        {ebook.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        ${ebook.actual_price}
                        {ebook.discount_price && (
                          <span className="ml-2 text-green-600 line-through">
                            ${ebook.discount_price}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        ebook.status === 'active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {ebook.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(ebook)}
                          className="text-lavender-600 hover:text-lavender-900 p-1 rounded transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(ebook.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        {ebook.pdf_url && (
                          <a
                            href={`http://localhost/digital-library${ebook.pdf_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                            title="View PDF"
                          >
                            <Eye className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style jsx>{`
        .bg-lavender-100 { background-color: #f5f3ff; }
        .bg-lavender-600 { background-color: #9333ea; }
        .bg-lavender-700 { background-color: #7e22ce; }
        .text-lavender-600 { color: #9333ea; }
        .text-lavender-800 { color: #5b21b6; }
      `}</style>
    </div>
  );
};

export default EbookManagement;