import React from "react";
const cards = [
  { title: "Total Students", icon: "🎓", color: "primary", count: 1200 },
  { title: "New Admissions", icon: "➕", color: "success", count: 150 },
  { title: "Pending Fees", icon: "💰", color: "warning", count: 75 },
  { title: "Transport Users", icon: "🚌", color: "info", count: 420 },
  { title: "Upcoming Exams", icon: "📝", color: "danger", count: 3 },
  { title: "Activities", icon: "⭐", color: "secondary", count: 12 },
  { title: "Staff Members", icon: "👨‍🏫", color: "dark", count: 85 },
  { title: "Complaints", icon: "⚠️", color: "danger", count: 7 },
];
const Dashboard = () => {
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
