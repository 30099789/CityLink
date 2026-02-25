import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-block mb-4 text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Home
        </Link>

        <div className="rounded-3xl bg-white shadow-xl border border-gray-100 p-8">
          <h1 className="text-3xl font-bold text-gray-900">Create account</h1>
          <p className="text-gray-500 mt-2 mb-6">
            Sign up to access community services.
          </p>

          {/* Tabs */}
          <div className="mb-6 grid grid-cols-2 rounded-2xl bg-gray-100 p-1">
            <Link
              to="/login"
              className="rounded-xl py-2 text-center text-sm font-semibold text-gray-600 hover:text-gray-900"
            >
              Sign in
            </Link>
            <div className="rounded-xl bg-white py-2 text-center text-sm font-semibold text-gray-900 shadow-sm">
              Sign up
            </div>
          </div>

          <form className="space-y-4">
            <Field label="First name" placeholder="Kate" />
            <Field label="Last name" placeholder="Odabas" />
            <Field label="Email" type="email" placeholder="kate@email.com" />
            <Field label="Password" type="password" placeholder="Create password" />
            <Field label="Confirm password" type="password" placeholder="Repeat password" />

            {/* NEW: Privacy + Terms checkbox */}
            <div className="flex items-start gap-2 text-sm text-gray-600">
              <input
                id="agree"
                type="checkbox"
                required
                className="mt-1 h-4 w-4"
              />
              <label htmlFor="agree" className="leading-5">
                I agree to the{" "}
                <Link
                  to="/privacy"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Privacy Policy
                </Link>{" "}
                and{" "}
                <Link
                  to="/terms"
                  className="text-blue-600 font-medium hover:underline"
                >
                  Terms of Service
                </Link>
                .
              </label>
            </div>

            <button
              type="submit"
              className="w-full rounded-2xl bg-slate-900 text-white py-3 font-semibold hover:bg-slate-800 transition"
            >
              Create account
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 font-medium hover:underline">
              Sign in
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