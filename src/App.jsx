import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Sun, Moon, ShoppingCart, Search, Menu, X, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // This would normally come from a cart context
  const updateCartCount = (count) => {
    setCartCount(count);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button 
                className="md:hidden mr-2 p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700"
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              
              <a href="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ShopFlow
                </span>
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="/" className="font-medium hover:text-primary transition-colors">Home</a>
              <a href="/shop" className="font-medium hover:text-primary transition-colors">Shop</a>
              <a href="/categories" className="font-medium hover:text-primary transition-colors">Categories</a>
              <a href="/deals" className="font-medium hover:text-primary transition-colors">Deals</a>
            </nav>
            
            <div className="flex items-center space-x-3">
              <div className="relative hidden md:block">
                <input 
                  type="text" 
                  placeholder="Search products..." 
                  className="pl-10 pr-4 py-2 w-64 rounded-full border border-surface-300 dark:border-surface-700 focus:outline-none focus:ring-2 focus:ring-primary bg-surface-100 dark:bg-surface-800"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500" size={18} />
              </div>
              
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors"
                aria-label="Toggle dark mode"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <a href="/account" className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors">
                <User size={20} />
              </a>
              
              <a href="/cart" className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-700 transition-colors relative">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-white dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700"
            >
              <div className="container mx-auto px-4 py-3">
                <div className="flex items-center mb-4">
                  <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="pl-10 pr-4 py-2 w-full rounded-full border border-surface-300 dark:border-surface-700 focus:outline-none focus:ring-2 focus:ring-primary bg-surface-100 dark:bg-surface-800"
                  />
                  <Search className="absolute left-7 text-surface-500" size={18} />
                </div>
                
                <nav className="flex flex-col space-y-3 pb-3">
                  <a href="/" className="font-medium hover:text-primary transition-colors py-2">Home</a>
                  <a href="/shop" className="font-medium hover:text-primary transition-colors py-2">Shop</a>
                  <a href="/categories" className="font-medium hover:text-primary transition-colors py-2">Categories</a>
                  <a href="/deals" className="font-medium hover:text-primary transition-colors py-2">Deals</a>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      
      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home updateCartCount={updateCartCount} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      
      {/* Footer */}
      <footer className="bg-surface-100 dark:bg-surface-800 border-t border-surface-200 dark:border-surface-700">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">ShopFlow</h3>
              <p className="text-surface-600 dark:text-surface-400">
                Your comprehensive e-commerce platform for seamless shopping experiences.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><a href="/categories" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors">Categories</a></li>
                <li><a href="/deals" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors">Deals</a></li>
                <li><a href="/new" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors">New Arrivals</a></li>
                <li><a href="/bestsellers" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors">Bestsellers</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Account</h4>
              <ul className="space-y-2">
                <li><a href="/account" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors">My Account</a></li>
                <li><a href="/orders" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors">Orders</a></li>
                <li><a href="/wishlist" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors">Wishlist</a></li>
                <li><a href="/settings" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors">Settings</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Help</h4>
              <ul className="space-y-2">
                <li><a href="/faq" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors">FAQ</a></li>
                <li><a href="/shipping" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors">Shipping</a></li>
                <li><a href="/returns" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors">Returns</a></li>
                <li><a href="/contact" className="text-surface-600 dark:text-surface-400 hover:text-primary transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-surface-200 dark:border-surface-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-surface-600 dark:text-surface-400 text-sm">
              © {new Date().getFullYear()} ShopFlow. All rights reserved.
            </p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="/terms" className="text-surface-600 dark:text-surface-400 text-sm hover:text-primary transition-colors">Terms</a>
              <a href="/privacy" className="text-surface-600 dark:text-surface-400 text-sm hover:text-primary transition-colors">Privacy</a>
              <a href="/cookies" className="text-surface-600 dark:text-surface-400 text-sm hover:text-primary transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;