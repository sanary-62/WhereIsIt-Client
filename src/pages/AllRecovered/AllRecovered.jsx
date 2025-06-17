import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import Spinner from "../../Components/Spinner";
import { FaThLarge, FaList } from "react-icons/fa";
const AllRecovered = () => {
  const { user } = useContext(AuthContext);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGridView, setIsGridView] = useState(false);

  useEffect(() => {
    if (!user?.email) return;

    const fetchRecovered = async () => {
      try {
        const token = await user.getIdToken();
        const res = await fetch("https://whereisit-server-beta.vercel.app/recoveredItems", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch recovered items");
        const data = await res.json();
        const userItems = data.filter((item) => item.userEmail === user.email);
        setRecoveredItems(userItems);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecovered();
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  if (recoveredItems.length === 0) {
    return (
      <div className="text-center mt-10 text-xl font-semibold text-gray-600">
        No recovered items posted yet.
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto p-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-800">
            My Recovered Items
          </h2>
          <div className="space-x-2">
            <button
              onClick={() => setIsGridView(false)}
              className={`p-2 rounded ${
                !isGridView
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <FaList />
            </button>
            <button
              onClick={() => setIsGridView(true)}
              className={`p-2 rounded ${
                isGridView
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <FaThLarge />
            </button>
          </div>
        </div>

        {isGridView ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recoveredItems.map((item) => (
              <div
                key={item._id}
                className="bg-white shadow-md rounded-xl p-4 border border-gray-200"
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  className="w-full h-40 object-cover rounded mb-3"
                />
                <h3 className="text-lg font-semibold text-blue-700 mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  <strong>Location:</strong> {item.recoveredLocation}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Date:</strong>{" "}
                  {item.recoveredDate
                    ? new Date(item.recoveredDate).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full border rounded">
              <thead>
                <tr className="bg-gray-100">
                  <th>Image</th>
                  <th>Title</th>
                  <th>Location</th>
                  <th>Date Found</th>
                </tr>
              </thead>
              <tbody>
                {recoveredItems.map((item) => (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td>
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.recoveredLocation}</td>

                    <td>
                      {item.recoveredDate
                        ? new Date(item.recoveredDate).toLocaleDateString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRecovered;
