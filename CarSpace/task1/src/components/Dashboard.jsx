import { useState } from "react";
import MyCars from "./MyCars";
import TestDrives from "./TestDrives";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("testDrives");

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <button onClick={() => setActiveTab("testDrives")} className={activeTab === "testDrives" ? "active" : ""}>
          My Test Drives
        </button>
        <button onClick={() => setActiveTab("myCars")} className={activeTab === "myCars" ? "active" : ""}>
          My Cars
        </button>
        <button>Contact Details</button>
      </aside>

      <main className="content">
        {activeTab === "testDrives" && <TestDrives />}
        {activeTab === "myCars" && <MyCars />}
      </main>
    </div>
  );
};

export default Dashboard;
