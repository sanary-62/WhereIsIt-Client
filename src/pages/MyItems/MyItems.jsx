import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { Link } from "react-router-dom";
import Spinner from "../../Components/Spinner";

const MyItems = () => {
  const { user } = useContext(AuthContext);
  const [myItems, setMyItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch("http://localhost:3000/items")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((item) => item.userEmail === user.email);
        setMyItems(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  if (myItems.length === 0) {
    return (
      <div className="text-center mt-10 text-xl font-semibold text-gray-500">
        You haven’t posted any lost or found items yet.
      </div>
    );
  }

  return (
    <div className="p-5 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Posted Items</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th>Image</th>
              <th>Item</th>
              <th>Location</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {myItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                </td>
                <td>{item.title}</td>
                <td>{item.location}</td>
                <td>{item.status || "pending"}</td>
                <td className="space-x-2">
                  <Link
                    to={`/updateItem/${item._id}`}
                    className="btn btn-sm btn-warning bg-blue-900 text-white"
                  >
                    Update
                  </Link>
                  <button
                    className="btn btn-sm btn-error text-white bg-red-700"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  function handleDelete(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirm) return;

    fetch(`http://localhost:3000/items/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          const remaining = myItems.filter((item) => item._id !== id);
          setMyItems(remaining);
        }
      });
  }
};

export default MyItems;
