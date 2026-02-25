import { Link } from "react-router-dom";

export default function Faq() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <section className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Frequently Asked Questions</h1>
        <p className="text-gray-600 text-lg max-w-2xl">Find answers to common questions about our community portal, events, services, and more. If you have additional questions, feel free to contact us!</p>
      </section>
      <section className="space-y-5">
        <FaqItem question="How do I register for an event?" answer="To register for an event, simply click on the event card and follow the registration instructions provided." />
        <FaqItem question="How can I provide feedback?" answer="You can provide feedback by navigating to the Feedback section and submitting your comments or suggestions through the provided form." />
        <FaqItem question="How do I contact support?" answer="For support inquiries, please visit the Contact Us page where you can find various ways to reach out to our team." />
        <FaqItem question="How do I stay updated on new events and announcements?" answer="You can stay updated by regularly visiting our portal, subscribing to our newsletter, or following us on social media for the latest news and updates." />
        <FaqItem question="How do I access community services?" answer="To access community services, navigate to the Services section where you can find information on available services and how to utilize them." />
        <FaqItem question="How long does garbage collection take?" answer="Garbage collection typically takes place on a weekly basis, but the schedule may vary based on your location. Please check with your local waste management services for specific details." />
        <FaqItem question="When is the next community event?" answer="The schedule for upcoming community events can be found in the Events section of our portal. We regularly update this section with new events, so be sure to check back often!" />
        <FaqItem question="I have a issue with the portal, how do I report it?" answer="If you encounter any issues with the portal, please report them through the Contact Us page. Provide as much detail as possible to help us resolve the issue quickly." />
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