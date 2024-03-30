const mongoose = require('mongoose');


const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 255
    },
    author:{
        type:String,
        required:true
    },
    tags: {
        type:Array,
        required:true
    },
    date:{
        type: Date,
        required: true,
        default: new Date()
    },
    isPublished:{
        type: Boolean,
        required:true,
        default: false
    }
});

const CourseRepository = mongoose.model('Course', courseSchema);


module.exports = CourseRepository;