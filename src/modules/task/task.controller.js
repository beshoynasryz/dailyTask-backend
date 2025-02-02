import express from 'express';
import {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    getDailySummary
} from './task.service.js';
import validate from '../../middlewares/validationMiddleware.js';
import { taskValidationRules } from './task.validation.js';
const taskRouter = express.Router();

// Route for creating a new task
taskRouter.post('/',validate(taskValidationRules) , createTask);

// Route for getting all tasks of a specific employee
taskRouter.get('/:employeeId', getTasks);

// Route for updating a task
taskRouter.put('/:taskId',validate(taskValidationRules) , updateTask);

// Route for deleting a task
taskRouter.delete('/:taskId', deleteTask);

// Route for getting the daily summary of tasks for an employee
taskRouter.get('/summary/:employeeId/:date', getDailySummary);

export default taskRouter;
