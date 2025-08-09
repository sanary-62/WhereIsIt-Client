import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const LatestItem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        let headers = {};
        const token = localStorage.getItem("access-token");
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const res = await fetch(`https://whereisit-server-beta.vercel.app/items`, {
          headers,
        });

        if (!res.ok) {
          throw new Error("Failed to fetch items");
        }

        const data = await res.json();
        const itemsArray = Array.isArray(data) ? data : data.items || [];

        const sorted = itemsArray.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setItems(sorted.slice(0, 3));
      } catch (err) {
        console.error("Failed to load latest items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Latest Lost & Found Items
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg mb-10">Loading latest items...</p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mb-10">No items available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">

          {items.map((item) => (
            <div
              key={item._id}
              className="card bg-white shadow-md border border-blue-200 p-4 rounded-md flex flex-col"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-48 sm:h-56 md:h-48 object-cover rounded"
              />
              <div className="mt-4 flex flex-col flex-grow">
                <h3 className="text-xl font-semibold text-blue-900">{item.title}</h3>
                <p className="text-sm text-gray-600 flex-grow">
                  {item.description?.slice(0, 80)}...
                </p>
                <p className="text-sm mt-1">
                  <strong>Type:</strong> {item.type}
                </p>
                <p className="text-sm">
                  <strong>Date:</strong> {item.date}
                </p>
                <p className="text-sm">
                  <strong>Location:</strong> {item.location}
                </p>
                <Link to={`/items/${item._id}`} className="mt-3">
                  <button className="btn btn-sm bg-blue-800 text-white w-full sm:w-auto">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-10">
        <Link to="/allItems">
          <button className="btn bg-amber-600 text-white px-6 py-2 rounded">
            See All
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LatestItem;
