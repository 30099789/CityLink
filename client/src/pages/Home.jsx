import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      
      {/* Hero Section */}
      <section className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Smart Community Portal
        </h1>

        <p className="text-gray-600 text-lg max-w-2xl">
          Welcome to CityLink Initiatives. Access events, announcements,
          services and community feedback in one place.
        </p>
      </section>

      {/* Cards Section */}
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Events" link="/events" />
        <Card title="Announcements" link="/announcements" />
        <Card title="Services" link="/services" />
        <Card title="Feedback" link="/feedback" />
      </section>

    </main>
  );
}

function Card({ title, link }) {
  return (
    <Link
      to={link}
      className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-100"
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>

      <p className="text-gray-500">
        Open {title}
      </p>
    </Link>
  );
}