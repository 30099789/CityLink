import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "220px",
          background: "#1e293b",
          color: "white",
          padding: "16px",
        }}
      >
        <h3>Admin Panel</h3>

        <nav style={{ display: "grid", gap: "10px", marginTop: "20px" }}>
          <Link to="/admin" style={{ color: "white" }}>Dashboard</Link>
          <Link to="/admin/events" style={{ color: "white" }}>Events</Link>
          <Link to="/admin/users" style={{ color: "white" }}>Users</Link>
          <Link to="/admin/feedback" style={{ color: "white" }}>Feedback</Link>
        </nav>
      </aside>

      {/* Content */}
      <main style={{ flex: 1, padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}