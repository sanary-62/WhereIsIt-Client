import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import Spinner from "../../Components/Spinner";
const AllItems = () => {
  const { user } = useContext(AuthContext);
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    user.getIdToken().then((idToken) => {
      fetch(`https://whereisit-server-beta.vercel.app/items`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch items");
          return res.json();
        })
        .then((data) => {
          setItems(Array.isArray(data) ? data : []);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setItems([]);
          setLoading(false);
        });
    });
  }, [user]);

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    if (!query) {
      setFilteredItems(items);
    } else {
      const filtered = items.filter(
        (item) =>
          item.title?.toLowerCase().includes(query) ||
          item.location?.toLowerCase().includes(query)
      );
      setFilteredItems(filtered);
    }
  }, [searchQuery, items]);

  if (loading) {
    return <Spinner />;
  }

  return (
   <div className="max-w-7xl w-full mx-auto px-2 sm:px-4 py-6 sm:py-10 mt-16">


      <h1 className="text-3xl font-bold mb-8 text-center text-blue-700">
        Lost & Found Items
      </h1>

      <div className="mb-6 text-center">
        <input
          type="text"
          placeholder="Search by title or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full max-w-sm sm:max-w-md"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            No items found.
          </p>
        ) : (
          filteredItems.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md rounded-xl p-5 border border-gray-200"
            >
              {item.thumbnail && (
                <img
                  src={item.thumbnail}
                  alt={item.title || "Item thumbnail"}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
              )}

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
          ))
        )}
      </div>
    </div>
  );
};

export default AllItems;
