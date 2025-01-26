import { FaCcAmazonPay } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-auto">
      <div className="text-center py-2 border-b border-gray-700 cursor-pointer hover:underline">
        Back to top
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center py-4">
        <div>
          <h2 className="font-semibold mb-2">Get to Know Us</h2>
          <ul className="space-y-1 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press Releases</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Connect with Us</h2>
          <ul className="space-y-1 text-sm">
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Make Money with Us</h2>
          <ul className="space-y-1 text-sm">
            <li>Sell on Amazon</li>
            <li>Affiliate Marketing</li>
            <li>Self-Publishing</li>
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Let Us Help You</h2>
          <ul className="space-y-1 text-sm">
            <li>Help Center</li>
            <li>Shipping</li>
            <li>Returns</li>
          </ul>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 py-2 text-sm border-t border-gray-700">
        <FaCcAmazonPay size={20} />
        <h1>Developed by @HithoshKota</h1>
      </div>
    </footer>
  );
};

export default Footer;
