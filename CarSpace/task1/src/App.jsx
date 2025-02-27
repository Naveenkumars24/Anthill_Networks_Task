import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Registration";
import AdminDashboard from "./components/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import UserRequests from "./components/UserRequests";
import PreOwnedCar from "./components/preownedcar";
import CarDetails from "./components/CarDetails";
import Home from '../src/Pages/Home';
import ManageListing from '../src/Pages/ManageListing';
import Booking from '../src/Pages/Booking';
import Addcar from "./Pages/Addcar";
import MyCars from "./components/MyCars";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Registration />} />
               
                {/* User Routes */}
                <Route path="/usedcar" element={<ProtectedRoute role="user"><PreOwnedCar /></ProtectedRoute>} />
                <Route path="/request" element={<UserRequests />} />
                <Route path="/car-details/:carId" element={<CarDetails />} />
                <Route path="/MyCars" element={<MyCars/>} />
                <Route path="/addcar" element={<Addcar/>} />
                {/* Admin Routes */}
                <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}>
                    <Route index element={<Home />} />
                    <Route path="manage-listing" element={<ManageListing />} />
                    <Route path="Booking" element={<Booking />} />
                   
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
