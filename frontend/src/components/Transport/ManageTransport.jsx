import React, { useState, useEffect } from "react";
import Addnewvehicle from "./Addnewvehicle";
import AssignStudent from "./AssignStudent";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Table,
  Pagination,
  Alert,
} from "react-bootstrap";
const ManageTransport = () => {
  const [transportData, setTransportData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [mode, setMode] = useState("list");
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const res = await fetch("http://localhost:1111/transport");
        const data = await res.json();
        setTransportData(data.transports || []);
      } catch (error) {
        setMessage({ type: "danger", text: "Failed to load transport data." });
      } finally {
        setLoading(false);
      }
    };
    fetchTransports();
  }, []);
  const filteredTransports = transportData.filter(
    (transport) =>
      transport.destination
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transport.routeNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTransports.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredTransports.length / itemsPerPage);
  const handleEditTransport = (transport) => {
    setSelectedTransport(transport);
    setMode("edit");
  };
  const handleAssignStudent = (transport) => {
    setSelectedTransport(transport);
    setMode("assign");
  };
  const closeForms = () => {
    setMode("list");
    setSelectedTransport(null);
    setCurrentPage(1);
  };
  return (
    <Container className="py-4">
      <Row className="mb-4 text-center">
        <Col>
          <h2 className="fw-bold">Transport Management</h2>
          <p className="text-muted">
            Add, edit, or assign students to transport vehicles.
          </p>
        </Col>
      </Row>
      {message.text && (
        <Alert
          variant={message.type}
          onClose={() => setMessage({ type: "", text: "" })}
          dismissible
        >
          {message.text}
        </Alert>
      )}
      {mode === "list" && (
        <Row className="align-items-center mb-4 g-3 justify-content-between">
          <Col md={8}>
            <Form.Group controlId="search">
              <Form.Control
                type="text"
                placeholder="Search by route number or destination..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-pill"
              />
            </Form.Group>
          </Col>
          <Col md={3} className="ms-auto">
            <Button
              variant="success"
              onClick={() => setMode("add")}
              className="w-100 rounded-pill"
            >
              + Add New Vehicle
            </Button>
          </Col>
        </Row>
      )}
      {["add", "edit", "assign"].includes(mode) && (
        <Row className="mb-4">
          <Col>
            <Button
              variant="secondary"
              onClick={closeForms}
              className="rounded-pill"
            >
              ← Back to List
            </Button>
          </Col>
        </Row>
      )}
      {mode === "add" && (
        <Card className="shadow-sm border-0 mb-4">
          <Card.Header className="bg-white border-bottom">
            <Card.Title className="mb-0 fs-5 text-primary">
              Add New Transport
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Addnewvehicle
              onSuccess={(newTransport) => {
                setTransportData([newTransport, ...transportData]);
                setMode("list");
              }}
              onCancel={closeForms}
            />
          </Card.Body>
        </Card>
      )}
      {mode === "edit" && selectedTransport && (
        <Card className="shadow-sm border-0 mb-4">
          <Card.Header className="bg-white border-bottom">
            <Card.Title className="mb-0 fs-5 text-primary">
              Edit Transport: {selectedTransport.vehicleNumber}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <Addnewvehicle
              initialData={selectedTransport}
              onSuccess={(updatedTransport) => {
                setTransportData(
                  transportData.map((t) =>
                    t._id === updatedTransport._id ? updatedTransport : t
                  )
                );
                closeForms();
              }}
              onCancel={closeForms}
            />
          </Card.Body>
        </Card>
      )}
      {mode === "assign" && selectedTransport && (
        <Card className="shadow-sm border-0 mb-4">
          <Card.Header className="bg-white border-bottom">
            <Card.Title className="mb-0 fs-5 text-primary">
              Assign Student to: {selectedTransport.vehicleNumber}
            </Card.Title>
          </Card.Header>
          <Card.Body>
            <AssignStudent transport={selectedTransport} onClose={closeForms} />
          </Card.Body>
        </Card>
      )}
      {mode === "list" && (
        <>
          {loading ? (
            <Card className="text-center p-4 shadow-sm">
              <p className="mb-0 text-muted">Loading transport data...</p>
            </Card>
          ) : currentItems.length === 0 ? (
            <Card className="text-center p-4 shadow-sm">
              <p className="mb-0 text-muted">No transport records found.</p>
            </Card>
          ) : (
            <>
              <Card className="shadow-sm border-0">
                <Card.Body>
                  <Table
                    responsive
                    striped
                    bordered
                    hover
                    className="mb-0 align-middle text-center"
                  >
                    <thead className="table-light">
                      <tr>
                        <th>Route</th>
                        <th>Type</th>
                        <th>Destination</th>
                        <th>Driver</th>
                        <th>Mobile</th>
                        <th>Vehicle Number</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentItems.map((item) => (
                        <tr key={item._id}>
                          <td>{item.routeNumber}</td>
                          <td>{item.size}</td>
                          <td>{item.destination}</td>
                          <td>{item.driverName}</td>
                          <td>{item.driverMobileNumber}</td>
                          <td>{item.vehicleNumber}</td>
                          <td>
                            {searchQuery.trim() !== "" ? (
                              <Button
                                size="sm"
                                variant="info"
                                onClick={() => handleAssignStudent(item)}
                                className="rounded-pill"
                              >
                                Assign Student
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="warning"
                                onClick={() => handleEditTransport(item)}
                                className="rounded-pill"
                              >
                                Edit
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
              {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4">
                  <Pagination>
                    <Pagination.Prev
                      onClick={() => setCurrentPage((prev) => prev - 1)}
                      disabled={currentPage === 1}
                    />
                    {[...Array(totalPages).keys()].map((number) => (
                      <Pagination.Item
                        key={number + 1}
                        active={number + 1 === currentPage}
                        onClick={() => setCurrentPage(number + 1)}
                      >
                        {number + 1}
                      </Pagination.Item>
                    ))}
                    <Pagination.Next
                      onClick={() => setCurrentPage((prev) => prev + 1)}
                      disabled={currentPage === totalPages}
                    />
                  </Pagination>
                </div>
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};
export default ManageTransport;
