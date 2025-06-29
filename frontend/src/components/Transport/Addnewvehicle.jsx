import React, { useState, useEffect } from "react";
const Addnewvehicle = ({ initialData = null, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    vehicleNumber: "",
    driverName: "",
    driverMobileNumber: "",
    destination: "",
    routeNumber: "",
    size: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (initialData) {
      setFormData({
        vehicleNumber: initialData.vehicleNumber || "",
        driverName: initialData.driverName || "",
        driverMobileNumber: initialData.driverMobileNumber || "",
        destination: initialData.destination || "",
        routeNumber: initialData.routeNumber || "",
        size: initialData.size || "",
      });
    }
  }, [initialData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const validate = () => {
    const newErrors = {};
    const mobileRegex = /^[0-9]{10}$/;
    if (!formData.vehicleNumber.trim())
      newErrors.vehicleNumber = "Vehicle number is required.";
    if (!formData.driverName.trim())
      newErrors.driverName = "Driver name is required.";
    if (!formData.driverMobileNumber.trim()) {
      newErrors.driverMobileNumber = "Mobile number is required.";
    } else if (!mobileRegex.test(formData.driverMobileNumber)) {
      newErrors.driverMobileNumber = "Mobile number must be 10 digits.";
    }
    if (!formData.destination.trim())
      newErrors.destination = "Destination is required.";
    if (!formData.routeNumber.trim())
      newErrors.routeNumber = "Route number is required.";
    if (!formData.size) newErrors.size = "Please select a vehicle size.";
    return newErrors;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    setMessage({});
    try {
      const url = initialData
        ? `http://localhost:1111/transport/update/${initialData._id}`
        : "http://localhost:1111/transport/addTransport";
      const response = await fetch(url, {
        method: initialData ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      console.log(data, "ddddddddddddddddddddddddd")
      if (!response.ok) {
        setMessage({
          type: "danger",
          text: data.error || "Operation failed.",
        });
        return;
      }
      setMessage({
        type: "success",
        text: initialData
          ? "Transport updated successfully!"
          : "Transport added successfully!",
      });
      if (onSuccess) onSuccess(data.transport || data); 
    } catch (error) {
      setMessage({ type: "danger", text: `Server error: ${error.message}` });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({}), 4000);
    }
  };
  return (
    <div className="bg-light p-4 rounded shadow-sm">
      {message.text && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="vehicleNumber" className="form-label">
            Vehicle Number
          </label>
          <input
            id="vehicleNumber"
            type="text"
            className={`form-control ${
              errors.vehicleNumber ? "is-invalid" : ""
            }`}
            name="vehicleNumber"
            value={formData.vehicleNumber}
            onChange={handleChange}
            placeholder="e.g., KA01AB1234"
          />
          {errors.vehicleNumber && (
            <small className="text-danger">{errors.vehicleNumber}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="driverName" className="form-label">
            Driver Name
          </label>
          <input
            id="driverName"
            type="text"
            className={`form-control ${errors.driverName ? "is-invalid" : ""}`}
            name="driverName"
            value={formData.driverName}
            onChange={handleChange}
            placeholder="e.g., John Doe"
          />
          {errors.driverName && (
            <small className="text-danger">{errors.driverName}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="driverMobileNumber" className="form-label">
            Mobile No.
          </label>
          <input
            id="driverMobileNumber"
            type="tel"
            className={`form-control ${
              errors.driverMobileNumber ? "is-invalid" : ""
            }`}
            name="driverMobileNumber"
            value={formData.driverMobileNumber}
            onChange={handleChange}
            placeholder="10-digit number"
          />
          {errors.driverMobileNumber && (
            <small className="text-danger">{errors.driverMobileNumber}</small>
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
            placeholder="e.g., Bangalore"
          />
          {errors.destination && (
            <small className="text-danger">{errors.destination}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="routeNumber" className="form-label">
            Route Number
          </label>
          <input
            id="routeNumber"
            type="text"
            className={`form-control ${errors.routeNumber ? "is-invalid" : ""}`}
            name="routeNumber"
            value={formData.routeNumber}
            onChange={handleChange}
            placeholder="e.g., R101"
          />
          {errors.routeNumber && (
            <small className="text-danger">{errors.routeNumber}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="size" className="form-label">
            Size
          </label>
          <select
            id="size"
            className={`form-select ${errors.size ? "is-invalid" : ""}`}
            name="size"
            value={formData.size}
            onChange={handleChange}
          >
            <option value="">Select Size</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
          {errors.size && <small className="text-danger">{errors.size}</small>}
        </div>
        <div className="d-flex gap-2">
          <button
            type="submit"
            className="btn btn-primary flex-grow-1"
            disabled={loading}
          >
            {loading ? "Saving..." : initialData ? "Update" : "Save"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};
export default Addnewvehicle;
