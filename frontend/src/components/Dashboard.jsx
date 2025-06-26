// import React, { useState, useEffect } from "react";
// import { HiDocumentReport } from "react-icons/hi";
// import { IoIosPeople } from "react-icons/io";
// import { FcRating } from "react-icons/fc";
// import { CgNotes } from "react-icons/cg";
// import { FaShuttleVan } from "react-icons/fa";
// import { TbMoneybag } from "react-icons/tb";
// import { IoMdAdd } from "react-icons/io";
// import { RiGraduationCapFill } from "react-icons/ri";

// const Dashboard = () => {
//   const [activityCount, setActivityCount] = useState(0);
//   const [examCount, setExamCount] = useState(0);
//   const [studentCount, setStudentCount] = useState(0);
//   const [transportCount, setTransportCount] = useState(0);
  
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getData = async () => {
//       try {
//         const res = await fetch("http://localhost:1111/activity/activityList");
//         const res1 = await fetch("http://localhost:1111/exam/examList");
//         const res2 = await fetch("http://localhost:1111/admission/students");
//         const res3 = await fetch("http://localhost:1111/admission/students");
//         const data = await res.json(); const data1 = await res1.json();const data2 = await res2.json();const data3 = await res3.json();
//         if (data && data1 && data2 && data.count !== undefined && data3 && data3.count !== undefined && data1.count !== undefined && data2.count !== undefined) {
//           setActivityCount(data.count)
//           setExamCount(data1.count);
//           setStudentCount(data2.count);
//           setTransportCount(data3.count);
//         }
//       } catch (err) {
//         console.error("Error fetching activity count:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getData();
//   }, []);

//   const cards = [
//     { title: "Total Students", icon: <RiGraduationCapFill />, color: "primary",count: loading ? "0" : studentCount },
//     { title: "New Admissions", icon: <IoMdAdd />, color: "success", count: 150 },
//     { title: "Pending Fees", icon: <TbMoneybag />, color: "warning", count: 75 },
//     { title: "Transport Users", icon: <FaShuttleVan />, color: "info", count: loading ? "0" : transportCount },
//     { title: "Upcoming Exams", icon: <CgNotes />, color: "danger", count: loading ? "0" : examCount },
//     { title: "Activities", icon: <FcRating />, color: "secondary", count: loading ? "0" : activityCount },
//     { title: "Staff Members", icon: <IoIosPeople />, color: "dark", count: 85 },
//     { title: "Complaints", icon: <HiDocumentReport />, color: "danger", count: 7 },
//   ];

//   return (
//     <div className="d-flex justify-content-center">
//       <div className="container text-center mt-4">
//         <h2 className="mb-4 fw-bold">Dashboard</h2>
//         <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
//           {cards.map((card, index) => (
//             <div key={index} className="col">
//               <div className={`card text-white bg-${card.color} h-100 shadow`}>
//                 <div className="card-body d-flex flex-column justify-content-between">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <div className="fs-2">{card.icon}</div>
//                     <div className="text-end">
//                       <h5 className="card-title mb-0">{card.title}</h5>
//                       <p className="fs-4 fw-bold">{card.count}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { HiDocumentReport } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import { FcRating } from "react-icons/fc";
import { CgNotes } from "react-icons/cg";
import { FaShuttleVan } from "react-icons/fa";
import { TbMoneybag } from "react-icons/tb";
import { IoMdAdd } from "react-icons/io";
import { RiGraduationCapFill } from "react-icons/ri";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    activity: 0,
    exam: 0,
    student: 0,
    transport: 0,
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [activityRes, examRes, studentRes] = await Promise.all([
          fetch("http://localhost:1111/activity/activityList"),
          fetch("http://localhost:1111/exam/examList"),
          fetch("http://localhost:1111/admission/students"),
        ]);

        const [activityData, examData, studentData] = await Promise.all([
          activityRes.json(),
          examRes.json(),
          studentRes.json(),
        ]);

        setCounts({
          activity: activityData.count || 0,
          exam: examData.count || 0,
          student: studentData.count || 0,
          transport: studentData.count || 0, // Assuming same API used for transport
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  const cards = [
    {
      title: "Total Students",
      icon: <RiGraduationCapFill />,
      color: "primary",
      count: counts.student,
      route: "/admission/list",
    },
    {
      title: "New Admissions",
      icon: <IoMdAdd />,
      color: "success",
      count: 150,
      route: "/admissions",
    },
    {
      title: "Pending Fees",
      icon: <TbMoneybag />,
      color: "warning",
      count: 75,
      route: "/fees",
    },
    {
      title: "Transport Users",
      icon: <FaShuttleVan />,
      color: "info",
      count: counts.transport,
      route: "/transport",
    },
    {
      title: "Upcoming Exams",
      icon: <CgNotes />,
      color: "danger",
      count: counts.exam,
      route: "/exam",
    },
    {
      title: "Activities",
      icon: <FcRating />,
      color: "secondary",
      count: counts.activity,
      route: "/activities",
    },
    {
      title: "Staff Members",
      icon: <IoIosPeople />,
      color: "dark",
      count: 85,
      route: "/staff",
    },
    {
      title: "Complaints",
      icon: <HiDocumentReport />,
      color: "danger",
      count: 7,
      route: "/complaints",
    },
  ];

  return (
    <div className="d-flex justify-content-center">
      <div className="container text-center mt-4">
        <h2 className="mb-4 fw-bold">Dashboard</h2>
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4 justify-content-center">
          {cards.map((card, index) => (
            <div key={index} className="col">
              <div
                className={`card text-white bg-${card.color} h-100 shadow cursor-pointer`}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(card.route)}
              >
                <div className="card-body d-flex flex-column justify-content-between">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="fs-2">{card.icon}</div>
                    <div className="text-end">
                      <h5 className="card-title mb-0">{card.title}</h5>
                      <p className="fs-4 fw-bold">
                        {loading ? "..." : card.count}
                      </p>
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
