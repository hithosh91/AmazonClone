import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Carousel from "../Components/Carousel";
import { ProductData } from "../utils/data.js";
import { featureData } from "../utils/feature.js";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <Header setSearchQuery={(query: string) => console.log(query)} />

      {/* Main Content */}
      <main className="flex-grow">
        {/* Carousel */}
        <div className="mb-8">
          <Carousel />
        </div>

        {/* Featured Section */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {featureData.map((product, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <img src={product.image} alt={product.name} />
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {ProductData.map((product, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 flex flex-col items-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-40 h-40 object-cover rounded-lg"
                />
                <h3 className="font-semibold text-lg mt-3 text-center">
                  {product.name}
                </h3>
                <Link
                  to={`/category/${product.id}`}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Shop Now
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Homepage;
