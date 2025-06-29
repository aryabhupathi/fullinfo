import React, { useState, useEffect } from "react";
import Addnewvehicle from "./Transport/Addnewvehicle";
import AssignStudent from "./Transport/AssignStudent";
const ManageTransport = () => {
  const [transportData, setTransportData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [mode, setMode] = useState("list");
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  useEffect(() => {
    const fetchTransports = async () => {
      try {
        const res = await fetch("http://localhost:1111/transport/");
        const data = await res.json();
        setTransportData(data || []);
      } catch (error) {
        setMessage({ type: "danger", text: "Failed to load transport data." });
      } finally {
        setLoading(false);
      }
    };
    fetchTransports();
  }, []);
  const filteredTransports = transportData.filter((transport) => {
    const destination = transport.destination || "";
    const routeNumber = transport.routeNumber || "";
    return (
      destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      routeNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });
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
    <div className="container mt-4">
      <h2 className="mb-4">Transport Management</h2>
      {message.text && (
        <div className={`alert alert-${message.type}`} role="alert">
          {message.text}
        </div>
      )}
      <div className="d-flex align-items-center justify-content-between mb-4">
        {["add", "edit", "assign"].includes(mode) ? (
          <button className="btn btn-secondary" onClick={closeForms}>
            ← Back to List
          </button>
        ) : (
          <>
            <div className="input-group w-auto flex-grow-1 me-2">
              <input
                type="text"
                className="form-control"
                placeholder="Search transport..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-primary" type="button">
                Search
              </button>
            </div>
            <button className="btn btn-success" onClick={() => setMode("add")}>
              Add New Vehicle
            </button>
          </>
        )}
      </div>
      {mode === "add" && (
        <div className="mt-4">
          <h4>Add New Transport</h4>
          <Addnewvehicle
            onSuccess={(newTransport) => {
              setTransportData([newTransport, ...transportData]);
              setMode("list");
            }}
            onCancel={closeForms}
          />
        </div>
      )}
      {mode === "edit" && selectedTransport && (
        <div className="mt-4">
          <h4>Edit Transport: {selectedTransport.vehicleNumber}</h4>
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
        </div>
      )}
      {mode === "assign" && selectedTransport && (
        <div className="mt-4">
          <h4>Assign Student to: {selectedTransport.vehicleNumber}</h4>
          <AssignStudent transport={selectedTransport} onClose={closeForms} />
        </div>
      )}
      {mode === "list" && (
        <div className="table-responsive mt-4">
          <h5>Transport List</h5>
          {loading ? (
            <p>Loading transport data...</p>
          ) : transportData.length === 0 ? (
            <p>No transport records found.</p>
          ) : (
            <>
              <table className="table table-striped table-bordered table-hover align-middle">
                <thead className="table-dark">
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
                          <button
                            className="btn btn-sm btn-info"
                            onClick={() => handleAssignStudent(item)}
                          >
                            Assign Student
                          </button>
                        ) : (
                          <button
                            className="btn btn-sm btn-warning"
                            onClick={() => handleEditTransport(item)}
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {totalPages > 1 && (
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li
                        key={index + 1}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() => setCurrentPage(index + 1)}
                        >
                          {index + 1}
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
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
export default ManageTransport;
