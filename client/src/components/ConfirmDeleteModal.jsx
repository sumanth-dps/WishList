export default function ConfirmDeleteModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 className="text-lg font-semibold mb-4 text-red-600">
          Confirm Deletion
        </h2>
        <p className="mb-6 text-gray-700">
          Are you sure you want to delete this product?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
