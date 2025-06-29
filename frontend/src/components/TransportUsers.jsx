import React, { useState } from "react";
const TransportUsers = () => {
  const [searchType, setSearchType] = useState("class");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    try {
      let url;
      if (searchType === "class") {
        url = `http://localhost:1111/transport/report/${searchValue.trim()}`;
      } else {
        url = `http://localhost:1111/admission/students/${searchValue.trim()}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      console.log(data, "ddddddddddddddddddddddddddddddddd");
      if (data.status === "PASS") {
        setResult(data);
      } else {
        setError("No data found for this input.");
      }
    } catch (err) {
      setError("Error fetching data. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container mt-4">
      <h2>Transport Search</h2>
      <p>Select your search criteria:</p>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="row mb-3 align-items-end">
          <div className="col-md-5">
            <label className="form-label">Search By</label>
            <select
              className="form-select"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="class">Student Class</option>
              <option value="vehicle">Vehicle Number</option>
            </select>
          </div>
          <div className="col-md-5">
            <label className="form-label">
              {searchType === "class" ? "Enter Class" : "Enter Vehicle Number"}
            </label>
            <input
              type="text"
              className="form-control"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={
                searchType === "class" ? "e.g., 5" : "e.g., TN12AB1234"
              }
              required
            />
          </div>
          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              Search
            </button>
          </div>
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {result && searchType === "class" && (
        <>
          <h4>Vehicles for Class {searchValue}</h4>
          {result.report.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Vehicle Number</th>
                    <th>Driver Name</th>
                    <th>Size</th>
                    <th>Total Students</th>
                    <th>Student List</th>
                  </tr>
                </thead>
                <tbody>
                  {result.report.map((vehicle) => (
                    <tr key={vehicle.vehicleNumber}>
                      <td>{vehicle.vehicleNumber}</td>
                      <td>{vehicle.driverName}</td>
                      <td>{vehicle.size}</td>
                      <td>{vehicle.totalStudents}</td>
                      <td>
                        <ul className="list-group list-group-flush">
                          {vehicle.students.map((student) => (
                            <li
                              key={student.id}
                              className="list-group-item small"
                            >
                              {student.name} (Class {student.className})
                            </li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No transport data found for this class.</p>
          )}
        </>
      )}
      {result && searchType === "vehicle" && (
        <>
          <h4>Assigned Students for Vehicle: {searchValue}</h4>
          <table className="table table-bordered mb-4">
            <tbody>
              <tr>
                <th>Vehicle Number</th>
                <td>{result.vehicle.vehicleNumber}</td>
              </tr>
              <tr>
                <th>Driver Name</th>
                <td>{result.vehicle.driverName}</td>
              </tr>
              <tr>
                <th>Size</th>
                <td>{result.vehicle.size}</td>
              </tr>
              <tr>
                <th>Total Students</th>
                <td>{result.students.length}</td>
              </tr>
            </tbody>
          </table>
          <h5>Student List</h5>
          {result.students.length > 0 ? (
            <ul className="list-group">
              {result.students.map((student, index) => (
                <li key={index} className="list-group-item">
                  <strong>{student.studentName}</strong> - Class{" "}
                  {student.className}
                </li>
              ))}
            </ul>
          ) : (
            <p>No students assigned to this vehicle.</p>
          )}
        </>
      )}
    </div>
  );
};
export default TransportUsers;
