import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../Globalstore/Store";
import { motion } from "framer-motion";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>(); // Get the product ID from the URL params
  const products = useSelector((state: RootState) => state.products.products);

  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = products.find(
        (product) => product.id === parseInt(id)
      );
      setProduct(foundProduct || null);
    }
  }, [id, products]);

  if (!product) return <div>Product not found.</div>;

  return (
    <motion.div
      className="container m-5 p-5 rounded-xl shadow-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col lg:flex-row">
        {/* Product Image with animation */}
        <motion.img
          src={product.image}
          alt={product.title}
          className="w-full lg:w-1/2 h-96 object-contain mb-4 border-2 border-gray-300 rounded-xl p-2 transition-transform duration-300 hover:scale-105"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />

        <div className="lg:ml-8 flex flex-col justify-between">
          <motion.h2
            className="text-2xl font-semibold mb-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {product.title}
          </motion.h2>

          <motion.p
            className="text-xl text-blue-600 mb-4"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            ${product.price}
          </motion.p>

          <motion.p
            className="text-gray-500 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {product.description}
          </motion.p>

          <motion.p
            className="text-sm text-gray-600 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            {product.category}
          </motion.p>

          <motion.button
            className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-lg transform hover:scale-105"
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
