import Employee from '../employee/employee.model.js';
import Task from '../task/task.model.js';
import AsyncHandler from 'express-async-handler';

// Controller for creating a new employee
export const createEmployee = AsyncHandler(async (req, res) => {
    const { name } = req.body;

    // Create a new employee
    const employee = new Employee({ name });
    await employee.save();
    res.status(201).json(employee);
});

// Controller for getting all employees and their tasks
export const getEmployees = AsyncHandler(async (req, res) => {
    const employees = await Employee.find();

    if (!employees || employees.length === 0) {
        return res.status(404).json({ message: 'No employees found' });
    }

    // Fetch tasks for each employee and return them
    const employeesWithTasks = await Promise.all(
        employees.map(async (employee) => {
            const tasks = await Task.find({ employee: employee._id });
            return { ...employee.toObject(), tasks };
        })
    );

    res.status(200).json(employeesWithTasks);
});

// Controller for getting a specific employee with their tasks
export const getEmployeeById = AsyncHandler(async (req, res) => {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    // Fetch tasks for the employee
    const tasks = await Task.find({ employee: employeeId });

    res.status(200).json({ ...employee.toObject(), tasks });
});

// Controller for updating an employee's details
export const updateEmployee = AsyncHandler(async (req, res) => {
    const { employeeId } = req.params;
    const { name } = req.body;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    // Update employee details
    employee.name = name || employee.name;

    await employee.save();
    res.status(200).json(employee);
});

// Controller for deleting an employee
export const deleteEmployee = AsyncHandler(async (req, res) => {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    // Delete all tasks related to the employee
    await Task.deleteMany({ employee: employeeId });

    // Delete employee
    await employee.deleteOne();
    res.status(200).json({ message: 'Employee deleted successfully' });
});
