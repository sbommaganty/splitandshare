# Splitwise-like Expense Sharing Application 💰

## Description 📋

Developed a Splitwise-like application to facilitate expense sharing and management within groups. Users can create groups, add members, log expenses, and track balances. The application features real-time updates and comprehensive expense tracking through an intuitive interface. The backend utilizes a microservices architecture with separate services for user management and expense tracking.

## Key Features 🔑

- **Group Management:** Create and manage groups, add members, and allocate expenses.
- **Expense Tracking:** Log and categorize expenses with automatic calculations of each member’s share.
- **Debt Settlement:** View and settle debts among group members.
- **Real-time Updates:** Automatic updates to balances and expense records.

## Tech Stack 💻

- **Frontend:**
  - **React.js:** For building the dynamic and responsive user interface.
  - **Tailwind CSS:** For modern, utility-first styling and responsive design.
  - **Material-UI:** For enhanced UI components and design consistency.

- **Backend:**
  - **Django REST Framework:** For creating a robust API to handle backend logic and data management.
  - **SQLAlchemy ORM:** For object-relational mapping to manage database interactions.
  - **NumPy:** For numerical operations and calculations related to expenses.
  - **Pandas:** For data manipulation and analysis to ensure accurate expense tracking.
  - **Microservices Architecture:**
    - **User Service:** Manages user-related functionalities such as authentication, profile management, and group memberships.
    - **Expense Service:** Handles expense-related operations including logging expenses, calculating shares, and managing debt settlements.
  - **Model-View-Template (MVT) Architecture:** 
    - **Model:** Defines data structures and business logic, including database interactions.
    - **View:** Manages data presentation and handles HTTP requests.
    - **Template:** Renders data into HTML, typically used for serving data in JSON format.

## Prerequisites ☔

- **Node.js:** Required for running the frontend application.
- **npm or Yarn:** For managing JavaScript dependencies.
- **Python:** Required for the backend.
- **Django:** For backend framework setup.
- **SQLAlchemy ORM:** For managing database interactions.
- **Pandas and NumPy:** For data processing.
- **Visual Studio Code:** Recommended for code editing.

## Getting Started 🚀

1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
