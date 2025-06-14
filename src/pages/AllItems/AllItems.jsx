import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AllItems = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error("Failed to fetch items:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Lost & Found Items
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              {item.title || "Unnamed Item"}
            </h2>
            <p className="text-gray-600 text-sm mb-1">
              <strong>Status:</strong> {item.status || "pending"}
            </p>
            <p className="text-gray-600 text-sm mb-1">
              <strong>Location:</strong> {item.location || "Not specified"}
            </p>
            <p className="text-gray-600 text-sm mb-3">
              <strong>Date:</strong> {item.date || "N/A"}
            </p>

            <Link to={`/items/${item._id}`}>
              <button className="mt-2 bg-blue-700 hover:bg-blue-900 text-white py-2 px-4 rounded-lg text-sm">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllItems;
