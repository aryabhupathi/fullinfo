import React from "react";
const FeePayment = () => {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">
        <i className="bi bi-cash-stack text-primary"></i> Fee Collection
      </h2>
      <div className="row justify-content-center">
        <div className="col-md-2">
          <select className="form-select">
            <option value="2020-2021">2020-2021</option>
            <option value="2021-2022">2021-2022</option>
            <option value="2022-2023">2022-2023</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select">
            <option value="all">All Class</option>
            <option value="class1">Class 1</option>
            <option value="class2">Class 2</option>
            <option value="class3">Class 3</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select">
            <option value="all">All Section</option>
            <option value="sectionA">Section A</option>
            <option value="sectionB">Section B</option>
            <option value="sectionC">Section C</option>
          </select>
        </div>
        <div className="col-md-2">
          <input type="text" className="form-control" placeholder="Mobile No" />
        </div>
        <div className="col-md-2">
          <select className="form-select">
            <option value="all">Months</option>
            <option value="january">January</option>
            <option value="february">February</option>
            <option value="march">March</option>
          </select>
        </div>
        <div className="col-md-2">
          <select className="form-select">
            <option value="all">Due</option>
            <option value="paid">Paid</option>
            <option value="due">Due</option>
          </select>
        </div>
        <div className="col-md-2">
          <button type="button" className="btn btn-primary w-100">
            Search
          </button>
        </div>
      </div>
      <div className="text-center mt-5 text-danger">No Records !</div>
    </div>
  );
};
export default FeePayment;
