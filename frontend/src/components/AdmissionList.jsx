import React, { useEffect, useState } from "react";
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-GB");
};
const AdmissionList = () => {
  const [admissionList, setAdmissionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    className: "",
    dobStart: "",
    dobEnd: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    fetch("http://localhost:1111/admission/students")
      .then((res) => res.json())
      .then((data) => {
        setAdmissionList(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  }, []);
  const filteredData = admissionList.filter((student) => {
    const matchesName =
      filters.name === "" ||
      (student.studentName
        ?.toLowerCase()
        .includes(filters.name.toLowerCase()) ??
        false);
    const matchesClass =
      filters.className === "" ||
      (student.className
        ?.toString()
        .toLowerCase()
        .includes(filters.className.toLowerCase()) ??
        false);
    const studentDob = student.dateofbirth
      ? new Date(student.dateofbirth)
      : null;
    const dobStart = filters.dobStart ? new Date(filters.dobStart) : null;
    const dobEnd = filters.dobEnd ? new Date(filters.dobEnd) : null;
    const matchesDob =
      (!dobStart || (studentDob && studentDob >= dobStart)) &&
      (!dobEnd || (studentDob && studentDob <= dobEnd));
    return matchesName && matchesClass && matchesDob;
  });
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const getPaginatedData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredData.slice(start, end);
  };
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1);
  };
  return (
    <div className="container-fluid mt-4">
      <h2>Admission List</h2>
      <button
        className="btn btn-secondary mb-3"
        onClick={() => setOpenFilters(!openFilters)}
      >
        {openFilters ? "Hide Filters" : "Show Filters"}
      </button>
      {openFilters && (
        <div className="card p-3 mb-4">
          <div className="row">
            <div className="col-md-3">
              <label>Student Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={filters.name}
                onChange={handleFilterChange}
                placeholder="Search by name"
              />
            </div>
            <div className="col-md-3">
              <label>Class</label>
              <input
                type="text"
                name="className"
                className="form-control"
                value={filters.className}
                onChange={handleFilterChange}
                placeholder="Filter by class"
              />
            </div>
            <div className="col-md-3">
              <label>Date of Birth (From)</label>
              <input
                type="date"
                name="dobStart"
                className="form-control"
                value={filters.dobStart}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-3">
              <label>Date of Birth (To)</label>
              <input
                type="date"
                name="dobEnd"
                className="form-control"
                value={filters.dobEnd}
                onChange={handleFilterChange}
              />
            </div>
          </div>
        </div>
      )}
      {loading ? (
        <p>Loading...</p>
      ) : filteredData.length === 0 ? (
        <p>No students found matching the filters.</p>
      ) : (
        <>
          <div className="table-responsive">
            <table className="table table-striped table-bordered w-100">
              <thead className="thead-dark">
                <tr>
                  <th style={{ whiteSpace: "nowrap" }}>Student Name</th>
                  <th style={{ whiteSpace: "nowrap" }}>Date of Birth</th>
                  <th style={{ whiteSpace: "nowrap" }}>Class</th>
                  <th style={{ whiteSpace: "nowrap" }}>Section</th>
                  <th style={{ whiteSpace: "nowrap" }}>Date of Admission</th>
                  <th style={{ whiteSpace: "nowrap" }}>Admission Session</th>
                  <th style={{ whiteSpace: "nowrap" }}>Old School</th>
                  <th style={{ whiteSpace: "nowrap" }}>Father Name</th>
                  <th style={{ whiteSpace: "nowrap" }}>Mother Name</th>
                  <th style={{ whiteSpace: "nowrap" }}>Mobile Number</th>
                  <th style={{ whiteSpace: "nowrap" }}>Aadhar Number</th>
                  <th style={{ whiteSpace: "nowrap" }}>Religion</th>
                  <th style={{ whiteSpace: "nowrap" }}>Caste</th>
                  <th style={{ whiteSpace: "nowrap" }}>Parent Occupation</th>
                  <th style={{ whiteSpace: "nowrap" }}>Security Number</th>
                  <th style={{ whiteSpace: "nowrap" }}>Address</th>
                </tr>
              </thead>
              <tbody>
                {getPaginatedData().map((e, idx) => (
                  <tr key={e._id || idx}>
                    <td>{e.studentName}</td>
                    <td>{formatDate(e.dateofbirth)}</td>
                    <td>{e.className}</td>
                    <td>{e.sectionName}</td>
                    <td>{formatDate(e.dateofadmission)}</td>
                    <td>{e.admissionSession}</td>
                    <td>{e.oldSchool}</td>
                    <td>{e.fatherName}</td>
                    <td>{e.motherName}</td>
                    <td>{e.mobileNumber}</td>
                    <td>{e.aadharNumber}</td>
                    <td>{e.religion}</td>
                    <td>{e.caste}</td>
                    <td>{e.parentOccupation}</td>
                    <td>{e.securityNumber}</td>
                    <td>{e.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <nav aria-label="Page navigation" className="mt-3">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <button className="page-link" onClick={goToPreviousPage}>
                  Previous
                </button>
              </li>
              {[...Array(totalPages)].map((_, i) => (
                <li
                  key={i + 1}
                  className={`page-item ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  <button
                    className="page-link"
                    onClick={() => changePage(i + 1)}
                  >
                    {i + 1}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
              >
                <button className="page-link" onClick={goToNextPage}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </div>
  );
};
export default AdmissionList;
