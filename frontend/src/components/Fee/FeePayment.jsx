import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormControl,
  Button,
  Table,
  Badge,
  Card,
  Spinner,
} from "react-bootstrap";
const FEE_URL = "http://localhost:1111/fee";
const ACTIVITY_URL = "http://localhost:1111/activity";
const TRANSPORT_URL = "http://localhost:1111/transport";
const EXAM_URL = "http://localhost:1111/exam";
const PENDING_FEES_URL = `${FEE_URL}/pendingfee`;
const STUDENT_LOOKUP_URL = `${FEE_URL}/student`;
const defaultForm = {
  studentName: "",
  rollNumber: "",
  className: "",
  section: "",
  feeType: "",
  exam: "",
  activity: "",
  transport: "",
  term: "",
  totalFee: "",
  paidAmount: "",
  dueDate: "",
};
const classterm = [
  { className: "1", fees: "1000" },
  { className: "2", fees: "2500" },
  { className: "3", fees: "4500" },
  { className: "4", fees: "7500" },
  { className: "5", fees: "10000" },
];
const FeePayment = () => {
  const [fees, setFees] = useState([]);
  const [formData, setFormData] = useState(defaultForm);
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [rollFilter, setRollFilter] = useState("");
  const [activityData, setActivityData] = useState([]);
  const [examData, setExamData] = useState([]);
  const [transportData, setTransportData] = useState([]);
  useEffect(() => {
    fetchPendingFees();
    fetchActivities();
    fetchExams();
    fetchTransports();
  }, []);
  const fetchPendingFees = async () => {
    try {
      const res = await fetch(PENDING_FEES_URL);
      if (res.ok) setFees(await res.json());
    } catch (err) {
      console.error("Failed to load pending fees", err);
    }
  };
  const fetchActivities = async () => {
    try {
      const res = await fetch(ACTIVITY_URL);
      if (res.ok) setActivityData(await res.json());
    } catch (err) {
      console.error("Failed to load activities", err);
    }
  };
  const fetchExams = async () => {
    try {
      const res = await fetch(EXAM_URL);
      if (res.ok) setExamData(await res.json());
    } catch (err) {
      console.error("Failed to load exams", err);
    }
  };
  const fetchTransports = async () => {
    try {
      const res = await fetch(TRANSPORT_URL);
      console.log(res, "uuuuuuuuuuuuuuuuuuuuuuuuuu");
      if (res.ok) setTransportData(await res.json());
    } catch (err) {
      console.error("Failed to load transports", err);
    }
  };
  const resetForm = () => {
    setFormData(defaultForm);
    setEditId(null);
  };
  const getStatusBadge = (status) => {
    switch (status) {
      case "Overdue":
        return <Badge bg="danger">Overdue</Badge>;
      case "Partially Paid":
        return (
          <Badge bg="warning" text="dark">
            Partially Paid
          </Badge>
        );
      case "Paid":
        return <Badge bg="success">Paid</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };
  const formatDate = (dateStr) =>
    dateStr ? new Date(dateStr).toISOString().split("T")[0] : "";
  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "rollNumber") {
      try {
        const res = await fetch(`${STUDENT_LOOKUP_URL}?name=${value}`);
        if (res.ok) {
          const data = await res.json();
          setFormData((prev) => ({
            ...prev,
            studentName: data.studentName || "",
            className: data.className || "",
            section: data.section || "",
          }));
        }
      } catch (err) {
        console.error("Student lookup failed:", err);
      }
    }
    if (
      name === "activity" ||
      name === "exam" ||
      name === "transport" ||
      name === "term"
    ) {
      let selected;
      if (name === "activity") {
        selected = activityData.find((act) => act.activityName === value);
        if (selected) {
          setFormData((prev) => ({
            ...prev,
            totalFee: selected.fee || "",
            dueDate: formatDate(selected.date),
          }));
        }
      } else if (name === "exam") {
        selected = examData.find((ex) => ex.examName === value);
        if (selected) {
          setFormData((prev) => ({
            ...prev,
            totalFee: selected.examFee || "",
            dueDate: formatDate(selected.date),
          }));
        }
      } else if (name === "transport") {
        selected = transportData.find((tr) => tr.size === value);
        if (selected) {
          setFormData((prev) => ({
            ...prev,
            totalFee: selected.transportFee || "",
            dueDate: formatDate(selected.date),
          }));
        }
      } else if (name === "term") {
        const classTerm = classterm.find((ct) => ct.className === value);
        if (classTerm) {
          setFormData((prev) => ({
            ...prev,
            totalFee: classTerm.fees || "",
            dueDate: "2025-07-30",
          }));
        }
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData, "ffffffffffffffffffffffffffffffffff");
    const method = editId ? "PUT" : "POST";
    const url = editId ? `${FEE_URL}/update/${editId}` : `${FEE_URL}/payfee`;
    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          totalFee: Number(formData.totalFee),
          paidAmount: Number(formData.paidAmount),
        }),
      });
      console.log(res.body, "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbb");
      if (!res.ok) throw new Error("Submission failed");
      resetForm();
      await fetchPendingFees();
    } catch (err) {
      console.error("Error submitting fee:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleEdit = (fee) => {
    setEditId(fee._id);
    setFormData({
      studentName: fee.studentName || "",
      rollNumber: fee.rollNumber || "",
      className: fee.className || "",
      section: fee.section || "",
      feeType: fee.feeType || "",
      exam: fee.exam || "",
      activity: fee.activity || "",
      transport: fee.transport || "",
      term: fee.term || "",
      totalFee: fee.totalFee || "",
      paidAmount: fee.paidAmount || "",
      dueDate: formatDate(fee.dueDate),
    });
  };
  const filteredFees = fees.filter((fee) =>
    fee.rollNumber.toString().includes(rollFilter.trim())
  );
  console.log(transportData, "sssssssssssssssssssss");
  return (
    <Container fluid className="mt-4">
      <h3 className="mb-4 d-flex align-items-center">
        <span>🎓 Student Fee Management</span>
      </h3>
      <Button variant="primary mb-3" onClick={() => setShowForm(!showForm)}>
        {showForm ? "Hide Form" : "Add New Student"}
      </Button>
      {showForm && (
        <Card className="shadow-sm p-4 mb-5 bg-light">
          <Form onSubmit={handleSubmit}>
            <Row>
              {["studentName", "rollNumber", "className", "section"].map(
                (field) => (
                  <Col md={6} key={field} className="mb-3">
                    <Form.Label>{field.replace(/([A-Z])/g, " $1")}</Form.Label>
                    <FormControl
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                )
              )}
            </Row>
            <Row>
              <Col md={3} className="mb-3">
                <Form.Label>Select Type</Form.Label>
                <Form.Select
                  name="feeType"
                  value={formData.feeType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Type</option>
                  <option value="exam">Exam</option>
                  <option value="activity">Activity</option>
                  <option value="transport">Transport</option>
                  <option value="term">Term</option>
                </Form.Select>
              </Col>
              {formData.feeType && (
                <Col md={3} className="mb-3">
                  <Form.Label>
                    {formData.feeType.charAt(0).toUpperCase() +
                      formData.feeType.slice(1)}
                  </Form.Label>
                  <Form.Select
                    name={formData.feeType}
                    value={formData[formData.feeType]}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select {formData.feeType}</option>
                    {formData.feeType === "activity" &&
                      activityData.map((act) => (
                        <option key={act._id} value={act.activityName}>
                          {act.activityName}
                        </option>
                      ))}
                    {formData.feeType === "exam" &&
                      examData.map((ex) => (
                        <option key={ex._id} value={ex.examName}>
                          {ex.examName}
                        </option>
                      ))}
                    {formData.feeType === "transport" &&
                      transportData.transports.map((tr) => (
                        <option key={tr._id} value={tr.size}>
                          {tr.size}
                        </option>
                      ))}
                    {formData.feeType === "term" &&
                      classterm.map((trm) => (
                        <option key={trm.className} value={trm.className}>
                          {trm.className}
                        </option>
                      ))}
                  </Form.Select>
                </Col>
              )}
              <Col md={3} className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <FormControl
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Label>Total Fee (₹)</Form.Label>
                <FormControl
                  type="number"
                  name="totalFee"
                  value={formData.totalFee}
                  onChange={handleChange}
                  required
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Label>Paid Amount (₹)</Form.Label>
                <FormControl
                  type="number"
                  name="paidAmount"
                  value={formData.paidAmount}
                  onChange={handleChange}
                  required
                />
              </Col>
            </Row>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : editId ? (
                "Update Fee"
              ) : (
                "Add Fee"
              )}
            </Button>
          </Form>
        </Card>
      )}
      <div className="mb-3">
        <Form.Label htmlFor="rollFilter" className="form-label">
          🔍 Filter by Roll Number
        </Form.Label>
        <FormControl
          id="rollFilter"
          type="text"
          value={rollFilter}
          onChange={(e) => setRollFilter(e.target.value)}
          placeholder="Enter roll number"
          className="w-25"
        />
      </div>
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>Student</th>
            <th>Roll</th>
            <th>Class</th>
            <th>Activity</th>
            <th>Total</th>
            <th>Paid</th>
            <th>Balance</th>
            <th>Status</th>
            <th>Due</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredFees.length ? (
            filteredFees.map((fee) => (
              <tr key={fee._id}>
                <td>{fee.studentName}</td>
                <td>{fee.rollNumber}</td>
                <td>{`${fee.className} - ${fee.section}`}</td>
                <td>{fee.activity}</td>
                <td>₹{fee.totalFee}</td>
                <td>₹{fee.paidAmount}</td>
                <td>₹{fee.balance}</td>
                <td>{getStatusBadge(fee.status)}</td>
                <td>{new Date(fee.dueDate).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    onClick={() => handleEdit(fee)}
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center text-muted">
                No matching records found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};
export default FeePayment;
