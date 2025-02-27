
import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import Addcar from "./Addcar";
import { getAuth } from "firebase/auth";
import "./ManageListing.css"

const ManageListing = () => {
  const [cars, setCars] = useState([]);
  const [showAddCar, setShowAddCar] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [updatedData, setUpdatedData] = useState({ name: "", model: "", year: "", price: "" });

  useEffect(() => {
    fetchCars();
  }, []); // Fixed infinite loop issue

  const fetchCars = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "cars"));
      const carList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCars(carList);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      setCars((prevCars) => prevCars.filter((car) => car.id !== id));

      const carRef = doc(db, "cars", id);
      await deleteDoc(carRef);
      
      console.log("Car deleted successfully!");
    } catch (error) {
      console.error("Error deleting document:", error);
      fetchCars(); // Refetch if deletion fails
    }
  };

  const handleUpdate = async (carId) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No authenticated user found!");
      return;
    }

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists() || userSnap.data().role !== "admin") {
      console.error("Permission denied: User is not an admin");
      return;
    }

    try {
      const carRef = doc(db, "cars", String(carId));
      await updateDoc(carRef, updatedData);
      console.log("Car updated successfully!");

      setCars((prevCars) =>
        prevCars.map((car) => (car.id === carId ? { ...car, ...updatedData } : car))
      );

      setEditingCar(null);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleEdit = (car) => {
    setEditingCar(car.id);
    setUpdatedData({
      name: car.name,
      model: car.model,
      year: car.year,
      price: car.price,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="listing-container">
      {showAddCar ? (
        <Addcar />
      ) : (
        <div>
          <div className="listing-header">
            <h2 className="listing-title">Car Listings</h2>
            <button className="btn-add-car" onClick={() => setShowAddCar(true)}>
              Add Car
            </button>
          </div>
          <div className="cars-grid">
            {cars.map((car) => (
              <div key={car.id} className="cars-item">
                <img
                  className="cars-image"
                  src={car.imageUrl || "https://via.placeholder.com/300"}
                  alt={car.name}
                />
                <div className="cars-details">
                  <p className="cars-name">{car.name}</p>
                  <h3 className="cars-model">
                    {car.model} {car.year}
                  </h3>
                  <p className="cars-price">{car.price}</p>
                </div>

                <div className="action-buttons">
                  {editingCar === car.id ? (
                    <div className="edit-form">
                      <input
                        className="input-field"
                        type="text"
                        name="name"
                        value={updatedData.name}
                        onChange={handleChange}
                      />
                      <input
                        className="input-field"
                        type="text"
                        name="model"
                        value={updatedData.model}
                        onChange={handleChange}
                      />
                      <input
                        className="input-field"
                        type="number"
                        name="year"
                        value={updatedData.year}
                        onChange={handleChange}
                      />
                      <input
                        className="input-field"
                        type="text"
                        name="price"
                        value={updatedData.price}
                        onChange={handleChange}
                      />
                      <button className="btn-update" onClick={() => handleUpdate(car.id)}>
                        Update
                      </button>
                      <button className="btn-cancel" onClick={() => setEditingCar(null)}>
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="buttons">
                      <FaEdit className="icon-edit" onClick={() => handleEdit(car)} />
                      <FaTrash className="icon-delete" onClick={() => handleDelete(String(car.id))} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageListing;

