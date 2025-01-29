import connectDB from './DB/dbConnection.js';
import errorHandler from './middlewares/errorhandlerMiddleware.js';
import taskRoutes from './modules/task/task.controller.js';
import employeeRoutes from './modules/employee/employee.controller.js';

function bootstrap(app, express) {
    connectDB();  // Use the default imported connectDB function
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    
    // Add more routes here...
    app.use( '/api/employee',employeeRoutes);
    app.use( '/api/task',taskRoutes);
    
    // Error handling middleware
    app.use(errorHandler)
    app.get('/', (_req, res) => res.send('daly task manager is running'));
    app.use('*', (req, res, next) => {
        res.status(404).send({message: `Route ${req.originalUrl} not found`});
    });
    

   
}

export default bootstrap;
