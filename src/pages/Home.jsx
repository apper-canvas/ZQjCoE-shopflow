import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronDown, Star, ShoppingBag, Heart, Eye } from "lucide-react";
import MainFeature from "../components/MainFeature";

// Mock product data
const PRODUCTS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    salePrice: 149.99,
    rating: 4.8,
    reviewCount: 124,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    tags: ["wireless", "audio", "premium"],
    inStock: true
  },
  {
    id: 2,
    name: "Ergonomic Office Chair",
    price: 299.99,
    rating: 4.5,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1505843513577-22bb7d21e455?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Furniture",
    tags: ["office", "ergonomic", "chair"],
    inStock: true
  },
  {
    id: 3,
    name: "Smart Fitness Watch",
    price: 149.99,
    salePrice: 129.99,
    rating: 4.7,
    reviewCount: 215,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    tags: ["fitness", "smart", "wearable"],
    inStock: true
  },
  {
    id: 4,
    name: "Organic Cotton T-Shirt",
    price: 29.99,
    rating: 4.3,
    reviewCount: 67,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Clothing",
    tags: ["organic", "sustainable", "fashion"],
    inStock: true
  },
  {
    id: 5,
    name: "Professional DSLR Camera",
    price: 1299.99,
    salePrice: 1099.99,
    rating: 4.9,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    tags: ["camera", "professional", "photography"],
    inStock: false
  },
  {
    id: 6,
    name: "Handcrafted Ceramic Mug",
    price: 24.99,
    rating: 4.6,
    reviewCount: 118,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Home",
    tags: ["handcrafted", "ceramic", "kitchen"],
    inStock: true
  },
  {
    id: 7,
    name: "Leather Messenger Bag",
    price: 159.99,
    rating: 4.4,
    reviewCount: 53,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Accessories",
    tags: ["leather", "bag", "fashion"],
    inStock: true
  },
  {
    id: 8,
    name: "Smart Home Speaker",
    price: 129.99,
    salePrice: 99.99,
    rating: 4.7,
    reviewCount: 186,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    category: "Electronics",
    tags: ["smart home", "speaker", "voice assistant"],
    inStock: true
  }
];

// Mock categories
const CATEGORIES = [
  { id: 1, name: "Electronics", count: 42 },
  { id: 2, name: "Clothing", count: 56 },
  { id: 3, name: "Home & Kitchen", count: 38 },
  { id: 4, name: "Beauty", count: 29 },
  { id: 5, name: "Sports", count: 24 },
  { id: 6, name: "Books", count: 63 },
  { id: 7, name: "Toys", count: 31 },
  { id: 8, name: "Furniture", count: 19 }
];

