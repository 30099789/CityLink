import { Link } from "react-router-dom";

export default function Login() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-10">
        
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
          Sign In
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Access your Smart Community Portal account
        </p>

        <form className="space-y-5">

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Sign In
          </button>

        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </Link>
        </p>

      </div>

    </main>
  );
}