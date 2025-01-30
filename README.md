# Daily Task Backend API

This is the backend for the **Daily Task Manager** application, which allows users to manage daily tasks and employees. It provides CRUD operations for managing tasks and employee data. Built with **Node.js**, **Express**, and connected to **MongoDB** for data storage.

## Table of Contents

- [Technologies](#technologies)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Postman Documentation](#postman-documentation)
- [Running the Project](#running-the-project)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Technologies

- **Node.js** and **Express** for backend development.
- **MongoDB** for database management.
- **Mongoose** for interacting with MongoDB.
- **JWT** (JSON Web Tokens) for user authentication.
- **Bcrypt** for hashing passwords.
- **Joi** for input validation.
- **CORS** for handling cross-origin requests.
- **Nodemon** for automatic server restart in development.

## Installation

To set up the backend locally, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/beshoynasryz/dailyTask-backend.git
    ```

2. Navigate to the project folder:

    ```bash
    cd dailyTask-backend
    ```

3. Install the required dependencies:

    ```bash
    npm install
    ```

4. Set up the environment variables by creating a `.env` file in the root directory with the following contents:

    ```env
    PORT=8000
    DB_URI=mongodb://localhost:27017/dailyTask
    JWT_SECRET=your-jwt-secret-key
    ```

    - `PORT` - The port the server will listen to.
    - `DB_URI` - MongoDB URI for connecting to the database.
    - `JWT_SECRET` - Secret key used for signing JWT tokens.

## API Endpoints

### Employee Endpoints

- **GET** `/api/employee`  
  Retrieve a list of all employees.

- **POST** `/api/employee`  
  Create a new employee.

- **PUT** `/api/employee/:id`  
  Update an existing employee's data.

- **DELETE** `/api/employee/:id`  
  Delete an employee by ID.

### Task Endpoints

- **GET** `/api/task`  
  Retrieve a list of all tasks.

- **POST** `/api/task`  
  Create a new task.

- **PUT** `/api/task/:id`  
  Update a task's data.

- **DELETE** `/api/task/:id`  
  Delete a task by ID.

### Authentication (Optional)

- **POST** `/api/login`  
  Login and receive a JWT token.

  Example request body:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }

For a full list of API endpoints, you can view the Postman documentation here.
https://documenter.getpostman.com/view/36781028/2sAYX2Lie9