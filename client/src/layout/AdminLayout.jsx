import { Outlet, useNavigate, Link } from "react-router-dom";

function getUser() {
  try {
    const u = JSON.parse(localStorage.getItem("citylink_user"));
    return u && typeof u === "object" ? u : null;
  } catch {
    return null;
  }
}

function RoleBadge({ role }) {
  const label = role === "admin" ? "Admin" : role === "staff" ? "Staff" : "User";
  const cls =
    role === "admin"
      ? "bg-blue-50 text-blue-700 border-blue-100"
      : role === "staff"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : "bg-slate-50 text-slate-700 border-slate-200";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${cls}`}
    >
      {label}
    </span>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const user = getUser();

  function handleLogout() {
    localStorage.removeItem("citylink_user");
    navigate("/login", { replace: true });
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Top bar (no frame) */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">
              CL
            </div>
            <div>
              <div className="font-semibold leading-tight">CityLink Admin Portal</div>
              <div className="text-xs text-slate-500 leading-tight">
                Manage events, users, and feedback
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RoleBadge role={user?.role} />
            <div className="hidden sm:block text-right">
              <div className="text-sm font-semibold text-slate-900">
                {user?.email || "Admin User"}
              </div>
              <div className="text-xs text-slate-500">Signed in</div>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Page content (no sidebar, no border frame) */}
      <main className="flex-1 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white font-bold">
                  CL
                </div>
                <div>
                  <div className="font-semibold">CityLink Initiatives</div>
                  <div className="text-xs text-slate-500">Smart Community Portal</div>
                </div>
              </div>
              <p className="mt-3 text-sm text-slate-600 max-w-sm">
                Connecting our community with accessible digital services.
              </p>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-900">Quick Links</div>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li><Link className="hover:underline" to="/services">Services</Link></li>
                <li><Link className="hover:underline" to="/events">Events</Link></li>
                <li><Link className="hover:underline" to="/faq">FAQ</Link></li>
                <li><Link className="hover:underline" to="/feedback">Feedback</Link></li>
              </ul>
            </div>

            <div>
              <div className="text-sm font-semibold text-slate-900">Contact</div>
              <div className="mt-3 space-y-2 text-sm text-slate-600">
                <div>123 Council Street, CityLink, CL 12345</div>
                <div>(123) 456-7890</div>
                <div>info@citylink.gov</div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <div>© {new Date().getFullYear()} CityLink Initiatives</div>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
              <Link to="/terms" className="hover:underline">Terms</Link>
              <Link to="/" className="hover:underline">Back to website</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}