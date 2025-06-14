import React, { useContext, useState } from "react";
import { useLoaderData } from "react-router";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';


const ItemDetails = () => {
  const item = useLoaderData();
  const { user } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [recoverDate, setRecoverDate] = useState(new Date());
  const [recoverLocation, setRecoverLocation] = useState("");

  const handleRecover = async () => {
  if (item.status === "recovered") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Item is already recovered.",
    });
  }

  const recoveredData = {
  itemId: item._id,
  title: item.title,
  thumbnail: item.thumbnail,
  recoveredLocation: recoverLocation,
  recoveredDate: recoverDate.toISOString().split("T")[0],
  recoveredBy: {
    name: user?.displayName,
    email: user?.email,
    image: user?.photoURL,
  },
  userEmail: user?.email, // ✅ Needed for filtering on "AllRecovered" page
};


  try {
    // 1. Add to recoveredItems collection
    const res1 = await fetch("http://localhost:3000/recoveredItems", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(recoveredData),
});

    // 2. Update status in items collection
    const res2 = await fetch(`http://localhost:3000/items/${item._id}`, {
  method: "PATCH",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ status: "recovered" }),
});


    if (res1.ok && res2.ok) {
      item.status = "recovered";
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Item marked as recovered.",
      });
      setShowModal(false);
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to recover item.",
      });
    }
  } catch (err) {
    console.error(err);
     Swal.fire({
      icon: "error",
      title: "Error",
      text: "Something went wrong.",
    });
  }
};


  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow my-3">
      <img
        src={item.thumbnail}
        alt={item.title}
        className="w-full h-96 object-cover rounded mb-4"
      />
      <h2 className="text-3xl font-bold mb-2">{item.title}</h2>
      <p className="mb-2 text-gray-700">{item.description}</p>
      <p>
        <strong>Category:</strong> {item.category}
      </p>
      <p>
        <strong>Location:</strong> {item.location}
      </p>
      <p>
        <strong>Date:</strong> {item.date}
      </p>
      <p>
        <strong>Posted by:</strong> {item.contactName} ({item.contactEmail})
      </p>
      <p>
        <strong>Status:</strong> {item.status || "pending"}
      </p>

      {item.status !== "recovered" && (
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 btn bg-blue-700 text-white"
        >
          {item.type === "Lost" ? "Found This!" : "This is Mine!"}
        </button>
      )}

      {showModal && (
        <div className="fixed inset-0  bg-opacity-30 bg-blue-200 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded w-96">
            <h3 className="text-xl font-semibold mb-4">Recover Item Info</h3>
            <input
              type="text"
              value={recoverLocation}
              onChange={(e) => setRecoverLocation(e.target.value)}
              placeholder="Recovered Location"
              className="input input-bordered w-full mb-3"
            />
            <DatePicker
              selected={recoverDate}
              onChange={(date) => setRecoverDate(date)}
              className="input input-bordered w-full mb-3"
            />
            <div className="bg-gray-100 p-3 rounded mb-3">
              <p>
                <strong>Name:</strong> {user?.displayName}
              </p>
              <p>
                <strong>Email:</strong> {user?.email}
              </p>
              {user?.photoURL && (
                

                <img
  src={user?.photoURL }
  alt="user"
  className="w-12 h-12 rounded-full mt-2"
/>

              )}
            </div>
            <button
              onClick={handleRecover}
              className="btn bg-blue-900 text-white w-full"
            >
              Submit
            </button>
            <button
              onClick={() => setShowModal(false)}
              className="btn mt-2 w-full"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemDetails;
