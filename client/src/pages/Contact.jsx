import { useState } from "react";
import { Link } from "react-router-dom";

export default function Contact() {
  const [form, setForm]           = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]         = useState("");

  function update(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in your name, email and message.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h1>
        <p className="text-slate-500 mb-6">
          Thanks for reaching out, {form.name}. We'll get back to you at{" "}
          <span className="font-medium text-slate-700">{form.email}</span> within 2 business days.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
          className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition"
        >
          Send another message
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">

      {/* Header */}
      <section className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Contact Us</h1>
        <p className="text-slate-500 max-w-2xl">
          Have a question, concern, or need help with a service? Get in touch with the
          CityLink Initiatives team — we're here to help.
        </p>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Contact details */}
        <div className="space-y-4">

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="text-2xl mb-2">📍</div>
            <h3 className="font-semibold text-slate-900 mb-1">Visit Us</h3>
            <p className="text-sm text-slate-500">123 Council Street</p>
            <p className="text-sm text-slate-500">CityLink, CL 12345</p>
            <p className="text-xs text-slate-400 mt-2">Mon – Fri, 9:00 AM – 5:00 PM</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="text-2xl mb-2">📞</div>
            <h3 className="font-semibold text-slate-900 mb-1">Call Us</h3>
            <a href="tel:+611234567890" className="text-sm text-blue-600 hover:underline">
              (123) 456-7890
            </a>
            <p className="text-xs text-slate-400 mt-2">Mon – Fri, 8:30 AM – 4:30 PM</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="text-2xl mb-2">✉️</div>
            <h3 className="font-semibold text-slate-900 mb-1">Email Us</h3>
            <a href="mailto:info@citylink.gov.au" className="text-sm text-blue-600 hover:underline">
              info@citylink.gov.au
            </a>
            <p className="text-xs text-slate-400 mt-2">We reply within 2 business days</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="text-2xl mb-2">🌐</div>
            <h3 className="font-semibold text-slate-900 mb-1">Other Links</h3>
            <div className="space-y-1 mt-1">
              <Link to="/feedback" className="block text-sm text-blue-600 hover:underline">Submit Feedback</Link>
              <Link to="/faq" className="block text-sm text-blue-600 hover:underline">Visit FAQ</Link>
              <Link to="/services" className="block text-sm text-blue-600 hover:underline">View Services</Link>
            </div>
          </div>

        </div>

        {/* Contact form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-semibold text-slate-900 mb-5">Send Us a Message</h2>

            {error && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => update("name", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="What is your enquiry about?"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-800 mb-1.5">
                  Message *
                </label>
                <textarea
                  rows={6}
                  placeholder="Write your message here…"
                  value={form.message}
                  onChange={(e) => update("message", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-slate-900 text-white text-sm font-semibold rounded-2xl hover:bg-slate-700 transition"
              >
                Send Message
              </button>

            </form>

            <p className="text-xs text-slate-400 text-center mt-4">
              Your information is handled in accordance with our{" "}
              <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>

      </div>
    </main>
  );
}
