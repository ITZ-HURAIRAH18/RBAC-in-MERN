import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import ProtectedRoute from "./componenets/ProtectedRoute";
import UsersPage from "./pages/UsersPage";
import ProductsPage from "./pages/ProductsPage";
import ReportsPage from "./pages/ReportsPage";
import RolesPage from "./pages/RolesPage";
import Unauthorized from "./pages/Unauthorized";
import LoginPage from "./pages/LoginPage";
import { useAuth } from "./context/AuthContext";
import { usePermission } from "./hooks/usePermission";
import "./App.css";

function App() {
  const { user } = useAuth();

  // Check permissions for navigation
  const canReadUsers = usePermission("read_users");
  const canReadProducts = usePermission("read_products");
  const canViewReports = usePermission("view_reports");
  const canManageRoles = usePermission("manage_roles");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  // Get user initials for avatar
  const getUserInitials = (email) => {
    return email ? email.charAt(0).toUpperCase() : "U";
  };

  return (
    <BrowserRouter>
      {user && (
        <nav className="navbar animate-fade-in">
          <div className="navbar-container">
            <div className="navbar-links">
              <div className="navbar-logo">
                🚀 MERN RBAC
              </div>
              <Link to="/" className="navbar-link">
                🏠 Home
              </Link>
              {canReadUsers && (
                <Link to="/users" className="navbar-link">
                  👥 Users
                </Link>
              )}
              {canReadProducts && (
                <Link to="/products" className="navbar-link">
                  📦 Products
                </Link>
              )}
              {canViewReports && (
                <Link to="/reports" className="navbar-link">
                  📊 Reports
                </Link>
              )}
              {canManageRoles && (
                <Link to="/roles" className="navbar-link">
                  🔐 Roles
                </Link>
              )}
            </div>
            <div className="navbar-user-section">
              <div className="navbar-user-info">
                <div className="navbar-user-avatar">
                  {getUserInitials(user.email)}
                </div>
                <span className="navbar-user-email">{user.email}</span>
              </div>
              <button
                onClick={handleLogout}
                className="btn btn-danger"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <LoginPage />} />

        <Route
          path="/"
          element={
            user ? (
              <div className="page-container">
                <div className="page-content">
                  <div className="hero-section animate-scale-in">
                    <h1 className="hero-title">
                      Welcome to MERN RBAC
                    </h1>
                    <p className="hero-subtitle">
                      You are logged in as: <strong>{user.email}</strong>
                    </p>
                    <p className="hero-description">
                      Your permissions: {user.permissions?.join(", ") || "None"}
                    </p>
                    <div className="hero-actions">
                      {canReadUsers && (
                        <Link to="/users" className="btn btn-primary">
                          👥 Users
                        </Link>
                      )}
                      {canReadProducts && (
                        <Link to="/products" className="btn btn-primary">
                          📦 Products
                        </Link>
                      )}
                      {canViewReports && (
                        <Link to="/reports" className="btn btn-primary">
                          📊 Reports
                        </Link>
                      )}
                      {canManageRoles && (
                        <Link to="/roles" className="btn btn-primary">
                          🔐 Roles
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/users"
          element={
            user ? (
              <ProtectedRoute permission="read_users">
                <UsersPage />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/products"
          element={
            user ? (
              <ProtectedRoute permission="read_products">
                <ProductsPage />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/reports"
          element={
            user ? (
              <ProtectedRoute permission="view_reports">
                <ReportsPage />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/roles"
          element={
            user ? (
              <ProtectedRoute permission="manage_roles">
                <RolesPage />
              </ProtectedRoute>
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
