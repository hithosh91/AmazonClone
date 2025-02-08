// src/Components/Carousel.tsx
import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Carousel = () => {
  const images = [
    "https://sagemailer.com/blog/wp-content/uploads/2018/06/1_KilEkipxnVYY-Wkh80aZqw.jpeg",
    "https://stripeygreentv.com/wp-content/uploads/2022/06/Amazon-Golf-Coupons-Discounts-Offers-Sale-Items-Discount-Codes.png",
    "https://economictimes.indiatimes.com/thumb/msid-109789822,width-1200,height-900,resizemode-4,imgsize-65518/amazon-summer-sale-2024-best-offers-here-last-chance-to-get-them-now.jpg?from=mdr",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative">
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="w-full h-[300px] object-cover"
      />
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
      >
        <FaArrowLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white bg-black bg-opacity-50 p-2 rounded-full"
      >
        <FaArrowRight size={24} />
      </button>
    </div>
  );
};

export default Carousel;
