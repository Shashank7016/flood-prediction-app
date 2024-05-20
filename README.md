# Flood Management Software Frontend

This project is the frontend application for the Flood Management Software, built using React. It provides an interface for flood prediction, alert systems, user management, and various flood-related functionalities.

## Features

- **Flood Prediction**
  - Provides flood risk predictions based on user inputs.
- **Alert Systems**
  - Sends alerts and notifications to users about potential flood risks.
- **User Management**
  - Allows users to register, login, and manage their profiles.
  - Admin account creation and management.
- **Login and Registration**
  - Secure user authentication and authorization.
- **Evacuation Planning**
  - Offers evacuation plans and routes in case of flood emergencies.
- **Flood Zones Creation**
  - Creation and management of different flood zones:
    - **Evacuation Zone**: Areas designated for evacuation during floods.
    - **Proximity Zone**: Areas near flood-prone regions for monitoring.

## Setup Instructions

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/yourusername/flood-management-frontend.git
   cd flood-management-frontend
   ```

2. **Install dependencies**

   ```sh
   npm install
   # or
   yarn install
   ```

3. **Create a `.env` file**

   ```sh
   REACT_APP_API_URL=http://127.0.0.1:5000
   ```

4. **Run the application**
   ```sh
   npm start
   # or
   yarn start
   ```

The application will start at `http://localhost:3000/`.

## Project Structure

```
flood-management-frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── AlertList/
│   │   ├── EvacuationProcess/
│   │   ├── FloodPrediction/
│   │   ├── FloodZones/
│   │   ├── DataPage/
│   │   ├── AnalysisPage/
│   │   ├── UserManagement/
│   │   ├── Login/
│   │   ├── Register/
│   │   └── ...
│   ├── context/
│   │   ├── AuthContext/
│   │   └── ...
│   ├── utils/
│   ├── App.js
│   ├── index.js
│   └── ...
├── .env
├── package.json
└── ...
```

## Key Components

- **FloodPrediction**
  - Component for users to input data and receive flood risk predictions.
- **Alerts**
  - Displays alerts and notifications about potential floods.
- **UserManagement**
  - Components for user registration, login, and profile management.
- **EvacuationPlanning**
  - Tools and maps for planning evacuation routes.
- **FloodZones**
  - Interfaces for creating and managing evacuation and proximity zones.

## API Endpoints

The frontend communicates with the backend using the following API endpoints:

- **GET `/logistic_regression`**
- **POST `/logistic_regression`**
- **GET `/decision_tree`**
- **POST `/decision_tree`**
- **GET `/svm`**
- **POST `/svm`**
- **User Authentication and Management Endpoints**
- **Flood Alerts and Notifications Endpoints**
- **Evacuation Planning and Zones Management Endpoints**

## Contributing

Please fork the repository and submit pull requests for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
