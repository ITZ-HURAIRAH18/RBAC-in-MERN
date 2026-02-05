import { useState, useEffect } from "react";

const ReportsPage = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [userReport, setUserReport] = useState([]);
  const [productReport, setProductReport] = useState([]);
  const [salesSummary, setSalesSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    const token = localStorage.getItem("token");
    try {
      const [dashRes, userRes, prodRes, salesRes] = await Promise.all([
        fetch("http://localhost:5000/api/reports/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("http://localhost:5000/api/reports/users", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("http://localhost:5000/api/reports/products", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("http://localhost:5000/api/reports/sales", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      setDashboardStats(await dashRes.json());
      setUserReport(await userRes.json());
      setProductReport(await prodRes.json());
      setSalesSummary(await salesRes.json());
    } catch (error) {
      console.error("Error fetching reports:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="page-content">
          <p style={{ textAlign: "center", color: "var(--light-text-muted)" }}>Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-content" style={{ maxWidth: "1200px" }}>
        <div className="card animate-scale-in">
          <div className="card-header">
            <h1 className="card-title">📊 Reports & Analytics</h1>
            <p className="card-subtitle">View comprehensive business insights</p>
          </div>

          <div className="card-body">
            {/* Tabs */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem", borderBottom: "2px solid var(--light-border)", flexWrap: "wrap" }}>
              {["dashboard", "users", "products", "sales"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  style={{
                    padding: "0.75rem 1.5rem",
                    border: "none",
                    background: activeTab === tab ? "var(--gradient-primary)" : "transparent",
                    color: activeTab === tab ? "white" : "var(--light-text)",
                    fontWeight: "600",
                    borderRadius: "var(--radius-md) var(--radius-md) 0 0",
                    cursor: "pointer",
                    transition: "all var(--transition-base)",
                    textTransform: "capitalize"
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Dashboard Tab */}
            {activeTab === "dashboard" && dashboardStats && (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
                <div className="glass-effect" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>👥</div>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--primary-600)" }}>
                    {dashboardStats.totalUsers}
                  </div>
                  <div style={{ color: "var(--light-text-muted)", fontSize: "0.875rem" }}>Total Users</div>
                </div>

                <div className="glass-effect" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📦</div>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--accent-blue)" }}>
                    {dashboardStats.totalProducts}
                  </div>
                  <div style={{ color: "var(--light-text-muted)", fontSize: "0.875rem" }}>Total Products</div>
                </div>

                <div className="glass-effect" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>✅</div>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--accent-green)" }}>
                    {dashboardStats.activeProducts}
                  </div>
                  <div style={{ color: "var(--light-text-muted)", fontSize: "0.875rem" }}>Active Products</div>
                </div>

                <div className="glass-effect" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>⏸️</div>
                  <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--accent-orange)" }}>
                    {dashboardStats.inactiveProducts}
                  </div>
                  <div style={{ color: "var(--light-text-muted)", fontSize: "0.875rem" }}>Inactive Products</div>
                </div>
              </div>
            )}

            {/* Users Tab */}
            {activeTab === "users" && (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--light-border)" }}>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600" }}>Email</th>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600" }}>Role</th>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600" }}>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userReport.map((user) => (
                      <tr key={user.id} style={{ borderBottom: "1px solid var(--light-border)" }}>
                        <td style={{ padding: "1rem" }}>{user.email}</td>
                        <td style={{ padding: "1rem" }}>
                          <span className="badge badge-primary">{user.role}</span>
                        </td>
                        <td style={{ padding: "1rem", color: "var(--light-text-muted)" }}>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--light-border)" }}>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600" }}>Name</th>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600" }}>Category</th>
                      <th style={{ padding: "1rem", textAlign: "right", fontWeight: "600" }}>Price</th>
                      <th style={{ padding: "1rem", textAlign: "right", fontWeight: "600" }}>Stock</th>
                      <th style={{ padding: "1rem", textAlign: "center", fontWeight: "600" }}>Status</th>
                      <th style={{ padding: "1rem", textAlign: "left", fontWeight: "600" }}>Created By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productReport.map((product) => (
                      <tr key={product.id} style={{ borderBottom: "1px solid var(--light-border)" }}>
                        <td style={{ padding: "1rem", fontWeight: "600" }}>{product.name}</td>
                        <td style={{ padding: "1rem" }}>
                          <span className="badge badge-primary">{product.category}</span>
                        </td>
                        <td style={{ padding: "1rem", textAlign: "right" }}>${product.price.toFixed(2)}</td>
                        <td style={{ padding: "1rem", textAlign: "right" }}>{product.stock}</td>
                        <td style={{ padding: "1rem", textAlign: "center" }}>
                          <span className={`badge ${product.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                            {product.status}
                          </span>
                        </td>
                        <td style={{ padding: "1rem", color: "var(--light-text-muted)", fontSize: "0.875rem" }}>
                          {product.createdBy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Sales Tab */}
            {activeTab === "sales" && salesSummary && (
              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
                  <div className="glass-effect" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>💰</div>
                    <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--accent-green)" }}>
                      ${salesSummary.totalRevenue.toFixed(2)}
                    </div>
                    <div style={{ color: "var(--light-text-muted)", fontSize: "0.875rem" }}>Total Revenue</div>
                  </div>

                  <div className="glass-effect" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>🛒</div>
                    <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--accent-blue)" }}>
                      {salesSummary.totalOrders}
                    </div>
                    <div style={{ color: "var(--light-text-muted)", fontSize: "0.875rem" }}>Total Orders</div>
                  </div>

                  <div className="glass-effect" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
                    <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>📈</div>
                    <div style={{ fontSize: "2rem", fontWeight: "700", color: "var(--accent-purple)" }}>
                      ${salesSummary.averageOrderValue.toFixed(2)}
                    </div>
                    <div style={{ color: "var(--light-text-muted)", fontSize: "0.875rem" }}>Avg Order Value</div>
                  </div>
                </div>

                <div className="glass-effect" style={{ padding: "1.5rem", borderRadius: "var(--radius-lg)" }}>
                  <h3 style={{ marginBottom: "1rem", fontWeight: "600" }}>🏆 Top Products</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {salesSummary.topProducts.map((product, index) => (
                      <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem", background: "rgba(99, 102, 241, 0.05)", borderRadius: "var(--radius-md)" }}>
                        <span style={{ fontWeight: "500" }}>{product.name}</span>
                        <span className="badge badge-success">{product.sales} sales</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
