import React from "react";
const Activity = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">New Activity</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="activityName" className="form-label">
            Activity Name
          </label>
          <input
            type="text"
            className="form-control"
            id="activityName"
            placeholder="Enter Activity Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="startDate" className="form-label">
            Activity Start Date
          </label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            placeholder="mm/dd/yyyy"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="endDate" className="form-label">
            Activity End Date
          </label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            placeholder="mm/dd/yyyy"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="activeHead" className="form-label">
            Active Head Name
          </label>
          <input
            type="text"
            className="form-control"
            id="activeHead"
            placeholder="Enter Active Head Name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="aboutActivity" className="form-label">
            About Activity
          </label>
          <textarea
            className="form-control"
            id="aboutActivity"
            rows="5"
            placeholder="Enter details about the activity"
          ></textarea>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button type="submit" className="btn btn-primary me-md-2">
            Save Activity
          </button>
          <button type="button" className="btn btn-danger">
            Close
          </button>
        </div>
      </form>
    </div>
  );
};
export default Activity;
