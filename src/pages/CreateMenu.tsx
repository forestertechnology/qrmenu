import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Plus, X, GripVertical, Image as ImageIcon, ArrowLeft, Save } from 'lucide-react';
import Tooltip from '../components/Tooltip';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image?: string;
}

interface Category {
  id: string;
  name: string;
  items: MenuItem[];
}

export default function CreateMenu() {
  const navigate = useNavigate();
  const [menuName, setMenuName] = useState('');
  const [menuDescription, setMenuDescription] = useState('');
  const [categories, setCategories] = useState<Category[]>([
    { id: '1', name: '', items: [] }
  ]);

  const addCategory = () => {
    setCategories([...categories, { 
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      items: []
    }]);
  };

  const removeCategory = (categoryId: string) => {
    setCategories(categories.filter(category => category.id !== categoryId));
  };

  const updateCategory = (categoryId: string, name: string) => {
    setCategories(categories.map(category => 
      category.id === categoryId ? { ...category, name } : category
    ));
  };

  const addMenuItem = (categoryId: string) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: [...category.items, {
            id: Math.random().toString(36).substr(2, 9),
            name: '',
            description: '',
            price: '',
          }]
        };
      }
      return category;
    }));
  };

  const removeMenuItem = (categoryId: string, itemId: string) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.filter(item => item.id !== itemId)
        };
      }
      return category;
    }));
  };

  const updateMenuItem = (categoryId: string, itemId: string, updates: Partial<MenuItem>) => {
    setCategories(categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          items: category.items.map(item => 
            item.id === itemId ? { ...item, ...updates } : item
          )
        };
      }
      return category;
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically save the menu data
    console.log({ menuName, menuDescription, categories });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="text-gray-600 hover:text-orange-500 transition-colors flex items-center space-x-2"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center space-x-2">
                <QrCode className="w-8 h-8 text-orange-500" />
                <span className="text-2xl font-bold text-gray-900">QRMenu</span>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save Menu</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Menu Details</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="menuName" className="block text-sm font-medium text-gray-700 mb-1">
                  Menu Name
                </label>
                <input
                  type="text"
                  id="menuName"
                  value={menuName}
                  onChange={(e) => setMenuName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
                  placeholder="e.g., Main Menu, Lunch Special"
                  required
                />
              </div>
              <div>
                <label htmlFor="menuDescription" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="menuDescription"
                  value={menuDescription}
                  onChange={(e) => setMenuDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-shadow"
                  placeholder="Describe your menu..."
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            {categories.map((category, index) => (
              <div key={category.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3 flex-1">
                    <Tooltip text="Drag to reorder">
                      <GripVertical className="w-5 h-5 text-gray-400 cursor-move" />
                    </Tooltip>
                    <input
                      type="text"
                      value={category.name}
                      onChange={(e) => updateCategory(category.id, e.target.value)}
                      className="text-xl font-semibold text-gray-900 w-full px-2 py-1 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Category Name"
                      required
                    />
                  </div>
                  {categories.length > 1 && (
                    <Tooltip text="Remove category">
                      <button
                        onClick={() => removeCategory(category.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg hover:bg-red-50"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </Tooltip>
                  )}
                </div>

                {/* Menu Items */}
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:border-orange-200 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Item Name
                            </label>
                            <input
                              type="text"
                              value={item.name}
                              onChange={(e) => updateMenuItem(category.id, item.id, { name: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              placeholder="Item name"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Price
                            </label>
                            <input
                              type="text"
                              value={item.price}
                              onChange={(e) => updateMenuItem(category.id, item.id, { price: e.target.value })}
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              placeholder="0.00"
                              required
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Description
                            </label>
                            <textarea
                              value={item.description}
                              onChange={(e) => updateMenuItem(category.id, item.id, { description: e.target.value })}
                              rows={2}
                              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                              placeholder="Describe this item..."
                            />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                          <Tooltip text="Add image">
                            <button
                              type="button"
                              className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                            >
                              <ImageIcon className="w-5 h-5" />
                            </button>
                          </Tooltip>
                          <Tooltip text="Remove item">
                            <button
                              type="button"
                              onClick={() => removeMenuItem(category.id, item.id)}
                              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addMenuItem(category.id)}
                    className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-orange-500 hover:border-orange-500 transition-colors flex items-center justify-center space-x-2 group"
                  >
                    <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={addCategory}
              className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-orange-500 hover:border-orange-500 transition-colors flex items-center justify-center space-x-2 group"
            >
              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-lg">Add Category</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}