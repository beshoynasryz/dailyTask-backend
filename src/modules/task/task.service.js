import Task from '../task/task.model.js';
import EmployeeModel from '../employee/employee.model.js';
import AsyncHandler from 'express-async-handler';


// Controller for creating a new task
export const createTask = AsyncHandler(async (req, res, next) => {
    const { description, from, to, employeeId } = req.body;

    // Check if the employee exists
    const employee = await EmployeeModel.findById(employeeId);
    if (!employee) {
        return res.status(400).json({ message: 'Employee not found' });
    }

    // Calculate the duration of the new task in hours
    const taskDuration = (new Date(to) - new Date(from)) / (1000 * 60 * 60); // Hours

    // Ensure the task duration does not exceed 8 hours
    if (taskDuration > 8) {
        return res.status(400).json({ message: 'Task duration cannot exceed 8 hours' });
    }

    // Calculate the start and end of the day for the given date
    const startOfDay = new Date(from).setHours(0, 0, 0, 0);
    const endOfDay = new Date(from).setHours(23, 59, 59, 999);

    // Fetch all tasks for the employee on the same day
    const existingTasks = await Task.find({
        employee: employeeId,
        from: { $gte: startOfDay, $lte: endOfDay }
    });


    // Calculate total hours already worked on the same day
    const totalHours = existingTasks.reduce((acc, task) => {
        const taskStart = new Date(task.from);
        const taskEnd = new Date(task.to);
        return acc + (taskEnd - taskStart) / (1000 * 60 * 60); // Hours
    }, 0);

    // Check if the employee has already worked 8 hours or more
    if (totalHours >= 8) {
        return res.status(400).json({
            message: `You have already worked ${totalHours.toFixed(2)} hours today. You cannot work more than 8 hours per day.`
        });
    }

    // Check if the new task would exceed the daily limit
    const remainingHours = 8 - totalHours;
    if (taskDuration > remainingHours) {
        return res.status(400).json({
            message: `You have already worked ${totalHours.toFixed(2)} hours today. You can only add ${remainingHours.toFixed(2)} more hours.`
        });
    }

    // Create the new task if everything is valid
    const task = new Task({
        description,
        from,
        to,
        employee: employeeId
    });
    await task.save();

    res.status(201).json({
        message: 'Task created successfully',
        task,
        remainingHours: (remainingHours - taskDuration).toFixed(2) // Remaining hours after the new task
    });
});


// Controller for updating a task
export const updateTask = AsyncHandler(async (req, res) => {
    const { taskId } = req.params;
    const { description, from, to, employeeId } = req.body;

    // Fetch the task by ID
    const task = await Task.findById(taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Calculate the duration of the updated task in hours
    const taskDuration = (new Date(to) - new Date(from)) / (1000 * 60 * 60); // Duration in hours

    // Ensure the task duration does not exceed 8 hours
    if (taskDuration > 8) {
        return res.status(400).json({ message: 'Task duration cannot exceed 8 hours' });
    }

    // Convert to Date objects for comparison
    const newStart = new Date(from);
    const newEnd = new Date(to);

    // Check for overlapping tasks (excluding the task being updated)
    const overlappingTasks = await Task.findOne({
        employee: employeeId,
        _id: { $ne: taskId }, // Exclude the current task
        $or: [
            { from: { $lt: newEnd }, to: { $gt: newStart } } // Overlaps with the new time
        ]
    });

    if (overlappingTasks) {
        return res.status(400).json({ message: 'This time slot is already taken by another task' });
    }

    // Fetch all tasks for the employee on the same day
    const startOfDay = new Date(newStart).setHours(0, 0, 0, 0);
    const endOfDay = new Date(newStart).setHours(23, 59, 59, 999);
    
    const existingTasks = await Task.find({
        employee: employeeId,
        from: { $gte: startOfDay, $lte: endOfDay }
    });

    // Calculate total hours worked (excluding the old task duration)
    const totalHours = existingTasks.reduce((acc, t) => {
        if (t._id.toString() !== taskId) {
            return acc + (new Date(t.to) - new Date(t.from)) / (1000 * 60 * 60);
        }
        return acc;
    }, 0);

    // Check if the total hours plus the updated task duration exceed 8 hours
    if (totalHours + taskDuration > 8) {
        return res.status(400).json({
            message: `You have already worked ${totalHours.toFixed(2)} hours today. You cannot work more than 8 hours per day.`
        });
    }

    // Update the task
    task.description = description;
    task.from = from;
    task.to = to;
    task.employee = employeeId;

    await task.save();

    res.status(200).json({
        message: 'Task updated successfully',
        task
    });
});

// Controller for deleting a task
export const deleteTask = AsyncHandler(async (req, res) => {
    const { taskId } = req.params;

    // Fetch the task by ID
    const task = await Task.findById(taskId);
    if (!task) {
        return res.status(404).json({ message: 'Task not found' });
    }

    // Remove the task
    await task.deleteOne();

    res.status(200).json({ message: 'Task deleted successfully' });
});

// Controller for getting the daily summary of a specific employee
export const getDailySummary =AsyncHandler( async (req, res) => {
    const { employeeId, date } = req.params;

   
        const startOfDay = new Date(date).setHours(0, 0, 0, 0);
        const endOfDay = new Date(date).setHours(23, 59, 59, 999);

        const tasks = await Task.find({
            employee: employeeId,
            from: { $gte: startOfDay, $lte: endOfDay }
        });

        const totalHours = tasks.reduce((acc, task) => {
            const taskStart = new Date(task.from);
            const taskEnd = new Date(task.to);
            return acc + (taskEnd - taskStart) / (1000 * 60 * 60); // Task duration in hours
        }, 0);

        const remainingHours = 8 - totalHours;

        res.status(200).json({
            date,
            totalHours,
            remainingHours,
            tasks
        });
   
})

export const getTasks = AsyncHandler(async (req, res, next) => {
    const { employeeId } = req.params;
    
    // Fetch all tasks for the employee
    const tasks = await Task.find({ employee: employeeId });
    if (!tasks || tasks.length === 0) {
        return res.status(404).json({ message: 'No tasks found for this employee' });
    }

    // Calculate the total hours worked for all tasks
    const totalHours = tasks.reduce((acc, task) => {
        const taskStart = new Date(task.from);
        const taskEnd = new Date(task.to);
        return acc + (taskEnd - taskStart) / (1000 * 60 * 60); // Task duration in hours
    }, 0);

    res.status(200).json({
        totalHours,
        tasks

    })
}); 


