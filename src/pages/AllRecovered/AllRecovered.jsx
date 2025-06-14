import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import Spinner from "../../Components/Spinner";
 
const AllRecovered = () => {
  const { user } = useContext(AuthContext);
  const [recoveredItems, setRecoveredItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch("http://localhost:3000/recoveredItems")
      .then((res) => res.json())
      .then((data) => {
        // filter by logged-in user email
        const userItems = data.filter((item) => item.userEmail === user.email);
        setRecoveredItems(userItems);
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

  if (recoveredItems.length === 0) {
    return (
      <div className="text-center mt-10 text-xl font-semibold text-gray-600">
        No recovered items posted yet.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">My Recovered Items</h2>
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

                <td>{item.recoveredDate ? new Date(item.recoveredDate).toLocaleDateString() : "N/A"}</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllRecovered;
