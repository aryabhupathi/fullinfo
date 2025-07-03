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
import "bootstrap/dist/css/bootstrap.min.css";
const Activity = () => {
  const [formData, setFormData] = useState({
    activityName: "",
    description: "",
    date: "",
    studentClass: "",
    conductedBy: "",
    fee: "",
  });
  const [activities, setActivities] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    fetchActivities();
  }, []);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activities.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(activities.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Optional smooth scroll to top
  };
  const fetchActivities = async () => {
    try {
      const res = await fetch("http://localhost:1111/activity");
      const data = await res.json();
      setActivities(data);
    } catch (err) {
      alert("Failed to load activities.");
      console.error(err);
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:1111/activity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to submit");
      const newActivity = await res.json();
      setActivities([...activities, newActivity]);
      setFormData({
        activityName: "",
        description: "",
        date: "",
        studentClass: "",
        conductedBy: "",
        fee: "",
      });
      setShowForm(false);
      alert("✅ Activity added successfully!");
    } catch (err) {
      alert("❌ Error adding activity.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-dark">Manage Student Activities</h2>
        <p className="text-muted">
          Add and view all school-related activities here.
        </p>
      </div>
      <div className="text-end mb-4">
        <Button
          variant="outline-primary"
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 fw-semibold"
        >
          {showForm ? "Cancel" : "+ Add New Activity"}
        </Button>
      </div>
      {showForm && (
        <Card className="shadow-sm border-0 mb-5">
          <Card.Header className="bg-white border-bottom">
            <h5 className="mb-0 text-primary">Add New Activity</h5>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group controlId="activityName">
                    <Form.Label>Activity Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="activityName"
                      value={formData.activityName}
                      onChange={handleChange}
                      placeholder="Enter activity name"
                      required
                      className="border rounded-pill"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Brief description"
                      required
                      className="border rounded-pill"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3 g-3">
                <Col md={6}>
                  <Form.Group controlId="studentClass">
                    <Form.Label>Student Class</Form.Label>
                    <Form.Control
                      type="text"
                      name="studentClass"
                      value={formData.studentClass}
                      onChange={handleChange}
                      placeholder="e.g. Grade 9"
                      required
                      className="border rounded-pill"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="border rounded-pill"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="mt-3 g-3">
                <Col md={6}>
                  <Form.Group controlId="fee">
                    <Form.Label>Fee</Form.Label>
                    <Form.Control
                      type="text"
                      name="fee"
                      value={formData.fee}
                      onChange={handleChange}
                      placeholder="e.g. $20 or Free"
                      className="border rounded-pill"
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="conductedBy">
                    <Form.Label>Conducted By</Form.Label>
                    <Form.Control
                      type="text"
                      name="conductedBy"
                      value={formData.conductedBy}
                      onChange={handleChange}
                      placeholder="Teacher / Coordinator"
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
                  {loading ? "Submitting..." : "Submit Activity"}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
      <h4 className="mt-5 mb-3 text-secondary">All Activities</h4>
      {activities.length === 0 ? (
        <Card className="text-center p-4 shadow-sm bg-light">
          <p className="mb-0 text-muted">No activities found.</p>
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
                <th>Activity Name</th>
                <th>Date</th>
                <th>Class</th>
                <th>Conducted By</th>
                <th>Fee</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((act, index) => (
                <tr key={act.index}>
                  <td className="fw-semibold">{act.activityName}</td>
                  <td>
                    <Badge bg="secondary" pill>
                      {new Date(act.date).toLocaleDateString()}
                    </Badge>
                  </td>
                  <td>{act.studentClass}</td>
                  <td>{act.conductedBy}</td>
                  <td>{act.fee || <span className="text-muted">Free</span>}</td>
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
export default Activity;
