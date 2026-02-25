import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        {/* Back to home */}
        <Link
          to="/"
          className="inline-block mb-4 text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>

        {/* Card */}
        <div className="rounded-3xl bg-white shadow-xl border border-gray-100 p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
          <p className="text-gray-500 mt-2 mb-6">
            Enter your details to access your account.
          </p>

          {/* Tabs (Sign in active, Sign up link) */}
          <div className="mb-6 grid grid-cols-2 rounded-2xl bg-gray-100 p-1">
            <div className="rounded-xl bg-white py-2 text-center text-sm font-semibold text-gray-900 shadow-sm">
              Sign in
            </div>
            <Link
              to="/signup"
              className="rounded-xl py-2 text-center text-sm font-semibold text-gray-600 hover:text-gray-900"
            >
              Sign up
            </Link>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <Field label="Email" type="email" placeholder="admin@citylink.gov" />
            <Field label="Password" type="password" placeholder="Enter password" />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600">
                <input type="checkbox" className="h-4 w-4" />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-blue-600 font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-900 text-white py-3 font-semibold hover:bg-slate-800 transition"
            >
              Sign in
            </button>
          </form>

          {/* Footer text */}
          <p className="mt-6 text-sm text-gray-600">
            New here?{" "}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Create an account
            </Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-8">
            © {new Date().getFullYear()} CityLink Initiatives
          </p>
        </div>
      </div>
    </main>
  );
}

function Field({ label, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-800 mb-2">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-gray-900 placeholder:text-gray-400
                   focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
      />
    </div>
  );
}