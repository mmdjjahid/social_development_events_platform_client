# Social Development Events Platform



##  Live Demo

* **Client:** [http://103.134.26.92/](http://103.134.26.92/)
* **Server:** [http://103.134.26.92:3010](http://103.134.26.92:3010)

##  Features

* **User Authentication:** Secure user registration and login.
* **Event Creation:** Logged-in users can create new social events, providing details like title, description, date, location, and type.
* **Upcoming Events:** A public page showcasing all future events in a responsive card layout.
* **Event Details:** A dedicated page for each event with detailed information and a "Join" button.
* **Search & Filter:** Users can search for events by title and filter by event type (e.g., "Cleanup", "Plantation").
* **Joined Events Dashboard:** A private page where users can see all the events they have registered for.
* **Event Management Dashboard:** A private page for users to **Manage** their *own* created events.
    * **Update:** Edit event details through a pre-populated form.
    * **Delete:** Remove their own events from the platform.
* **Responsive & Themed:** Fully responsive design with dark/light mode support using Tailwind CSS and daisyUI.
* **404 Page:** A custom "Not Found" page for a better user experience.

## Technology Stack

### Client (Frontend)

* **Framework:** React (Vite)
* **Routing:** React Router
* **Styling:** Tailwind CSS & daisyUI
* **Data Fetching:** Axios
* **Notifications:** React Toastify
* **Animations:** Framer Motion

### Server (Backend)

* **Framework:** Node.js & Express.js
* **Database:** MongoDB (with MongoDB Driver)
* **Middleware:** CORS, Dotenv
