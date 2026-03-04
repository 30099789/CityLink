import { Link, useNavigate } from "react-router-dom";

function safeReadArray(key) {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
}

function KpiCard({ icon, value, label, iconClass }) {
  const Icon = icon;
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className={`h-10 w-10 ${iconClass}`}>
          <Icon className="h-10 w-10" />
        </div>
        <IconArrowUpRight className="h-5 w-5 text-slate-400" />
      </div>
      <div className="mt-5">
        <div className="text-3xl font-semibold text-slate-900">{value}</div>
        <div className="mt-1 text-sm text-slate-500">{label}</div>
      </div>
    </Card>
  );
}

function QuickActionCard({ to, icon, label }) {
  const Icon = icon;
  return (
    <Link to={to} className="block">
      <Card className="p-6 hover:shadow-md hover:-translate-y-0.5 transition">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="h-12 w-12 text-blue-700">
            <Icon className="h-12 w-12" />
          </div>
          <div className="text-sm font-medium text-slate-800">{label}</div>
        </div>
      </Card>
    </Link>
  );
}

function ManagementRow({ to, icon, label, rightText }) {
  const Icon = icon;
  return (
    <Link to={to} className="block">
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 text-blue-700">
            <Icon className="h-6 w-6" />
          </div>
          <div className="text-sm font-medium text-slate-800">{label}</div>
        </div>
        {rightText ? <div className="text-sm text-slate-500">{rightText}</div> : null}
      </div>
    </Link>
  );
}

/* Inline icons */
function IconCalendar(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 2v3M16 2v3" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 9h18" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 5h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
    </svg>
  );
}
function IconUsers(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconChat(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z" />
    </svg>
  );
}
function IconBell(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 8a6 6 0 0 1 12 0c0 7 3 7 3 7H3s3 0 3-7Z" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10 19a2 2 0 0 0 4 0" />
    </svg>
  );
}
function IconArrowUpRight(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M10 7h7v7" />
    </svg>
  );
}
function IconDownload(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 3v10" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 11l4 4 4-4" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 21h16" />
    </svg>
  );
}
function IconUpload(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 21V11" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M8 14l4-4 4 4" />
      <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 3h16" />
    </svg>
  );
}

function getUser() {
  try {
    const u = JSON.parse(localStorage.getItem("citylink_user"));
    return u && typeof u === "object" ? u : null;
  } catch {
    return null;
  }
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const user = getUser();

  const events = safeReadArray("citylink_events");
  const users = safeReadArray("citylink_users");
  const feedback = safeReadArray("citylink_feedback");
  const announcements = safeReadArray("citylink_announcements");
  const bookings = safeReadArray("citylink_bookings");

  const activeBookings = bookings.filter((b) => b && b.status === "Confirmed").length;
  const pendingFeedback = feedback.filter((f) => f && f.status === "New").length;
  const publishedAnnouncements = announcements.filter((a) => a && a.status === "Published").length;

  const recentActivity = [
    { message: "New booking for Community Clean-Up Day", time: "5 minutes ago" },
    { message: "New feedback submission received", time: "1 hour ago" },
    { message: "Event capacity updated for Town Hall Meeting", time: "2 hours ago" },
  ];

  function handleLogout() {
    localStorage.removeItem("citylink_user");
    navigate("/", { replace: true });
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Admin Top Bar */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div>
            <div className="text-sm text-slate-500">CityLink Initiatives</div>
            <div className="text-xl font-semibold text-slate-900">Admin Portal</div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:block text-right">
              <div className="text-sm font-semibold text-slate-900">
                {user?.email || "Admin User"}
              </div>
              <div className="text-xs text-slate-500">Administrator</div>
            </div>

            <button
              onClick={handleLogout}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900">
            Admin Portal
          </h1>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Manage events, bookings, and community engagement
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <KpiCard icon={IconCalendar} value={events.length} label="Total Events" iconClass="text-blue-800" />
          <KpiCard icon={IconUsers} value={activeBookings} label="Active Bookings" iconClass="text-emerald-700" />
          <KpiCard icon={IconChat} value={pendingFeedback} label="Pending Feedback" iconClass="text-orange-500" />
          <KpiCard icon={IconBell} value={publishedAnnouncements} label="Announcements" iconClass="text-emerald-600" />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Quick Actions</h2>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
              <QuickActionCard to="/admin/events" icon={IconCalendar} label="Create Event" />
              <QuickActionCard to="/announcements" icon={IconBell} label="Post Announcement" />
              <QuickActionCard to="/admin" icon={IconDownload} label="Export XML" />
              <QuickActionCard to="/admin" icon={IconUpload} label="Import XML" />
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-slate-900">Management</h2>

            <div className="mt-6 space-y-3">
              <ManagementRow to="/admin/events" icon={IconCalendar} label="Manage Events" rightText={`${events.length} events`} />
              <ManagementRow to="/admin/users" icon={IconUsers} label="Manage Users" rightText={`${users.length} users`} />
              <ManagementRow to="/admin/feedback" icon={IconChat} label="Manage Feedback" rightText={`${feedback.length} submissions`} />
              <ManagementRow to="/announcements" icon={IconBell} label="Manage Announcements" rightText={`${announcements.length} announcements`} />
            </div>
          </section>
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-slate-900">Recent Activity</h2>

          <Card className="mt-6 p-6">
            <div className="space-y-6">
              {recentActivity.map((a, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 border-b border-slate-100 pb-6 last:border-b-0 last:pb-0"
                >
                  <div className="mt-2 h-2 w-2 rounded-full bg-blue-800" />
                  <div className="flex-1">
                    <div className="text-slate-800">{a.message}</div>
                    <div className="mt-1 text-sm text-slate-500">{a.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}