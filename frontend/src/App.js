import "./App.css";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard";
import Exam from "./components/Exam";
import FeePayment from "./components/Fee/FeePayment";
import Admin from "./components/Admin";
import TransportUsers from "./components/Transport/TransportUsers";
import ManageTransport from "./components/Transport/ManageTransport";
import Activity from "./components/Activity";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeePaymentHistory from "./components/Fee/FeePaymentHistory";
import Profile from "./components/Account/Profile";
import Login from "./components/Account/Login";
import NewAdmission from "./components/Admission/NewAdmission";
import AdmissionList from "./components/Admission/AdmissionList";
import Addnewvehicle from "./components/Transport/Addnewvehicle";
import AssignStudent from "./components/Transport/AssignStudent";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admission/new" element={<NewAdmission />} />
          <Route path="/admission/list" element={<AdmissionList />} />
          <Route path="/fee_payment/pay" element={<FeePayment />} />
          <Route path="/fee_payment/history" element={<FeePaymentHistory />} />
          <Route path="/transport/users" element={<TransportUsers />} />
          <Route path="/transport/newTransport" element={<ManageTransport />} />
          <Route path="/transport/addnewvehicle" element={<Addnewvehicle />} />
          <Route path="/transport/assignvehicle" element={<AssignStudent />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/activity" element={<Activity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
