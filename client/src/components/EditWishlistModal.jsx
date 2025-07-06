import { useState } from "react";

export default function EditWishlistModal({ currentName, onClose, onSave }) {
  const [newName, setNewName] = useState(currentName);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm border-t-4 border-blue-600">
        <h2 className="text-xl font-bold mb-4 text-blue-700">Edit Wishlist</h2>
        <input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border border-blue-300 p-2 w-full mb-4 rounded focus:outline-blue-400"
          placeholder="New wishlist name"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(newName)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            disabled={!newName.trim()}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
