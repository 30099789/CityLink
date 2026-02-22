import { Link, Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <nav style={{ display: "flex", gap: 12, padding: 16 }}>
        <Link to="/">Home</Link>
        <Link to="/announcements">Announcements</Link>
        <Link to="/events">Events</Link>
        <Link to="/services">Services</Link>
        <Link to="/faq">FAQ</Link>
        <Link to="/login">Login</Link>
        <Link to="/admin">Admin</Link>
      </nav>

      <main style={{ padding: 16 }}>
        <Outlet />
      </main>
    </div>
  );
}