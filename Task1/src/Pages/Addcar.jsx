import { useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection,addDoc } from "firebase/firestore";
import "./Addcar.css"
const Addcar = () => {
  const [car, setCar] = useState({
    id: "",
    name: "",
    price: "",
    priceRange: "",
    year: "",
    model: "",
    fuelType: "",
    mileage: "",
    make: "",
    Transmission: "",
    imageUrl: "",
    type: "",
    description: "",
    enginetype: "",
    horsepower: "",
    torque: "",
    towing_capacity: "",
    trim: "",
    body_type: "",
    seating_capacity: "",
    max_capacity: "",
    city_mpg: "",
    highway_mpg: "",
    combined_mpg: "",
    technology: "",
    safety: "",
    infotainment: ""
  });

  // Handle form input changes
  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  // Add car to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "cars"), car);
      alert("Car added successfully!");
      setCar({  // Reset form after submission
        id: "",
        name: "",
        price: "",
        priceRange: "",
        year: "",
        model: "",
        fuelType: "",
        mileage: "",
        make: "",
        Transmission: "",
        imageUrl: "",
        type: "",
        description: "",
        enginetype: "",
        horsepower: "",
        torque: "",
        towing_capacity: "",
        trim: "",
        body_type: "",
        seating_capacity: "",
        max_capacity: "",
        city_mpg: "",
        highway_mpg: "",
        combined_mpg: "",
        technology: "",
        safety: "",
        infotainment: ""
      });
    } catch (error) {
      console.error("Error adding car: ", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <h2>Add Car</h2>
      <form onSubmit={handleSubmit} className="car-form">
      <input type="number" name="id" value={car.id} onChange={handleChange} placeholder="Car id" required />
        <input type="text" name="name" value={car.name} onChange={handleChange} placeholder="Car Name" required />
        <input type="text" name="model" value={car.model} onChange={handleChange} placeholder="Model" required />
        <input type="number" name="year" value={car.year} onChange={handleChange} placeholder="Year" required />
        <input type="text" name="make" value={car.make} onChange={handleChange} placeholder="Make (Brand)" required />
        <input type="text" name="price" value={car.price} onChange={handleChange} placeholder="Price" required />
        <input type="text" name="priceRange" value={car.priceRange} onChange={handleChange} placeholder="Price Range" required />
        <input type="text" name="fuelType" value={car.fuelType} onChange={handleChange} placeholder="Fuel Type" required />
        <input type="text" name="mileage" value={car.mileage} onChange={handleChange} placeholder="Mileage (e.g., 90km)" required />
        <input type="text" name="Transmission" value={car.Transmission} onChange={handleChange} placeholder="Transmission" required />
        <input type="text" name="imageUrl" value={car.imageUrl} onChange={handleChange} placeholder="Image URL" required />
        <input type="text" name="type" value={car.type} onChange={handleChange} placeholder="Car Type (new/used)" required />
        <textarea name="description" value={car.description} onChange={handleChange} placeholder="Car Description" required />
        <input type="text" name="enginetype" value={car.enginetype} onChange={handleChange} placeholder="Engine Type" required />
        <input type="number" name="horsepower" value={car.horsepower} onChange={handleChange} placeholder="Horsepower" required />
        <input type="text" name="torque" value={car.torque} onChange={handleChange} placeholder="Torque" required />
        <input type="text" name="towing_capacity" value={car.towing_capacity} onChange={handleChange} placeholder="Towing Capacity" required />
        <input type="text" name="trim" value={car.trim} onChange={handleChange} placeholder="Trim" required />
        <input type="text" name="body_type" value={car.body_type} onChange={handleChange} placeholder="Body Type" required />
        <input type="number" name="seating_capacity" value={car.seating_capacity} onChange={handleChange} placeholder="Seating Capacity" required />
        <input type="text" name="max_capacity" value={car.max_capacity} onChange={handleChange} placeholder="Max Capacity" required />
        <input type="number" name="city_mpg" value={car.city_mpg} onChange={handleChange} placeholder="City MPG" required />
        <input type="number" name="highway_mpg" value={car.highway_mpg} onChange={handleChange} placeholder="Highway MPG" required />
        <input type="number" name="combined_mpg" value={car.combined_mpg} onChange={handleChange} placeholder="Combined MPG" required />
        <input type="text" name="technology" value={car.technology} onChange={handleChange} placeholder="Technology Features" required />
        <input type="text" name="safety" value={car.safety} onChange={handleChange} placeholder="Safety Features" required />
        <input type="text" name="infotainment" value={car.infotainment} onChange={handleChange} placeholder="Infotainment System" required />
        <button  className="addcarbtn" type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default Addcar;
