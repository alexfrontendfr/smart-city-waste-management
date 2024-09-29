# Smart City Waste Management System

## Overview

This project is a comprehensive waste management solution for Swiss municipalities. It allows citizens to report waste-related issues and provides municipal authorities with tools to manage and respond to these reports efficiently.

## Features

- Interactive map displaying waste reports
- Real-time updates using WebSocket technology
- Dashboard with data visualization
- User-friendly interface for submitting waste reports
- Admin panel for managing reports
- Responsive design for mobile and desktop use

## Technology Stack

- Frontend: React, React Router, React Query, Chart.js
- Backend: Node.js, Express.js
- Database: MongoDB
- Real-time Communication: Socket.io
- Map Integration: Mapbox GL JS
- Styling: Tailwind CSS

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- MongoDB
- Mapbox API key

### Installation

1. Clone the repository:
   git clone https://github.com/alexfrontendfr/smart-city-waste-management.git

2. Install backend dependencies:
   cd server
   npm install

3. Install frontend dependencies:
   cd client
   npm install
4. Set up environment variables:

- Create a `.env` file in the `server` directory with the following content:
  ```
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  ```
- Create a `.env` file in the `client` directory with the following content:
  ```
  REACT_APP_MAPBOX_TOKEN=your_mapbox_api_key
  ```

5. Start the backend server:
   cd /server
   node server.js

6. Start the frontend development server:
   cd client
   npm start

7. Open your browser and navigate to `http://localhost:3000`

## Contributing

We welcome contributions to this project. Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

- Mapbox for their excellent mapping services
- The open-source community for the amazing tools and libraries used in this project
