import React, { useEffect, useState, useMemo } from "react";
const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return isNaN(date.getTime()) ? "" : date.toLocaleDateString("en-GB");
};
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};
const AdmissionList = () => {
  const [admissionList, setAdmissionList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    rollnumber: "",
    className: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const debouncedName = useDebounce(filters.name, 300);
  const debouncedRoll = useDebounce(filters.rollnumber, 300);
  const debouncedClass = useDebounce(filters.className, 300);
  const debouncedSection = useDebounce(filters.sectionName, 300);
  useEffect(() => {
    fetch("http://localhost:1111/admission/students")
      .then((res) => res.json())
      .then((data) => {
        setAdmissionList(data.students || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
        setLoading(false);
      });
  }, []);
  const filteredData = useMemo(() => {
    if (!admissionList.length) return [];
    return admissionList.filter((student) => {
      const nameMatch =
        !debouncedName ||
        student.studentName
          ?.toLowerCase()
          .includes(debouncedName.toLowerCase());
      const classMatch =
        !debouncedClass ||
        student.className
          ?.toString()
          .toLowerCase()
          .includes(debouncedClass.toLowerCase());
      const sectionMatch =
        !debouncedClass ||
        student.sectionName
          ?.toString()
          .toLowerCase()
          .includes(debouncedSection.toLowerCase());
      const rollMatch =
        !debouncedRoll ||
        student.rollNumber?.toLowerCase().includes(debouncedRoll.toLowerCase());
      return nameMatch && classMatch && rollMatch && sectionMatch;
    });
  }, [
    admissionList,
    debouncedName,
    debouncedRoll,
    debouncedClass,
    debouncedSection,
  ]);
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
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };
  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between">
        <h2>Admission List</h2>
        <button
          className="btn btn-secondary mb-3"
          onClick={() => setOpenFilters(!openFilters)}
        >
          {openFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>
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
              <label>Roll Number</label>
              <input
                type="text"
                name="rollnumber"
                className="form-control"
                value={filters.rollnumber}
                onChange={handleFilterChange}
                placeholder="Search by roll number"
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
              <label>Section</label>
              <input
                type="text"
                name="sectionName"
                className="form-control"
                value={filters.sectionName}
                onChange={handleFilterChange}
                placeholder="Filter by class"
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
                  <th>Student Name</th>
                  <th>Date of Birth</th>
                  <th>Class</th>
                  <th>Section</th>
                  <th>Date of Admission</th>
                  <th>Father Name</th>
                  <th>Mother Name</th>
                  <th>Mobile Number</th>
                  <th>Aadhar Number</th>
                  <th>Address</th>
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
                    <td>{e.fatherName}</td>
                    <td>{e.motherName}</td>
                    <td>{e.mobileNumber}</td>
                    <td>{e.aadharNumber}</td>
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
