// src/Pages/LoginPage.tsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../Globalstore/Store";
import { login } from "../Globalstore/Userdetails";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      dispatch(login(username)); // Dispatch the login action
      navigate("/product"); // Navigate to homepage
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">AmazonClone</h1>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Enter Name or Nickname
          </label>
          <input
            id="name"
            type="text"
            placeholder="Please enter details"
            className="w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            type="submit"
            className="w-full py-2 rounded-3xl bg-amber-400 text-white hover:bg-amber-500 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
