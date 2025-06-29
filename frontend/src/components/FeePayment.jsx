import React, { useEffect, useState } from "react";
const API_URL = "http://localhost:1111/fee";
const PENDING_FEES_URL = `${API_URL}/pendingfee`;
const STUDENT_LOOKUP_URL = `${API_URL}/student`;
const ACTIVITY_LOOKUP_URL = `${API_URL}/activity`;
const defaultForm = {
  studentName: "",
  rollNumber: "",
  className: "",
  section: "",
  activity: "",
  totalFee: "",
  paidAmount: "",
  dueDate: "",
  transactionId: "",
};
const FeePayment = () => {
  const [fees, setFees] = useState([]);
  const [formData, setFormData] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rollFilter, setRollFilter] = useState("");
  useEffect(() => {
    fetchPendingFees();
  }, []);
  const fetchPendingFees = async () => {
    try {
      const res = await fetch(PENDING_FEES_URL);
      if (res.ok) setFees(await res.json());
    } catch (err) {
      console.error("Failed to load pending fees", err);
    }
  };
  const resetForm = () => {
    setFormData(defaultForm);
    setEditId(null);
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "Overdue":
        return <span className="badge bg-danger">Overdue</span>;
      case "Partially Paid":
        return (
          <span className="badge bg-warning text-dark">Partially Paid</span>
        );
      case "Paid":
        return <span className="badge bg-success">Paid</span>;
      default:
        return <span className="badge bg-secondary">{status}</span>;
    }
  };
  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toISOString().split("T")[0] : "";
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "rollNumber") {
      try {
        const res = await fetch(`${STUDENT_LOOKUP_URL}?name=${value}`);
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({
            ...prev,
            studentName: data.studentName || "",
            className: data.className || "",
            section: data.section || "",
          }));
        }
      } catch (err) {
        console.error("Student lookup failed:", err);
      }
    }
    if (name === "activity") {
      try {
        const res = await fetch(`${ACTIVITY_LOOKUP_URL}?activity=${value}`);
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({
            ...prev,
            totalFee: data.totalFee || "",
            dueDate: formatDate(data.dueDate),
          }));
        }
      } catch (err) {
        console.error("Activity lookup failed:", err);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_URL}/update/${editId}` : `${API_URL}/payfee`;
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          totalFee: Number(formData.totalFee),
          paidAmount: Number(formData.paidAmount),
        }),
      });
      if (!res.ok) throw new Error("Submission failed");
      resetForm();
      await fetchPendingFees();
    } catch (err) {
      console.error("Error submitting fee:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (fee) => {
    setEditId(fee._id);
    setFormData({
      studentName: fee.studentName || "",
      rollNumber: fee.rollNumber || "",
      className: fee.className || "",
      section: fee.section || "",
      activity: fee.activity || "",
      totalFee: fee.totalFee || "",
      paidAmount: fee.paidAmount || "",
      dueDate: formatDate(fee.dueDate),
      transactionId: fee.transactionId || "",
    });
  };
  const filteredFees = fees.filter((fee) =>
    fee.rollNumber.toString().includes(rollFilter.trim())
  );
  return (
    <div className="container mt-4">
      <h3 className="mb-4">🎓 Student Fee Management</h3>
      <button onClick={() => setShowForm(!showForm)}>Add New Student</button>
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="card shadow-sm p-4 mb-5 bg-light"
        >
          <div className="row">
            {["studentName", "rollNumber", "className", "section"].map(
              (field) => (
                <div key={field} className="col-md-6 mb-3">
                  <label>{field.replace(/([A-Z])/g, " $1")}</label>
                  <input
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              )
            )}
          </div>
          <div className="row">
            <div className="col-md-3 mb-3">
              <label>Activity</label>
              <select
                name="activity"
                value={formData.activity}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Activity</option>
                {["Mathematics", "Science", "Sports", "Debate"].map((act) => (
                  <option key={act} value={act}>
                    {act}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3 mb-3">
              <label>Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>Total Fee (₹)</label>
              <input
                type="number"
                name="totalFee"
                value={formData.totalFee}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-3 mb-3">
              <label>Paid Amount (₹)</label>
              <input
                type="number"
                name="paidAmount"
                value={formData.paidAmount}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>
          {/* <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Saving..." : editId ? "Update Fee" : "Add Fee"}
          </button> */}
          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Saving...
              </>
            ) : editId ? (
              "Update Fee"
            ) : (
              "Add Fee"
            )}
          </button>
        </form>
      )}
      <div className="mb-3">
        <label htmlFor="rollFilter" className="form-label">
          🔍 Filter by Roll Number
        </label>
        <input
          id="rollFilter"
          type="text"
          value={rollFilter}
          onChange={(e) => setRollFilter(e.target.value)}
          className="form-control w-25"
          placeholder="Enter roll number"
        />
      </div>
      <table className="table table-bordered table-hover mt-3">
        <thead className="table-dark">
          <tr>
            <th>Student</th>
            <th>Roll</th>
            <th>Class</th>
            <th>Activity</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Due</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFees.length ? (
            filteredFees.map((fee) => (
              <tr key={fee._id}>
                <td>{fee.studentName}</td>
                <td>{fee.rollNumber}</td>
                <td>{`${fee.className} - ${fee.section}`}</td>
                <td>{fee.activity}</td>
                <td>₹{fee.totalFee}</td>
                <td>₹{fee.paidAmount}</td>
                <td>₹{fee.balance}</td>
                <td>{getStatusBadge(fee.status)}</td>
                <td>{new Date(fee.dueDate).toLocaleDateString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-1"
                    onClick={() => handleEdit(fee)}
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center text-muted">
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default FeePayment;
