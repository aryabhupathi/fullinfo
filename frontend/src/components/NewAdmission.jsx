import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const NewAdmission = () => {
  const [formData, setFormData] = useState({
    studentName: "",
    dateofbirth: null,
    className: "",
    sectionName: "",
    dateofadmission: null,
    admissionSession: "",
    oldSchool: "",
    fatherName: "",
    motherName: "",
    mobileNumber: "",
    aadharNumber: "",
    religion: "",
    caste: "",
    parentOccupation: "",
    securityNumber: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleDateChange = (date, field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: date,
    }));
  };
  const validate = () => {
    const newErrors = {};
    let hasError = false;
    const {
      studentName,
      dateofbirth,
      className,
      sectionName,
      dateofadmission,
      admissionSession,
      fatherName,
      mobileNumber,
      aadharNumber,
      address,
    } = formData;
    if (!studentName.trim()) {
      newErrors.studentName = "Student name is required";
      hasError = true;
    } else if (!/^[a-zA-Z\s]+$/.test(studentName.trim())) {
      newErrors.studentName = "Only letters and spaces allowed in name";
      hasError = true;
    }
    if (!dateofbirth) {
      newErrors.dateofbirth = "Date of birth is required";
      hasError = true;
    }
    if (!className) {
      newErrors.className = "Class is required";
      hasError = true;
    }
    if (!sectionName) {
      newErrors.sectionName = "Section is required";
      hasError = true;
    }
    if (!dateofadmission) {
      newErrors.dateofadmission = "Date of admission is required";
      hasError = true;
    }
    if (!admissionSession) {
      newErrors.admissionSession = "Admission session is required";
      hasError = true;
    }
    if (!fatherName.trim()) {
      newErrors.fatherName = "Father's name is required";
      hasError = true;
    }
    if (!mobileNumber || !/^[0-9]{10}$/.test(mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
      hasError = true;
    }
    if (aadharNumber && !/^\d{12}$/.test(aadharNumber)) {
      newErrors.aadharNumber = "Enter a valid 12-digit Aadhar number";
      hasError = true;
    }
    if (!address || address.trim().length < 10) {
      newErrors.address = "Address must be at least 10 characters";
      hasError = true;
    }
    setErrors(newErrors);
    return !hasError;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setMessage("");
    setIsError(false);
    try {
      const payload = {
        ...formData,
        dateofbirth: formData.dateofbirth?.toISOString().split("T")[0],
        dateofadmission: formData.dateofadmission?.toISOString().split("T")[0],
      };
      const response = await fetch(
        "http://localhost:1111/admission/newAdmission",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );
      const data = await response.json();
      if (data.status === "PASS") {
        setMessage("Registration successful!");
        setIsError(false);
        handleReset();
        setTimeout(() => setMessage(""), 5000);
      } else {
        setMessage("Registration failed.Please try again");
        setIsError(true);
      }
    } catch (error) {
      setMessage(`Server error: ${error.message}`);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setFormData({
      studentName: "",
      dateofbirth: null,
      className: "",
      sectionName: "",
      dateofadmission: null,
      admissionSession: "",
      oldSchool: "",
      fatherName: "",
      motherName: "",
      mobileNumber: "",
      aadharNumber: "",
      religion: "",
      caste: "",
      parentOccupation: "",
      securityNumber: "",
      address: "",
    });
    setErrors({});
    setMessage("");
  };
  return (
    <div className="container mt-3 mb-3">
      {isError && (
        <div
          className={`alert alert-${
            isError ? "danger" : "success"
          } text-center`}
          role="alert"
        >
          {message}
        </div>
      )}
      <div className="col-12 text-center mb-4">
        <h2 className="text-primary fw-bold display-6">
          <i className="bi bi-person-plus-fill me-2"></i>New Admission
        </h2>
        <p className="text-danger fw-semibold">
          * Marked fields are mandatory!
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="card h-100 shadow-sm border-0 student-card">
              <div className="card-header bg-info text-white fw-bold">
                Student Details
              </div>
              <div className="card-body">
                <div className="mb-3">
                  <label className="form-label">
                    Student Name <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    placeholder="Enter student name"
                  />
                  {errors.studentName && (
                    <div className="text-danger">{errors.studentName}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Date of Birth <span className="text-danger">*</span>
                  </label>
                  <DatePicker
                    selected={formData.dateofbirth}
                    onChange={(date) => handleDateChange(date, "dateofbirth")}
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    wrapperClassName="datepicker"
                    placeholderText="Select date of birth"
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                  {errors.dateofbirth && (
                    <div className="text-danger">{errors.dateofbirth}</div>
                  )}
                </div>
                <div className="row g-2 mb-3">
                  <div className="col">
                    <label className="form-label">
                      Class <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      name="className"
                      value={formData.className}
                      onChange={handleChange}
                    >
                      <option value="">Choose Class</option>
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </select>
                    {errors.className && (
                      <div className="text-danger">{errors.className}</div>
                    )}
                  </div>
                  <div className="col">
                    <label className="form-label">
                      Section <span className="text-danger">*</span>
                    </label>
                    <select
                      className="form-select"
                      name="sectionName"
                      value={formData.sectionName}
                      onChange={handleChange}
                    >
                      <option value="">Choose Section</option>
                      {["A", "B", "C"].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    {errors.sectionName && (
                      <div className="text-danger">{errors.sectionName}</div>
                    )}
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Date of Admission <span className="text-danger">*</span>
                  </label>
                  <DatePicker
                    selected={formData.dateofadmission}
                    onChange={(date) =>
                      handleDateChange(date, "dateofadmission")
                    }
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    wrapperClassName="datepicker"
                    placeholderText="Select date of admission"
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                  {errors.dateofadmission && (
                    <div className="text-danger">{errors.dateofadmission}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Admission Session <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    name="admissionSession"
                    value={formData.admissionSession}
                    onChange={handleChange}
                  >
                    <option value="">Choose Session</option>
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                  {errors.admissionSession && (
                    <div className="text-danger">{errors.admissionSession}</div>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Old School</label>
                  <input
                    type="text"
                    className="form-control"
                    name="oldSchool"
                    value={formData.oldSchool}
                    onChange={handleChange}
                    placeholder="Enter your old school name"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6">
             <div className="card h-100 shadow-sm border-0 parent-card">
              <div className="card-header bg-light fw-bold">Parent Details</div>
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">
                      Father Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      placeholder="Enter your father name"
                    />
                    {errors.fatherName && (
                      <div className="text-danger">{errors.fatherName}</div>
                    )}
                  </div>
                  <div className="col">
                    <label className="form-label">Mother Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      placeholder="Enter your mother name"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">
                      Mobile No <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="Enter your mobile number"
                    />
                    {errors.mobileNumber && (
                      <div className="text-danger">{errors.mobileNumber}</div>
                    )}
                  </div>
                  <div className="col">
                    <label className="form-label">Aadhar Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="aadharNumber"
                      value={formData.aadharNumber}
                      onChange={handleChange}
                      placeholder="Enter your aadhar number"
                    />
                    {errors.aadharNumber && (
                      <div className="text-danger">{errors.aadharNumber}</div>
                    )}
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">Religion</label>
                    <input
                      type="text"
                      className="form-control"
                      name="religion"
                      value={formData.religion}
                      onChange={handleChange}
                      placeholder="Enter your religion"
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Caste</label>
                    <select
                      className="form-select"
                      name="caste"
                      value={formData.caste}
                      onChange={handleChange}
                    >
                      <option value="">Choose your caste</option>
                      <option value="General">General</option>
                      <option value="OBC">OBC</option>
                      <option value="SC">SC</option>
                      <option value="ST">ST</option>
                      <option value="EWS">EWS</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col">
                    <label className="form-label">Parent Occupation</label>
                    <input
                      type="text"
                      className="form-control"
                      name="parentOccupation"
                      value={formData.parentOccupation}
                      onChange={handleChange}
                      placeholder="Enter your parent occupation"
                    />
                  </div>
                  <div className="col">
                    <label className="form-label">Any ID Proof No</label>
                    <input
                      type="text"
                      className="form-control"
                      name="securityNumber"
                      value={formData.securityNumber}
                      onChange={handleChange}
                      placeholder="Enter your ID proof number"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Address <span className="text-danger">*</span>
                  </label>
                  <textarea
                    rows="3"
                    className="form-control"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Enter your address ..."
                  ></textarea>
                  {errors.address && (
                    <div className="text-danger">{errors.address}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 text-center mb-4 mt-4">
            <button
              className="btn btn-primary me-2"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
            <button
              className="btn btn-warning text-white"
              type="button"
              onClick={handleReset}
              disabled={!Object.values(formData).some((val) => val)}
            >
              Clear All
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default NewAdmission;