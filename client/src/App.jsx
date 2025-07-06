import React, { useEffect, useState } from "react";
import Auth from "./components/Auth";
import Wishlist from "./components/Wishlist";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        localStorage.setItem("token", token);
        setUser(firebaseUser);
      } else {
        localStorage.removeItem("token");
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return user ? (
    <Wishlist user={user} setUser={setUser} />
  ) : (
    <Auth setUser={setUser} />
  );
}

export default App;
