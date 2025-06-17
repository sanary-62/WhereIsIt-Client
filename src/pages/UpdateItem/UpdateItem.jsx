import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Spinner from "../../Components/Spinner";

const UpdateItem = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [date, setDate] = useState(new Date());
  const [postData, setPostData] = useState({
    type: "Lost",
    thumbnail: "",
    title: "",
    description: "",
    category: "",
    location: "",
    contactName: user?.displayName || "",
    contactEmail: user?.email || "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/items/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error fetching item: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setPostData({
          type: data.type || "Lost",
          thumbnail: data.thumbnail || "",
          title: data.title || "",
          description: data.description || "",
          category: data.category || "",
          location: data.location || "",

          contactName: data.contactName || user?.displayName || "",
          contactEmail: data.contactEmail || user?.email || "",
        });
        setDate(data.date ? new Date(data.date) : new Date());
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load item data.");
        setLoading(false);
      });
  }, [id, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
  e.preventDefault();

  const updatedData = {
    ...postData,
    date: date.toISOString().split("T")[0],
    updatedAt: new Date().toISOString(),
  };

  try {
    const token = await user.getIdToken();

    const res = await fetch(`http://localhost:3000/items/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,  // <-- Add this line
      },
      body: JSON.stringify(updatedData),
    });

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Update failed: ${res.status} - ${errorText}`);
    }

    const result = await res.json();

    if (result.modifiedCount > 0 || result.success) {
      Swal.fire({
        icon: "success",
        title: "Item Updated",
        text: "Your item was updated successfully.",
      });
      navigate("/myItems");
    } else {
      Swal.fire({
        icon: "info",
        title: "No Changes Made",
        text: "Nothing was updated.",
      });
    }
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: "error",
      title: "Update Failed",
      text: "There was a problem updating your item.",
    });
  }
};


  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-xl font-semibold text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded my-12">
      <h2 className="text-3xl font-bold mb-6 text-blue-800">
        Update Lost & Found Item
      </h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <select
          name="type"
          value={postData.type}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>

        <input
          type="url"
          name="thumbnail"
          value={postData.thumbnail}
          onChange={handleChange}
          placeholder="Image URL"
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="title"
          value={postData.title}
          onChange={handleChange}
          placeholder="Title"
          className="input input-bordered w-full"
          required
        />

        <textarea
          name="description"
          value={postData.description}
          onChange={handleChange}
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          required
        />

        <input
          type="text"
          name="category"
          value={postData.category}
          onChange={handleChange}
          placeholder="Category (e.g., pets, documents, gadgets)"
          className="input input-bordered w-full"
          required
        />

        <input
          type="text"
          name="location"
          value={postData.location}
          onChange={handleChange}
          placeholder="Location"
          className="input input-bordered w-full"
          required
        />

        <div>
          <label className="block mb-1">Date Lost/Found</label>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div className="bg-gray-100 p-4 rounded space-y-2">
          <p>
            <strong>Name:</strong>{" "}
            <input
              type="text"
              value={postData.contactName}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <input
              type="email"
              value={postData.contactEmail}
              readOnly
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
            />
          </p>
        </div>

        <button type="submit" className="btn bg-blue-800 text-white w-full">
          Update Item
        </button>
      </form>
    </div>
  );
};

export default UpdateItem;
