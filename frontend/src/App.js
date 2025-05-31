import "./App.css";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Exam from "./components/Exam";
import FeePayment from "./components/FeePayment";
import NewAdmission from "./components/NewAdmission";
import AdmissionList from "./components/AdmissionList";
import Admin from "./components/Admin";
import TransportUsers from "./components/TransportUsers";
import ManageTransport from "./components/ManageTransport";
import Account from "./components/Account";
import Activity from "./components/Activity";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FeePaymentHistory from "./components/FeePaymentHistory";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/admission/new" element={<NewAdmission />} />
          <Route path="/admission/list" element={<AdmissionList />} />
          <Route path="/fee_payment/pay" element={<FeePayment />} />
          <Route path="/fee_payment/history" element={<FeePaymentHistory />} />
          <Route path="/transport/users" element={<TransportUsers />} />
          <Route path="/transport/manage" element={<ManageTransport />} />
          <Route path="/exam" element={<Exam />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/account" element={<Account />} />
          <Route path="/activity" element={<Activity />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
