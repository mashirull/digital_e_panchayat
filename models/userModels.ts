
import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true
    },

    mobile : {
        type : Number,
        require : true,
        unique : true
    },


    password : {
        type : String,
        require : true,
    },

    role : {
        type : String,
        default : 'user'
    },
},
{timestamps : true}

);


export default mongoose.models.User || mongoose.model("User" , userSchema);





