import React from "react";
const ManageTransport = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Transport - 1</h2>
      <div className="d-flex justify-content-end mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search"
          style={{ width: "200px" }}
        />
      </div>
      <div className="row">
        <div className="col-md-3 bg-light p-3 rounded">
          <h5 className="mb-3 text-center bg-danger text-white p-2 rounded">
            New Transport
          </h5>
          <form>
            <div className="mb-3">
              <label htmlFor="transportNumber" className="form-label">
                Transport Number
              </label>
              <input
                type="text"
                className="form-control"
                id="transportNumber"
                placeholder="Enter Transport Number"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="rootName" className="form-label">
                Root Name
              </label>
              <input
                type="text"
                className="form-control"
                id="rootName"
                placeholder="Enter Root Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="size" className="form-label">
                Size
              </label>
              <select className="form-select" id="size">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="driverName" className="form-label">
                Driver Name
              </label>
              <input
                type="text"
                className="form-control"
                id="driverName"
                placeholder="Enter Driver Name"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="driverMobileNo" className="form-label">
                Driver Mobile No
              </label>
              <input
                type="tel"
                className="form-control"
                id="driverMobileNo"
                placeholder="Enter Mobile Number"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Save
            </button>
          </form>
        </div>
        <div className="col-md-9">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>T-Id</th>
                <th>T-Number</th>
                <th>Type</th>
                <th>Transport Root</th>
                <th>Driver</th>
                <th>Mobile No</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>4</td>
                <td>VEHICLE-1</td>
                <td>Small</td>
                <td>BUJURGA</td>
                <td>Akash Yadav</td>
                <td>7007932171</td>
                <td>
                  <button className="btn btn-warning">+ Root Master</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default ManageTransport;
