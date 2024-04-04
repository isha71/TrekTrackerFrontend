# TrekTracker
TrekTracker is a web application that allows users to track their travels by marking the countries they have visited on a world map. Users can register, log in, add countries they have visited, and log out. The application provides a visual representation of visited countries on a world map using React.js and VectorMap.

# Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Usage](#usage)
6. [Contributing](#contributing)
7. [License](#license)

### Features

- **User registration** with username, and password
- **User authentication and login** with username and password
- **Adding countries visited to the map**
- **Visual representation of visited countries on a world map**
- **Token-based authentication** with JSON Web Tokens (JWT)
- **Secure password storage** with bcrypt hashing
- Frontend built with **React.js**
- Backend built with **Node.js** and **Express**
- Database management with **PostgreSQL**
- **Log out functionality**

### Technologies Used

- React.js
- Node.js
- Express.js
- PostgreSQL
- Axios
- bcrypt
- cors
- jwt
- React-jvectormap
- MUI (Material-UI)

### Getting Started

#### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/isha71/TrekTrackerFrontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Usage
Before starting the frontend server, ensure the backend server is running. Follow these steps:

1. Navigate to the backend repository of this project https://github.com/isha71/TrekTrackerBackend and start the server.

2. Create a .env file in the frontend directory.

3. Write down the backend server address in .env file 
REACT_APP_SERVER_ADDRESS=http://localhost:5000.

4. Start the frontend server:
   ```bash
   npm start
   ```


### Contributing

Contributions are welcome! Feel free to fork the repository and submit pull requests.

### License

This project is licensed under the MIT License.

