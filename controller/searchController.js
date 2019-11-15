const studentMarks = require("../model/markRegisterModel");

// Search Student option
exports.searchStudentOption = (req, res) => {
    let message = req.flash("error");
    if(message.length > 0){
        message = message[0];
    } else {
        message = null;
    }
    console.log(message);
    res.render("searchStudent", {
        title : "Search Student",
        path : "/searchStudent",
        errorMessage : message
    })
}

// All Mark Detail
exports.postSearchStudent = (req, res) => {
    const studentId = req.body.studentId;
    studentMarks.find({
            studentId: studentId
        })
        .then(result => {
            res.render("showSpecificDetail", {
                title: "Student Marks Detail",
                path: "/searchStudent",
                result: result
            })
        })
        .catch(err => console.log(err));
}
