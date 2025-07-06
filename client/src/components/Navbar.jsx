import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar({ user, onLogout }) {
  const handleLogout = async () => {
    await signOut(auth);
    localStorage.removeItem("token");
    onLogout(); // clears user state
  };

  return (
    <nav className="bg-blue-50 shadow px-6 py-3 flex justify-between items-center sticky top-0 z-10">
      <div className="text-xl font-bold text-blue-700">🎁 Wishlist</div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600 hidden sm:block">
          {user.email}
        </span>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
