import { useState } from "react";

export default function InviteUserModal({ onClose, onInvite }) {
  const [email, setEmail] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm border-t-4 border-purple-600">
        <h2 className="text-xl font-bold mb-4 text-purple-700">
          Share Wishlist
        </h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-purple-300 p-2 w-full mb-4 rounded focus:outline-purple-500"
          placeholder="Enter user email"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onInvite(email)}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            disabled={!email.trim()}
          >
            Share
          </button>
        </div>
      </div>
    </div>
  );
}
