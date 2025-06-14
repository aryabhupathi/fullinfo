import React from "react";
import { Link, Outlet, useMatch, useNavigate } from "react-router-dom";
import { FaHome, FaSuitcase, FaBus, FaStar, FaUser } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
const NavLink = ({ to, icon: Icon, children }) => {
  const isActive = useMatch(to);
  return (
    <Link
      to={to}
      className={`nav-link d-flex align-items-center gap-1 ${
        isActive ? "fw-bold text-warning" : "text-white"
      }`}
      style={{
        transition: "all 0.2s ease",
      }}
    >
      <Icon />
      {children}
    </Link>
  );
};
const DropdownMenu = ({ items, bgColor = "#D2B0BD" }) => {
  return (
    <ul className="dropdown-menu" style={{ backgroundColor: bgColor }}>
      {items.map(({ label, to, onClick }, idx) => (
        <li key={idx}>
          <Link
            to={to}
            className="dropdown-item"
            style={{ transition: "background 0.2s ease" }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#c3a1b0")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = bgColor)}
            onClick={onClick}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};
const Layout = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name");
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="container">
      <div className="py-1 bg-light text-dark">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>Technical Help:</strong> +91-6303460916
          </div>
          <div>Welcome, {name || "Guest"}</div>
        </div>
      </div>
      <nav
        className="navbar navbar-expand-lg"
        style={{ backgroundColor: "#6B5B95" }}
      >
        <div className="container">
          <span className="navbar-brand fw-bold text-white fs-4">
            Admin SBIC-UP
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav d-flex align-items-center gap-1">
              <li className="nav-item">
                <NavLink to="/dashboard" icon={FaHome}>
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle text-white bg-transparent border-0"
                  data-bs-toggle="dropdown"
                >
                  <MdAdd /> Admission
                </button>
                <DropdownMenu
                  items={[
                    { label: "New Admission", to: "/admission/new" },
                    { label: "Admission List", to: "/admission/list" },
                  ]}
                />
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle text-white bg-transparent border-0"
                  data-bs-toggle="dropdown"
                >
                  <FaSuitcase /> Fee Payment
                </button>
                <DropdownMenu
                  items={[
                    { label: "Pay Fees", to: "/fee_payment/pay" },
                    { label: "Payment History", to: "/fee_payment/history" },
                  ]}
                />
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle text-white bg-transparent border-0"
                  data-bs-toggle="dropdown"
                >
                  <FaBus /> Transport
                </button>
                <DropdownMenu
                  items={[
                    { label: "Manage Transport", to: "/transport/manage" },
                    { label: "Transport Users", to: "/transport/users" },
                  ]}
                />
              </li>
              <li className="nav-item">
                <NavLink to="/exam" icon={RiFileEditFill}>
                  Exam
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/activity" icon={FaStar}>
                  Activity
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle text-white bg-transparent border-0"
                  data-bs-toggle="dropdown"
                >
                  <IoSettingsOutline /> Admin
                </button>
                <DropdownMenu
                  items={[
                    { label: "User Management", to: "/admin/users" },
                    { label: "Settings", to: "/admin/settings" },
                  ]}
                />
              </li>
              <li className="nav-item dropdown">
                <button
                  className="nav-link dropdown-toggle text-white bg-transparent border-0"
                  data-bs-toggle="dropdown"
                >
                  <FaUser /> Account
                </button>
                <DropdownMenu
                  items={[
                    { label: "Profile", to: "/profile" },
                    { label: "Logout", to: "/", onClick: handleLogout },
                  ]}
                />
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-3">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
