import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedName = localStorage.getItem("username");
    if (token && storedName) {
      setIsLoggedIn(true);
      setUsername(storedName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setMobileMenuOpen(false);
    navigate("/login");
  };

  const toggleMobilleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Header / Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom py-3 px-4">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img
              src="https://res.cloudinary.com/dfeqksqvh/image/upload/v1777574904/No_Locals_1_lgu0n2.png"
              height="40"
              alt="Logo"
            />
          </Link>

          {/* Bootstrap Hamburger Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={`collapse navbar-collapse ${mobileMenuOpen ? "show" : ""}`}
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center">
              <li className="nav-item">
                <Link className="nav-link px-3" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link px-3" to="/businesses">
                  Businesses
                </Link>
              </li>

              {isLoggedIn ? (
                <li className="nav-item d-flex align-items-center gap-3">
                  <span className="small">
                    Logged in as: <strong>{username}</strong>
                  </span>
                  <button
                    onClick={handleLogout}
                    className="btn btn-dark btn-sm"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link className="nav-link px-3" to="/register">
                    Register
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-grow-1 container my-5">{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white py-4 mt-auto">
        <div className="container-fluid px-5">
          {/* Main footer content */}
          <div className="d-flex align-items-center justify-content-between py-2">
            {/* Left side - Logo and tagline */}
            <div>
              <img
                src="https://res.cloudinary.com/dfeqksqvh/image/upload/v1777574904/No_Locals_1_lgu0n2.png"
                height="25"
                className="mb-4 invert-logo "
                style={{ filter: "invert(1)" }}
                alt="Logo
              />
              <p className="text-secondary small mb-0">
                Exposing discriminatory practices in hospitality.
              </p>
            </div>

            {/* Right side - Platform and Community */}
            <div className="d-flex gap-5">
              {/* Platform */}
              <div>
                <h6 className="small mb-2">Platform</h6>
                <ul className="list-unstyled text-secondary small">
                  <li>
                    <Link
                      to="/businesses"
                      className="text-decoration-none text-secondary"
                    >
                      Find Businesses
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/report"
                      className="text-decoration-none text-secondary"
                    >
                      Report an Incident
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Community */}
              <div>
                <h6 className="small mb-2">Community</h6>
                <ul className="list-unstyled text-secondary small">
                  <li>
                    <Link
                      to="/resources"
                      className="text-decoration-none text-secondary"
                    >
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/privacy"
                      className="text-decoration-none text-secondary"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer divider and copyright */}
          <div className="border-top border-secondary pt-2 text-center">
            <p className="text-secondary small mb-0">
              &copy; 2026 No Locals. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
