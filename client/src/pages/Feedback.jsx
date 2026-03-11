import { useState } from "react";
import { Link } from "react-router-dom";
import { getFeedback, saveFeedback } from "../data/mockData";

const CATEGORIES = [
  { id: "General",              icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" },
  { id: "Events",               icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { id: "Services",             icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
  { id: "Roads & Infrastructure",icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
  { id: "Waste & Recycling",    icon: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" },
  { id: "Website",              icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
  { id: "Other",                icon: "M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" },
];

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Very Good", "Excellent"];

function StarIcon({ filled }) {
  return (
    <svg className={`w-7 h-7 transition-all duration-150 ${filled ? "text-amber-400 drop-shadow-sm" : "text-slate-200"}`}
      fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  );
}

function Icon({ path, className = "w-4 h-4" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.75} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

/* ─── ANIMATED CHECK (pure SVG, no emoji) ─── */
function AnimatedCheck() {
  return (
    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-900 mb-6 relative">
      <svg className="w-10 h-10" viewBox="0 0 52 52" fill="none">
        <circle cx="26" cy="26" r="25" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
        <path
          d="M14 26 L22 34 L38 18"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: 30,
            strokeDashoffset: 0,
            animation: "drawCheck 0.5s ease-out 0.1s both",
          }}
        />
      </svg>
      <style>{`
        @keyframes drawCheck {
          from { stroke-dashoffset: 30; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
    </div>
  );
}

/* ─── SUCCESS SCREEN ─── */
function SuccessScreen({ refCode, onReset }) {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        <AnimatedCheck />

        <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">
          Feedback Submitted
        </h1>
        <p className="text-slate-500 text-sm mb-2">
          Thank you for taking the time to share your thoughts.
        </p>
        <div className="inline-flex items-center gap-2 bg-slate-100 rounded-full px-4 py-1.5 mb-8">
          <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Reference</span>
          <span className="font-mono text-sm font-bold text-slate-800">{refCode}</span>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 text-left mb-6 shadow-sm">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">What happens next</p>
          <div className="space-y-4">
            {[
              { step: "01", text: "Your submission is logged and assigned to the relevant team" },
              { step: "02", text: "A staff member will review and respond within 5 business days" },
              { step: "03", text: "You will be notified of any actions or outcomes taken" },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-4">
                <span className="font-mono text-xs font-bold text-slate-300 pt-0.5 w-6 flex-shrink-0">{step}</span>
                <p className="text-sm text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={onReset}
            className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors">
            Submit Another
          </button>
          <Link to="/"
            className="px-6 py-2.5 border border-slate-200 bg-white text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN PAGE ─── */
export default function Feedback() {
  const [form, setForm]       = useState({ category: "General", subject: "", message: "", rating: 0 });
  const [submitted, setSubmitted] = useState(null);
  const [error, setError]     = useState("");
  const [hover, setHover]     = useState(0);
  const [focused, setFocused] = useState("");

  function update(k, v) { setForm((f) => ({ ...f, [k]: v })); }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.subject.trim()) { setError("A subject is required to submit your feedback."); return; }
    if (!form.message.trim()) { setError("Please include a message describing your feedback."); return; }
    setError("");

    let user = { name: "Anonymous", email: "anonymous@user.com" };
    try {
      const u = JSON.parse(localStorage.getItem("citylink_user"));
      if (u) user = { name: u.name || u.email, email: u.email };
    } catch {}

    const ref = `FB-${Date.now().toString().slice(-6)}`;
    saveFeedback([...getFeedback(), {
      id: `fb-${Date.now()}`, ref,
      userName: user.name, userEmail: user.email,
      category: form.category, subject: form.subject,
      message: form.message, rating: form.rating,
      status: "New",
      submittedDate: new Date().toISOString().slice(0, 10),
      response: "",
    }]);
    setSubmitted(ref);
  }

  if (submitted) {
    return <SuccessScreen refCode={submitted} onReset={() => {
      setSubmitted(null);
      setForm({ category: "General", subject: "", message: "", rating: 0 });
    }} />;
  }

  const inputBase = "w-full rounded-xl border px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition-all duration-150 focus:outline-none";
  const inputIdle = "border-slate-200 bg-white focus:border-slate-500 focus:ring-2 focus:ring-slate-900/10";

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── PAGE HEADER ── */}
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-2">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">CityLink Initiatives</p>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight mb-2">Community Feedback</h1>
        <p className="text-slate-500 text-sm max-w-xl leading-relaxed">
          Every submission is read by our team. Your voice directly influences how we
          plan, deliver, and improve services across the community.
        </p>
      </div>

      <main className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

          {/* ── SIDEBAR ── */}
          <aside className="space-y-4 lg:sticky lg:top-6">

            {/* Types of feedback */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Feedback Types</p>
              </div>
              <div className="divide-y divide-slate-100">
                {[
                  { label: "Compliment",  desc: "Recognise outstanding service or staff", path: "M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" },
                  { label: "Suggestion",  desc: "Propose improvements or new ideas",       path: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" },
                  { label: "Complaint",   desc: "Report a problem or poor experience",    path: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" },
                  { label: "Enquiry",     desc: "Ask a question about council services",  path: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
                ].map(({ label, desc, path }) => (
                  <div key={label} className="flex items-start gap-3 px-5 py-3.5 hover:bg-slate-50 transition-colors">
                    <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon path={path} className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact + Response times */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Urgent Contact</p>
              <div className="space-y-3">
                {[
                  { label: "Phone", value: "(123) 456-7890", href: "tel:+611234567890", path: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" },
                  { label: "Email", value: "info@citylink.gov.au", href: "mailto:info@citylink.gov.au", path: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                ].map(({ label, value, href, path }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Icon path={path} className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">{label}</p>
                      <a href={href} className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors truncate block">{value}</a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Response Times</p>
              <div className="space-y-2.5">
                {[
                  { label: "General enquiry",      time: "2 business days" },
                  { label: "Complaint",            time: "5 business days" },
                  { label: "Infrastructure issue", time: "3 business days" },
                  { label: "Emergency",            time: "Same day" },
                ].map(({ label, time }) => (
                  <div key={label} className="flex items-center justify-between gap-3">
                    <span className="text-xs text-slate-500">{label}</span>
                    <span className="text-xs font-bold text-slate-700 bg-slate-100 rounded-full px-2.5 py-0.5 whitespace-nowrap">{time}</span>
                  </div>
                ))}
              </div>
            </div>

          </aside>

          {/* ── FORM CARD ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

              <div className="px-7 py-5 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5">Your Submission</p>
                  <h2 className="text-base font-bold text-slate-900">Submit Your Feedback</h2>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-full px-3 py-1.5">
                  <Icon path="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" className="w-3 h-3" />
                  <span className="font-semibold">Secure</span>
                </div>
              </div>

              <div className="px-7 py-7">

                {/* Error */}
                {error && (
                  <div className="mb-6 flex items-start gap-3 rounded-xl bg-red-50 border border-red-100 px-4 py-3.5">
                    <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon path="M6 18L18 6M6 6l12 12" className="w-3 h-3 text-red-500" />
                    </div>
                    <p className="text-sm text-red-700 font-medium">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-7">

                  {/* ── CATEGORY ── */}
                  <fieldset>
                    <legend className="text-sm font-bold text-slate-800 mb-3">
                      Category
                      <span className="ml-1.5 text-slate-400 font-normal text-xs">— select the most relevant</span>
                    </legend>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {CATEGORIES.map(({ id, icon }) => {
                        const active = form.category === id;
                        return (
                          <button key={id} type="button" onClick={() => update("category", id)}
                            className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs font-semibold text-left transition-all duration-150 ${
                              active
                                ? "bg-slate-900 text-white border-slate-900 shadow-md"
                                : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:shadow-sm"
                            }`}>
                            <svg className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${active ? "text-blue-300" : "text-slate-400 group-hover:text-slate-600"}`}
                              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                            </svg>
                            {id}
                          </button>
                        );
                      })}
                    </div>
                  </fieldset>

                  {/* ── SUBJECT ── */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-1.5">Subject *</label>
                    <input
                      type="text"
                      placeholder="Brief summary of your feedback"
                      value={form.subject}
                      onChange={(e) => update("subject", e.target.value)}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused("")}
                      className={`${inputBase} ${inputIdle} ${focused === "subject" ? "shadow-sm" : ""}`}
                    />
                  </div>

                  {/* ── STAR RATING ── */}
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2.5">
                      Overall Rating
                      <span className="ml-1.5 text-slate-400 font-normal text-xs">— optional</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button key={star} type="button"
                          onClick={() => update("rating", star)}
                          onMouseEnter={() => setHover(star)}
                          onMouseLeave={() => setHover(0)}
                          className="focus:outline-none transition-transform hover:scale-110 active:scale-95">
                          <StarIcon filled={star <= (hover || form.rating)} />
                        </button>
                      ))}
                      {(hover || form.rating) > 0 && (
                        <span className="ml-2 text-sm font-bold text-slate-700 transition-all">
                          {RATING_LABELS[hover || form.rating]}
                        </span>
                      )}
                      {form.rating > 0 && (
                        <button type="button" onClick={() => update("rating", 0)}
                          className="ml-1 text-xs text-slate-400 hover:text-slate-600 transition-colors underline">
                          Clear
                        </button>
                      )}
                    </div>
                  </div>

                  {/* ── MESSAGE ── */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-sm font-bold text-slate-800">Message *</label>
                      <span className={`text-xs font-semibold ${form.message.length > 500 ? "text-amber-500" : "text-slate-300"}`}>
                        {form.message.length} / 1000
                      </span>
                    </div>
                    <textarea
                      rows={6}
                      placeholder="Describe your experience in detail. Include specific dates, locations, or staff members where relevant. The more context you provide, the better we can respond."
                      value={form.message}
                      maxLength={1000}
                      onChange={(e) => update("message", e.target.value)}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      className={`${inputBase} ${inputIdle} resize-none ${focused === "message" ? "shadow-sm" : ""}`}
                    />
                    {form.message.length > 500 && (
                      <p className="text-xs text-amber-600 mt-1 font-medium">
                        Approaching character limit — keep your message concise.
                      </p>
                    )}
                  </div>

                  {/* ── DIVIDER ── */}
                  <div className="border-t border-slate-100" />

                  {/* ── SUBMIT ── */}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <button type="submit"
                      className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2.5 py-3 px-6 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-700 active:scale-98 transition-all duration-150 shadow-sm">
                      <Icon path="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" className="w-4 h-4" />
                      Submit Feedback
                    </button>
                    <p className="text-xs text-slate-400 text-center sm:text-left leading-relaxed">
                      Handled under the{" "}
                      <Link to="/privacy" className="text-blue-600 hover:underline font-medium">
                        Australian Privacy Principles
                      </Link>
                    </p>
                  </div>

                </form>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
