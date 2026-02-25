export default function Services() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">City Services</h1>
        <p className="text-gray-600 text-lg max-w-2xl"> Explore the various services offered by our city, including waste management, public transportation, and community programs. Find out how to access these services and stay informed about any updates or changes.</p>
      </section>
      <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Waste Collection" link="/services/waste-collection" />
        <Card title="Public Transportation" link="/services/public-transportation" />
        <Card title="Community Programs" link="/services/community-programs" />
        <Card title="Emergency Services" link="/services/emergency-services" />
      </section>
    </main>
  );
}function Card({ title, link }) {
  return (
    <a href={link} className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition duration-300 border border-gray-100">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500">Open {title}</p>
    </a>
  );
}
