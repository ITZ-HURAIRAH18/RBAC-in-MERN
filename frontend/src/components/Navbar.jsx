import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePermission } from "../hooks/usePermission";
import Logo from "../components/Logo";
import "./Navbar.css";

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Check permissions
  const canReadUsers = usePermission("read_users");
  const canReadProducts = usePermission("read_products");
  const canViewReports = usePermission("view_reports");
  const canManageRoles = usePermission("manage_roles");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav style={{
      background: "white",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      padding: "1rem 2rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 1000
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo size="md" />
        </Link>
        <span style={{ fontSize: "1.5rem", fontWeight: "700", color: "#000000 !important" }}>
          RBAC System
        </span>
      </div>

      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          {canReadUsers && (
            <Link 
              to="/users" 
              style={{ 
                color: "#5b6ee8", 
                textDecoration: "none", 
                fontWeight: "600", 
                transition: "color 0.2s",
                opacity: "1"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#4050d0"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#5b6ee8"}
            >
              Users
            </Link>
          )}
          {canReadProducts && (
            <Link 
              to="/products" 
              style={{ 
                color: "#5b6ee8", 
                textDecoration: "none", 
                fontWeight: "600", 
                transition: "color 0.2s",
                opacity: "1"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#4050d0"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#5b6ee8"}
            >
              Products
            </Link>
          )}
          {canViewReports && (
            <Link 
              to="/reports" 
              style={{ 
                color: "#5b6ee8", 
                textDecoration: "none", 
                fontWeight: "600", 
                transition: "color 0.2s",
                opacity: "1"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#4050d0"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#5b6ee8"}
            >
              Reports
            </Link>
          )}
          {canManageRoles && (
            <Link 
              to="/roles" 
              style={{ 
                color: "#5b6ee8", 
                textDecoration: "none", 
                fontWeight: "600", 
                transition: "color 0.2s",
                opacity: "1"
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#4050d0"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#5b6ee8"}
            >
              Roles
            </Link>
          )}
          
          <div style={{ borderLeft: "1px solid #ddd", paddingLeft: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ color: "#000000", fontSize: "0.9rem", fontWeight: "600", opacity: "1" }}>
              {user.email}
            </span>
            <button
              onClick={handleLogout}
              style={{
                background: "#ef4444",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500"
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
