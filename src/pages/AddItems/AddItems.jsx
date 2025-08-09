import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const AddItems = () => {
  const { user } = useContext(AuthContext);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => ({ ...prev, [name]: value }));
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "To add an item, please login first.",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      Swal.fire({
  icon: "success",
  title: "Post Added!",
  text: "Your item has been added successfully.",
  confirmButtonText: "OK",
}).then(() => {
  navigate("/my-items");
});

    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      ...postData,
      userEmail: user?.email,
      date: date.toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    };

    try {
      const token = await user.getIdToken();

      const res = await fetch("https://whereisit-server-beta.vercel.app/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        Swal.fire({
          icon: "success",
          title: "Post Added!",
          text: "Your item has been added successfully.",
          confirmButtonText: "OK",
        });

        setPostData({
          type: "Lost",
          thumbnail: "",
          title: "",
          description: "",
          category: "",
          location: "",
          contactName: user?.displayName || "",
          contactEmail: user?.email || "",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to add post. Try again.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Connection Error",
        text: "Failed to connect to server.",
      });
    }
  };

  return (
    <div className="max-w-xl w-full mx-auto p-4 sm:p-6 bg-gray-100 shadow-md rounded my-4 mt-24 sm:my-8">

      <h2 className="text-2xl sm:text-4xl font-bold mb-6 mt-12 text-blue-700 text-center sm:text-left">
        Add Lost & Found Item
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="type"
          value={postData.type}
          onChange={handleChange}
          className="select select-bordered w-full"
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
          />
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <p>
            <strong>Name:</strong> {user?.displayName}
          </p>
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>

        <button type="submit" className="btn bg-blue-800 text-white w-full">
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddItems;
