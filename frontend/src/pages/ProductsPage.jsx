import { useState, useEffect } from "react";
import { usePermission } from "../hooks/usePermission";
import LoadingScreen from "../components/LoadingScreen";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Electronics",
    stock: ""
  });

  const canRead = usePermission("read_products");
  const canCreate = usePermission("create_products");
  const canUpdate = usePermission("update_products");
  const canDelete = usePermission("delete_products");

  useEffect(() => {
    if (canRead) {
      fetchProducts();
    }
  }, [canRead]);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/products", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const url = editingProduct
        ? `http://localhost:5000/api/products/${editingProduct._id}`
        : "http://localhost:5000/api/products";

      const method = editingProduct ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchProducts();
        setShowModal(false);
        setEditingProduct(null);
        setFormData({ name: "", description: "", price: "", category: "Electronics", stock: "" });
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:5000/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock
    });
    setShowModal(true);
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="page-container">
      <div className="page-content" style={{ maxWidth: "1200px" }}>
        <div className="card animate-scale-in">
          <div className="card-header">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <h1 className="card-title">📦 Products Management</h1>
                <p className="card-subtitle">Manage your product inventory</p>
              </div>
              {canCreate && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditingProduct(null);
                    setFormData({ name: "", description: "", price: "", category: "Electronics", stock: "" });
                    setShowModal(true);
                  }}
                >
                  ➕ Add Product
                </button>
              )}
            </div>
          </div>

          <div className="card-body">
            {products.length === 0 ? (
              <div className="info-box">
                <p className="info-box-title">No Products Found</p>
                <div className="info-box-content">
                  <p>Start by creating your first product.</p>
                </div>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--light-border)" }}>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600" }}>Name</th>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600" }}>Category</th>
                      <th style={{ padding: "1rem", textAlign: "right", fontWeight: "600" }}>Price</th>
                      <th style={{ padding: "1rem", textAlign: "right", fontWeight: "600" }}>Stock</th>
                      <th style={{ padding: "1rem", textAlign: "center", fontWeight: "600" }}>Status</th>
                      {(canUpdate || canDelete) && (
                        <th style={{ padding: "1rem", textAlign: "center", fontWeight: "600" }}>Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} style={{ borderBottom: "1px solid var(--light-border)" }}>
                        <td style={{ padding: "1rem" }}>
                          <div style={{ fontWeight: "600" }}>{product.name}</div>
                          <div style={{ fontSize: "0.875rem", color: "var(--light-text-muted)" }}>
                            {product.description}
                          </div>
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <span className="badge badge-primary">{product.category}</span>
                        </td>
                        <td style={{ padding: "1rem", textAlign: "right", fontWeight: "600" }}>
                          ${product.price.toFixed(2)}
                        </td>
                        <td style={{ padding: "1rem", textAlign: "right" }}>
                          {product.stock}
                        </td>
                        <td style={{ padding: "1rem", textAlign: "center" }}>
                          <span className={`badge ${product.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                            {product.status}
                          </span>
                        </td>
                        {(canUpdate || canDelete) && (
                          <td style={{ padding: "1rem", textAlign: "center" }}>
                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                              {canUpdate && (
                                <button
                                  className="btn btn-primary"
                                  style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
                                  onClick={() => openEditModal(product)}
                                >
                                  ✏️ Edit
                                </button>
                              )}
                              {canDelete && (
                                <button
                                  className="btn btn-danger"
                                  style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
                                  onClick={() => handleDelete(product._id)}
                                >
                                  🗑️
                                </button>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 2000,
          padding: "1rem"
        }}>
          <div className="card animate-scale-in" style={{ maxWidth: "500px", width: "100%", margin: 0, maxHeight: "90vh", overflowY: "auto" }}>
            <div className="card-header">
              <h2 className="card-title">{editingProduct ? "Edit Product" : "Add New Product"}</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">Product Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-input"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    required
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div className="form-group">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      step="0.01"
                      className="form-input"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Stock</label>
                    <input
                      type="number"
                      className="form-input"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    className="form-input"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Food">Food</option>
                    <option value="Books">Books</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  {editingProduct ? "Update Product" : "Create Product"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
