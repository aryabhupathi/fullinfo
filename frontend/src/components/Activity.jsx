// import React, { useState } from "react";
// const Activity = () => {
//   const [formData, setFormData] = useState({
//     activityName: "",
//     startingDate: "",
//     endingDate: "",
//     headName: "",
//     description: "",
//   });
//   const [message, setMessage] = useState("");
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Form Data Submitted:", formData);
//     try {
//       const response = await fetch(
//         "http://localhost:1111/activity/addActivity",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(formData),
//         }
//       );
//       const data = await response.json();
//       if (data.status === "PASS") {
//         setMessage({ type: "success", text: "Activity added successfully!" });
//         handleReset();
//       } else {
//         setMessage({ type: "danger", text: "Failed to add exam." });
//       }
//     } catch (error) {
//       setMessage({ type: "danger", text: `Server error: ${error.message}` });
//     } finally {
//       // setLoading(false);
//       setTimeout(() => setMessage({ type: "", text: "" }), 4000);
//     }
//   };
//   const handleReset = () => {
//     setFormData({
//       activityName: "",
//       startingDate: "",
//       endingDate: "",
//       headName: "",
//       description: "",
//     });
//   };
//   return (
//     <div className="container mt-4">
//       <h2 className="text-center mb-4">New Activity</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="activityName" className="form-label">
//             Activity Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="activityName"
//             name="activityName"
//             placeholder="Enter Activity Name"
//             value={formData.activityName}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="startDate" className="form-label">
//             Activity Start Date
//           </label>
//           <input
//             type="date"
//             className="form-control"
//             id="startDate"
//             name="startingDate"
//             value={formData.startingDate}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="endDate" className="form-label">
//             Activity End Date
//           </label>
//           <input
//             type="date"
//             className="form-control"
//             id="endDate"
//             name="endingDate"
//             value={formData.endingDate}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="activeHead" className="form-label">
//             Active Head Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="activeHead"
//             name="headName"
//             placeholder="Enter Active Head Name"
//             value={formData.headName}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="aboutActivity" className="form-label">
//             About Activity
//           </label>
//           <textarea
//             className="form-control"
//             id="aboutActivity"
//             name="description"
//             rows="5"
//             placeholder="Enter details about the activity"
//             value={formData.description}
//             onChange={handleChange}
//           ></textarea>
//         </div>
//         <div className="d-grid gap-2 d-md-flex justify-content-md-end">
//           <button type="submit" className="btn btn-primary me-md-2">
//             Save Activity
//           </button>
//           <button type="button" className="btn btn-danger">
//             Close
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };
// export default Activity;


import React, { useState } from "react";

const Activity = () => {
  const [formData, setFormData] = useState({
    activityName: "",
    startingDate: "",
    endingDate: "",
    headName: "",
    description: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    try {
      const response = await fetch("http://localhost:1111/activity/addActivity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.status === "PASS") {
        setMessage({ type: "success", text: "Activity added successfully!" });
        handleReset();
      } else {
        setMessage({ type: "danger", text: "Failed to add activity." });
      }
    } catch (error) {
      setMessage({ type: "danger", text: `Server error: ${error.message}` });
    } finally {
      setTimeout(() => setMessage({ type: "", text: "" }), 4000);
    }
  };

  const handleReset = () => {
    setFormData({
      activityName: "",
      startingDate: "",
      endingDate: "",
      headName: "",
      description: "",
    });
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-sm border-0 rounded">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">New Activity</h3>
            </div>
            <div className="card-body p-4">
              {message.text && (
                <div className={`alert alert-${message.type}`} role="alert">
                  {message.text}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="activityName" className="form-label fw-bold">
                    Activity Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="activityName"
                    name="activityName"
                    placeholder="Enter Activity Name"
                    value={formData.activityName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="startDate" className="form-label fw-bold">
                      Start Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      name="startingDate"
                      value={formData.startingDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="endDate" className="form-label fw-bold">
                      End Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      name="endingDate"
                      value={formData.endingDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="activityHead" className="form-label fw-bold">
                    Activity Head Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="activityHead"
                    name="headName"
                    placeholder="Enter Activity Head Name"
                    value={formData.headName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="aboutActivity" className="form-label fw-bold">
                    About Activity
                  </label>
                  <textarea
                    className="form-control"
                    id="aboutActivity"
                    name="description"
                    rows="4"
                    placeholder="Enter details about the activity"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button type="submit" className="btn btn-success px-4">
                    Save Activity
                  </button>
                  <button type="reset" className="btn btn-danger px-4" onClick={handleReset}>
                    Reset
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;