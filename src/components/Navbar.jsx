import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-red-600 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link to="/" className="text-2xl font-bold">Media Summit</Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          <Link to="/register" className="hover:text-blue-200">Register</Link>
          <Link to="/scan" className="hover:text-blue-200">Scan</Link>
        </div>
      </div>
    </nav>
  );
}
