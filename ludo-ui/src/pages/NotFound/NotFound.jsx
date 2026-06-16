import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-8xl font-black">404</h1>

      <p>Page not found.</p>

      <Link
        to="/"
        className="rounded-lg bg-yellow-400 px-6 py-3 font-semibold text-black"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFound;