import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";

const UserRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchUserRequests = async () => {
      const q = query(collection(db, "requests"), where("userId", "==", auth.currentUser.uid));
      const requestDocs = await getDocs(q);
      setRequests(requestDocs.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };
    fetchUserRequests();
  }, []);

  return (
    <div>
      <h2>Your Requests</h2>
      {requests.map(req => (
        <div key={req.id}>
          <p>Car {req.carId} - Status: {req.status}</p>
        </div>
      ))}
    </div>
  );
};

export default UserRequests;