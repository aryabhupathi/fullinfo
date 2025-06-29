import React, { useState } from "react";
const AssignStudent = ({ transport, onClose }) => {
  const [formData, setFormData] = useState({
    studentName: "",
    destination: "",
    mobileNumber: "",
    className: "",
    studentId: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [fetching, setFetching] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (name === "studentName") {
      fetchStudentData(value);
    }
  };
  const validate = () => {
    const newErrors = {};
    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.studentName.trim())
      newErrors.studentName = "Student name is required.";
    if (!formData.destination.trim())
      newErrors.destination = "Destination is required.";
    if (!formData.mobileNumber.trim())
      newErrors.mobileNumber = "Mobile number is required.";
    else if (!mobileRegex.test(formData.mobileNumber))
      newErrors.mobileNumber = "Mobile number must be 10 digits.";
    return newErrors;
  };
  const fetchStudentData = async (name) => {
    if (!name.trim()) return;
    setFetching(true);
    try {
      const url = `http://localhost:1111/admission/student?name=${encodeURIComponent(
        name
      )}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      if (data.status !== "PASS") throw new Error("Student not found");
      const { student } = data;
      setFormData((prev) => ({
        ...prev,
        studentId: student._id,
        mobileNumber: student.mobileNumber?.toString() || "",
        className: student.className || "",
      }));
    } catch (error) {
      console.error("Error fetching student:", error.message);
      setFormData((prev) => ({
        ...prev,
        studentId: "",
        mobileNumber: "",
        className: "",
      }));
    } finally {
      setFetching(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    if (!formData.studentId) {
      setMessage("Please select a valid student.");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:1111/admission/assigntransport",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            studentId: formData.studentId,
            vehicleNumber: transport.vehicleNumber,
          }),
        }
      );
      const data = await response.json();
      if (data.status === "PASS") {
        setMessage("Student assigned successfully!");
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setMessage(data.message || "Assignment failed");
      }
    } catch (error) {
      setMessage("Server error: Could not assign student.");
    }
  };
  return (
    <div className="p-4">
      <h4>Assign Student</h4>
      {message && <div className="alert alert-success">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="className" className="form-label">
            Class
          </label>
          <input
            id="className"
            type="text"
            className="form-control"
            name="className"
            value={formData.className}
            onChange={handleChange}
            placeholder="Auto-filled"
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="studentName" className="form-label">
            Student Name
          </label>
          <input
            id="studentName"
            type="text"
            className={`form-control ${errors.studentName ? "is-invalid" : ""}`}
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Enter Student Name"
            autoComplete="off"
          />
          {fetching && <small className="text-muted">Searching...</small>}
          {errors.studentName && (
            <div className="invalid-feedback">{errors.studentName}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="destination" className="form-label">
            Destination
          </label>
          <input
            id="destination"
            type="text"
            className={`form-control ${errors.destination ? "is-invalid" : ""}`}
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            placeholder="Enter Destination"
          />
          {errors.destination && (
            <div className="invalid-feedback">{errors.destination}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="mobileNumber" className="form-label">
            Mobile Number
          </label>
          <input
            id="mobileNumber"
            type="tel"
            className={`form-control ${
              errors.mobileNumber ? "is-invalid" : ""
            }`}
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
            placeholder="Enter Mobile Number"
          />
          {errors.mobileNumber && (
            <div className="invalid-feedback">{errors.mobileNumber}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary w-100">
          Assign Student
        </button>
      </form>
    </div>
  );
};
export default AssignStudent;
