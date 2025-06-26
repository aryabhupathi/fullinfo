// import React, { useState, useEffect } from "react";
// const ManageTransport = () => {
//   const [formData, setFormData] = useState({
//     driverName: "",
//     mobileNumber: "",
//     size: "",
//     transportNumber: "",
//     routeName: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [loading, setLoading] = useState(false);
//   const [transportData, setTransportData] = useState([]);
//   const [newTransport, setNewtransport] = useState(false)
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   const validate = () => {
//     const newErrors = {};
//     let hasError = false;
//     const { driverName, mobileNumber, size, transportNumber, routeName } =
//       formData;
//     if (!driverName.trim()) {
//       newErrors.driverName = "Driver name is required";
//       hasError = true;
//     } else if (!/^[a-zA-Z\s]+$/.test(driverName.trim())) {
//       newErrors.driverName = "Only letters and spaces allowed";
//       hasError = true;
//     }
//     if (!mobileNumber || !/^[0-9]{10}$/.test(mobileNumber)) {
//       newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
//       hasError = true;
//     }
//     if (!transportNumber || !/^[A-Z][0-9]{3}$/.test(transportNumber)) {
//       newErrors.transportNumber =
//         "Enter a valid transport number (e.g., A-009)";
//       hasError = true;
//     }
//     if (!routeName || !/^[a-zA-Z\s]+$/.test(routeName)) {
//       newErrors.routeName = "Only letters and spaces allowed";
//       hasError = true;
//     }
//     if (!size) {
//       newErrors.size = "Size is required";
//       hasError = true;
//     }
//     setErrors(newErrors);
//     return !hasError;
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     try {
//       const response = await fetch(
//         "http://localhost:1111/transport/addtransport",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       );
//       const data = await response.json();
//       if (data.status === "PASS") {
//         setMessage({
//           type: "success",
//           text: "Transport registered successfully!",
//         });
//         handleReset();
//         fetchTransports(); // Refresh list after saving
//       } else {
//         setMessage({ type: "danger", text: "Registration failed. Try again." });
//       }
//     } catch (error) {
//       setMessage({ type: "danger", text: `Server error: ${error.message}` });
//     } finally {
//       setLoading(false);
//       setTimeout(() => setMessage({ type: "", text: "" }), 4000);
//     }
//   };
//   const fetchTransports = () => {
//     setLoading(true);
//     fetch("http://localhost:1111/transport/transportdetails")
//       .then((res) => res.json())
//       .then((data) => {
//         setTransportData(data.transports);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching transports:", error);
//         setMessage({ type: "danger", text: "Failed to load transport data." });
//         setLoading(false);
//       });
//   };
//   useEffect(() => {
//     fetchTransports();
//   }, []);
//   const handleReset = () => {
//     setFormData({
//       driverName: "",
//       mobileNumber: "",
//       size: "",
//       transportNumber: "",
//       routeName: "",
//     });
//     setErrors({});
//   };
//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">Manage Transport</h2>
//       {message.text && (
//         <div
//           className={`alert alert-${message.type} alert-dismissible fade show`}
//           role="alert"
//         >
//           {message.text}
//           <button
//             type="button"
//             className="btn-close"
//             aria-label="Close"
//             onClick={() => setMessage({ type: "", text: "" })}
//           ></button>
//         </div>
//       )}
//       <div style={{border:'2px solid red', marginBottom:'20px'}}>
//       <div className="d-flex justify-content-end mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Search"
//           style={{ width: "200px" }}
//         />
//         <button onClick={()=>{setNewtransport(!newTransport)}}><h5 className="text-center bg-danger text-white p-2 rounded">
//             New Transport
//           </h5></button>
//       </div>
//       <div className="row">
//         <div className="col-md-4 bg-light p-4 rounded shadow-sm">
          
//           {newTransport &&
//            <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Transport Number</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="transportNumber"
//                 value={formData.transportNumber}
//                 onChange={handleChange}
//                 placeholder="e.g., A-001"
//               />
//               {errors.transportNumber && (
//                 <div className="text-danger">{errors.transportNumber}</div>
//               )}
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Route Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="routeName"
//                 value={formData.routeName}
//                 onChange={handleChange}
//                 placeholder="e.g., City Center"
//               />
//               {errors.routeName && (
//                 <div className="text-danger">{errors.routeName}</div>
//               )}
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Size</label>
//               <select
//                 className="form-select"
//                 name="size"
//                 value={formData.size}
//                 onChange={handleChange}
//               >
//                 <option value="">Select Size</option>
//                 <option value="small">Small</option>
//                 <option value="medium">Medium</option>
//                 <option value="large">Large</option>
//               </select>
//               {errors.size && <div className="text-danger">{errors.size}</div>}
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Driver Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 name="driverName"
//                 value={formData.driverName}
//                 onChange={handleChange}
//                 placeholder="e.g., John Doe"
//               />
//               {errors.driverName && (
//                 <div className="text-danger">{errors.driverName}</div>
//               )}
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Driver Mobile No</label>
//               <input
//                 type="tel"
//                 className="form-control"
//                 name="mobileNumber"
//                 value={formData.mobileNumber}
//                 onChange={handleChange}
//                 placeholder="10-digit number"
//               />
//               {errors.mobileNumber && (
//                 <div className="text-danger">{errors.mobileNumber}</div>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="btn btn-primary w-100"
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save"}
//             </button>
//           </form>}
//         </div>
//         <div className="col-md-8 mt-4 mt-md-0">
//           <div className="table-responsive">
//             <h5>Transport List</h5>
//             {loading ? (
//               <p>Loading transport data...</p>
//             ) : transportData.length === 0 ? (
//               <p>No transport records found.</p>
//             ) : (
//               <table className="table table-striped table-bordered">
//                 <thead className="table-dark">
//                   <tr>
//                     <th>T-Id</th>
//                     <th>T-Number</th>
//                     <th>Type</th>
//                     <th>Transport Route</th>
//                     <th>Driver</th>
//                     <th>Mobile No</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {transportData.map((item, index) => (
//                     <tr key={index}>
//                       <td>{index + 1}</td>
//                       <td>{item.transportNumber}</td>
//                       <td>{item.size}</td>
//                       <td>{item.routeName}</td>
//                       <td>{item.driverName}</td>
//                       <td>{item.mobileNumber}</td>
//                       <td>
//                         <button className="btn btn-warning btn-sm">
//                           Delete
//                         </button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             )}
//           </div>
//         </div>
//       </div>
//       </div>
//     </div>
//   );
// };
// export default ManageTransport;


import React, { useState, useEffect } from "react";

const ManageTransport = () => {
  const [formData, setFormData] = useState({
    driverName: "",
    mobileNumber: "",
    size: "",
    transportNumber: "",
    routeName: "",
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [transportData, setTransportData] = useState([]);
  const [newTransport, setNewtransport] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    let hasError = false;

    const { driverName, mobileNumber, size, transportNumber, routeName } =
      formData;

    if (!driverName.trim()) {
      newErrors.driverName = "Driver name is required";
      hasError = true;
    } else if (!/^[a-zA-Z\s]+$/.test(driverName.trim())) {
      newErrors.driverName = "Only letters and spaces allowed";
      hasError = true;
    }

    if (!mobileNumber || !/^[0-9]{10}$/.test(mobileNumber)) {
      newErrors.mobileNumber = "Enter a valid 10-digit mobile number";
      hasError = true;
    }

    if (!transportNumber || !/^[A-Z][0-9]{3}$/.test(transportNumber)) {
      newErrors.transportNumber = "Enter a valid transport number (e.g., A009)";
      hasError = true;
    }

    if (!routeName || !/^[a-zA-Z\s]+$/.test(routeName)) {
      newErrors.routeName = "Only letters and spaces allowed";
      hasError = true;
    }

    if (!size) {
      newErrors.size = "Size is required";
      hasError = true;
    }

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:1111/transport/addtransport",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      if (data.status === "PASS") {
        setMessage({
          type: "success",
          text: "Transport registered successfully!",
        });
        handleReset();
        fetchTransports(); // Refresh list after saving
      } else {
        setMessage({ type: "danger", text: "Registration failed. Try again." });
      }
    } catch (error) {
      setMessage({ type: "danger", text: `Server error: ${error.message}` });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage({ type: "", text: "" }), 4000);
    }
  };

  const fetchTransports = () => {
    setLoading(true);
    fetch("http://localhost:1111/transport/transportdetails")
      .then((res) => res.json())
      .then((data) => {
        setTransportData(data.transports || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching transports:", error);
        setMessage({ type: "danger", text: "Failed to load transport data." });
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  const handleReset = () => {
    setFormData({
      driverName: "",
      mobileNumber: "",
      size: "",
      transportNumber: "",
      routeName: "",
    });
    setErrors({});
  };

  const handleDelete = (index) => {
    // Placeholder for delete logic
    const updatedList = [...transportData];
    updatedList.splice(index, 1);
    setTransportData(updatedList);
    setMessage({ type: "info", text: "Record deleted successfully." });
    setTimeout(() => setMessage({ type: "", text: "" }), 4000);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Manage Transport</h2>

      {/* Alert Message */}
      {message.text && (
        <div
          className={`alert alert-${message.type} alert-dismissible fade show`}
          role="alert"
        >
          {message.text}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setMessage({ type: "", text: "" })}
          ></button>
        </div>
      )}

      {/* Search & New Transport Button */}
      <div className="card border-danger mb-4 p-3 shadow-sm">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <input
            type="text"
            className="form-control w-auto me-auto"
            placeholder="Search"
            style={{ maxWidth: "200px" }}
          />
          <button
            className="btn btn-danger d-flex align-items-center gap-2"
            onClick={() => setNewtransport(!newTransport)}
            aria-expanded={newTransport}
          >
            <span>{newTransport ? "Hide Form" : "New Transport"}</span>
          </button>
        </div>
      </div>

      {/* Conditional Form */}
      {newTransport && (
        <div className="row">
          <div className= "row bg-light p-4 rounded shadow-sm mb-4">
            <h5 className="mb-3">Add New Transport</h5>
            <form onSubmit={handleSubmit}>
              {/* Transport Number */}
              <div className="mb-3">
                <label htmlFor="transportNumber" className="form-label">
                  Transport Number
                </label>
                <input
                  id="transportNumber"
                  type="text"
                  className="form-control"
                  name="transportNumber"
                  value={formData.transportNumber}
                  onChange={handleChange}
                  placeholder="e.g., A001"
                />
                {errors.transportNumber && (
                  <small className="text-danger">{errors.transportNumber}</small>
                )}
              </div>

              {/* Route Name */}
              <div className="mb-3">
                <label htmlFor="routeName" className="form-label">
                  Route Name
                </label>
                <input
                  id="routeName"
                  type="text"
                  className="form-control"
                  name="routeName"
                  value={formData.routeName}
                  onChange={handleChange}
                  placeholder="e.g., City Center"
                />
                {errors.routeName && (
                  <small className="text-danger">{errors.routeName}</small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="routeName" className="form-label">
                  From
                </label>
                <input
                  id="routeFrom"
                  type="text"
                  className="form-control"
                  name="routeFrom"
                  value={formData.routeFrom}
                  onChange={handleChange}
                  placeholder="e.g., City Center"
                />
                {errors.routeName && (
                  <small className="text-danger">{errors.routeFrom}</small>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="routeName" className="form-label">
                  To
                </label>
                <input
                  id="routeTo"
                  type="text"
                  className="form-control"
                  name="routeTo"
                  value={formData.routeTo}
                  onChange={handleChange}
                  placeholder="e.g., City Center"
                />
                {errors.routeName && (
                  <small className="text-danger">{errors.routeTo}</small>
                )}
              </div>

              {/* Size Selection */}
              <div className="mb-3">
                <label htmlFor="size" className="form-label">
                  Size
                </label>
                <select
                  id="size"
                  className="form-select"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                >
                  <option value="">Select Size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
                {errors.size && (
                  <small className="text-danger">{errors.size}</small>
                )}
              </div>

              {/* Driver Name */}
              <div className="mb-3">
                <label htmlFor="driverName" className="form-label">
                  Driver Name
                </label>
                <input
                  id="driverName"
                  type="text"
                  className="form-control"
                  name="driverName"
                  value={formData.driverName}
                  onChange={handleChange}
                  placeholder="e.g., John Doe"
                />
                {errors.driverName && (
                  <small className="text-danger">{errors.driverName}</small>
                )}
              </div>

              {/* Mobile Number */}
              <div className="mb-3">
                <label htmlFor="mobileNumber" className="form-label">
                  Mobile No.
                </label>
                <input
                  id="mobileNumber"
                  type="tel"
                  className="form-control"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  placeholder="10-digit number"
                />
                {errors.mobileNumber && (
                  <small className="text-danger">{errors.mobileNumber}</small>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Transport Table */}
      <div className="table-responsive mt-4">
        <h5>Transport List</h5>
        {loading ? (
          <p>Loading transport data...</p>
        ) : transportData.length === 0 ? (
          <p>No transport records found.</p>
        ) : (
          <table className="table table-striped table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>T-Number</th>
                <th>Type</th>
                <th>Route</th>
                <th>Driver</th>
                <th>Mobile</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {transportData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.transportNumber}</td>
                  <td>{item.size}</td>
                  <td>{item.routeName}</td>
                  <td>{item.driverName}</td>
                  <td>{item.mobileNumber}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ManageTransport;