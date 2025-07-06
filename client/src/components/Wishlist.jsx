import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import EditProductModal from "./EditProductModal";
import EditWishlistModal from "./EditWishlistModal";
import InviteUserModal from "./InviteUserModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import CreateWishlistModal from "./CreateWishlistModal";
import Navbar from "./Navbar";
import { getAuth } from "firebase/auth";
import { FiEdit2, FiTrash2, FiUserPlus, FiEdit, FiTrash } from "react-icons/fi";

export default function Wishlist({ user, setUser }) {
  const [wishlists, setWishlists] = useState([]);
  const [selectedWishlist, setSelectedWishlist] = useState(null);
  const [products, setProducts] = useState([]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const [showEditWishlistModal, setShowEditWishlistModal] = useState(false);
  const [editWishlistName, setEditWishlistName] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showWishlistDeleteModal, setShowWishlistDeleteModal] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);

  const emojiList = ["👍", "❤️", "😂", "🤯", "👎"];

  useEffect(() => {
    const authInstance = getAuth();
    authInstance.currentUser?.getIdToken(true).then((token) => {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/wishlists")
        .then((res) => setWishlists(res.data))
        .catch((err) =>
          console.error("Token or server error:", err.response?.data || err)
        );
    });
  }, []);

  const createWishlist = async (name) => {
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/wishlists",
        {
          name,
          users: [user.email],
        }
      );
      setWishlists([...wishlists, res.data]);
      setShowCreateModal(false);
    } catch (err) {
      console.error("Create wishlist failed:", err);
    }
  };

  const openWishlist = async (id) => {
    try {
      const res = await axios.get(
        import.meta.env.VITE_BACKEND_URL + `/api/wishlists/${id}`
      );
      setSelectedWishlist(res.data.wishlist);
      setProducts(res.data.products);
    } catch (err) {
      console.error("Open wishlist failed:", err);
    }
  };

  const editProduct = (product) => {
    setEditForm({ ...product });
    setShowEditModal(true);
  };

  const saveEditedProduct = async () => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_BACKEND_URL +
          `/api/wishlists/${editForm.wishlistId}/products/${editForm._id}`,
        editForm
      );
      setProducts((prev) =>
        prev.map((p) => (p._id === res.data._id ? res.data : p))
      );
      setShowEditModal(false);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  const deleteProduct = (id) => {
    setProductToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDeleteProduct = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL +
          `/api/wishlists/${selectedWishlist._id}/products/${productToDelete}`
      );
      setProducts((prev) => prev.filter((p) => p._id !== productToDelete));
      setShowDeleteModal(false);
      setProductToDelete(null);
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const saveWishlistName = async (newName) => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_BACKEND_URL +
          `/api/wishlists/${selectedWishlist._id}`,
        { name: newName }
      );
      setWishlists((prev) =>
        prev.map((w) => (w._id === res.data._id ? res.data : w))
      );
      setSelectedWishlist(res.data);
      setShowEditWishlistModal(false);
    } catch (err) {
      console.error("Edit wishlist failed:", err);
    }
  };

  const inviteUser = async (email) => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_BACKEND_URL +
          `/api/wishlists/${selectedWishlist._id}/share`,
        { email }
      );
      setWishlists((prev) =>
        prev.map((w) => (w._id === res.data._id ? res.data : w))
      );
      alert(`Shared with ${email}`);
      setShowInviteModal(false);
    } catch (err) {
      console.error("Invite failed:", err);
    }
  };

  const deleteWishlist = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_BACKEND_URL +
          `/api/wishlists/${selectedWishlist._id}`
      );
      setWishlists((prev) =>
        prev.filter((w) => w._id !== selectedWishlist._id)
      );
      setSelectedWishlist(null);
      setShowWishlistDeleteModal(false);
    } catch (err) {
      console.error("Delete wishlist failed:", err);
    }
  };

  const toggleReaction = async (productId, emoji) => {
    try {
      const res = await axios.put(
        import.meta.env.VITE_BACKEND_URL +
          `/api/wishlists/${selectedWishlist._id}/products/${productId}/reactions`,
        { emoji }
      );
      setProducts((prev) =>
        prev.map((p) => (p._id === productId ? res.data : p))
      );
    } catch (err) {
      console.error("Reaction failed:", err);
    }
  };

  return (
    <>
      <Navbar user={user} onLogout={() => setUser(null)} />

      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto">
        <button
          className="bg-green-600 text-white px-4 py-2 mt-4 rounded hover:bg-green-700 w-full sm:w-auto"
          onClick={() => setShowCreateModal(true)}
        >
          + New Wishlist
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {wishlists.map((w) => (
            <div
              key={w._id}
              className="p-4 border border-blue-500 rounded-lg bg-white shadow-sm hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <h4
                  className="font-semibold text-lg cursor-pointer"
                  onClick={() => openWishlist(w._id)}
                >
                  {w.name}
                </h4>
                {w.createdBy === user.email && (
                  <div className="flex gap-2">
                    <button
                      title="Edit"
                      onClick={() => {
                        setSelectedWishlist(w);
                        setEditWishlistName(w.name);
                        setShowEditWishlistModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      title="Delete"
                      onClick={() => {
                        setSelectedWishlist(w);
                        setShowWishlistDeleteModal(true);
                      }}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 size={18} />
                    </button>
                    <button
                      title="Share"
                      onClick={() => {
                        setSelectedWishlist(w);
                        setShowInviteModal(true);
                      }}
                      className="text-purple-600 hover:text-purple-800"
                    >
                      <FiUserPlus size={18} />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1 break-words">
                Created by: {w.createdBy}
              </p>
            </div>
          ))}
        </div>

        {selectedWishlist && (
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">
              {selectedWishlist.name}
            </h3>

            <ProductForm
              wishlistId={selectedWishlist._id}
              setProducts={setProducts}
            />

            <ul className="mt-6">
              {products.map((p) => (
                <li
                  key={p._id}
                  className="flex flex-col sm:flex-row gap-4 mb-4 p-4 bg-blue-50 border border-blue-500 rounded-lg shadow-sm items-start"
                >
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="w-full sm:w-24 sm:h-24 object-cover rounded-md"
                  />
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div>
                        <p className="font-semibold text-lg">{p.name}</p>
                        <p className="text-gray-600 text-sm break-all">
                          by {p.addedBy}
                        </p>
                      </div>
                      <div className="flex gap-2 mt-2 sm:mt-0">
                        <button
                          onClick={() => editProduct(p)}
                          title="Edit"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FiEdit size={16} />
                        </button>
                        <button
                          onClick={() => deleteProduct(p._id)}
                          title="Delete"
                          className="text-red-600 hover:text-red-800"
                        >
                          <FiTrash size={16} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-800 mt-2">₹{p.price}</p>

                    {/* Emoji Reactions */}
                    <div className="flex gap-4 mt-3 flex-wrap">
                      {emojiList.map((emoji) => {
                        const count = p.reactions?.[emoji]?.length || 0;
                        const reacted = p.reactions?.[emoji]?.includes(
                          user.email
                        );

                        return (
                          <button
                            key={emoji}
                            onClick={() => toggleReaction(p._id, emoji)}
                            className={`text-xl transition-transform ${
                              reacted ? "scale-110" : "opacity-70"
                            }`}
                          >
                            {emoji}{" "}
                            {count > 0 && (
                              <span className="text-sm ml-1">{count}</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Modals */}
      {showEditModal && (
        <EditProductModal
          product={editForm}
          setEditForm={setEditForm}
          onClose={() => setShowEditModal(false)}
          onSave={saveEditedProduct}
        />
      )}

      {showDeleteModal && (
        <ConfirmDeleteModal
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={confirmDeleteProduct}
        />
      )}

      {showEditWishlistModal && (
        <EditWishlistModal
          currentName={editWishlistName}
          onClose={() => setShowEditWishlistModal(false)}
          onSave={saveWishlistName}
        />
      )}

      {showInviteModal && (
        <InviteUserModal
          onClose={() => setShowInviteModal(false)}
          onInvite={inviteUser}
        />
      )}

      {showWishlistDeleteModal && (
        <ConfirmDeleteModal
          onCancel={() => setShowWishlistDeleteModal(false)}
          onConfirm={deleteWishlist}
        />
      )}

      {showCreateModal && (
        <CreateWishlistModal
          onClose={() => setShowCreateModal(false)}
          onCreate={createWishlist}
          userEmail={user.email}
        />
      )}
    </>
  );
}
