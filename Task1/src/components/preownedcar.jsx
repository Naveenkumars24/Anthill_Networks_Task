import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCars, setMake, setModel, setPriceRange, setCategory } from "../redux/searchSlice";
import { FaGasPump, FaRoad, FaCog, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./PreOwnedCar.css";
import image4 from "../assets/images/registration/image4.jpg";
import Header from "./Header";

const PreOwnedCar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch cars on component mount
  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  // Select data from Redux store
  const cars = useSelector((state) => state.searchcar.filteredCars);
  const selectedCategory = useSelector((state) => state.searchcar.selectedCategory);
  const selectedMake = useSelector((state) => state.searchcar.selectedMake);
  const selectedModel = useSelector((state) => state.searchcar.selectedModel);
  const selectedPriceRanges = useSelector((state) => state.searchcar.selectedPriceRanges);

  const makes = ["Toyota", "Honda", "Ford", "BMW","Maruti"];
  const models = ["Camry", "Civic", "Mustang", "Mini Cooper"];

  const priceRanges = [
    { label: "5 - 10 Lakh", count: 7 },
    { label: "10 - 15 Lakh", count: 8 },
    { label: "15 - 20 Lakh", count: 5 },
    { label: "20 - 35 Lakh", count: 1 },
    { label: "35 - 50 Lakh", count: 5 },
  ];

  const handlePriceRangeChange = (label) => {
    const updatedRanges = selectedPriceRanges.includes(label)
      ? selectedPriceRanges.filter((range) => range !== label)
      : [label];
    dispatch(setPriceRange(updatedRanges));
  };

  return (
    <>
      <Header />
      <div className="carlisting-container" style={{ backgroundImage: `url(${image4})` }}></div>

       

      {/* Left container */}
      <div className="car-list">
        <div className="car-list-search">
         

          <div className="search-filters">
            <label>Make</label>
            <select value={selectedMake} onChange={(e) => dispatch(setMake(e.target.value))}>
              <option value="">All Makes</option>
              {makes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>

            <label>Model</label>
            <select value={selectedModel} onChange={(e) => dispatch(setModel(e.target.value))}>
              <option value="">All Models</option>
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>

            

            <button className="search-button">Search</button>
          </div>

          {/* Price Range Filter */}
          <div className="price-range-container">
            <p className="price-range-title">select from the ranges below</p>
            {priceRanges.map((range, index) => (
              <label key={index} className="price-range-option">
                <input
                  type="checkbox"
                  checked={selectedPriceRanges.includes(range.label)}
                  onChange={() => handlePriceRangeChange(range.label)}
                />
                <p>{range.label} </p><span className="range-count">({range.count})</span>
              </label>
            ))}
          </div>
        </div>

       
        {/* Right container */}
        <div className="right-container">
          
        <div className="search-toggle">
            <button className={selectedCategory === "new" ? "active" : ""} onClick={() => dispatch(setCategory("new"))}>
              New Cars
            </button>
            <button className={selectedCategory === "used" ? "active" : ""} onClick={() => dispatch(setCategory("used"))}>
              Used Cars
            </button>
          </div>
        
          <div className="car-container">
            {cars.length > 0 ? (
              cars.map((car, index) => (
                <div key={index} className="car-card">
                  <div className="image-container">
                    <img src={car.imageUrl} alt={car.name} className="car-image" />
                    <span className="featured-badge">Featured</span>
                   </div>

                   
                  <div className="car-details">
                        <p className="model-name">{car.model}</p>
                         <h3 className="car-name">{car.name}</h3>
                           <p className="price">{car.price}</p>

                           {/* car info fuel type, transmission, etc. */}
                      <div className="car-info">
                          <p>
                        <FaGasPump className="icon" />
                        <span>FuelType</span> <br />
                        <span style={{ color: "red", paddingLeft: "20px" }}>{car.fuelType}</span>
                        </p>
                        <p>
                       <FaRoad className="icon" /> <span>Mileage</span>
                       <br />
                       <span style={{ color: "red", paddingLeft: "20px" }}>{car.mileage}</span>
                      </p>
                      <p>
                        <FaCog className="icon" /> <span>Transmission</span> <br />
                        <span style={{ color: "red", paddingLeft: "25px" }}>{car.Transmission}</span>
                         </p>
                   </div>

                    <hr />
                    <div className="car-rating">
                     <button className="view-details"onClick={() => navigate(`/car-details/${car.id}`, { state: car })}>
                       View Details →
                     </button>
              
                    </div>

                  </div>
                </div>
              ))
            ) : (
              <p>No cars found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PreOwnedCar;
