import React from "react";
const Exam = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Examination</h2>
      <form className="mb-4">
        <div className="row">
          <div className="col-md-3">
            <label htmlFor="class" className="form-label">
              Class Name
            </label>
            <select className="form-select" id="class">
              <option value="">Choose Class</option>
              <option value="class1">Class 1</option>
              <option value="class2">Class 2</option>
              <option value="class3">Class 3</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="examType" className="form-label">
              Exam Type
            </label>
            <select className="form-select" id="examType">
              <option value="">Choose</option>
              <option value="mid-term">Mid-Term</option>
              <option value="final">Final</option>
              <option value="quiz">Quiz</option>
            </select>
          </div>
          <div className="col-md-3">
            <label htmlFor="startDate" className="form-label">
              Starting Date
            </label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              placeholder="mm/dd/yyyy"
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
              placeholder="Enter Exam Fee"
            />
          </div>
          <div className="col-md-1 d-grid">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </form>
      <h5 className="text-center mb-3">Examination List</h5>
      <table className="table table-striped">
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
          <tr>
            <td>1</td>
            <td>Class 1</td>
            <td>Mid-Term</td>
            <td>2023-04-15</td>
            <td>₹ 500</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default Exam;
