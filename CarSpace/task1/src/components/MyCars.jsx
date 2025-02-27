import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import "./MyCars.css";
import Header from "./Header";
import image4 from "../assets/images/registration/image4.jpg"


const MyCars = () => {
  const [cars, setCars] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Listen to auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      if (!currentUser) return;

      // Step 1: Fetch car requests for the current user
      const carRequestsQuery = query(
        collection(db, "carRequests"),
        where("userEmail", "==", currentUser.email)
      );
      const carRequestDocs = await getDocs(carRequestsQuery);

      const carData = [];
      
      // Step 2: Fetch car details from "cars" collection based on carId
      for (let docSnap of carRequestDocs.docs) {
        const carRequest = docSnap.data();
        const carId = carRequest.carId; // Get carId from request

        // Fetch car details from "cars" collection
        const carRef = doc(db, "cars", carId);
        const carSnap = await getDoc(carRef);

        if (carSnap.exists()) {
          carData.push({
            id: carSnap.id,
            ...carSnap.data(),
            status: carRequest.status, // Include request status
          });
        }
      }

      setCars(carData);
    };

    fetchCars();
  }, [currentUser]);

  return (
    <>
    <Header />
    <div className="carlisting-container" style={{ backgroundImage: `url(${image4})` }}></div>
    <div className="mycars-container">
      <h2>My Cars</h2>
      {cars.length > 0 ? (
        cars.map(car => (
          <div key={car.id} className="mycars-card">
            <img src={car.imageUrl} alt={car.carName} className="mycars-image" />
            <div className="mycars-info">
              <h3 className="mycars-title">{car.name}</h3>
              <p><strong>Status:</strong> <span className={`status ${car.status.toLowerCase()}`}>{car.status}</span></p>
              <div className="mycars-details">
                <p><strong>Fuel Type:</strong> {car.fuelType}</p>
                <p><strong>Mileage:</strong> {car.mileage} km</p>
              </div>
              <p className="mycars-price"><strong>Price:</strong> ${car.price}</p>
              <button className="mycars-btn">View Details</button>
            </div>
          </div>
        ))
      ) : (
        <p>No cars found.</p>
      )}
    </div>
    </>
  );
};

export default MyCars;
