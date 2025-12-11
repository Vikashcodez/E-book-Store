// components/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import AddEbook from '../components/AddEbook';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Users, BookOpen, BarChart3, Settings, LogOut, 
  ShoppingCart, DollarSign, TrendingUp, Package 
} from 'lucide-react';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is admin
    const userData = localStorage.getItem('user');
    if (userData) {
      const userObj = JSON.parse(userData);
      if (userObj.role === 'admin') {
        setUser(userObj);
      } else {
        // Redirect to home if not admin
        navigate('/');
      }
    } else {
      // Redirect to login if not logged in
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const stats = [
    { title: 'Total Users', value: '1,234', icon: Users, color: 'bg-blue-500' },
    { title: 'Total Books', value: '567', icon: BookOpen, color: 'bg-green-500' },
    { title: 'Total Orders', value: '89', icon: ShoppingCart, color: 'bg-purple-500' },
    { title: 'Revenue', value: '$12,345', icon: DollarSign, color: 'bg-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-lavender-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-serif text-xl">SA</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Digital Library Management</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{user.full_name}</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+12% from last month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <nav className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigation</h3>
              <ul className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'users', label: 'User Management', icon: Users },
                  { id: 'books', label: 'Book Management', icon: BookOpen },
                  { id: 'orders', label: 'Order Management', icon: Package },
                  { id: 'settings', label: 'Settings', icon: Settings }
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors ${
                        activeTab === item.id
                          ? 'bg-lavender-50 text-lavender-700'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              {activeTab === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                      {/* Add recent activity content */}
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'users' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">User Management</h2>
                  {/* Add user management content */}
                </div>
              )}

              {activeTab === 'books' && <AddEbook />}
                
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h2>
                  {/* Add order management content */}
                </div>
              )}

              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Settings</h2>
                  {/* Add settings content */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .bg-lavender-50 { background-color: #f5f3ff; }
        .bg-lavender-600 { background-color: #9333ea; }
        .text-lavender-700 { color: #7e22ce; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;