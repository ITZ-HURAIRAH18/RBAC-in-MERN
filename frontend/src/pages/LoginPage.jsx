import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      // Store token
      localStorage.setItem("token", data.token);

      // Reload to update AuthContext
      window.location.href = "/";
    } catch (err) {
      setError("Server error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="page-content" style={{ maxWidth: "450px" }}>
        <div className="card animate-scale-in">
          <div className="card-header" style={{ textAlign: "center" }}>
            <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔐</div>
            <h1 className="card-title" style={{ fontSize: "2rem", textAlign: "center" }}>
              Welcome Back
            </h1>
            <p className="card-subtitle" style={{ textAlign: "center" }}>
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className="form-error animate-fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "0.5rem" }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="divider"></div>

          <div className="info-box">
            <p className="info-box-title">Test Credentials</p>
            <div className="info-box-content">
              <p><strong>Admin:</strong> admin@test.com / password123</p>
              <p><strong>User:</strong> user@test.com / password123</p>
              <p><strong>Manager:</strong> manager@test.com / password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
