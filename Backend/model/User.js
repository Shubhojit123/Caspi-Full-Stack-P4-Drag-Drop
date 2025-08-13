const mongoose = require("mongoose");

const saveTodoSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    state:{
        type:String,
        enum:["Todo","in Process","Need To Discuess","Deployed"],
        default:"Todo"
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports  = mongoose.model("saveTodo",saveTodoSchema);