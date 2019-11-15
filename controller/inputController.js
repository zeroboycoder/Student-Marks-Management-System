const studentMarks = require("../model/markRegisterModel");

// Get input option
exports.getInputMarkOption = (req, res) => {
    const examType = req.query.semester;
    res.render("inputMarkOption", {
        title: "Input Mark Option",
        option: "input",
        path: "/inputMarks",
        examType: examType
    });
}

// Assign Marks
exports.InputMarkRoute = (req, res) => {
    const major = req.body.major;
    const year = req.body.year;
    const examType = req.body.examType;
    const acadamicYear = req.body.acadamicYear;
    if (major === "Civil") {
        res.render("majorMarkInput/civil", {
            major: major,
            year: year,
            examType: examType,
            acadamicYear: acadamicYear,
            title: "Assign Input Mark",
            path: "/inputMarks"
        });
    } else if (major === "EC") {
        res.render("majorMarkInput/ec", {
            major: major,
            year: year,
            examType: examType,
            acadamicYear: acadamicYear,
            title: "Assign Input Mark",
            path: "/inputMarks"
        });
    } else if (major === "EP") {
        res.render("majorMarkInput/ep", {
            major: major,
            year: year,
            examType: examType,
            acadamicYear: acadamicYear,
            title: "Assign Input Mark",
            path: "/inputMarks"
        });
    } else if (major === "Mechnical") {
        res.render("majorMarkInput/mech", {
            major: major,
            year: year,
            examType: examType,
            acadamicYear: acadamicYear,
            title: "Assign Input Mark",
            path: "/inputMarks"
        });
    } else if (major === "IT") {
        res.render("majorMarkInput/it", {
            major: major,
            year: year,
            examType: examType,
            acadamicYear: acadamicYear,
            title: "Assign Input Mark",
            path: "/inputMarks"
        });
    }
}

// 1. POST marks to database
exports.postInputMark = (req, res) => {
    const dataObj = req.body.data;
    const studentId = req.body.studentId;
    const studentName = req.body.studentName;
    const major = req.body.major;
    const year = req.body.year;
    const acadamicYear = req.body.acadamicYear;
    const rollno = req.body.rollno;
    const subjects = Object.keys(dataObj);
    const examType = req.body.examType;
    const marks = Object.values(dataObj);
    // For First Semester
    if (examType === "First Semester") {
        studentMarks.findOne({
                studentId: studentId
        })
        .then(result => {
            // Student ID is not exist, assume that it's a new student!
            if (!result) {
                new studentMarks({
                        studentId: studentId,
                        studentName: studentName,
                        major: major,
                        data: [{
                            specificStudentId: studentId,
                            specificStudentName : studentName,
                            specificMajor: major,
                            year: year,
                            acadamicYear: acadamicYear,
                            rollno : rollno,
                            subjects: subjects,
                            semester: [{
                                examType: examType,
                                marks: marks
                            }]
                        }]
                    }).save()
                    .then(result => {
                        res.redirect("/inputMarkOption?semester="+examType);
                    })
                    .catch(err => console.log(err));
            } else {
                // if Student ID is already exist, check the examType is exist or not?
                studentMarks.find({studentId : studentId,
                    data : {
                        $elemMatch : {
                            year : year,
                            acadamicYear : acadamicYear
                        }
                    }
                })
                .then(results => {
                    // Let first semester data is true or false
                    let condition;
                    results.forEach(result => {
                        result.data.forEach(data => {
                            data.semester.forEach(semester => {
                                // if first semester data is already exist, condition is true
                                if(semester.examType === examType){
                                    condition = true;
                                }
                            })
                        })
                    })
                    // if condition is true, Datas can't add anymore
                    if(condition){
                        console.log("First Semester Data is already exist!");
                        req.flash("error", "First Semester Data is already exist! Please Search and Edit");
                        return res.redirect("/searchStudentOption");
                    } 
                    // if condition is flase, Datas can be add
                    else {
                        // if examType isn't exist, add the semester data
                        studentMarks.updateOne({
                            studentId: studentId
                        }, {
                            $push: {
                                "data": {
                                    specificStudentId: studentId,
                                    specificStudentName : studentName,
                                    specificMajor: major,
                                    year: year,
                                    acadamicYear: acadamicYear,
                                    rollno : rollno,
                                    subjects: subjects,
                                    semester: [{
                                        examType: examType,
                                        marks: marks
                                    }]
                                }
                            }
                        })
                        .then(result => {
                            return res.redirect("/inputMarkOption?semester="+examType)
                        })
                        .catch(err => console.log(err));
                    }
                })
            }
        })
    } 
    // For Second Semester
    else if(examType === "Second Semester") {
        studentMarks.find({studentId : studentId}, {
            data : {
                $elemMatch : {
                    year : year,
                    acadamicYear : acadamicYear
                }
            }
        })
        .then(results => {
            let condition;
            results.forEach(result => {
                result.data.forEach(data => {
                    data.semester.forEach(semester => {
                        if(semester.examType === examType){
                            condition = true;
                        }
                    })
                })
            })
            if(condition){
                console.log("Second Semester Data is already exist");
                req.flash("error", "Second Semester Data is already exist!")
                res.redirect("/inputMarkOption?semester="+examType)
            } else {
                studentMarks.update({
                    data: {
                        $elemMatch: {
                            specificStudentId: studentId,
                            specificMajor: major,
                            year: year,
                            acadamicYear: acadamicYear
                        }
                    }
                }, {
                    $push: {
                        "data.$.semester": {
                            examType: examType,
                            marks: marks
                        }
                    }
                })
                .then(result => {
                    res.redirect("/inputMarkOption?semester="+examType)
                })
            }
        })
        
    }
}