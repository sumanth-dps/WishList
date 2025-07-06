export default function EditProductModal({
  product,
  onClose,
  onSave,
  setEditForm,
}) {
  const handleChange = (e) => {
    setEditForm({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md border-t-4 border-blue-600">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Edit Product</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          name="name"
          value={product.name}
          onChange={handleChange}
          className="border border-blue-300 p-2 w-full mb-4 rounded focus:outline-blue-400"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          name="imageUrl"
          value={product.imageUrl}
          onChange={handleChange}
          className="border border-blue-300 p-2 w-full mb-4 rounded focus:outline-blue-400"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700">
          Price
        </label>
        <input
          name="price"
          value={product.price}
          onChange={handleChange}
          className="border border-blue-300 p-2 w-full mb-6 rounded focus:outline-blue-400"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
