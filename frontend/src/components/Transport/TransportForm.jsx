// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // For routing
// const TransportForm = ({ initialData = null }) => {
//   const [formData, setFormData] = useState({
//     driverName: "",
//     mobileNumber: "",
//     size: "",
//     transportNumber: "",
//     routeName: "",
//     routeFrom: "",
//     routeTo: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState({ type: "", text: "" });
//   const [loading, setLoading] = useState(false);
//   const isEditMode = !!initialData;
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
//       newErrors.transportNumber = "Enter a valid transport number (e.g., A001)";
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
//       const url = isEditMode
//         ? `http://localhost:1111/transport/updatetransport/${formData._id}`
//         : `http://localhost:1111/transport/addtransport`;
//       const method = isEditMode ? "PUT" : "POST";
//       const response = await fetch(url, {
//         method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       if (data.status === "PASS") {
//         setMessage({
//           type: "success",
//           text: isEditMode
//             ? "Transport updated successfully!"
//             : "Transport added successfully!",
//         });
//         setTimeout(() => setMessage({}), 4000);
//         if (!isEditMode) handleReset();
//       } else {
//         setMessage({
//           type: "danger",
//           text: isEditMode
//             ? "Failed to update transport"
//             : "Failed to add transport",
//         });
//       }
//     } catch (error) {
//       setMessage({ type: "danger", text: `Server error: ${error.message}` });
//     } finally {
//       setLoading(false);
//     }
//   };
//   const handleReset = () => {
//     setFormData({
//       driverName: "",
//       mobileNumber: "",
//       size: "",
//       transportNumber: "",
//       routeName: "",
//       routeFrom: "",
//       routeTo: "",
//     });
//     setErrors({});
//   };
//   useEffect(() => {
//     if (isEditMode && initialData) {
//       setFormData(initialData);
//     }
//   }, [initialData, isEditMode]);
//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">
//         {isEditMode ? "Edit Transport" : "Add New Transport"}
//       </h2>
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
//             onClick={() => setMessage({})}
//           ></button>
//         </div>
//       )}
//       <div className="row justify-content-center">
//         <div className="col-md-8 bg-light p-4 rounded shadow-sm">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="transportNumber" className="form-label">
//                 Transport Number
//               </label>
//               <input
//                 id="transportNumber"
//                 type="text"
//                 className="form-control"
//                 name="transportNumber"
//                 value={formData.transportNumber}
//                 onChange={handleChange}
//                 placeholder="e.g., A001"
//               />
//               {errors.transportNumber && (
//                 <small className="text-danger">{errors.transportNumber}</small>
//               )}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="routeName" className="form-label">
//                 Route Name
//               </label>
//               <input
//                 id="routeName"
//                 type="text"
//                 className="form-control"
//                 name="routeName"
//                 value={formData.routeName}
//                 onChange={handleChange}
//                 placeholder="e.g., City Center"
//               />
//               {errors.routeName && (
//                 <small className="text-danger">{errors.routeName}</small>
//               )}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="routeFrom" className="form-label">
//                 From
//               </label>
//               <input
//                 id="routeFrom"
//                 type="text"
//                 className="form-control"
//                 name="routeFrom"
//                 value={formData.routeFrom}
//                 onChange={handleChange}
//                 placeholder="e.g., Delhi"
//               />
//               {errors.routeFrom && (
//                 <small className="text-danger">{errors.routeFrom}</small>
//               )}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="routeTo" className="form-label">
//                 To
//               </label>
//               <input
//                 id="routeTo"
//                 type="text"
//                 className="form-control"
//                 name="routeTo"
//                 value={formData.routeTo}
//                 onChange={handleChange}
//                 placeholder="e.g., Gurgaon"
//               />
//               {errors.routeTo && (
//                 <small className="text-danger">{errors.routeTo}</small>
//               )}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="size" className="form-label">
//                 Size
//               </label>
//               <select
//                 id="size"
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
//               {errors.size && (
//                 <small className="text-danger">{errors.size}</small>
//               )}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="driverName" className="form-label">
//                 Driver Name
//               </label>
//               <input
//                 id="driverName"
//                 type="text"
//                 className="form-control"
//                 name="driverName"
//                 value={formData.driverName}
//                 onChange={handleChange}
//                 placeholder="e.g., John Doe"
//               />
//               {errors.driverName && (
//                 <small className="text-danger">{errors.driverName}</small>
//               )}
//             </div>
//             <div className="mb-3">
//               <label htmlFor="mobileNumber" className="form-label">
//                 Mobile No.
//               </label>
//               <input
//                 id="mobileNumber"
//                 type="tel"
//                 className="form-control"
//                 name="mobileNumber"
//                 value={formData.mobileNumber}
//                 onChange={handleChange}
//                 placeholder="10-digit number"
//               />
//               {errors.mobileNumber && (
//                 <small className="text-danger">{errors.mobileNumber}</small>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="btn btn-primary w-100"
//               disabled={loading}
//             >
//               {loading
//                 ? isEditMode
//                   ? "Updating..."
//                   : "Saving..."
//                 : isEditMode
//                 ? "Update Transport"
//                 : "Add Transport"}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default TransportForm;
