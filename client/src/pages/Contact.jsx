import { Link }from "react-router-dom";

export default function Contact() {
    return (
        
        <main className="max-w-6xl mx-auto px-4 py-10">
            <section className="mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3"> Contact Us</h1>
                <p className="text-gray-600 text-lg max-w-2xl">
                    For inquiries, support, or feedback, please reach out to us through the following channels:
                </p>
            </section>
            <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <Card title="Email" link="mailto:contact@citylink.com" />
                <Card title="Phone" link="tel:+61412345678" />
                <Card title="Address" link="https://maps.google.com/?q=123+Main+Street" />
                <Card title="Support" link="/support" />
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
