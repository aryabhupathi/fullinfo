import React from "react";
const NewAdmission = () => {
  return (
    <div className="container mt-4">
      <h3 className="text-primary mb-3">
        <i className="bi bi-person-plus-fill"></i> New Admission
      </h3>
      <p className="text-danger fw-semibold">* Marked fields are mandatory!</p>
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-info text-white fw-bold">
              Student Details
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label className="form-label">
                  Student Name <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-control" />
              </div>
              <label className="form-label">
                Date of Birth <span className="text-danger">*</span>
              </label>
              <div className="row g-2 mb-3">
                <div className="col">
                  <select className="form-select">
                    <option>Day</option>
                  </select>
                </div>
                <div className="col">
                  <select className="form-select">
                    <option>Month</option>
                  </select>
                </div>
                <div className="col">
                  <select className="form-select">
                    <option>Year</option>
                  </select>
                </div>
              </div>
              <label className="form-label">
                Admission className <span className="text-danger">*</span>
              </label>
              <div className="row g-2 mb-3">
                <div className="col">
                  <select className="form-select">
                    <option>Choose</option>
                  </select>
                </div>
                <div className="col">
                  <select className="form-select">
                    <option>Choose Section</option>
                  </select>
                </div>
              </div>
              <label className="form-label">
                Date of Admission <span className="text-danger">*</span>
              </label>
              <div className="row g-2 mb-3">
                <div className="col">
                  <select className="form-select">
                    <option>Day</option>
                  </select>
                </div>
                <div className="col">
                  <select className="form-select">
                    <option>Month</option>
                  </select>
                </div>
                <div className="col">
                  <select className="form-select">
                    <option>Year</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Admission Session <span className="text-danger">*</span>
                </label>
                <select className="form-select">
                  <option>Choose</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Old School</label>
                <input type="text" className="form-control" />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-light fw-bold">Parent Details</div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">
                    Father Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col">
                  <label className="form-label">Mother Name</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">
                    Mobile No <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col">
                  <label className="form-label">Adhar No</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Religion</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col">
                  <label className="form-label">Caste</label>
                  <select className="form-select">
                    <option>Choose</option>
                  </select>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col">
                  <label className="form-label">Parent Occupation</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col">
                  <label className="form-label">Any ID Proof No</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">
                  Address <span className="text-danger">*</span>
                </label>
                <textarea className="form-control" rows="3"></textarea>
              </div>
              <div className="d-flex gap-3">
                <button className="btn btn-primary">Register</button>
                <button className="btn btn-warning text-white">
                  Clear All
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewAdmission;
