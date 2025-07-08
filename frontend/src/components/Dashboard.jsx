import { useState, useEffect } from "react";
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
          transport: studentData.count || 0,
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
      bg: "linear-gradient(135deg, #1A237E, #3949AB)",
      count: counts.student,
      route: "/admission/list",
    },
    {
      title: "New Admissions",
      icon: <IoMdAdd />,
      bg: "linear-gradient(135deg, #2E7D32, #66BB6A)",
      count: 150,
      route: "/admissions",
    },
    {
      title: "Pending Fees",
      icon: <TbMoneybag />,
      bg: "linear-gradient(135deg, #F57F17, #F9A825)",
      count: 75,
      route: "/fees",
    },
    {
      title: "Transport Users",
      icon: <FaShuttleVan />,
      bg: "linear-gradient(135deg, #0288D1, #26C6DA)",
      count: counts.transport,
      route: "/transport",
    },
    {
      title: "Upcoming Exams",
      icon: <CgNotes />,
      bg: "linear-gradient(135deg, #C62828, #EF5350)",
      count: counts.exam,
      route: "/exam",
    },
    {
      title: "Activities",
      icon: <FcRating />,
      bg: "linear-gradient(135deg, #6A1B9A, #AB47BC)",
      count: counts.activity,
      route: "/activities",
    },
    {
      title: "Staff Members",
      icon: <IoIosPeople />,
      bg: "linear-gradient(135deg, #37474F, #607D8B)",
      count: 85,
      route: "/staff",
    },
    {
      title: "Complaints",
      icon: <HiDocumentReport />,
      bg: "linear-gradient(135deg, #D32F2F, #F44336)",
      count: 7,
      route: "/complaints",
    },
  ];
  return (
    <div className="container py-4">
      <h2 className="text-center fw-bold mb-4" style={{ color: "#1A237E" }}>
        Dashboard Overview
      </h2>
      <div className="row g-4">
        {cards.map((card, index) => (
          <div className="col-12 col-sm-6 col-lg-3" key={index}>
            <div
              className="card text-white shadow-lg border-0 h-100"
              style={{
                background: card.bg,
                cursor: "pointer",
                borderRadius: "16px",
                transition: "transform 0.2s ease",
              }}
              onClick={() => navigate(card.route)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.03)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <div className="card-body d-flex flex-column justify-content-center">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="fs-1">{card.icon}</div>
                  <div className="text-end">
                    <h6 className="mb-1">{card.title}</h6>
                    <h4 className="fw-bold">{loading ? "..." : card.count}</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
