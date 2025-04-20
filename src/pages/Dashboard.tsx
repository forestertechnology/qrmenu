import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Plus, Settings, LogOut, Menu as MenuIcon, Users, CreditCard, BarChart3 } from 'lucide-react';
import Tooltip from '../components/Tooltip';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('menus');

  const tabs = [
    { id: 'menus', label: 'Menus', icon: MenuIcon },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'billing', label: 'Billing', icon: CreditCard },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Tooltip text="Go to Dashboard">
              <button onClick={() => setActiveTab('menus')} className="flex items-center space-x-2">
                <QrCode className="w-8 h-8 text-orange-500" />
                <span className="text-2xl font-bold text-gray-900">QRMenu</span>
              </button>
            </Tooltip>
            <div className="flex items-center space-x-4">
              <Tooltip text="Settings">
                <button className="text-gray-600 hover:text-orange-500 transition-colors">
                  <Settings className="w-6 h-6" />
                </button>
              </Tooltip>
              <Tooltip text="Logout">
                <button 
                  onClick={() => navigate('/login')}
                  className="text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <LogOut className="w-6 h-6" />
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        {/* Tabs */}
        <div className="flex space-x-6 mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Tooltip key={tab.id} text={tab.label}>
                <button
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-orange-500 text-white'
                      : 'text-gray-600 hover:bg-orange-50 hover:text-orange-500'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              </Tooltip>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === 'menus' ? (
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Active Menus</h3>
                <p className="text-3xl font-bold text-orange-500">3</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Views</h3>
                <p className="text-3xl font-bold text-orange-500">1,234</p>
              </div>
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">QR Scans</h3>
                <p className="text-3xl font-bold text-orange-500">567</p>
              </div>
            </div>

            {/* Menus Section */}
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Your Menus</h2>
                <Tooltip text="Create new menu">
                  <button 
                    onClick={() => navigate('/create-menu')}
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center space-x-2"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Create Menu</span>
                  </button>
                </Tooltip>
              </div>

              {/* Menu List */}
              <div className="space-y-4">
                {/* Sample Menus - Replace with actual data */}
                <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition-colors">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Main Menu</h3>
                      <p className="text-gray-600">Last updated: 2 days ago</p>
                    </div>
                    <div className="flex space-x-2">
                      <Tooltip text="Edit menu">
                        <button className="text-gray-400 hover:text-orange-500 transition-colors">
                          <Settings className="w-5 h-5" />
                        </button>
                      </Tooltip>
                      <Tooltip text="View QR code">
                        <button className="text-gray-400 hover:text-orange-500 transition-colors">
                          <QrCode className="w-5 h-5" />
                        </button>
                      </Tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {tabs.find(tab => tab.id === activeTab)?.label}
            </h2>
            <p className="text-gray-600">This feature is coming soon!</p>
          </div>
        )}
      </main>
    </div>
  );
}