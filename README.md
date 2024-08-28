# Expense Sharing Application 💰

## Description 📋
Developed an expense sharing and management application designed to streamline group finances. The platform allows users to create and manage groups, add members, log expenses, and track balances with ease. It features real-time updates and detailed expense tracking through a user-friendly interface. The backend leverages a microservices architecture, with distinct services for user management and expense tracking, ensuring scalable and efficient handling of data and interactions.

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

# Project Overview

## Application Screenshots 📸

### SplashScreen
![image](https://github.com/user-attachments/assets/9fb4ead1-fb55-4339-b275-94cae7ba7c34)

### LoginSignUpScreen
A) SignIn
![image](https://github.com/user-attachments/assets/482c3d32-4c2f-4fc2-bf8e-734ede866ef2)


B) SignUp
![image](https://github.com/user-attachments/assets/ef5fbbb6-5f45-4e7e-b186-6044717cf294)


### Group Management
![image](https://github.com/user-attachments/assets/34f37e03-3faf-4717-9156-a28e2923c1b0)


### Expense Management
A) Expenses List
![image](https://github.com/user-attachments/assets/5ba65072-05b5-4038-a3e2-571294162a35)

B) Friend's List
![image](https://github.com/user-attachments/assets/851f27b5-5a2d-4595-9e3f-51421a0c194c)


### Add Expense
![image](https://github.com/user-attachments/assets/062987e1-3863-404d-829d-a70374e6bcf0)

### Infrastructure Setup with Terraform ☁️
Used Terraform to create an Amazon Aurora MySQL database in AWS (Amazon Web Services). Created a Virtual Private Cloud (VPC) and set up database clusters for the user and expense microservices.

### Skills Developed 🛠️
- **Frontend Development**: React.js, Tailwind CSS, Material-UI
- **Backend Development**: Django REST Framework, SQLAlchemy ORM
- **Database Management**: MySQL, AWS Aurora MySQL
- **Data Processing**: NumPy, Pandas
- **Microservices Architecture**: Design and implementation of user and expense services
- **Model-View-Template (MVT) Architecture**: Application structure and data handling
- **Infrastructure as Code**: Terraform for cloud database setup
- **Responsive Design**: Tailwind CSS for multi-device support

## Acknowledgments 💖

* To my family👪  and friends 👫 who always kept me motivated.
* To the community of computer science 💻.

