import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Globalstore/Store";
import { Link } from "react-router-dom";
import { PiAmazonLogoFill } from "react-icons/pi";
import { MdOutlineYoutubeSearchedFor } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { MdMenu } from "react-icons/md";
import { IoLocationSharp } from "react-icons/io5";
import { logout } from "../Globalstore/Userdetails"; // Import the logout action
import { useNavigate } from "react-router-dom";
const Header: React.FC = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.user.username);
  const [location, setLocation] = useState({
    city: "Edinburgh",
    postcode: "EH217RN",
  });

  const navigate = useNavigate();

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
    dispatch(logout()); // Dispatch the logout action
    navigate("/");
  };

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
            className="w-full p-2 rounded-md border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MdOutlineYoutubeSearchedFor
            size={40}
            className="text-gray-600 p-2"
          />
        </div>
        <div className="flex items-center space-x-6">
          <FaCartShopping
            size={24}
            className="cursor-pointer hover:text-blue-500 transition-colors duration-200"
          />
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
