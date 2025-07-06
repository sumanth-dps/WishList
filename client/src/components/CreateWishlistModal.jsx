import { useState } from "react";

export default function CreateWishlistModal({ onClose, onCreate, userEmail }) {
  const [name, setName] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm border-t-4 border-green-600">
        <h2 className="text-xl font-bold mb-4 text-green-700">
          Create Wishlist
        </h2>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-green-300 p-2 w-full mb-4 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Wishlist name"
        />
        <p className="text-sm text-gray-500 mb-4">Shared with: {userEmail}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onCreate(name)}
            disabled={!name.trim()}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
