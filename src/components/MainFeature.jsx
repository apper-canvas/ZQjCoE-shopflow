import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ShoppingBag, Filter, X, Check, AlertCircle } from "lucide-react";

// Mock featured categories
const FEATURED_CATEGORIES = [
  { id: 1, name: "Electronics", icon: "🖥️" },
  { id: 2, name: "Fashion", icon: "👕" },
  { id: 3, name: "Home", icon: "🏠" },
  { id: 4, name: "Beauty", icon: "✨" },
  { id: 5, name: "Sports", icon: "🏀" },
  { id: 6, name: "Books", icon: "📚" }
];

// Mock product search results
const PRODUCT_DATABASE = [
  { id: 1, name: "Wireless Headphones", category: "Electronics", price: 149.99, rating: 4.8 },
  { id: 2, name: "Smart Watch", category: "Electronics", price: 299.99, rating: 4.6 },
  { id: 3, name: "Bluetooth Speaker", category: "Electronics", price: 79.99, rating: 4.5 },
  { id: 4, name: "Laptop", category: "Electronics", price: 999.99, rating: 4.7 },
  { id: 5, name: "Cotton T-Shirt", category: "Fashion", price: 24.99, rating: 4.3 },
  { id: 6, name: "Denim Jeans", category: "Fashion", price: 59.99, rating: 4.4 },
  { id: 7, name: "Running Shoes", category: "Sports", price: 129.99, rating: 4.6 },
  { id: 8, name: "Yoga Mat", category: "Sports", price: 39.99, rating: 4.5 },
  { id: 9, name: "Coffee Maker", category: "Home", price: 89.99, rating: 4.7 },
  { id: 10, name: "Bed Sheets", category: "Home", price: 49.99, rating: 4.4 },
  { id: 11, name: "Face Serum", category: "Beauty", price: 34.99, rating: 4.8 },
  { id: 12, name: "Moisturizer", category: "Beauty", price: 24.99, rating: 4.6 },
  { id: 13, name: "Fiction Novel", category: "Books", price: 14.99, rating: 4.5 },
  { id: 14, name: "Cookbook", category: "Books", price: 29.99, rating: 4.7 },
  { id: 15, name: "Desk Lamp", category: "Home", price: 39.99, rating: 4.3 }
];

