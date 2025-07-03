import React, { useState } from "react";
const FeePaymentHistory = () => {
  const [feeData, setFeeData] = useState([]);
  const [formData, setFormData] = useState({
    year: "",
    activity: "",
    className: "",
    section: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const fetchFees = async () => {
    if (!formData.year) {
      alert("⚠️ Please select an academic year.");
      return;
    }
    try {
      let url = "http://localhost:1111/fee/pendingfee?";
      const params = new URLSearchParams();
      if (formData.year) params.append("academicYear", formData.year);
      if (formData.activity) params.append("activity", formData.activity);
      if (formData.className) params.append("className", formData.className);
      if (formData.section) params.append("section", formData.section);
      const res = await fetch(url + params.toString());
      if (res.ok) {
        setFeeData(await res.json());
      }
    } catch (err) {
      console.error("Failed to load fees", err);
    }
  };
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Finance Report</h2>
      <div className="row justify-content-center mb-4">
        <div className="col-md-2">
          <label>Academic Year</label>
          <select
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Select Year</option>
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
          </select>
        </div>
        <div className="col-md-2">
          <label>Activity</label>
          <select
            name="activity"
            value={formData.activity}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">All Activities</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Science">Science</option>
            <option value="Sports">Sports</option>
            <option value="Debate">Debate</option>
          </select>
        </div>
        <div className="col-md-2">
          <label>Class</label>
          <select
            name="className"
            value={formData.className}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">All Classes</option>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
          </select>
        </div>
        <div className="col-md-2">
          <label>Section</label>
          <select
            name="section"
            value={formData.section}
            onChange={handleChange}
            className="form-select"
          >
            <option value="">All Sections</option>
            <option value="A">Section A</option>
            <option value="B">Section B</option>
            <option value="C">Section C</option>
          </select>
        </div>
        <div className="col-md-2 d-flex align-items-end">
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={fetchFees}
          >
            Search
          </button>
        </div>
      </div>
      <div className="text-center mt-3 text-info">
        Total Records: {feeData.length}
      </div>
      <table className="table table-bordered table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>Student</th>
            <th>Roll</th>
            <th>Class</th>
            <th>Section</th>
            <th>Activity</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {feeData.length ? (
            feeData.map((fee) => (
              <tr key={fee._id}>
                <td>{fee.studentName}</td>
                <td>{fee.rollNumber}</td>
                <td>{fee.className}</td>
                <td>{fee.section}</td>
                <td>{fee.activity}</td>
                <td>₹{fee.totalFee}</td>
                <td>₹{fee.paidAmount}</td>
                <td>{new Date(fee.dueDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center text-muted">
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default FeePaymentHistory;
