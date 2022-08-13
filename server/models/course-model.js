const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    id : {type :String},
    price :{
        type : Number,
        required : true,
    },
    title :{
        type : String,
        required : true,
    },
    description :{
        type : String,
        required : true,
    },
    instructor :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    students :{
        type : [String],
        default :[],
    },
});

const Course = mongoose.model("Course",courseSchema);
module.exports = Course;