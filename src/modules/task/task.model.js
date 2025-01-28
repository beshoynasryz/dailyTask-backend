    import mongoose from "mongoose";

    const taskSchema = new mongoose.Schema({
        description : {
            type :String,
            required : true,
            min :[3,'description must be at least 3 characters'],
            max :[100,'description must be at most 100 characters']

        },
        from : {
            type : Date,
            default : Date.now

        },
        to : {
            type : Date,
            default : Date.now
        },

        employee : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Employee'
        }   
    },{timestamps : true    

    })

    const Task = mongoose.models.Task || mongoose.model("Task", taskSchema);

    export default Task;