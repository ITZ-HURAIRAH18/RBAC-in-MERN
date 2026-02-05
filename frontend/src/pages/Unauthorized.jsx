import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="page-container">
      <div className="page-content" style={{ maxWidth: "600px" }}>
        <div className="card animate-scale-in" style={{ textAlign: "center" }}>
          <div style={{ fontSize: "5rem", marginBottom: "1rem" }}>🚫</div>
          <h1 className="card-title" style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            403 – Unauthorized
          </h1>
          <p className="card-subtitle" style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
            You do not have permission to access this page.
          </p>

          <Link to="/" className="btn btn-primary">
            ← Go back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;