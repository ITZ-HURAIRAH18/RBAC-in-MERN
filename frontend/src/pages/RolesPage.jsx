import { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";

const RolesPage = () => {
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    permissions: []
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    try {
      const [rolesRes, permsRes] = await Promise.all([
        fetch("http://localhost:5000/api/roles", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("http://localhost:5000/api/roles/permissions", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setRoles(await rolesRes.json());
      setPermissions(await permsRes.json());
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const url = editingRole
        ? `http://localhost:5000/api/roles/${editingRole._id}`
        : "http://localhost:5000/api/roles";

      const method = editingRole ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchData();
        setShowModal(false);
        setEditingRole(null);
        setFormData({ name: "", permissions: [] });
      }
    } catch (error) {
      console.error("Error saving role:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;

    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:5000/api/roles/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  const openEditModal = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      permissions: role.permissions.map(p => p._id)
    });
    setShowModal(true);
  };

  const togglePermission = (permId) => {
    setFormData(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permId)
        ? prev.permissions.filter(id => id !== permId)
        : [...prev.permissions, permId]
    }));
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
                <h1 className="card-title">🔐 Roles & Permissions</h1>
                <p className="card-subtitle">Manage user roles and their permissions</p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setEditingRole(null);
                  setFormData({ name: "", permissions: [] });
                  setShowModal(true);
                }}
              >
                ➕ Add Role
              </button>
            </div>
          </div>

          <div className="card-body">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.5rem" }}>
              {roles.map((role) => (
                <div key={role._id} className="glass-effect" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                    <h3 style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--primary-600)" }}>
                      {role.name}
                    </h3>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button
                        onClick={() => openEditModal(role)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "1.25rem",
                          padding: "0.25rem"
                        }}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(role._id)}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "1.25rem",
                          padding: "0.25rem"
                        }}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div style={{ fontSize: "0.875rem", color: "var(--light-text-muted)", marginBottom: "0.5rem" }}>
                    <strong>{role.permissions.length}</strong> permissions
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "1rem" }}>
                    {role.permissions.map((perm) => (
                      <span key={perm._id} className="badge badge-primary" style={{ fontSize: "0.75rem" }}>
                        {perm.name}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
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
          padding: "1rem",
          overflowY: "auto"
        }}>
          <div className="card animate-scale-in" style={{ maxWidth: "600px", width: "100%", margin: "auto", maxHeight: "90vh", overflowY: "auto" }}>
            <div className="card-header">
              <h2 className="card-title">{editingRole ? "Edit Role" : "Add New Role"}</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">Role Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Manager, Editor, Viewer"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Permissions</label>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "0.75rem",
                    padding: "1rem",
                    background: "rgba(99, 102, 241, 0.05)",
                    borderRadius: "var(--radius-lg)",
                    maxHeight: "400px",
                    overflowY: "auto"
                  }}>
                    {permissions.map((perm) => (
                      <label
                        key={perm._id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          cursor: "pointer",
                          padding: "0.5rem",
                          borderRadius: "var(--radius-md)",
                          background: formData.permissions.includes(perm._id) ? "rgba(99, 102, 241, 0.1)" : "transparent",
                          transition: "all var(--transition-base)"
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.permissions.includes(perm._id)}
                          onChange={() => togglePermission(perm._id)}
                          style={{ cursor: "pointer" }}
                        />
                        <span style={{ fontSize: "0.875rem" }}>{perm.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  {editingRole ? "Update Role" : "Create Role"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setShowModal(false);
                    setEditingRole(null);
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

export default RolesPage;
