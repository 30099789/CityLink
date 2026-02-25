import { Link } from "react-router-dom";


export default function Events() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Upcoming Events</h1>
        <p className="text-gray-600 text-lg max-w-2xl"> Stay informed about the latest community events, workshops, and gatherings happening in your city. Check back regularly for updates!</p>  
      </section>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Community Clean-Up" link="/events/cleanup" />
        <Card title="Farmers Market" link="/events/farmers-market" />
        <Card title="Tech Workshop" link="/events/tech-workshop" />
        <Card title="Art Festival" link="/events/art-festival" />
      </section>
    </main>
  );
}
function Card({ title, link }) {
  return (
    <Link to={link} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500">Open {title}</p>
    </Link>
  );
}