import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../Globalstore/ProductSlice";
import { RootState } from "../Globalstore/Store";
import Footer from "../Components/Footer";
import Header from "../Components/Header";

const Productpage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [activeCategory, setActiveCategory] = useState("All Categories");

  useEffect(() => {
    apihandling();
  }, []);

  useEffect(() => {
    // Filter products based on the active category
    if (activeCategory === "All Categories") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === activeCategory.toLowerCase()
      );
      setFilteredProducts(filtered);
    }
  }, [activeCategory, products]);

  // Handle API
  const apihandling = async () => {
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      dispatch(setProducts(data)); // Dispatch the fetched products to the Redux store
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
    <main>
      <Header />
      <div className="flex w-full min-h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-[20%] bg-white shadow-lg rounded-lg p-5 sticky top-0 h-screen">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            Categories
          </h2>
          <ul className="space-y-4">
            {categories.map((category, index) => (
              <li
                key={index}
                className={`text-sm font-medium px-3 py-2 rounded-md cursor-pointer transition-colors ${
                  activeCategory === category
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:text-white hover:bg-blue-500"
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Product Grid */}
        <div className="w-[80%] p-5">
          {filteredProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                  <button className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 text-xl mt-20">
              No products found in this category.
            </p>
          )}
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Productpage;
