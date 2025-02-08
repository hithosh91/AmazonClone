import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Globalstore/Store";
import { Link } from "react-router-dom";
import { removeItem } from "../Globalstore/Cartslice"; // Import removeItem action

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  // Calculate the total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleRemove = (id: number) => {
    dispatch(removeItem(id)); // Dispatch removeItem with the id of the product to be removed
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-10 text-center">
        <h2 className="text-3xl font-semibold mb-4">Your Cart is Empty</h2>
        <Link
          to="/"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">Your Cart</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-16 h-16 object-cover rounded-lg border"
              />
              <div>
                <h3 className="text-lg font-medium text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-500">${item.price.toFixed(2)}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
              </div>
            </div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition-all"
              onClick={() => handleRemove(item.id)} // Trigger the remove action
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-800">
          Total Price:{" "}
          <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
        </h3>
        <Link
          to="/product"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Continue Shopping
        </Link>
        <Link
          to="/payment"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition-all"
        >
          Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
