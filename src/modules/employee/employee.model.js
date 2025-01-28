import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    name : {
        type :String,
        required : true,
        min :[3,'name must be at least 3 characters'],
        max :[100,'name must be at most 100 characters']

    },
},{timestamps : true})

const Employee = mongoose.models.Employee || mongoose.model('Employee',employeeSchema);

export default Employee;
