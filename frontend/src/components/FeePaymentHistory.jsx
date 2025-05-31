import React from "react";
const FeePaymentHistory = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Finance Report</h2>
      <div className="row justify-content-center">
        <div className="col-md-3">
          <select className="form-select">
            <option value="2020-2021">2020-2021</option>
            <option value="2021-2022">2021-2022</option>
            <option value="2022-2023">2022-2023</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select">
            <option value="all">All Class</option>
            <option value="class1">Class 1</option>
            <option value="class2">Class 2</option>
            <option value="class3">Class 3</option>
          </select>
        </div>
        <div className="col-md-3">
          <select className="form-select">
            <option value="all">All Section</option>
            <option value="sectionA">Section A</option>
            <option value="sectionB">Section B</option>
            <option value="sectionC">Section C</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="button" className="btn btn-primary w-100">
            Search
          </button>
        </div>
      </div>
      <div className="text-center mt-3 text-info">Total Records : 0</div>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Mobile No</th>
            <th>Father Name</th>
            <th>Total Payment</th>
            <th>Pay Type</th>
            <th>Pay Date</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>9876543210</td>
            <td>Mr. John Smith</td>
            <td>₹ 5000</td>
            <td>Cash</td>
            <td>2023-04-15</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>1234567890</td>
            <td>Mr. Jane Johnson</td>
            <td>₹ 4500</td>
            <td>Online</td>
            <td>2023-04-16</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="5" className="text-end">
              Total
            </td>
            <td>₹ 9500</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default FeePaymentHistory;
