import React, { useEffect, useState } from "react";

const Exam = () => {
  const [formData, setFormData] = useState({
    stuClassName: "",
    examType: "",
    startingDate: "",
    examFee: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [examData, setExamData] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const fetchExams = () => {
    setLoading(true);
    fetch("http://localhost:1111/exam/examList")
      .then((res) => res.json())
      .then((data) => {
        setExamData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching exams:", error);
        setMessage({ type: "danger", text: "Failed to load exam data." });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const validate = () => {
    const { stuClassName, examType, startingDate, examFee } = formData;
    if (!stuClassName || !examType || !startingDate || examFee === "") {
      setMessage({ type: "danger", text: "Please fill all required fields" });
      setTimeout(() => setMessage({ type: "", text: "" }), 3000);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:1111/exam/addexam", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.status === "PASS") {
        setMessage({ type: "success", text: "Exam added successfully!" });
        handleReset();
        fetchExams(); // Refresh list
      } else {
        setMessage({ type: "danger", text: "Failed to add exam." });
      }
    } catch (error) {
      setMessage({ type: "danger", text: `Server error: ${error.message}` });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 4000);
    }
  };

  const handleReset = () => {
    setFormData({
      stuClassName: "",
      examType: "",
      startingDate: "",
      examFee: "",
    });
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Examination</h2>

      {/* Alert Messages */}
      {message.text && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}

      <form className="mb-4" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-3">
            <label htmlFor="stuClassName" className="form-label">
              Class Name
            </label>
            <select
              className="form-select"
              id="stuClassName"
              name="stuClassName"
              value={formData.stuClassName}
              onChange={handleChange}
            >
              <option value="">Choose Class</option>
              <option value="Class-1">Class 1</option>
              <option value="Class-2">Class 2</option>
              <option value="Class-3">Class 3</option>
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="examType" className="form-label">
              Exam Type
            </label>
            <select
              className="form-select"
              id="examType"
              name="examType"
              value={formData.examType}
              onChange={handleChange}
            >
              <option value="">Choose</option>
              <option value="mid-term">Mid-Term</option>
              <option value="final">Final</option>
              <option value="quiz">Quiz</option>
            </select>
          </div>

          <div className="col-md-3">
            <label htmlFor="startingDate" className="form-label">
              Starting Date
            </label>
            <input
              type="date"
              className="form-control"
              id="startingDate"
              name="startingDate"
              value={formData.startingDate}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <label htmlFor="examFee" className="form-label">
              Exam Fee
            </label>
            <input
              type="number"
              className="form-control"
              id="examFee"
              name="examFee"
              placeholder="Enter Exam Fee"
              value={formData.examFee}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-1 d-grid">
            <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>

      <h5 className="text-center mb-3">Examination List</h5>
      {loading ? (
        <p>Loading exams...</p>
      ) : examData.length > 0 ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Exam Id</th>
              <th>Class</th>
              <th>Exam Type</th>
              <th>From Date</th>
              <th>Fee</th>
            </tr>
          </thead>
          <tbody>
            {examData.map((exam, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{exam.stuClassName}</td>
                <td>{exam.examType}</td>
                <td>{new Date(exam.startingDate).toLocaleDateString()}</td>
                <td>₹ {exam.examFee || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No exams found.</p>
      )}
    </div>
  );
};

export default Exam;