// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, writeBatch, doc, collection } from "firebase/firestore"; // ✅ Import missing functions
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCydH1CUMSdkeSNa2tlfFopu80A7rujnrY",
  authDomain: "carbooking-9908f.firebaseapp.com",
  projectId: "carbooking-9908f",
  storageBucket: "carbooking-9908f.firebasestorage.app",
  messagingSenderId: "319597721197",
  appId: "1:319597721197:web:cd5c7ea6735446248c3164"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export { app, db, auth };



const cars = [
  {
    "id": 6,
    "name": "Toyota Fortuner 2024",
    "price": "₹ 40,50,000",
    "priceRange": "35 - 50 Lakh",
    "year": 2024,
    "model": "Camry",
    "fuelType": "Diesel",
    "mileage": "12-15 km/l",
    "make": "Toyota",
    "Transmission": "Manual/Automatic",
    "imageUrl": "https://assets.autobuzz.my/wp-content/uploads/2024/08/16202129/2024-Toyota-Fortuner-SRZ-GR-Bodykit-2-696x392.jpg",
    "type": "used",
    "description": "The Toyota Fortuner 2024 is a rugged and premium SUV with a powerful diesel engine. It offers a commanding road presence, spacious cabin, and modern tech features.",
    "enginetype": "2.8L Turbo Diesel",
    "horsepower": 204,
    "torque": "500 Nm",
    "towing_capacity": "3,100 kg",
    "trim": "Legender 4x4",
    "body_type": "SUV",
    "seating_capacity": 7,
    "max_capacity": "7 passengers",
    "city_mpg": 12,
    "highway_mpg": 15,
    "combined_mpg": 13,
    "technology": "Wireless charging, JBL Sound System",
    "safety": "7 airbags, ESP, Hill Descent Control",
    "infotainment": "9-inch touchscreen, Connected Car Features"
  },
  {
    "id": 7,
    "name": "Honda Accord 2024",
    "price": "₹ 35,00,000",
    "priceRange": "35 - 50 Lakh",
    "year": 2024,
    "model": "Civic",
    "fuelType": "Petrol/Hybrid",
    "mileage": "22-26 km/l",
    "make": "Honda",
    "Transmission": "Automatic",
    "imageUrl": "https://www.clickheretesting.com/TeamHonda/research/2024/accord-hybrid/images/trim-2024-accord-hybrid-touring.jpg",
    "type": "new",
    "description": "The 2024 Honda Accord is a luxury sedan with a hybrid powertrain, offering premium interiors, cutting-edge technology, and excellent fuel efficiency.",
    "enginetype": "2.0L Hybrid i-VTEC",
    "horsepower": 212,
    "torque": "315 Nm",
    "towing_capacity": "Not Available",
    "trim": "Hybrid Touring",
    "body_type": "Sedan",
    "seating_capacity": 5,
    "max_capacity": "5 passengers",
    "city_mpg": 22,
    "highway_mpg": 26,
    "combined_mpg": 24,
    "technology": "Head-Up Display, Wireless Android Auto",
    "safety": "6 airbags, Lane Keep Assist, Collision Mitigation Braking",
    "infotainment": "10-inch touchscreen, Premium Audio System"
  },
  {
    "id": 8,
    "name": "Ford Mustang Mach-E 2024",
    "price": "₹ 50,00,000",
    "priceRange": "35 - 50 Lakh",
    "year": 2024,
    "model": "Mustang",
    "fuelType": "Electric",
    "mileage": "450 km per charge",
    "make": "Ford",
    "Transmission": "Automatic",
    "imageUrl": "https://topnews.in/files/styles/large/public/files/2024-ford-mustang-mach-e.jpg?itok=s1JH9f_k",
    "type": "new",
    "description": "The Ford Mustang Mach-E is an all-electric performance SUV that offers exhilarating acceleration, a modern cabin, and advanced driver assistance features.",
    "enginetype": "Dual Electric Motors",
    "horsepower": 480,
    "torque": "860 Nm",
    "towing_capacity": "1,500 kg",
    "trim": "GT Performance",
    "body_type": "SUV",
    "seating_capacity": 5,
    "max_capacity": "5 passengers",
    "city_mpg": "Not Applicable",
    "highway_mpg": "Not Applicable",
    "combined_mpg": "Not Applicable",
    "technology": "15.5-inch touchscreen, BlueCruise hands-free driving",
    "safety": "8 airbags, Adaptive Cruise Control, 360-degree camera",
    "infotainment": "Ford SYNC 4, Wireless Apple CarPlay/Android Auto"
  },
  {
    "id": 9,
    "name": "BMW X3 2024",
    "price": "₹ 48,50,000",
    "priceRange": "35 - 50 Lakh",
    "year": 2024,
    "model": "Mini Cooper",
    "fuelType": "Petrol/Diesel",
    "mileage": "13-18 km/l",
    "make": "BMW",
    "Transmission": "Automatic",
    "imageUrl": "https://vehicle-images.dealerinspire.com/ebae-110006829/5UX53DP0XR9V54129/8843f0d9a12388e4568a802f58e014b1.jpg",
    "type": "used",
    "description": "The BMW X3 2024 is a luxury SUV with a dynamic driving experience, high-quality interiors, and advanced technology features for a premium ride.",
    "enginetype": "2.0L TwinPower Turbo Petrol/Diesel",
    "horsepower": 252,
    "torque": "400 Nm",
    "towing_capacity": "2,500 kg",
    "trim": "xDrive30i M Sport",
    "body_type": "SUV",
    "seating_capacity": 5,
    "max_capacity": "5 passengers",
    "city_mpg": 13,
    "highway_mpg": 18,
    "combined_mpg": 15,
    "technology": "BMW iDrive 7, Gesture Control",
    "safety": "8 airbags, Lane Departure Warning, Blind Spot Monitor",
    "infotainment": "12.3-inch touchscreen, Harman Kardon Sound System"
  },
  {
    "id": 10,
    "name": "Maruti Suzuki Baleno 2024",
    "price": "₹ 9,50,000",
    "priceRange": "5 - 10 Lakh",
    "year": 2024,
    "model": "Civic",
    "fuelType": "Petrol",
    "mileage": "21-24 km/l",
    "make": "Maruti",
    "Transmission": "Manual/Automatic",
    "imageUrl": "https://www.kvrmaruti.com/storage/upload/blogs/feature_image/Suzuki%20Baleno%202024%20.jpg",
    "type": "used",
    "description": "The Maruti Suzuki Baleno 2024 is a compact hatchback offering excellent mileage, spacious interiors, and the latest technology for a comfortable drive.",
    "enginetype": "1.2L K-Series Petrol",
    "horsepower": 90,
    "torque": "113 Nm",
    "towing_capacity": "Not Available",
    "trim": "Zeta AMT",
    "body_type": "Hatchback",
    "seating_capacity": 5,
    "max_capacity": "5 passengers",
    "city_mpg": 21,
    "highway_mpg": 24,
    "combined_mpg": 22,
    "technology": "Head-Up Display, 360-degree Camera",
    "safety": "6 airbags, ABS with EBD, ESP",
    "infotainment": "9-inch SmartPlay Pro+ touchscreen, Wireless Android Auto"
  }
];


// Function to add cars to Firestore
const addCarsToFirestore = async () => {
  const batch = writeBatch(db); // ✅ Now `writeBatch` is properly imported
  const carsCollection = collection(db, "cars"); // ✅ `collection` is properly imported

  cars.forEach((car) => {
    const docRef = doc(carsCollection, car.id.toString()); // ✅ `doc` is properly imported
    batch.set(docRef, car);
  });
  try {
    await batch.commit();
    console.log("All cars added successfully!");
  } catch (error) {
    console.error("Error adding cars: ", error);
  }
};

// Call the function
addCarsToFirestore();
