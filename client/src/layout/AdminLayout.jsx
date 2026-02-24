import { NavLink, Outlet } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `block rounded-md px-3 py-2 text-sm ${
    isActive
      ? "bg-slate-900 text-white"
      : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
  }`;

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="font-semibold">CityLink Admin</div>
          <div className="text-sm text-slate-600">Prototype mode</div>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 py-6 md:grid-cols-[240px_1fr]">
        <aside className="rounded-xl border bg-white p-3">
          <div className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Admin Menu
          </div>
          <nav className="space-y-1">
            <NavLink to="/admin" end className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/admin/events" className={linkClass}>
              Manage Events
            </NavLink>
            <NavLink to="/admin/users" className={linkClass}>
              Manage Users
            </NavLink>
            <NavLink to="/admin/feedback" className={linkClass}>
              Manage Feedback
            </NavLink>
          </nav>

          <div className="mt-4 border-t pt-3">
            <NavLink to="/" className={() => "block rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-100"}>
              Back to website
            </NavLink>
          </div>
        </aside>

        <main className="rounded-xl border bg-white p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}