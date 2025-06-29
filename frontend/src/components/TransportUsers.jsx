import React, { useState, useEffect } from "react";
const TransportReport = () => {
  const [transportData, setTransportData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("X");
  const [selectedVehicle, setSelectedVehicle] = useState("VH-101");
  const fetchTransportData = async () => {
    try {
      const response = await fetch("http://localhost:1111/admission/students");
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setTransportData(data);
    } catch (error) {
      console.error("Error fetching transport data:", error);
    }
  };
  useEffect(() => {
    fetchTransportData();
  }, []);
  const filteredStudents = transportData.filter(
    (student) =>
      student.className === selectedClass &&
      student.transport?.vehicleId === selectedVehicle
  );
  return (
    <div>
      <h2>Student Transport Report</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Class:
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="VI">VI</option>
            <option value="VII">VII</option>
            <option value="VIII">VIII</option>
            <option value="IX">IX</option>
            <option value="X">X</option>
          </select>
        </label>
        <label style={{ marginLeft: "1rem" }}>
          Vehicle:
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
          >
            <option value="VH-101">VH-101</option>
            <option value="VH-102">VH-102</option>
            <option value="VH-103">VH-103</option>
          </select>
        </label>
      </div>
      {filteredStudents.length > 0 ? (
        <ul>
          {filteredStudents.map((student) => (
            <li key={student.id}>
              {student.studentName} ({student.class} - {student.section})
            </li>
          ))}
        </ul>
      ) : (
        <p>No students found matching the criteria.</p>
      )}
    </div>
  );
};
export default TransportReport;
