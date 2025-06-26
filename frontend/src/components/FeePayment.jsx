import React, { useEffect, useState } from "react";
const FeePayment = () => {
  const API_URL = "http://localhost:1111/fee/payfee";
  const PENDING_FEES_URL = "http://localhost:1111/fee/pendingfee";
  const STUDENT_LOOKUP_URL = "http://localhost:1111/fee/student";
  const ACTIVITY_LOOKUP_URL = "http://localhost:1111/fee/activity";
  const [fees, setFees] = useState([]);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [formData, setFormData] = useState({
    studentName: "",
    rollNumber: "",
    className: "",
    section: "",
    activity: "",
    totalFee: "",
    paidAmount: "",
    dueDate: "",
    transactionId: "",
  });
  useEffect(() => {
    loadPendingFees();
  }, []);
  const loadPendingFees = async () => {
    try {
      const res = await fetch(PENDING_FEES_URL);
      if (!res.ok) throw new Error("Failed to fetch pending fees");
      const data = await res.json();
      setFees(data);
    } catch (err) {
      console.error(err);
      alert("Error loading pending fees");
    }
  };
  const resetForm = () => {
    setFormData({
      studentName: "",
      rollNumber: "",
      className: "",
      section: "",
      activity: "",
      totalFee: "",
      paidAmount: "",
      dueDate: "",
      transactionId: "",
    });
    setEditId(null);
  };
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
    if (name === "activity" && value) {
      try {
        const res = await fetch(`${ACTIVITY_LOOKUP_URL}?activity=${value}`);
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({
            ...prev,
            activity: value,
            totalFee: data.totalFee || "",
            dueDate: data.dueDate
              ? new Date(data.dueDate).toISOString().split("T")[0]
              : "",
          }));
          return;
        }
      } catch (err) {
        console.error("Activity lookup failed", err);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const method = "POST";
    const url = API_URL;
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          paidAmount: Number(formData.paidAmount),
          totalFee: Number(formData.totalFee),
        }),
      });
      if (!res.ok) throw new Error("Failed to submit form");
      resetForm();
      await loadPendingFees();
    } catch (err) {
      console.error(err);
      alert("Error saving fee record");
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (fee) => {
    setEditId(fee._id);
    setFormData({
      studentName: fee.studentName,
      rollNumber: fee.rollNumber,
      className: fee.className,
      section: fee.section,
      activity: fee.activity,
      totalFee: fee.totalFee,
      paidAmount: fee.paidAmount,
      dueDate: new Date(fee.dueDate).toISOString().split("T")[0],
      transactionId: fee.transactionId || "",
    });
  };
  const sendMockNotification = (student) => {
    setNotification(
      `🔔 Notification sent to ${student.studentName} (Roll: ${student.rollNumber}) about ₹${student.balance} pending.`
    );
    setTimeout(() => setNotification(""), 5000);
  };
  return (
    <div className="container mt-4">
      <h3 className="mb-4">🎓 Student Fee Management</h3>
      {notification && <div className="alert alert-info">{notification}</div>}
      <form onSubmit={handleSubmit} className="card card-body shadow-sm mb-5">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label>Student Name</label>
            <input
              type="text"
              name="studentName"
              className="form-control"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6 mb-3">
            <label>Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              className="form-control"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-3 mb-3">
            <label>Class</label>
            <input
              type="text"
              name="className"
              className="form-control"
              value={formData.className}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label>Section</label>
            <input
              type="text"
              name="section"
              className="form-control"
              value={formData.section}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-3 mb-3">
            <label>Activity</label>
            <select
              name="activity"
              className="form-select"
              value={formData.activity}
              onChange={handleChange}
              required
            >
              <option value="">Select Activity</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Science">Science</option>
              <option value="Sports">Sports</option>
              <option value="Debate">Debate</option>
            </select>
          </div>
          <div className="col-md-3 mb-3">
            <label>Due Date</label>
            <input
              type="date"
              name="dueDate"
              className="form-control"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 mb-3">
            <label>Total Fee (₹)</label>
            <input
              type="number"
              name="totalFee"
              className="form-control"
              value={formData.totalFee}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Paid Amount (₹)</label>
            <input
              type="number"
              name="paidAmount"
              className="form-control"
              value={formData.paidAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-4 mb-3">
            <label>Transaction ID (Optional)</label>
            <input
              type="text"
              name="transactionId"
              className="form-control"
              value={formData.transactionId}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : editId ? "Update Fee" : "Add Fee"}
        </button>
      </form>
      <h4>📌 Pending / Overdue Payments</h4>
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
          </tr>
        </thead>
        <tbody>
          {fees.length > 0 ? (
            fees.map((fee) => (
              <tr key={fee._id}>
                <td>{fee.studentName}</td>
                <td>{fee.rollNumber}</td>
                <td>
                  {fee.className} - {fee.section}
                </td>
                <td>{fee.activity}</td>
                <td>₹{fee.totalFee}</td>
                <td>₹{fee.paidAmount}</td>
                <td>₹{fee.balance}</td>
                <td>
                  <span
                    className={`badge ${
                      fee.status === "Overdue"
                        ? "bg-danger"
                        : fee.status === "Partially Paid"
                        ? "bg-warning text-dark"
                        : "bg-success"
                    }`}
                  >
                    {fee.status}
                  </span>
                </td>
                <td>{new Date(fee.dueDate).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center text-muted">
                No pending fees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default FeePayment;
