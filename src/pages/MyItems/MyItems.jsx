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

    user.getIdToken().then((idToken) => {
      fetch(`https://whereisit-server-beta.vercel.app/myItems`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch items");
          }
          return res.json();
        })
        .then((data) => {
          setMyItems(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    });
  }, [user]);

  if (loading) {
    return <Spinner />;
  }

  if (myItems.length === 0) {
    return (
      <div className="text-center mt-24 mb-16 text-xl font-semibold text-gray-500">
        You haven’t posted any lost or found items yet.
      </div>
    );
  }
  console.log("Sending token:", user.accessToken);

  console.log("token in the context", user.accessToken);

  return (
    <div className="p-5 max-w-7xl mx-auto mt-16">
      <h2 className="text-3xl font-bold mb-4 text-blue-700">My Posted Items</h2>
      <div className="overflow-x-auto w-full">
        <table className="table w-full border border-gray-200">
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

  async function handleDelete(id) {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirm) return;

    try {
      const token = await user.getIdToken();
      const res = await fetch(`https://whereisit-server-beta.vercel.app/items/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.deletedCount > 0) {
        const remaining = myItems.filter((item) => item._id !== id);
        setMyItems(remaining);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to delete item. Try again.");
    }
  }
};

export default MyItems;
