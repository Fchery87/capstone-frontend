# Capsule Event Hub

## Description
Capsule Event Hub is a full-stack web application for managing events, built with MongoDB, Express, React, and Node.js (MERN stack). Users can create, view, update, and delete events, and RSVP to events.

# Features
* User Authentication (Login and Registration)
* Create, Edit, and Delete Events
* View Event Details
* Weather Forecast Integration
* Responsive Design

# Technologies Used
* Client: React, Redux, TailwindCSS
* Server: Node, Express
* API: Axios for API requests
* Styling: CSS, React Toastify for notifications

## Installation

1. Clone the Repository:

```bash
git clone https://github.com/Fchery87/capstone-frontend.git
cd capstone-frontend
```

2. Install Dependencies:

```bash
npm install
```

3. Set Up Environment Variables:
Create a .env file in the root directory and add the following:

```bash
REACT_APP_WEATHER_API_KEY=your_weather_api_key

```

4. Start the Application:

```bash
npm run dev

```

## Usage

1. Home Page:
* Displays a welcome message and navigation links to other parts of the application.
2. Events Page:
* Lists all the events with options to edit or delete each event.
3. Create Event Page:
* Form to create a new event with fields for title, description, date, time, location, category, and image upload.
4. Event Details Page:
* Displays detailed information about a selected event.
5. Weather Forecast Page:
* Allows users to search for the weather forecast by location for the day, week, or month.


## Components

1. EventForm.jsx
* Handles the creation of new events with form validation and submission logic.
2. EventItem.jsx
* Renders individual event items with options to edit or delete.
3. EventList.jsx
* Fetches and displays a list of events.
4. EventDetails.jsx
* Shows detailed information for a specific event.
5. Home.jsx
* Renders the home page with navigation links.
6. LoginForm.jsx
* Handles user login functionality.
7. RegisterForm.jsx
* Handles user registration functionality.
8. WeatherForecast.jsx
* Fetches and displays weather information for a given location.

## API Integration
* Axios: Used for making API requests to the backend and weather services.
* WeatherAPI: Integrated to fetch weather forecasts based on user input.

## Contributing
1. Fork the repository.
2. Create your feature branch (git checkout -b feature/your-feature).
3. Commit your changes (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature/your-feature).
5. Open a pull request.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments
* Special thanks to the instructors and peers who provided guidance and feedback throughout the development of this project.


## 🔗 Links
[[Front-End Repo]](https://github.com/Fchery87/capstone-frontend)

[[Back-End Repo]](https://github.com/Fchery87/capstone-backend)

[[Netlify]](https://capsule-eventhub.netlify.app/)

[[Render]](https://capstone-backend-9d1u.onrender.com/)

