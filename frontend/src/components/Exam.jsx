import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Table,
  Card,
  Badge,
  Pagination,
} from "react-bootstrap";
const Exam = () => {
  const [formData, setFormData] = useState({
    examType: "",
    examName: "",
    examDate: "",
    examFee: "",
    classConductedFor: "",
    reportingOfficer: "",
    examSubject: "",
  });
  const [exams, setExams] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    fetchExams();
  }, []);
  const fetchExams = async () => {
    try {
      const res = await fetch("http://localhost:1111/exam");
      const data = await res.json();
      setExams(data);
    } catch (err) {
      console.error("Error fetching exams:", err);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:1111/exam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit");
      const newExam = await res.json();
      setExams([...exams, newExam]);
      setFormData({
        examType: "",
        examName: "",
        examDate: "",
        examFee: "",
        classConductedFor: "",
        reportingOfficer: "",
        examSubject: "",
      });
      setShowForm(false);
      alert("✅ Exam added successfully!");
    } catch (err) {
      alert("❌ Error adding exam.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExams = exams.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(exams.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark">Manage Exams</h2>
        <p className="text-muted">
          Add and view all school-related exams here.
        </p>
      </div>
      <div className="text-end mb-4">
        <Button
          variant="outline-primary"
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 fw-semibold"
        >
          {showForm ? "Cancel" : "+ Add New Exam"}
        </Button>
      </div>
      {showForm && (
        <Card className="shadow-sm border-0 mb-5">
          <Card.Header className="bg-white border-bottom">
            <h5 className="mb-0 text-primary">Add New Exam</h5>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group controlId="examType">
                    <Form.Label>Exam Type</Form.Label>
                    <Form.Control
                      as="select"
                      name="examType"
                      value={formData.examType}
                      onChange={handleChange}
                      required
                      className="border rounded-pill"
                    >
                      <option value="">Select</option>
                      <option>Mid Term</option>
                      <option>Final Term</option>
                      <option>Unit Test</option>
                      <option>Quiz</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="examName">
                    <Form.Label>Exam Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="examName"
                      value={formData.examName}
                      onChange={handleChange}
                      placeholder="Enter exam name"
                      required
                      className="border rounded-pill"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3 g-3">
                <Col md={4}>
                  <Form.Group controlId="examDate">
                    <Form.Label>Exam Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="examDate"
                      value={formData.examDate}
                      onChange={handleChange}
                      required
                      className="border rounded-pill"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="examFee">
                    <Form.Label>Exam Fee</Form.Label>
                    <Form.Control
                      type="number"
                      name="examFee"
                      value={formData.examFee}
                      onChange={handleChange}
                      placeholder="Enter fee"
                      required
                      className="border rounded-pill"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group controlId="classConductedFor">
                    <Form.Label>Class Conducted For</Form.Label>
                    <Form.Control
                      type="text"
                      name="classConductedFor"
                      value={formData.classConductedFor}
                      onChange={handleChange}
                      placeholder="e.g. Grade 10"
                      required
                      className="border rounded-pill"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3 g-3">
                <Col md={6}>
                  <Form.Group controlId="reportingOfficer">
                    <Form.Label>Reporting Officer</Form.Label>
                    <Form.Control
                      type="text"
                      name="reportingOfficer"
                      value={formData.reportingOfficer}
                      onChange={handleChange}
                      placeholder="Enter officer name"
                      required
                      className="border rounded-pill"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="examSubject">
                    <Form.Label>Exam Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="examSubject"
                      value={formData.examSubject}
                      onChange={handleChange}
                      placeholder="Enter subject"
                      required
                      className="border rounded-pill"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="mt-4 d-grid">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="rounded-pill py-2 fw-semibold"
                >
                  {loading ? "Submitting..." : "Submit Exam"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
      <h4 className="mt-5 mb-3 text-secondary">All Exams</h4>
      {currentExams.length === 0 ? (
        <Card className="text-center p-4 shadow-sm bg-light">
          <p className="mb-0 text-muted">No exams found.</p>
        </Card>
      ) : (
        <>
          <Table
            striped
            bordered
            hover
            responsive
            className="shadow-sm align-middle"
          >
            <thead className="table-light">
              <tr>
                <th>Type</th>
                <th>Date</th>
                <th>Name</th>
                <th>Class</th>
                <th>Subject</th>
                <th>Officer</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              {currentExams.map((exam, index) => (
                <tr key={exam._id}>
                  <td>
                    <Badge bg="info">{exam.examType}</Badge>
                  </td>
                  <td>
                    <Badge bg="secondary" pill>
                      {new Date(exam.examDate).toLocaleDateString()}
                    </Badge>
                  </td>
                  <td className="fw-semibold">{exam.examName}</td>
                  <td>{exam.classConductedFor}</td>
                  <td>{exam.examSubject}</td>
                  <td>{exam.reportingOfficer}</td>
                  <td>${exam.examFee}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-4">
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {[...Array(totalPages).keys()].map((number) => (
                <Pagination.Item
                  key={number + 1}
                  active={number + 1 === currentPage}
                  onClick={() => handlePageChange(number + 1)}
                >
                  {number + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              />
            </Pagination>
          )}
        </>
      )}
    </Container>
  );
};
export default Exam;
