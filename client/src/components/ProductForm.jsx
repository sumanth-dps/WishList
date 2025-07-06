import React, { useState } from "react";
import axios from "axios";

export default function ProductForm({ wishlistId, setProducts }) {
  const [form, setForm] = useState({ name: "", imageUrl: "", price: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    const res = await axios.post(
      import.meta.env.VITE_BACKEND_URL +
        `/api/wishlists/${wishlistId}/products`,
      form
    );
    setProducts((prev) => [...prev, res.data]);
    setForm({ name: "", imageUrl: "", price: "" });
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow mb-6 border-1 border-blue-400">
      <div className="grid gap-4 md:grid-cols-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product name"
          className="bg-white border border-gray-300 p-2 rounded focus:outline-blue-400  w-full"
        />

        <input
          name="imageUrl"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
          className="bg-white border border-gray-300 p-2 rounded focus:outline-blue-400 w-full"
        />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className=" bg-white border border-gray-300 p-2 rounded focus:outline-blue-400 w-full"
        />
      </div>
      <button
        onClick={addProduct}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Product
      </button>
    </div>
  );
}