function MainFeature() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [minRating, setMinRating] = useState(0);
  const [cart, setCart] = useState([]);
  const [notification, setNotification] = useState(null);
  
  // Handle search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
      return;
    }
    
    // Simulate search delay
    const timer = setTimeout(() => {
      setIsSearching(true);
      
      // Filter products based on search query, category, price range, and rating
      let results = PRODUCT_DATABASE.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Apply category filter if selected
      if (selectedCategory) {
        results = results.filter(product => product.category === selectedCategory);
      }
      
      // Apply price range filter
      results = results.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      // Apply rating filter
      results = results.filter(product => product.rating >= minRating);
      
      setSearchResults(results);
      setShowResults(true);
      setIsSearching(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, priceRange, minRating]);
  
  const handleCategorySelect = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(categoryName);
      // Focus the search input after selecting a category
      document.getElementById("product-search").focus();
    }
  };
  
  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
  };
  
  const clearFilters = () => {
    setSelectedCategory(null);
    setPriceRange([0, 1000]);
    setMinRating(0);
  };
  
  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
    
    // Show notification
    setNotification({
      type: "success",
      message: `${product.name} added to cart!`
    });
    
    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };
  
  return (
    <section className="relative">
      <div className="card p-6 md:p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Find Your Perfect Product</h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto">
            Search our extensive catalog of products across multiple categories. Use filters to narrow down your search and find exactly what you're looking for.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Search Bar */}
          <div className="relative mb-6">
            <div className="flex">
              <div className="relative flex-grow">
                <input
                  id="product-search"
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.trim() !== "" && setShowResults(true)}
                  className="input pl-12 pr-4 py-3 w-full rounded-l-lg rounded-r-none border-r-0"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-surface-500" size={20} />
                
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
              
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className={`px-4 border border-surface-300 dark:border-surface-700 ${
                  filtersOpen 
                    ? "bg-primary text-white border-primary" 
                    : "bg-white dark:bg-surface-800 text-surface-700 dark:text-surface-300"
                } transition-colors`}
                aria-label="Toggle filters"
              >
                <Filter size={20} />
              </button>
              
              <button
                onClick={() => setShowResults(true)}
                className="btn-primary rounded-l-none rounded-r-lg px-6"
                disabled={searchQuery.trim() === ""}
              >
                Search
              </button>
            </div>
            
            {/* Filters Panel */}
            <AnimatePresence>
              {filtersOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-10 mt-2 w-full bg-white dark:bg-surface-800 rounded-lg shadow-soft border border-surface-200 dark:border-surface-700 p-4"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Filters</h3>
                    <button 
                      onClick={clearFilters}
                      className="text-sm text-primary hover:text-primary-dark transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Price Range */}
                    <div>
                      <h4 className="font-medium mb-3 text-sm">Price Range</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between text-sm">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                        
                        <div className="relative h-1 bg-surface-200 dark:bg-surface-700 rounded-full">
                          <div 
                            className="absolute h-1 bg-primary rounded-full"
                            style={{
                              left: `${(priceRange[0] / 1000) * 100}%`,
                              right: `${100 - (priceRange[1] / 1000) * 100}%`
                            }}
                          ></div>
                          
                          <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceRange[0]}
                            onChange={(e) => handlePriceChange(e, 0)}
                            className="absolute w-full h-1 opacity-0 cursor-pointer"
                          />
                          
                          <input
                            type="range"
                            min="0"
                            max="1000"
                            value={priceRange[1]}
                            onChange={(e) => handlePriceChange(e, 1)}
                            className="absolute w-full h-1 opacity-0 cursor-pointer"
                          />
                        </div>
                        
                        <div className="flex space-x-4">
                          <div className="w-1/2">
                            <label className="text-xs text-surface-500 dark:text-surface-400">Min</label>
                            <input
                              type="number"
                              min="0"
                              max={priceRange[1]}
                              value={priceRange[0]}
                              onChange={(e) => handlePriceChange(e, 0)}
                              className="input mt-1 py-1 text-sm"
                            />
                          </div>
                          
                          <div className="w-1/2">
                            <label className="text-xs text-surface-500 dark:text-surface-400">Max</label>
                            <input
                              type="number"
                              min={priceRange[0]}
                              max="1000"
                              value={priceRange[1]}
                              onChange={(e) => handlePriceChange(e, 1)}
                              className="input mt-1 py-1 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Rating Filter */}
                    <div>
                      <h4 className="font-medium mb-3 text-sm">Minimum Rating</h4>
                      <div className="space-y-2">
                        {[4.5, 4, 3.5, 3, 0].map(rating => (
                          <button
                            key={rating}
                            onClick={() => setMinRating(rating)}
                            className={`w-full flex items-center justify-between p-2 rounded ${
                              minRating === rating 
                                ? "bg-primary/10 text-primary" 
                                : "hover:bg-surface-100 dark:hover:bg-surface-700"
                            } transition-colors`}
                          >
                            <div className="flex items-center">
                              <div className="flex">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <span 
                                    key={star} 
                                    className={`text-lg ${star <= Math.ceil(rating) ? "text-accent" : "text-surface-300 dark:text-surface-600"}`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <span className="ml-2">
                                {rating > 0 ? `${rating}+` : "Any rating"}
                              </span>
                            </div>
                            
                            {minRating === rating && (
                              <Check size={16} className="text-primary" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Search Results */}
            <AnimatePresence>
              {showResults && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="absolute z-20 mt-2 w-full bg-white dark:bg-surface-800 rounded-lg shadow-soft border border-surface-200 dark:border-surface-700 max-h-[400px] overflow-y-auto scrollbar-hide"
                >
                  {isSearching ? (
                    <div className="p-4 text-center">
                      <div className="inline-block w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <p className="mt-2 text-surface-600 dark:text-surface-400">Searching...</p>
                    </div>
                  ) : searchResults.length > 0 ? (
                    <div>
                      <div className="p-3 border-b border-surface-200 dark:border-surface-700 sticky top-0 bg-white dark:bg-surface-800 z-10">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-surface-600 dark:text-surface-400">
                            {searchResults.length} results found
                          </span>
                          <button
                            onClick={() => setShowResults(false)}
                            className="text-surface-500 hover:text-surface-700 dark:hover:text-surface-300"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <ul>
                        {searchResults.map(product => (
                          <li 
                            key={product.id}
                            className="border-b border-surface-200 dark:border-surface-700 last:border-b-0"
                          >
                            <div className="p-3 hover:bg-surface-50 dark:hover:bg-surface-700 transition-colors flex justify-between items-center">
                              <div>
                                <h4 className="font-medium">{product.name}</h4>
                                <div className="flex items-center mt-1">
                                  <span className="text-xs px-2 py-0.5 bg-surface-100 dark:bg-surface-700 rounded-full text-surface-600 dark:text-surface-400">
                                    {product.category}
                                  </span>
                                  <span className="mx-2 text-surface-300 dark:text-surface-600">•</span>
                                  <div className="flex items-center text-accent text-sm">
                                    <span className="mr-1">★</span>
                                    {product.rating}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-3">
                                <span className="font-semibold">${product.price}</span>
                                <button
                                  onClick={() => addToCart(product)}
                                  className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors"
                                  aria-label="Add to cart"
                                >
                                  <ShoppingBag size={16} />
                                </button>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-surface-100 dark:bg-surface-700 mb-3">
                        <Search size={24} className="text-surface-500" />
                      </div>
                      <h4 className="font-medium mb-1">No results found</h4>
                      <p className="text-surface-600 dark:text-surface-400 text-sm">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Featured Categories */}
          <div>
            <h3 className="text-lg font-medium mb-4">Popular Categories</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
              {FEATURED_CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.name)}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                    selectedCategory === category.name
                      ? "bg-primary/10 border-primary text-primary shadow-sm"
                      : "bg-surface-50 dark:bg-surface-800 border-surface-200 dark:border-surface-700 hover:border-primary/50"
                  } border`}
                >
                  <span className="text-2xl mb-2">{category.icon}</span>
                  <span className="text-sm font-medium">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              notification.type === "success" 
                ? "bg-green-500 text-white" 
                : "bg-red-500 text-white"
            } flex items-center space-x-3 max-w-xs`}
          >
            {notification.type === "success" ? (
              <Check size={20} className="shrink-0" />
            ) : (
              <AlertCircle size={20} className="shrink-0" />
            )}
            <p>{notification.message}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default MainFeature;