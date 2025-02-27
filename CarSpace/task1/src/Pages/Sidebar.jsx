import { Link } from "react-router-dom";
import { FaHome, FaList, FaCalendarCheck, FaSignOutAlt } from "react-icons/fa";

import "../components/Dashboard.css";

const Sidebar = ({ setActivePage }) => {
  return (
    <div className="sidebar">
      <h2 className="title">Carspace</h2>
      <ul>
        <li>
          <Link to="/admin" className="nav-link1" onClick={() => setActivePage('Home')}>
            <FaHome /> Home
          </Link>
        </li>
        <li>
          <Link to="/admin/manage-listing" className="nav-link1" onClick={() => setActivePage('Manage Listing')}>
            <FaList /> Manage Listing
          </Link>
        </li>
        <li>
          <Link to="/admin/booking" className="nav-link1" onClick={() => setActivePage('Booking')}>
            <FaCalendarCheck /> Booking
          </Link>
        </li>
      </ul>

      
    </div>
  );
};

export default Sidebar;
