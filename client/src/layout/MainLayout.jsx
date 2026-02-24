import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `px-3 py-2 rounded-md text-sm font-medium ${
    isActive ? "bg-white/15 text-white" : "text-white/90 hover:bg-white/10 hover:text-white"
  }`;

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="bg-slate-900">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="text-white font-semibold">CityLink</div>

            <nav className="flex items-center gap-1">
              <NavLink to="/" end className={linkClass}>
                Home
              </NavLink>
              <NavLink to="/announcements" className={linkClass}>
                Announcements
              </NavLink>
              <NavLink to="/events" className={linkClass}>
                Events
              </NavLink>
              <NavLink to="/services" className={linkClass}>
                Services
              </NavLink>
              <NavLink to="/service-booking" className={linkClass}>
                Booking
              </NavLink>
              <NavLink to="/feedback" className={linkClass}>
                Feedback
              </NavLink>
              <NavLink to="/profile" className={linkClass}>
                Profile
              </NavLink>
              <NavLink to="/contact" className={linkClass}>
                Contact
              </NavLink>
              <NavLink to="/login" className={linkClass}>
                Sign in
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-600">
          © {new Date().getFullYear()} CityLink Initiatives
        </div>
      </footer>
    </div>
  );
}