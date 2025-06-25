import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { navLinks } from "../utils/constants";
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-xl font-bold text-blue-400 hover:text-blue-300"
        >
          User Management
        </Link>

        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="hover:text-blue-300 transition duration-200"
            >
              {link.label}
            </Link>
          ))}

          {/* Account dropdown */}
          <div className="relative group">
            <button className="hover:text-blue-300 focus:outline-none">
              Account ▾
            </button>
            <div className="absolute right-0 hidden group-hover:block bg-white text-black mt-2 py-2 w-40 rounded shadow-lg z-10">
              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
