import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Table,
  Card,
} from "react-bootstrap";
const TransportUsers = () => {
  const [searchType, setSearchType] = useState("class");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchValue.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);
    setCurrentPage(1);
    try {
      let url;
      if (searchType === "class") {
        url = `http://localhost:1111/transport/report/${searchValue.trim()}`;
      } else {
        url = `http://localhost:1111/admission/students/${searchValue.trim()}`;
      }
      const response = await fetch(url);
      const data = await response.json();
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
  const getPaginatedStudents = () => {
    if (!result || !result.students) return [];
    const students = result.students;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    return students.slice(indexOfFirstItem, indexOfLastItem);
  };
  const totalPages = result?.students
    ? Math.ceil(result.students.length / itemsPerPage)
    : 0;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <Container className="py-4">
      <Row className="mb-4 text-center">
        <Col>
          <h2 className="fw-bold text-primary">Transport Search</h2>
          <p className="text-muted">Search by class or vehicle number.</p>
        </Col>
      </Row>
      <Card className="shadow-sm border-0 mb-4">
        <Card.Body className="p-4">
          <Form onSubmit={handleSearch}>
            <Row className="align-items-end g-3">
              <Col md={5}>
                <Form.Group controlId="searchBy">
                  <Form.Label>Search By</Form.Label>
                  <Form.Select
                    value={searchType}
                    onChange={(e) => setSearchType(e.target.value)}
                    className="form-select"
                  >
                    <option value="class">Student Class</option>
                    <option value="vehicle">Vehicle Number</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={5}>
                <Form.Group controlId="searchInput">
                  <Form.Label>
                    {searchType === "class"
                      ? "Enter Class"
                      : "Enter Vehicle Number"}
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder={
                      searchType === "class" ? "e.g., 5" : "e.g., TN12AB1234"
                    }
                    required
                    className="form-control"
                  />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100 btn btn-primary"
                >
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
      {loading && (
        <div className="d-flex justify-content-center my-4">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      {result && searchType === "class" && (
        <>
          <h4 className="mt-4 mb-3">Vehicles for Class {searchValue}</h4>
          {result.report.length > 0 ? (
            <Table
              responsive
              striped
              bordered
              hover
              className="align-middle table-lg"
            >
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
                      <ul className="list-group list-group-flush small">
                        {vehicle.students.map((student, i) => (
                          <li key={i} className="list-group-item px-0 py-1">
                            {student.name} (Class {student.className})
                          </li>
                        ))}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-info text-center" role="alert">
              No transport data found for this class.
            </div>
          )}
        </>
      )}
      {result && searchType === "vehicle" && (
        <>
          <h4 className="mt-4 mb-3">
            Assigned Students for Vehicle: {searchValue}
          </h4>
          <Card className="shadow-sm border-0 mb-4">
            <Card.Body>
              <Table bordered className="mb-0">
                <tbody>
                  <tr>
                    <th className="bg-light">Vehicle Number</th>
                    <td>{result.vehicle.vehicleNumber}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Driver Name</th>
                    <td>{result.vehicle.driverName}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Size</th>
                    <td>{result.vehicle.size}</td>
                  </tr>
                  <tr>
                    <th className="bg-light">Total Students</th>
                    <td>{result.students.length}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <h5 className="mb-3">Student List</h5>
          {result.students.length > 0 ? (
            <>
              <Table responsive striped bordered hover className="align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                  </tr>
                </thead>
                <tbody>
                  {getPaginatedStudents().map((student, index) => (
                    <tr key={index}>
                      <td>{student.studentName}</td>
                      <td>{student.className}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {totalPages > 1 && (
                <nav
                  aria-label="Page navigation"
                  className="d-flex justify-content-center mt-3"
                >
                  <ul className="pagination">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage - 1)}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages).keys()].map((number) => (
                      <li
                        key={number + 1}
                        className={`page-item ${
                          currentPage === number + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => paginate(number + 1)}
                        >
                          {number + 1}
                        </button>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => paginate(currentPage + 1)}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          ) : (
            <div className="alert alert-info text-center" role="alert">
              No students assigned to this vehicle.
            </div>
          )}
        </>
      )}
    </Container>
  );
};
export default TransportUsers;
