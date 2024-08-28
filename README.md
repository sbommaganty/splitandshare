Expense Sharing Application 💰
Description 📋
Overview: Developed a Splitwise-like application to manage and share expenses within groups. The app supports creating groups, adding members, logging expenses, and tracking balances, all through a user-friendly interface. It uses a microservices architecture to handle different aspects of the application efficiently.

Key Features:

Group Management: Create and manage groups, add members, and allocate expenses.
Expense Tracking: Log and categorize expenses with automatic calculations of each member’s share.
Debt Settlement: View and settle debts among group members.
Real-time Updates: Real-time updates to balances and expense records.
Tech Stack 💻
Frontend:

React.js: For building the dynamic and responsive user interface.
Tailwind CSS: For modern, utility-first styling and responsive design.
Material-UI: For pre-built UI components that enhance design and usability.
Backend:

Django REST Framework: For building robust APIs with CRUD operations.

SQLAlchemy ORM: For managing database interactions through object-relational mapping.

NumPy: For performing numerical operations and calculations related to expenses.

Pandas: For data manipulation and analysis to ensure accurate expense tracking.

Architecture: Microservices Architecture:

User Service: Manages user-related functionalities, such as user authentication, profile management, and group memberships.
Expense Service: Handles expense-related operations, including logging expenses, calculating shares, and managing debt settlements.
Communication: Services communicate with each other through RESTful APIs to synchronize data and handle requests.
Model-View-Template (MVT) Architecture:

Model: Defines data structures and business logic, including database interactions via SQLAlchemy ORM.
View: Manages data presentation and handles HTTP requests, interacting with models to retrieve or modify data.
Template: Renders data into HTML. In Django REST Framework, this is typically used for serving data in JSON format.
Prerequisites ☔
Node.js: Required for running the frontend application.
npm or Yarn: For managing JavaScript dependencies.
Python: Required for the backend.
Django: For backend framework setup.
SQLAlchemy ORM: For managing database interactions.
Pandas and NumPy: Ensure these Python packages are installed for data processing.
Clone the repo:

bash
Copy code
git clone <repository-url>
Deployment 💡

Run the application:

markdown
Copy code
- For the backend:
  - Navigate to the backend directory and install dependencies with `pip install -r requirements.txt`.
  - Set up the database using SQLAlchemy.
  - Start the Django server with `python manage.py runserver`.
- For the frontend:
  - Navigate to the frontend directory and install dependencies with `npm install` or `yarn install`.
  - Start the React application with `npm start` or `yarn start`.
- Access the application via your browser at `http://localhost:3000`.
  
Built With 🎯
React.js
Tailwind CSS
Material-UI
Django REST Framework (MVT Architecture)
SQLAlchemy ORM
NumPy
Pandas
Microservices Architecture (User Service and Expense Service)
Acknowledgments 💖
Thanks to the open-source community for the libraries and tools used.
Special thanks to my family and friends for their support and encouragement.
