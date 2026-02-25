import { Link } from "react-router-dom";

export default function Feedback() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Community Feedback</h1>
        <p className="text-gray-600 text-lg max-w-2xl">
          We value your input! Share your thoughts, suggestions, and concerns about our community initiatives. Your feedback helps us improve and create a better experience for everyone.
        </p>  
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