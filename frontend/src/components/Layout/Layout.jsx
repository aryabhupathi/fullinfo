import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaHome,
  FaSuitcase,
  FaBus,
  FaStar,
  FaUser,
  FaBars,
} from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { RiFileEditFill } from "react-icons/ri";
import { IoSettingsOutline } from "react-icons/io5";
import {
  Navbar,
  Nav,
  Offcanvas,
  Accordion,
  Dropdown,
  Button as BsButton,
} from "react-bootstrap";
const NavLink = ({ to, icon: Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Nav.Link as={Link} to={to} className={isActive ? "active" : ""}>
      <Icon /> <span>{label}</span>
    </Nav.Link>
  );
};
const TopNavDropdown = ({ icon: Icon, label, items}) => {
  const location = useLocation();
  const isActive = items.some((item) => location.pathname === item.to);
  return (
    <Dropdown>
      <Dropdown.Toggle
        as={Nav.Link}
        className={`d-flex align-items-center gap-1 fw-bold ${
          isActive ? "active" : ""
        }`}
        style={{ cursor: "pointer" }}
      >
        <Icon /> <span>{label}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={`border-0 shadow`}
        popperConfig={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [0, 10],
              },
            },
          ],
        }}
      >
        {items.map((item, i) => (
          <Dropdown.Item
            key={i}
            as={Link}
            to={item.to}
            className={` ${
              location.pathname === item.to ? "fw-bold" : ""
            }`}
            onClick={item.onClick}
          >
            {item.label}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};
const SidebarAccordion = ({ icon: Icon, label, items, onClose }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const activeChild = items.some((item) => location.pathname === item.to);
  useEffect(() => {
    if (activeChild) setOpen(true);
  }, [location.pathname]);
  return (
    <Accordion defaultActiveKey={open ? "0" : ""}>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <Icon /> {label}
        </Accordion.Header>
        <Accordion.Body>
          {items.map((item, i) => (
            <Nav.Link
              key={i}
              as={Link}
              to={item.to}
              onClick={onClose}
              className={location.pathname === item.to ? "active" : ""}
            >
              {item.label}
            </Nav.Link>
          ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};
const AccountDropdown = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as={Nav.Link}
        className="d-flex align-items-center text-white p-0"
        style={{ width: "40px", height: "40px" }}
      >
        <FaUser size={20} />
      </Dropdown.Toggle>
      <Dropdown.Menu className="shadow border-0">
        <Dropdown.Item as={Link} to="/profile">
          Profile
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/" onClick={handleLogout}>
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
const Layout = () => {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "Guest";
  const [showSidebar, setShowSidebar] = useState(false);
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <div className="p-2 rounded shadow-sm bg-white d-flex justify-content-between">
        <small>
          Need help? Call <b>+91-6303460916</b>
        </small>
        <h5>
          👋 Welcome, <strong>{name}</strong>
        </h5>
      </div>
      <Navbar
        expand="lg"
        className="text-white shadow-sm px-3 py-2 top-navbar d-flex align-items-center justify-content-between"
      >
        <Navbar.Brand href="/dashboard" className="logo fw-bold">
          SBIC Panel
        </Navbar.Brand>
        <Nav className="d-none d-lg-flex flex-grow-1 justify-content-center gap-3">
          <NavLink to="/dashboard" icon={FaHome} label="Dashboard" />
          <TopNavDropdown
            icon={MdAdd}
            label="Admissions"
            items={[
              { label: "New Admission", to: "/admission/new" },
              { label: "Admission List", to: "/admission/list" },
            ]}
          />
          <TopNavDropdown
            icon={FaSuitcase}
            label="Fee"
            items={[
              { label: "Pay Fees", to: "/fee_payment/pay" },
              { label: "Fee History", to: "/fee_payment/history" },
            ]}
          />
          <TopNavDropdown
            icon={FaBus}
            label="Transport"
            items={[
              { label: "New Transport", to: "/transport/newTransport" },
              { label: "Transport Users", to: "/transport/users" },
            ]}
          />
          <NavLink to="/exam" icon={RiFileEditFill} label="Exam" />
          <NavLink to="/activity" icon={FaStar} label="Activity" />
          <TopNavDropdown
            icon={IoSettingsOutline}
            label="Admin"
            items={[
              { label: "User Management", to: "/admin/users" },
              { label: "Settings", to: "/admin/settings" },
            ]}
          />
        </Nav>
        <div
          className="d-flex align-items-center gap-3"
          style={{ border: "2px solid red" }}
        >
          <AccountDropdown />
          <BsButton
            variant="light"
            className="d-lg-none"
            onClick={() => setShowSidebar(true)}
          >
            <FaBars />
          </BsButton>
        </div>
      </Navbar>
      <Offcanvas
        show={showSidebar}
        onHide={() => setShowSidebar(false)}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Navigation</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link
              as={Link}
              to="/dashboard"
              onClick={() => setShowSidebar(false)}
            >
              <FaHome /> Dashboard
            </Nav.Link>
            <SidebarAccordion
              icon={MdAdd}
              label="Admissions"
              items={[
                { label: "New Admission", to: "/admission/new" },
                { label: "Admission List", to: "/admission/list" },
              ]}
              onClose={() => setShowSidebar(false)}
            />
            <SidebarAccordion
              icon={FaSuitcase}
              label="Fee"
              items={[
                { label: "Pay Fees", to: "/fee_payment/pay" },
                { label: "Fee History", to: "/fee_payment/history" },
              ]}
              onClose={() => setShowSidebar(false)}
            />
            <SidebarAccordion
              icon={FaBus}
              label="Transport"
              items={[
                { label: "New Transport", to: "/transport/newTransport" },
                { label: "Transport Users", to: "/transport/users" },
              ]}
              onClose={() => setShowSidebar(false)}
            />
            <Nav.Link
              as={Link}
              to="/exam"
              onClick={() => setShowSidebar(false)}
            >
              <RiFileEditFill /> Exam
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/activity"
              onClick={() => setShowSidebar(false)}
            >
              <FaStar /> Activity
            </Nav.Link>
            <SidebarAccordion
              icon={IoSettingsOutline}
              label="Admin"
              items={[
                { label: "User Management", to: "/admin/users" },
                { label: "Settings", to: "/admin/settings" },
              ]}
              onClose={() => setShowSidebar(false)}
            />
            <SidebarAccordion
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
              onClose={() => setShowSidebar(false)}
            />
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
      <div className="container-fluid my-4">
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
