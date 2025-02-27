// import { useEffect, useState } from "react";
// import { db } from "../firebase/firebaseConfig";
// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
// import "./Booking.css";
// import { getAuth } from "firebase/auth";

// const auth = getAuth();
// auth.currentUser.getIdTokenResult().then((idTokenResult) => {
//   if (idTokenResult.claims.admin) {
//     console.log("User is an admin");
//   } else {
//     console.log("User is not an admin");
//   }
// });

// const Booking = () => {
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     const fetchRequests = async () => {
//       try {
//         const requestCollection = await getDocs(collection(db, "carRequests"));
//         setRequests(requestCollection.docs.map(doc => ({ id: doc.id, ...doc.data() })));
//       } catch (error) {
//         console.error("Error fetching requests:", error);
//       }
//     };

//     fetchRequests();
//   }, []);

//   const updateRequestStatus = async (requestId, newStatus) => {
//     try {
//       const requestRef = doc(db, "carRequests", requestId);
//       await updateDoc(requestRef, { status: newStatus });

//       // Ensure UI updates immediately
//       setRequests(prevRequests =>
//         prevRequests.map(req =>
//           req.id === requestId ? { ...req, status: newStatus } : req
//         )
//       );

//       console.log(`Request ${requestId} updated to ${newStatus}`);
//     } catch (error) {
//       console.error("Error updating request status:", error);
//     }
//   };

//   return (
//     <div className="booking-container">
//       <h2>Car Requests</h2>
//       {requests.length > 0 ? (
//         <table className="booking-table">
//           <thead>
//             <tr>
//               <th>User Name</th>
//               <th>User Email</th>
//               <th>Car Name</th>
//               <th>Status</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map(req => (
//               <tr key={req.id}>
//                 <td>{req.userName}</td>
//                 <td>{req.userEmail}</td>
//                 <td>{req.carName}</td>
//                 <td>
//                   <span className={`status status-${req.status.toLowerCase()}`}>{req.status}</span>
//                 </td>
//                 <td>
//                   {req.status === "Pending" && (
//                     <>
//                       <button onClick={() => updateRequestStatus(req.id, "Accepted")} className="accept-button">
//                         Accept
//                       </button>
//                       <button onClick={() => updateRequestStatus(req.id, "Rejected")} className="reject-button">
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p className="no-requests">No car requests available.</p>
//       )}
//     </div>
//   );
// };

// export default Booking;
import { useEffect, useState } from "react";
import { db, auth } from "../firebase/firebaseConfig";
import { collection, getDocs, updateDoc, doc, onSnapshot, getDoc } from "firebase/firestore";
import "./Booking.css";

const Booking = () => {
  const [requests, setRequests] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (auth.currentUser) {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists() && userSnap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      }
    };

    // Listen for authentication state change
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserRole();
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    const fetchRequests = () => {
      const requestsRef = collection(db, "carRequests");

      // Real-time listener
      const unsubscribe = onSnapshot(requestsRef, (snapshot) => {
        const requestList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRequests(requestList);
      });

      return () => unsubscribe();
    };

    fetchRequests();
  }, []);

  const updateRequestStatus = async (requestId, newStatus) => {
    if (!isAdmin) {
      console.error("Unauthorized: Only admins can update the request status.");
      return;
    }

    try {
      const requestRef = doc(db, "carRequests", requestId);
      await updateDoc(requestRef, { status: newStatus });

      console.log(`Request ${requestId} updated to ${newStatus}`);
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  return (
    <div className="booking-container">
      <h2>Car Requests</h2>
      {requests.length > 0 ? (
        <table className="booking-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>Car Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.userName}</td>
                <td>{req.userEmail}</td>
                <td>{req.carName}</td>
                <td>
                  <span className={`status status-${req.status.toLowerCase()}`}>{req.status}</span>
                </td>
                <td>
                  {isAdmin && req.status === "Pending" && (
                    <>
                      <button
                        onClick={() => updateRequestStatus(req.id, "Accepted")}
                        className="accept-button"
                      >
                        Accept
                      </button>
                      <button
                        onClick={() => updateRequestStatus(req.id, "Rejected")}
                        className="reject-button"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-requests">No car requests available.</p>
      )}
    </div>
  );
};

export default Booking;
