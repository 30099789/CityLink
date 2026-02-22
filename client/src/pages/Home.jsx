import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main>
      <section style={{ marginBottom: "30px" }}>
        <h1>Smart Community Portal</h1>
        <p>
          Welcome to CityLink Initiatives. Access events, announcements,
          services and community feedback in one place.
        </p>
      </section>

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "15px",
        }}
      >
        <Card title="Events" link="/events" />
        <Card title="Announcements" link="/announcements" />
        <Card title="Services" link="/services" />
        <Card title="Feedback" link="/feedback" />
      </section>
    </main>
  );
}

function Card({ title, link }) {  return (
    <Link
      to={link}
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "10px",
        textDecoration: "none",
        color: "#222",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{title}</h3>
      <p>Open {title}</p>
    </Link>
  );
}