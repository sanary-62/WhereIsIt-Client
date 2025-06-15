import React, { useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    image: "https://i.postimg.cc/zBG6jrZM/banner-1.jpg",
  },
  {
    id: 2,
    image: "https://i.postimg.cc/Ss151vmK/banner-2.jpg",
  },
  {
    id: 3,
    image: "https://i.postimg.cc/J0yFf5h5/banner-3.jpg",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => {
        if (prev + 1 === banners.length) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[400px] sm:h-[500px] md:h-[670px] relative overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === current ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/1200x400?text=Image+Not+Available";
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default Banner;
