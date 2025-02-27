# 🚗 Anthill_Networks_CarSpace - Second-Hand Car Marketplace  

## 📌 Objective  
Develop a web-based platform for buying and selling second-hand cars seamlessly.  

## 🛠️ Technology Stack  

| Technology  | Usage |
|------------|-------|
| **Frontend**  | React (with Redux for state management) |
| **Database**  | Firestore (Firebase) |
| **Authentication**  | Google Auth |
| **Backend**  | Not required |

## 🔑 Features  

### 🔹 Common Features  
✔️ Secure authentication with Google  

### 🔹 Admin Role  
✔️ Add, update, and delete car listings  
✔️ Manage pricing for listed cars  
✔️ View and process purchase requests  
✔️ Admin access is granted if the user's role is set to `"admin"` in Firestore  

### 🔹 User Role  
✔️ Search for available second-hand cars  
✔️ Request to purchase a car  

## 🌐 Live Demo  
🔗 [Click here to view the deployed app](https://carbooking-9908f.web.app/) 

## 📦 Project Setup  

1. **Clone the repository:**  
   ```sh
   git clone https://github.com/Naveenkumars24/Anthill_Networks_Task
   ```
2. **Navigate to the project folder:**  
   ```sh
   cd CarSpace  
   ```
3. **Install dependencies:**  
   ```sh
   npm install  
   ```
4. **Start the development server:**  
   ```sh
   npm run dev  
   ```
5. **Build for production (optional):**  
   ```sh
   npm run build  
   ```

## 📁 Folder Structure  

```
Task1/
│── dist/                  # Compiled files
│── public/                # Static files
│── src/                   # Source code
│   ├── .firebaserc       
│   ├── .gitignore        
│   ├── README.md         
│── eslint.config.js      
│── firebase.json         
│── firestore.indexes.json
│── firestore.rules       
│── index.html            
│── package-lock.json     
│── package.json          
│── vite.config.js        
```

🚀 Enjoy building and managing your car marketplace with **CarSpace**! 🚗💨  

