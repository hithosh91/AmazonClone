import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./Pages/Homepage";
import Loginpage from "./Pages/Loginpage";
import Productpage from "./Pages/Productpage";
import ProductDetails from "./Components/Productdetails";
import Cartpage from "./Components/Cartpage";
import Payment from "./Components/Payment";
import Categorydetails from "./Components/Categorydetails";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/product" element={<Productpage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cartpage />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/category/:id" element={<Categorydetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
