import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";

const LatestItem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const {user} =useContext(AuthContext)

  useEffect(() => {
    const token = localStorage.getItem("access-token");
    if (!token) {
      console.warn("No access token found");
      setLoading(false);
      return;
    }

    
    if(user) {
      fetch(`https://whereisit-server-beta.vercel.app/items?email=${user?.email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Unauthorized or failed request");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched items:", data);
        const itemsArray = Array.isArray(data) ? data : data.items || [];
        const sorted = itemsArray.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setItems(sorted.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load items:", err);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Latest Find & Lost Items
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 text-lg mb-10">
          Loading latest items...
        </p>
      ) : items.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mb-10">
          No items available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item._id}
              className="card bg-white shadow-md border border-blue-500 p-4 rounded-md"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-full h-48 object-cover rounded"
              />
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-blue-900">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">
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
                <Link to={`/items/${item._id}`}>
                  <button className="btn btn-sm bg-blue-800 text-white mt-3">
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
          <button className="btn bg-amber-800 text-white">See All</button>
        </Link>
      </div>
    </div>
  );
};

export default LatestItem;
