import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Globalstore/ProductSlice";
import { RootState } from "../Globalstore/Store";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Menu, X } from "lucide-react"; // Icons for Sidebar Toggle

const Productpage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState("All Categories");
  const [searchQuery, setSearchQuery] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar State

  useEffect(() => {
    apihandling();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All Categories" ||
        product.category.toLowerCase() === activeCategory.toLowerCase();
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesPriceRange =
        product.price >= minPrice && product.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPriceRange;
    });
    setFilteredProducts(filtered);
  }, [activeCategory, products, searchQuery, minPrice, maxPrice]);

  const apihandling = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch(setProducts(data));
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const categories = [
    "All Categories",
    "Electronics",
    "Jewelery",
    "Men's Clothing",
    "Women's Clothing",
  ];

  return (
    <main className="min-h-screen bg-gray-100">
      <Header setSearchQuery={setSearchQuery} />

      {/* Mobile Sidebar Button */}
      <button
        className="md:hidden fixed top-5 left-5 z-50 bg-blue-500 p-2 rounded-full text-white shadow-lg"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div className="flex w-full">
        {/* Sidebar */}
        <div
          className={`fixed md:relative top-0 left-0 h-full w-[75%] md:w-[25%] lg:w-[20%] bg-white shadow-lg p-5 transition-transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            Categories
          </h2>
          <ul className="space-y-4">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`text-base font-medium px-3 py-2 rounded-md cursor-pointer transition ${
                  activeCategory === category
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-blue-500 hover:text-white"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-gray-800">Price Range</h3>
            <div className="flex flex-col mt-4 space-y-2">
              <input
                type="range"
                min="0"
                max="1000"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
                className="w-full"
              />
              <input
                type="range"
                min="0"
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>0</span>
                <span>{minPrice}</span>
                <span>{maxPrice}</span>
                <span>1000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="w-full md:w-[75%] lg:w-[80%] p-5">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h3 className="text-lg font-semibold truncate mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-500 truncate mb-4">
                    {product.category}
                  </p>
                  <p className="text-xl font-bold text-blue-600 mb-4">
                    ${product.price}
                  </p>
                  <Link to={`/product/${product.id}`}>
                    <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-xl mt-20">
              No products found in this category or matching the search query.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default Productpage;
