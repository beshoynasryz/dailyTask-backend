import express from 'express';
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getDailySummary
} from './task.service.js';

const taskRouter = express.Router();

// Route for creating a new task
taskRouter.post('/', createTask);

// Route for getting all tasks of a specific employee
taskRouter.get('/:employeeId', getTasks);

// Route for updating a task
taskRouter.put('/:taskId', updateTask);

// Route for deleting a task
taskRouter.delete('/:taskId', deleteTask);

// Route for getting the daily summary of tasks for an employee
taskRouter.get('/summary/:employeeId/:date', getDailySummary);

export default taskRouter;
