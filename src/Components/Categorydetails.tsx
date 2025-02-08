import { Link, useParams } from "react-router-dom";
import { ProductData } from "../utils/data";

const Categorydetails = () => {
  //get product id from useparam
  const { id } = useParams();
  const product = ProductData.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <h2 className="text-center text-2xl font-bold mt-10">
        Product not found
      </h2>
    );
  }

  return (
    <div className="w-full h-[100vh] bg-[#74F2CE] flex justify-center items-center">
      <div className="w-[60vw] h-[60vh] bg-white flex flex-col justify-center items-center gap-10 p-5">
        <img
          src={product.image}
          alt={product.name}
          className="w-32 h-34 object-cover rounded-2xl animate-bounce"
        />
        <h1 className="text-2xl text-center font-semibold ">{product.name}</h1>
        <p className="text-sky-300">Please sign to shop and order products</p>
        <Link
          to="/login"
          className="w-20 h-10 bg-sky-400 text-2xl text-white text-center rounded-2xl focus:bg-green-300 focus:text-blue-500"
        >
          Signin
        </Link>
      </div>
    </div>
  );
};

export default Categorydetails;
