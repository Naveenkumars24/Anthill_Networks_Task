
import { Outlet } from "react-router-dom";
import Sidebar from "../Pages/Sidebar";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Outlet />  {/* This will load Home or ManageListing */}
      </div>
    </div>
  );
};

export default AdminDashboard;
