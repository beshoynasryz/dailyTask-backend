import mongoose from 'mongoose';

// Default export of the connectDB function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
          
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Database connection error:', err.message);
    }
};

export default connectDB;  // Default export
 