function Home({ updateCartCount }) {
  const [products, setProducts] = useState(PRODUCTS);
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  // Update cart count in parent component
  useEffect(() => {
    updateCartCount(cart.length);
  }, [cart, updateCartCount]);
  
  // Filter products based on search, category, and price
  useEffect(() => {
    let filtered = [...products];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Apply price range filter
    filtered = filtered.filter(product => {
      const price = product.salePrice || product.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });
    
    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured - keep original order
        break;
    }
    
    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy, priceRange]);
  
  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };
  
  const toggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
    } else {
      setWishlist(prev => [...prev, productId]);
    }
  };
  
  const handlePriceChange = (e, index) => {
    const newRange = [...priceRange];
    newRange[index] = Number(e.target.value);
    setPriceRange(newRange);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Banner */}
      <section className="mb-12">
        <div className="relative rounded-2xl overflow-hidden h-[400px] bg-gradient-to-r from-primary/90 to-secondary/90">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center mix-blend-overlay opacity-30"></div>
          
          <div className="relative h-full flex flex-col justify-center px-8 md:px-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 max-w-2xl"
            >
              Discover Amazing Products for Every Need
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-xl text-white/90 mb-8 max-w-xl"
            >
              Shop the latest trends, find exclusive deals, and experience seamless shopping with ShopFlow.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <a href="/shop" className="btn bg-white text-primary hover:bg-surface-100 focus:ring-white">
                Shop Now
              </a>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Main Feature Component */}
      <MainFeature />
      
      {/* Product Listing Section */}
      <section className="mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Shop Our Products</h2>
            <p className="text-surface-600 dark:text-surface-400">
              Discover our curated selection of high-quality products
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 w-full md:w-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input pl-10 w-full md:w-64"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-surface-500" size={18} />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="card p-5">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg">Filters</h3>
                <button 
                  className="lg:hidden flex items-center text-surface-600 dark:text-surface-400"
                  onClick={() => setFiltersOpen(!filtersOpen)}
                >
                  <Filter size={16} className="mr-1" />
                  <span>{filtersOpen ? "Hide" : "Show"}</span>
                  <ChevronDown 
                    size={16} 
                    className={`ml-1 transition-transform ${filtersOpen ? "rotate-180" : ""}`} 
                  />
                </button>
              </div>
              
              <div className={`space-y-6 ${filtersOpen ? "block" : "hidden lg:block"}`}>
                {/* Categories */}
                <div>
                  <h4 className="font-semibold mb-3">Categories</h4>
                  <ul className="space-y-2">
                    <li>
                      <button 
                        onClick={() => setSelectedCategory("All")}
                        className={`w-full text-left py-1 px-2 rounded transition-colors ${
                          selectedCategory === "All" 
                            ? "bg-primary/10 text-primary font-medium" 
                            : "hover:bg-surface-100 dark:hover:bg-surface-800"
                        }`}
                      >
                        All Categories
                      </button>
                    </li>
                    {CATEGORIES.map(category => (
                      <li key={category.id}>
                        <button 
                          onClick={() => setSelectedCategory(category.name)}
                          className={`w-full text-left py-1 px-2 rounded transition-colors flex justify-between items-center ${
                            selectedCategory === category.name 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "hover:bg-surface-100 dark:hover:bg-surface-800"
                          }`}
                        >
                          <span>{category.name}</span>
                          <span className="text-xs text-surface-500 dark:text-surface-400 bg-surface-100 dark:bg-surface-700 rounded-full px-2 py-0.5">
                            {category.count}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Price Range */}
                <div>
                  <h4 className="font-semibold mb-3">Price Range</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                    
                    <div className="relative h-1 bg-surface-200 dark:bg-surface-700 rounded-full">
                      <div 
                        className="absolute h-1 bg-primary rounded-full"
                        style={{
                          left: `${(priceRange[0] / 1500) * 100}%`,
                          right: `${100 - (priceRange[1] / 1500) * 100}%`
                        }}
                      ></div>
                      
                      <input
                        type="range"
                        min="0"
                        max="1500"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, 0)}
                        className="absolute w-full h-1 opacity-0 cursor-pointer"
                      />
                      
                      <input
                        type="range"
                        min="0"
                        max="1500"
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
                          className="input mt-1 py-1"
                        />
                      </div>
                      
                      <div className="w-1/2">
                        <label className="text-xs text-surface-500 dark:text-surface-400">Max</label>
                        <input
                          type="number"
                          min={priceRange[0]}
                          max="1500"
                          value={priceRange[1]}
                          onChange={(e) => handlePriceChange(e, 1)}
                          className="input mt-1 py-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Sort By (Mobile Only) */}
                <div className="lg:hidden">
                  <h4 className="font-semibold mb-3">Sort By</h4>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="lg:col-span-3">
            <div className="hidden lg:flex justify-between items-center mb-6">
              <p className="text-surface-600 dark:text-surface-400">
                Showing <span className="font-medium text-surface-900 dark:text-white">{filteredProducts.length}</span> products
              </p>
              
              <div className="flex items-center space-x-2">
                <span className="text-surface-600 dark:text-surface-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="input py-1 w-40"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
            
            {filteredProducts.length === 0 ? (
              <div className="card p-8 text-center">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-surface-600 dark:text-surface-400 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setPriceRange([0, 1500]);
                  }}
                  className="btn btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="group"
                  >
                    <div className="card h-full flex flex-col transition-all duration-300 hover:shadow-soft dark:hover:border-primary/50 overflow-visible">
                      {/* Product Image */}
                      <div className="relative overflow-hidden pt-[100%]">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        
                        {/* Sale Badge */}
                        {product.salePrice && (
                          <div className="absolute top-3 left-3 bg-secondary text-white text-xs font-bold px-2 py-1 rounded">
                            SALE
                          </div>
                        )}
                        
                        {/* Out of Stock Badge */}
                        {!product.inStock && (
                          <div className="absolute inset-0 bg-surface-900/60 flex items-center justify-center">
                            <span className="bg-surface-800 text-white px-4 py-2 rounded-full font-medium">
                              Out of Stock
                            </span>
                          </div>
                        )}
                        
                        {/* Quick Actions */}
                        <div className="absolute right-3 top-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => toggleWishlist(product.id)}
                            className="p-2 bg-white dark:bg-surface-800 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
                            aria-label="Add to wishlist"
                          >
                            <Heart 
                              size={18} 
                              className={wishlist.includes(product.id) ? "fill-secondary text-secondary" : ""} 
                            />
                          </button>
                          
                          <button 
                            className="p-2 bg-white dark:bg-surface-800 rounded-full shadow-md hover:bg-primary hover:text-white transition-colors"
                            aria-label="Quick view"
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </div>
                      
                      {/* Product Info */}
                      <div className="p-4 flex-grow flex flex-col">
                        <div className="mb-1">
                          <span className="text-sm text-surface-500 dark:text-surface-400">
                            {product.category}
                          </span>
                        </div>
                        
                        <h3 className="font-medium mb-2 flex-grow">
                          <a href={`/product/${product.id}`} className="hover:text-primary transition-colors">
                            {product.name}
                          </a>
                        </h3>
                        
                        <div className="flex items-center mb-3">
                          <div className="flex items-center text-accent">
                            <Star size={16} className="fill-accent" />
                            <span className="ml-1 font-medium">{product.rating}</span>
                          </div>
                          <span className="mx-2 text-surface-300 dark:text-surface-700">•</span>
                          <span className="text-sm text-surface-500 dark:text-surface-400">
                            {product.reviewCount} reviews
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            {product.salePrice ? (
                              <>
                                <span className="font-bold text-lg">${product.salePrice}</span>
                                <span className="ml-2 text-surface-500 dark:text-surface-400 line-through text-sm">
                                  ${product.price}
                                </span>
                              </>
                            ) : (
                              <span className="font-bold text-lg">${product.price}</span>
                            )}
                          </div>
                          
                          <button 
                            onClick={() => product.inStock && addToCart(product)}
                            disabled={!product.inStock}
                            className={`p-2 rounded-full ${
                              product.inStock 
                                ? "bg-primary text-white hover:bg-primary-dark" 
                                : "bg-surface-200 dark:bg-surface-700 text-surface-400 cursor-not-allowed"
                            } transition-colors`}
                            aria-label="Add to cart"
                          >
                            <ShoppingBag size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;