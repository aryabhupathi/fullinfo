import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaSuitcase,
  FaBus,
  FaStar,
  FaUser,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
const NavLink = ({ to, icon: Icon, label }) => {
  const isActive = window.location.pathname === to;
  return (
    <Link
      to={to}
      className={`d-flex align-items-center gap-2 px-3 py-2 mb-2 nav-item rounded ${
        isActive ? "active-nav" : ""
      }`}
      style={{ transition: "0.3s", textDecoration: "none", color: "inherit" }}
    >
      <Icon />
      <span>{label}</span>
    </Link>
  );
};
const AccordionNav = ({ icon: Icon, label, items }) => {
  const [open, setOpen] = useState(false);
  const activeChild = items.some(
    (item) => window.location.pathname === item.to
  );
  return (
    <div className="accordion-nav mb-2">
      <button
        onClick={() => setOpen(!open)}
        className={`w-100 d-flex justify-content-between align-items-center px-3 py-2 rounded border-0 bg-transparent text-white ${
          activeChild ? "active-nav" : ""
        }`}
        style={{ fontSize: "0.95rem", textAlign: "left" }}
        aria-expanded={open}
      >
        <span className="d-flex align-items-center gap-2">
          <Icon size={18} />
          {label}
        </span>
        {open ? <FaChevronDown size={14} /> : <FaChevronRight size={14} />}
      </button>
      <div
        className="sub-nav overflow-hidden"
        style={{
          maxHeight: open ? `${items.length * 40}px` : "0px",
          transition: "max-height 0.4s ease",
        }}
      >
        {items.map((item, i) => {
          const isActive = window.location.pathname === item.to;
          return (
            <Link
              key={i}
              to={item.to}
              onClick={item.onClick}
              className={`d-flex align-items-center gap-2 px-4 py-2 mb-1 nav-item rounded small ${
                isActive ? "active-sublink" : ""
              }`}
              style={{
                textDecoration: "none",
                transition: "0.3s",
                color: "white ",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
const Layout = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Guest";
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, []);
  return (
    <div className="d-flex">
      <div className={`sidebar glassy p-4 rounded-right`}>
        <h4 className="text-warning fw-bold mb-4">SBIC Panel</h4>
        <NavLink to="/dashboard" icon={FaHome} label="Dashboard" />
        <AccordionNav
          icon={MdAdd}
          label="Admissions"
          items={[
            { label: "New Admission", to: "/admission/new" },
            { label: "Admission List", to: "/admission/list" },
          ]}
        />
        <AccordionNav
          icon={FaSuitcase}
          label="Fee"
          items={[
            { label: "Pay Fees", to: "/fee_payment/pay" },
            { label: "Fee History", to: "/fee_payment/history" },
          ]}
        />
        <AccordionNav
          icon={FaBus}
          label="Transport"
          items={[
            { label: "New Transport", to: "/transport/newTransport" },
            { label: "Transport Users", to: "/transport/users" },
          ]}
        />
        <NavLink to="/exam" icon={RiFileEditFill} label="Exam" />
        <NavLink to="/activity" icon={FaStar} label="Activity" />
        <AccordionNav
          icon={IoSettingsOutline}
          label="Admin"
          items={[
            { label: "User Management", to: "/admin/users" },
            { label: "Settings", to: "/admin/settings" },
          ]}
        />
        <AccordionNav
          icon={FaUser}
          label="Account"
          items={[
            { label: "Profile", to: "/profile" },
            {
              label: "Logout",
              to: "/",
              onClick: handleLogout,
            },
          ]}
        />
        <div className="text-center mt-4">
          <button
            className="btn btn-sm btn-outline-light"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
      <div
        className={`content-area flex-grow-1 p-4 ${fadeIn ? "fade-in" : ""}`}
      >
        <div className="bg-white rounded shadow p-3 mb-3">
          <h5 className="mb-0">
            👋 Welcome, <strong>{name}</strong>
          </h5>
          <small>
            Need help? Call <b>+91-6303460916</b>
          </small>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
