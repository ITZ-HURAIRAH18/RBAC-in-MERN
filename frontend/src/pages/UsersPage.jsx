import { useState, useEffect } from "react";
import { usePermission } from "../hooks/usePermission";
import LoadingScreen from "../components/LoadingScreen";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    roles: []
  });

  const canRead = usePermission("read_users");
  const canCreate = usePermission("create_users");
  const canUpdate = usePermission("update_users");
  const canDelete = usePermission("delete_users");

  useEffect(() => {
    if (canRead) {
      fetchUsers();
      fetchRoles();
    }
  }, [canRead]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setUsers(data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRoles = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/users/roles-list", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!response.ok) {
        console.error("Failed to fetch roles");
        setRoles([]);
        return;
      }
      
      const data = await response.json();
      setRoles(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching roles:", error);
      setRoles([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const url = editingUser
        ? `http://localhost:5000/api/users/${editingUser._id}`
        : "http://localhost:5000/api/users";

      const method = editingUser ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchUsers();
        setShowModal(false);
        setEditingUser(null);
        setFormData({ username: "", email: "", password: "", roles: [] });
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const token = localStorage.getItem("token");
    try {
      await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setFormData({
      username: user.username,
      email: user.email,
      password: "",
      roles: user.roles.map(r => r._id)
    });
    setShowModal(true);
  };

  const toggleRole = (roleId) => {
    setFormData(prev => ({
      ...prev,
      roles: prev.roles.includes(roleId)
        ? prev.roles.filter(id => id !== roleId)
        : [...prev.roles, roleId]
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
                <h1 className="card-title">👥 Users Management</h1>
                <p className="card-subtitle">Manage application users and their roles</p>
              </div>
              {canCreate && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setEditingUser(null);
                    setFormData({ username: "", email: "", password: "", roles: [] });
                    setShowModal(true);
                  }}
                >
                  ➕ Add User
                </button>
              )}
            </div>
          </div>

          <div className="card-body">
            {users.length === 0 ? (
              <div className="info-box">
                <p className="info-box-title">No Users Found</p>
                <div className="info-box-content">
                  <p>Start by creating your first user.</p>
                </div>
              </div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--light-border)" }}>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600" }}>Username</th>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600" }}>Email</th>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600" }}>Roles</th>
                      {(canUpdate || canDelete) && (
                        <th style={{ padding: "1rem", textAlign: "center", fontWeight: "600" }}>Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id} style={{ borderBottom: "1px solid var(--light-border)" }}>
                        <td style={{ padding: "1rem", fontWeight: "600" }}>{user.username}</td>
                        <td style={{ padding: "1rem", color: "var(--light-text-muted)" }}>{user.email}</td>
                        <td style={{ padding: "1rem" }}>
                          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                            {user.roles && user.roles.length > 0 ? (
                              user.roles.map((role) => (
                                <span key={role._id} className="badge badge-primary">
                                  {role.name}
                                </span>
                              ))
                            ) : (
                              <span className="badge badge-warning">No roles</span>
                            )}
                          </div>
                        </td>
                        {(canUpdate || canDelete) && (
                          <td style={{ padding: "1rem", textAlign: "center" }}>
                            <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center" }}>
                              {canUpdate && (
                                <button
                                  className="btn btn-primary"
                                  style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
                                  onClick={() => openEditModal(user)}
                                >
                                  ✏️ Edit
                                </button>
                              )}
                              {canDelete && (
                                <button
                                  className="btn btn-danger"
                                  style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
                                  onClick={() => handleDelete(user._id)}
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
          padding: "1rem",
          overflowY: "auto"
        }}>
          <div className="card animate-scale-in" style={{ maxWidth: "600px", width: "100%", margin: "auto", maxHeight: "90vh", overflowY: "auto" }}>
            <div className="card-header">
              <h2 className="card-title">{editingUser ? "Edit User" : "Add New User"}</h2>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Password {editingUser && "(leave blank to keep current)"}
                  </label>
                  <input
                    type="password"
                    className="form-input"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required={!editingUser}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Roles</label>
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
                    gap: "0.75rem",
                    padding: "1rem",
                    background: "rgba(99, 102, 241, 0.05)",
                    borderRadius: "var(--radius-lg)",
                    maxHeight: "300px",
                    overflowY: "auto"
                  }}>
                    {roles.map((role) => (
                      <label
                        key={role._id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          cursor: "pointer",
                          padding: "0.5rem",
                          borderRadius: "var(--radius-md)",
                          background: formData.roles.includes(role._id) ? "rgba(99, 102, 241, 0.1)" : "transparent",
                          transition: "all var(--transition-base)"
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.roles.includes(role._id)}
                          onChange={() => toggleRole(role._id)}
                          style={{ cursor: "pointer" }}
                        />
                        <span style={{ fontSize: "0.875rem" }}>{role.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  {editingUser ? "Update User" : "Create User"}
                </button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => {
                    setShowModal(false);
                    setEditingUser(null);
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

export default UsersPage;