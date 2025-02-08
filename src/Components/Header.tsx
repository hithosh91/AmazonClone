import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Globalstore/Store";
import { Link, useNavigate } from "react-router-dom";
import { PiAmazonLogoFill } from "react-icons/pi";
import { MdOutlineYoutubeSearchedFor } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { logout } from "../Globalstore/Userdetails";

interface HeaderProps {
  setSearchQuery: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setSearchQuery }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the cart items and username from Redux state
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const username = useSelector((state: RootState) => state.user.username);

  const [location, setLocation] = useState({
    city: "Edinburgh",
    postcode: "EH217RN",
  });

  const [searchInput, setSearchInput] = useState("");

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
            );
            const data = await response.json();
            setLocation({
              city: data.city || "Unknown",
              postcode: data.postcode || "Unknown",
            });
          } catch (error) {
            console.error("Error fetching location:", error);
          }
        },
        (error) => {
          console.error("Error fetching location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setSearchQuery(e.target.value); // Update the search query in parent
  };

  const handleCartClick = () => {
    navigate("/cart"); // Navigate to the cart page
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0); // Calculate total cart items

  return (
    <header className="bg-gray-900 w-full h-16 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto flex justify-between items-center h-full">
        <div className="flex items-center space-x-6">
          <Link to="/">
            <PiAmazonLogoFill className="text-4xl text-white cursor-pointer" />
          </Link>
          <div
            className="flex items-center space-x-2 text-sm cursor-pointer"
            onClick={handleLocationClick}
          >
            <IoLocationSharp size={18} className="text-white" />
            <div>
              <h3 className="font-semibold text-base">{location.city}</h3>
              <span className="text-gray-400">{location.postcode}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2 w-1/3 bg-white rounded-lg overflow-hidden">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 text-black rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchInput} // Bind the value to the state
            onChange={handleSearchChange} // Update state on input change
          />
          <MdOutlineYoutubeSearchedFor
            size={40}
            className="text-gray-600 p-2"
          />
        </div>
        <div className="flex items-center space-x-6">
          {/* Cart Icon with Count */}
          <div
            className="relative cursor-pointer hover:text-blue-500 transition-colors duration-200"
            onClick={handleCartClick} // Navigate to cart on click
          >
            <Link to="/cart">
              <FaCartShopping size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          <MdMenu
            size={24}
            className="cursor-pointer hover:text-blue-500 transition-colors duration-200"
          />
          {username ? (
            <div className="flex items-center space-x-2">
              <span>Welcome, {username}!</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">Login/Signup</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
