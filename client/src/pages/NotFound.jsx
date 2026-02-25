import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
        <p className="text-gray-500 mb-6">
          The page you are looking for does not exist.
        </p>
        <Link to="/login" className="text-blue-600 font-medium hover:underline">
          Go back to Login
        </Link>
      </div>
    </main>
  );
}