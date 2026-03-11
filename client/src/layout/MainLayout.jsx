import { NavLink, Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MainLayout() {
  const { user, logout } = useAuth();

  const navLink = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
      isActive
        ? "bg-blue-700 text-white"
        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
    }`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">

      {/* ── NAVBAR ── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-16 items-center justify-between gap-4">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
              <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center">
                <span className="text-white text-sm font-bold tracking-tight">CL</span>
              </div>
              <div className="leading-tight">
                <p className="text-sm font-bold text-slate-900">CityLink Initiatives</p>
                <p className="text-xs text-slate-400">Smart Community Portal</p>
              </div>
            </Link>

            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-0.5">
              <NavLink to="/"             end className={navLink}>Home</NavLink>
              <NavLink to="/services"         className={navLink}>Services</NavLink>
              <NavLink to="/events"           className={navLink}>Events</NavLink>
              <NavLink to="/faq"              className={navLink}>FAQ</NavLink>
              <NavLink to="/announcements"    className={navLink}>Announcements</NavLink>
              <NavLink to="/feedback"         className={navLink}>Feedback</NavLink>
              <NavLink to="/contact"          className={navLink}>Contact</NavLink>
            </nav>

            {/* Auth buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {user ? (
                <>
                  <NavLink to="/profile"
                    className="px-4 py-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors">
                    {user.name?.split(" ")[0] || "Profile"}
                  </NavLink>
                  {(user.role === "admin" || user.role === "staff") && (
                    <Link to="/admin"
                      className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 transition-colors">
                      Admin
                    </Link>
                  )}
                  <button onClick={logout}
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors">
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login"
                    className="px-4 py-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors">
                    Log In
                  </Link>
                  <Link to="/signup"
                    className="px-4 py-2 rounded-lg text-sm font-bold text-white bg-blue-700 hover:bg-blue-800 transition-colors">
                    Sign Up
                  </Link>
                </>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* ── PAGE CONTENT ── */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* ── FOOTER ── */}
      <footer className="bg-white border-t border-slate-200 mt-auto">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">CL</span>
                </div>
                <div className="leading-tight">
                  <p className="text-sm font-bold text-blue-800">CityLink Initiatives</p>
                  <p className="text-xs text-slate-400">Smart Community Portal</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">
                Connecting our community with accessible digital services.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <p className="text-sm font-bold text-slate-900 mb-4">Quick Links</p>
              <div className="space-y-2.5">
                {[
                  { label: "Services",      to: "/services" },
                  { label: "Events",        to: "/events" },
                  { label: "FAQ",           to: "/faq" },
                  { label: "Feedback",      to: "/feedback" },
                ].map(({ label, to }) => (
                  <Link key={to} to={to} className="block text-sm text-slate-500 hover:text-blue-700 transition-colors">
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Legal */}
            <div>
              <p className="text-sm font-bold text-slate-900 mb-4">Legal</p>
              <div className="space-y-2.5">
                <Link to="/accessibility" className="block text-sm text-slate-500 hover:text-blue-700 transition-colors">Accessibility Statement</Link>
                <Link to="/privacy"       className="block text-sm text-slate-500 hover:text-blue-700 transition-colors">Privacy Policy</Link>
                <Link to="/terms"         className="block text-sm text-slate-500 hover:text-blue-700 transition-colors">Terms of Service</Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <p className="text-sm font-bold text-slate-900 mb-4">Contact Us</p>
              <div className="space-y-3">
                <div className="flex items-start gap-2.5">
                  <svg className="w-4 h-4 text-blue-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  <p className="text-sm text-slate-500 leading-snug">123 Council Street<br/>CityLink, CL 12345</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-blue-700 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <a href="tel:+611234567890" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">(123) 456-7890</a>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg className="w-4 h-4 text-blue-700 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                  </svg>
                  <a href="mailto:info@citylink.gov" className="text-sm text-slate-500 hover:text-blue-700 transition-colors">info@citylink.gov</a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-200">
          <div className="mx-auto max-w-6xl px-4 py-4 text-center">
            <p className="text-xs text-slate-400">
              © {new Date().getFullYear()} CityLink Initiatives. All rights reserved. WCAG 2.1 AA Compliant.
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}
