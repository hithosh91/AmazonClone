import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Globalstore/Store";
import { addToCart } from "../Globalstore/Cartslice"; // Import addToCart action
import { motion } from "framer-motion"; // Framer Motion for animations

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const products = useSelector((state: RootState) => state.products.products);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(
        (product) => product.id === parseInt(id)
      );
      setProduct(foundProduct || null);
    }
  }, [id, products]);

  const handleAddToCart = () => {
    if (product) {
      const cartItem = { ...product, quantity: 1 }; // Create CartItem from Product
      dispatch(addToCart(cartItem));
      navigate("/product");
    }
  };

  if (!product)
    return (
      <div className="text-center py-20 text-xl text-gray-500">
        Product not found.
      </div>
    );

  return (
    <motion.div
      className="max-w-screen-xl mx-auto m-5 p-5 rounded-xl shadow-lg bg-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={product.image}
            alt={product.title}
            className="w-full max-w-md h-80 object-contain mb-4 rounded-lg shadow-md"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Product Details */}
        <motion.div
          className="flex flex-col justify-between"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            {product.title}
          </h2>
          <p className="text-xl font-semibold text-blue-600 mb-4">
            ${product.price}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-sm text-gray-500 mb-4">
            Category: {product.category}
          </p>

          {/* Add to Cart Button */}
          <motion.button
            onClick={handleAddToCart}
            className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all shadow-lg transform hover:scale-105 active:scale-95 focus:outline-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            Add to Cart
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
