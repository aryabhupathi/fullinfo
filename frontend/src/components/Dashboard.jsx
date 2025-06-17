import React, { useState, useEffect } from "react";
import { HiDocumentReport } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import { FcRating } from "react-icons/fc";
import { CgNotes } from "react-icons/cg";
import { FaShuttleVan } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { RiGraduationCapFill } from "react-icons/ri";

const Dashboard = () => {
  const [activityCount, setActivityCount] = useState(0);
  const [examCount, setExamCount] = useState(0);
  const [studentCount, setStudentCount] = useState(0);
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("http://localhost:1111/activity/activityList");
        const res1 = await fetch("http://localhost:1111/exam/examList");
        const res2 = await fetch("http://localhost:1111/admission/students");
        const data = await res.json(); const data1 = await res1.json();const data2 = await res2.json();
        if (data && data1 && data2 && data.count !== undefined && data1.count !== undefined && data2.count !== undefined) {
          setActivityCount(data.count)
          setExamCount(data1.count);
          setStudentCount(data2.count);
        }
      } catch (err) {
        console.error("Error fetching activity count:", err);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const cards = [
    { title: "Total Students", icon: <RiGraduationCapFill />, color: "primary",count: loading ? "0" : studentCount },
    { title: "New Admissions", icon: <IoMdAdd />, color: "success", count: 150 },
    { title: "Pending Fees", icon: <TbMoneybag />, color: "warning", count: 75 },
    { title: "Transport Users", icon: <FaShuttleVan />, color: "info", count: 420 },
    { title: "Upcoming Exams", icon: <CgNotes />, color: "danger", count: loading ? "0" : examCount },
    { title: "Activities", icon: <FcRating />, color: "secondary", count: loading ? "0" : activityCount },
    { title: "Staff Members", icon: <IoIosPeople />, color: "dark", count: 85 },
    { title: "Complaints", icon: <HiDocumentReport />, color: "danger", count: 7 },
  ];

  return (
    <div className="d-flex justify-content-center">
      <div className="container text-center mt-4">
        <h2 className="mb-4 fw-bold">Dashboard</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
          {cards.map((card, index) => (
            <div key={index} className="col">
              <div className={`card text-white bg-${card.color} h-100 shadow`}>
                <div className="card-body d-flex flex-column justify-content-between">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="fs-2">{card.icon}</div>
                    <div className="text-end">
                      <h5 className="card-title mb-0">{card.title}</h5>
                      <p className="fs-4 fw-bold">{card.count}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;