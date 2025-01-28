import express from 'express';
import {
    createEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
} from '../employee/employee.service.js';

const router = express.Router();

// Route for creating a new employee
router.post('/', createEmployee);

// Route for getting all employees with their tasks
router.get('/', getEmployees);

// Route for getting a specific employee by ID with their tasks
router.get('/:employeeId', getEmployeeById);

// Route for updating an employee
router.put('/:employeeId', updateEmployee);

// Route for deleting an employee
router.delete('/:employeeId', deleteEmployee);

export default router;
