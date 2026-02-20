import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="home-page" style={{ padding: "24px" }}>
      {/* Hero section */}
      <section style={{ marginBottom: "24px" }}>
        <h1>Welcome to CityLink Initiatives</h1>
        <p>
          Smart Community Portal helping residents access services,
          announcements and community events.
        </p>
      </section>

      {/* Quick links */}
      <section
        style={{
          display: "grid",
          gap: "12px",
          maxWidth: "500px"
        }}
      >
        <Link to="/announcements">
          <button>View Announcements</button>
        </Link>

        <Link to="/events">
          <button>Community Events</button>
        </Link>

        <Link to="/services">
          <button>Services</button>
        </Link>

        <Link to="/feedback">
          <button>Leave Feedback</button>
        </Link>

        <Link to="/admin">
          <button>Admin Dashboard</button>
        </Link>
      </section>
    </div>
  );
}