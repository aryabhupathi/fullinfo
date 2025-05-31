import React from "react";
import { Link, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { FaSuitcase } from "react-icons/fa6";
import { FaBus } from "react-icons/fa6";
import { RiFileEditFill } from "react-icons/ri";
import { FaStar } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
const Layout = () => {
  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-between py-1 bg-light text-dark small">
          <div>Technical Help - +91-8792462607</div>
          <div>login</div>
        </div>
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
        <div className="container">
          <span className="navbar-brand fw-bold">Admin SBIC-UP</span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">
                  <FaHome /> Dashboard
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <MdAdd /> Admission
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admission/new">
                      New Admission
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admission/list">
                      Admission List
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <FaSuitcase /> Fee Payment
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/fee_payment/pay">
                      Pay Fees
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/fee_payment/history">
                      Payment History
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <FaBus /> Transport
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/transport/manage">
                      Manage Transport
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/transport/users">
                      Transport Users
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/exam">
                  <RiFileEditFill /> Exam
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/activity">
                  <FaStar /> Activity
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <IoSettingsOutline /> Admin
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/admin/users">
                      User Management
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/admin/settings">
                      Settings
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  <FaUser /> Account
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/account/profile">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/account/logout">
                      Logout
                    </Link>
                  </li>
                </ul>
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
