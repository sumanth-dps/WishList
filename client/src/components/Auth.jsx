import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

export default function Auth({ setUser }) {
  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    const token = await result.user.getIdToken();
    localStorage.setItem("token", token);
    setUser(result.user);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Shared Wishlist App</h1>
      <button
        onClick={login}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Sign in with Google
      </button>
    </div>
  );
}
