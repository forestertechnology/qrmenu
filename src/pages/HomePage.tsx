import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QrCode, Utensils, Smartphone, Share2, ChefHat, Clock, ArrowRight, Check, RefreshCw, Store, Palette, Share, Building, Image, ImagePlus, FolderTree } from 'lucide-react';

export default function HomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Utensils,
      title: "Digital Menu Creation",
      description: "Create and customize your digital menu with an easy-to-use interface"
    },
    {
      icon: QrCode,
      title: "QR Code Generation",
      description: "Generate unique QR codes for each menu that customers can scan"
    },
    {
      icon: Smartphone,
      title: "Mobile-First Design",
      description: "Menus are optimized for perfect viewing on any mobile device"
    },
    {
      icon: Share2,
      title: "Easy Sharing",
      description: "Share your menu across multiple platforms and locations instantly"
    },
    {
      icon: ChefHat,
      title: "Menu Customization",
      description: "Full control over categories, items, prices, and special offers"
    },
    {
      icon: Clock,
      title: "Real-Time Updates",
      description: "Update your menu instantly without reprinting or rescanning"
    },
    {
      icon: Share,
      title: "Social Media Links",
      description: "Add social media links for your digital menu to boost your online presence"
    },
    {
      icon: Building,
      title: "Restaurant Info",
      description: "Add restaurant title, logo and description to showcase your brand"
    },
    {
      icon: Image,
      title: "Edit Background",
      description: "Customize your background with colors or images"
    },
    {
      icon: ImagePlus,
      title: "Images",
      description: "Include an image on the left of your Menu Item"
    },
    {
      icon: FolderTree,
      title: "Categories",
      description: "Organize your menu items into customizable categories for better navigation"
    }
  ];

  const howItWorks = [
    {
      icon: Store,
      title: "Create Your Restaurant Profile",
      description: "Set up your restaurant's digital presence in minutes"
    },
    {
      icon: Palette,
      title: "Design Your Menu",
      description: "Create beautiful digital menus with our intuitive editor"
    },
    {
      icon: QrCode,
      title: "Generate QR Codes",
      description: "Get unique QR codes for each menu to display in your restaurant"
    },
    {
      icon: RefreshCw,
      title: "Update Anytime",
      description: "Make changes instantly without replacing physical QR codes"
    }
  ];

  const plans = [
    {
      name: "Starter",
      price: "Free",
      features: [
        "20 Menu Items",
        "20 Item Images",
        "1 Digital Menu",
        "Basic QR Code",
        "5 Menu Categories",
        "Instant Menu Updates"
      ]
    },
    {
      name: "Advanced",
      price: "$9.97",
      period: "per month",
      features: [
        "50 Menu Items",
        "50 Item Images",
        "5 Digital Menus",
        "Custom QR Codes",
        "20 Menu Categories",
        "Special Offers",
        "Instant Menu Updates"
      ]
    },
    {
      name: "Custom",
      price: "$97.00",
      period: "one time",
      features: [
        "Restaurant Menu Setup"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <QrCode className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">QRMenu</span>
            </div>
            <div className="flex-1 flex justify-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-orange-500 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-orange-500 transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-orange-500 transition-colors">Pricing</a>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-orange-500 transition-colors"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 sm:px-6 py-20">
          <div className="flex items-center gap-12">
            <div className="flex-1">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                Transform Your Menu into a Digital Experience
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Create beautiful digital menus, generate QR codes, and manage your restaurant's offerings with ease.
                No more printing costs, instant updates, and a better experience for your customers.
              </p>
              <div className="flex space-x-4">
                <button
                  onClick={() => navigate('/login')}
                  className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center space-x-2 text-lg"
                >
                  <span>Get Started Free</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <a
                  href="#how-it-works"
                  className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-200 text-lg"
                >
                  See How It Works
                </a>
              </div>
            </div>
            <div className="flex-1">
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                alt="Restaurant QR Menu Preview"
                className="rounded-xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Go Digital
            </h2>
            <p className="text-xl text-gray-600">
              Powerful features to help you manage your restaurant's menu efficiently
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple Steps to Get Started
            </h2>
            <p className="text-xl text-gray-600">
              Get your digital menu up and running in minutes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {howItWorks.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  {index < howItWorks.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-orange-200" />
                  )}
                  <div className="bg-white rounded-xl p-6 shadow-md relative z-10">
                    <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Select a Plan
            </h2>
            <p className="text-xl text-gray-600">
              Choose the plan that best fits your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-xl p-8 ${plan.popular ? 'ring-2 ring-orange-500 shadow-xl' : 'border border-gray-200'}`}>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-600">/{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 text-orange-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => navigate('/login')}
                  className={`w-full py-2 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-orange-500 text-white hover:bg-orange-600'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <QrCode className="w-8 h-8 text-orange-500" />
                <span className="text-2xl font-bold">QRMenu</span>
              </div>
              <p className="text-gray-400">
                Transform your restaurant's menu into a digital experience
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Documentation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} QRMenu. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}