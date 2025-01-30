Daily Task Backend
This is the backend API for the Daily Task application, built with Node.js and Express. The backend provides CRUD operations for managing daily tasks and employees, along with user authentication via JWT. The backend is connected to a MongoDB database for data persistence.

Table of Contents
Technologies
Installation
Environment Variables
API Endpoints
Postman Documentation
Running the Project
Error Handling
Contributing
License
Technologies
Node.js - JavaScript runtime for server-side logic
Express - Web framework for handling API routes
MongoDB - NoSQL database for storing tasks and employee data
Mongoose - ODM for interacting with MongoDB
bcrypt - Password hashing library
cors - Middleware for enabling CORS
dotenv - Loads environment variables from a .env file
express-async-handler - Middleware for handling asynchronous requests
joi - Schema validation for input data
jsonwebtoken (JWT) - Authentication via JSON Web Tokens
nodemon - Tool for automatically restarting the server during development
Installation
To set up the project locally, follow these steps:

Clone the repository:

bash
Copy
Edit
git clone https://github.com/beshoynasryz/dailyTask-backend.git
Navigate into the project directory:

bash
Copy
Edit
cd dailyTask-backend
Install dependencies:

bash
Copy
Edit
npm install
Environment Variables
Create a .env file in the root of your project and add the following:

env
Copy
Edit
PORT=8000
DB_URI=mongodb://localhost:27017/dailyTask
JWT_SECRET=your-secret-key
PORT: The port your application will run on.
DB_URI: The connection string for your MongoDB database.
JWT_SECRET: A secret key for signing JWT tokens.
API Endpoints
Employee Endpoints
GET /api/employee
Retrieves a list of all employees.

POST /api/employee
Creates a new employee.
Example request body:

json
Copy
Edit
{
  "name": "John Doe",
  "email": "john@example.com",
  "role": "developer",
  "password": "password123"
}
PUT /api/employee/:id
Updates an existing employee's details.
Example request body:

json
Copy
Edit
{
  "name": "John Doe Updated",
  "role": "senior developer"
}
DELETE /api/employee/:id
Deletes an employee by ID.

Task Endpoints
GET /api/task
Retrieves a list of all tasks.

POST /api/task
Creates a new task.
Example request body:

json
Copy
Edit
{
  "title": "Task Title",
  "description": "Task Description",
  "status": "pending",
  "assignedTo": "employeeId"
}
PUT /api/task/:id
Updates an existing task.
Example request body:

json
Copy
Edit
{
  "status": "completed"
}
DELETE /api/task/:id
Deletes a task by ID.

Authentication (Optional)
POST /api/login
Logs in a user and returns a JWT token for authentication.
Example request body:

json
Copy
Edit
{
  "email": "john@example.com",
  "password": "password123"
}
Postman Documentation
You can test the API using Postman. The full API documentation can be found here.

Running the Project
To start the project in development mode:

bash
Copy
Edit
npm run dev
This will run the server with nodemon, automatically restarting the server when files are modified.

Available Scripts
npm start: Starts the server in production mode.
npm run dev: Starts the server in development mode with auto-reloading.
Error Handling
The backend uses a custom error handler to catch and manage errors. All errors will be caught and responded to in the following format:

json
Copy
Edit
{
  "message": "Error message",
  "error": "Error description"
}