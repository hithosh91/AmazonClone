import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Carousel from "../Components/Carousel";

const Homepage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <Header />

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
            {Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="font-semibold text-lg mb-2">
                  Product {idx + 1}
                </h3>
                <p className="text-gray-600">
                  Discover our amazing deals for product {idx + 1}.
                </p>
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                  Shop Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Categories Section */}
        <div className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 text-center"
              >
                <div className="h-32 bg-gray-200 rounded mb-4"></div>
                <h3 className="font-semibold text-lg">Category {idx + 1}</h3>
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
