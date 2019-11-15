const mongoose = require("mongoose");

const markSchema = new mongoose.Schema({
    studentId : {
        type : String,
        required : true
    },
    studentName : {
        type : String,
        required : true
    },
    major : {
        type : String,
        required : true
    },
    data : [{
        specificStudentId : {
            type : String,
            required : true
        },
        specificStudentName : {
            type : String,
            required : true
        },
        specificMajor : {
            type : String,
            required : true
        },
        year : {
            type : String,
            required : true
        },
        acadamicYear : {
            type : String,
            required : true
        },
        rollno : {
            type : String,
            required : true
        },
        subjects : {
            type : Array,
            required : true
        },
        semester : [{
            examType : {
                type : String,
                required : true
            },
            marks : {
                type : Array,
                required : true
            }
        }]
    }]
})

module.exports = mongoose.model("Student Marks", markSchema);