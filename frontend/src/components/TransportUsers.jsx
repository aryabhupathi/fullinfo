import React from "react";
import { Link } from "react-router-dom";
const TransportUsers = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Transport Users</h2>
      <div className="row justify-content-center">
        <div className="col-md-2">
          <select className="form-select">
            <option value="2020-2021">2020-2021</option>
            <option value="2021-2022">2021-2022</option>
            <option value="2022-2023">2022-2023</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select">
            <option value="all">All Class</option>
            <option value="class1">Class 1</option>
            <option value="class2">Class 2</option>
            <option value="class3">Class 3</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select">
            <option value="all">All Section</option>
            <option value="sectionA">Section A</option>
            <option value="sectionB">Section B</option>
            <option value="sectionC">Section C</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select">
            <option value="all">All Root</option>
            <option value="root1">Root 1</option>
            <option value="root2">Root 2</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="button" className="btn btn-primary w-100">
            <i className="bi bi-search"></i> Search
          </button>
        </div>
      </div>
      <div className="text-center mt-3 text-info">Search Results : 1</div>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>#Id</th>
            <th>Name</th>
            <th>Total Amount</th>
            <th>For Months</th>
            <th>Father</th>
            <th>Mobile</th>
            <th>Purpose</th>
            <th>Class</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>463</td>
            <td>Ranveer Kumar</td>
            <td>Rs. 500</td>
            <td>2 - Months</td>
            <td>Siyaram</td>
            <td>8792462607</td>
            <td>Transport Fee</td>
            <td>PLAY GROUP</td>
            <td>2020-03-23 09:34:11</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Total Collection :</td>
            <td>Rs. 500</td>
            <td colSpan="6"></td>
          </tr>
        </tfoot>
      </table>
      <nav aria-label="Page navigation">
        <ul className="pagination justify-content-center mt-3">
          <li className="page-item">
            <Link className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </Link>
          </li>
          <li className="page-item active">
            <Link className="page-link" href="#">
              1
            </Link>
          </li>
          <li className="page-item">
            <Link className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default TransportUsers;
