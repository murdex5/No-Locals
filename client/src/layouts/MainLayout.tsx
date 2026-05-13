import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();

  // Initialize state directly from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return !!token;
  });

  const [username] = useState(() => localStorage.getItem("username") || "");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header / Navbar */}
      <nav className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src="https://res.cloudinary.com/dfeqksqvh/image/upload/v1777574904/No_Locals_1_lgu0n2.png"
              height="40"
              alt="Logo"
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/about"
              className="text-gray-700 hover:text-black font-medium transition"
            >
              About
            </Link>
            <Link
              to="/businesses"
              className="text-gray-700 hover:text-black font-medium transition"
            >
              Businesses
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Logged in as: <strong>{username}</strong>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-black text-white text-sm font-semibold rounded hover:bg-gray-800 transition"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/register"
                className="text-gray-700 hover:text-black font-medium transition"
              >
                Register
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col gap-1.5 p-2 hover:bg-gray-100 rounded"
          >
            <span
              className={`w-6 h-0.5 bg-black transition-all ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black transition-all ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-black transition-all ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-3">
              <Link
                to="/about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
              >
                About
              </Link>
              <Link
                to="/businesses"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
              >
                Businesses
              </Link>

              {isLoggedIn ? (
                <>
                  <div className="px-4 py-2 text-sm text-gray-600">
                    Logged in as: <strong>{username}</strong>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="px-4 py-2 bg-black text-white text-sm font-semibold rounded hover:bg-gray-800 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition"
                >
                  Register
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main footer content */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1 pb-8">
            {/* Left side - Logo and tagline */}
            <div>
              <Link to="/" className="flex-shrink-0">
                <img
                  src="https://res.cloudinary.com/dfeqksqvh/image/upload/v1777574904/No_Locals_1_lgu0n2.png"
                  height="25"
                  className="h-6 w-auto mb-4 invert"
                  alt="Logo"
                />
              </Link>
              <p className="text-gray-400 text-sm">
                Exposing discriminatory practices in hospitality.
              </p>
            </div>

            {/* Center - Platform Links */}
            <div>
              <h6 className="text-sm font-semibold mb-3">Platform</h6>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/businesses"
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    Find Businesses
                  </Link>
                </li>
                <li>
                  <Link
                    to="/report"
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    Report an Incident
                  </Link>
                </li>
              </ul>
            </div>

            {/* Right - Community Links */}
            <div>
              <h6 className="text-sm font-semibold mb-3">Community</h6>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="https://github.com/murdex5/No-Locals/discussions/categories/announcements"
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-gray-400 hover:text-white text-sm transition"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer divider and copyright */}
          <div className="border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm text-center">
              &copy; 2026 No Locals. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
