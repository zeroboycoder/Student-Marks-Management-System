const studentMarks = require("../model/markRegisterModel");


// Show Edit Mark Route
exports.showEditMark = (req, res) => {
    const id = req.params.id;
    const studentId = req.body.studentId;
    const name = req.body.studentName;
    const rollno = req.body.rollno;
    const year = req.body.year;
    const acadamicYear = req.body.acadamicYear;
    const major = req.body.major;
    const examType = req.body.examType;
    
    studentMarks.find({_id : id}, {
        data : {
            $elemMatch : {
                year : year
                }
            }
    }).then(results => {
        results.forEach(result => {
            result.data.forEach(data => {

                if(examType === "First Semester"){
                    const marks = data.semester[0].marks;
                    const examType = data.semester[0].examType;

                    if (major === "Civil") {
                        res.render("majorMarkInput/civil", {
                            id : id,
                            studentId : studentId,
                            name : name,
                            rollno : rollno,
                            major: major,
                            year: year,
                            acadamicYear: acadamicYear,
                            examType: examType,
                            marks : marks,
                            title: "Assign Edit Mark",
                            path: "/editMarks"
                        });
                    } else if (major === "EC") {
                        res.render("majorMarkInput/ec", {
                            id : id,
                            studentId : studentId,
                            name : name,
                            rollno : rollno,
                            major: major,
                            year: year,
                            acadamicYear: acadamicYear,
                            examType: examType,
                            marks : marks,
                            title: "Assign Edit Mark",
                            path: "/editMarks"
                        });
                    } else if (major === "EP") {
                        res.render("majorMarkInput/ep", {
                            id : id,
                            studentId : studentId,
                            name : name,
                            rollno : rollno,
                            major: major,
                            year: year,
                            acadamicYear: acadamicYear,
                            examType: examType,
                            marks : marks,
                            title: "Assign Edit Mark",
                            path: "/editMarks"
                        });
                    } else if (major === "Mechnical") {
                        res.render("majorMarkInput/mech", {
                            id : id,
                            studentId : studentId,
                            name : name,
                            rollno : rollno,
                            major: major,
                            year: year,
                            acadamicYear: acadamicYear,
                            examType: examType,
                            marks : marks,
                            title: "Assign Edit Mark",
                            path: "/editMarks"
                        });
                    } else if (major === "IT") {
                        res.render("majorMarkInput/it", {
                            id : id,
                            studentId : studentId,
                            name : name,
                            rollno : rollno,
                            major: major,
                            year: year,
                            acadamicYear: acadamicYear,
                            examType: examType,
                            marks : marks,
                            title: "Assign Edit Mark",
                            path: "/editMarks"
                        });
                    } 
                } else {
                    const marks = data.semester[1].marks;
                    const examType = data.semester[1].examType;

                    if (major === "Civil") {
                        res.render("majorMarkInput/civil", {
                            id : id,
                            studentId : studentId,
                            name : name,
                            rollno : rollno,
                            major: major,
                            year: year,
                            acadamicYear: acadamicYear,
                            examType: examType,
                            marks : marks,
                            title: "Assign Edit Mark",
                            path: "/editMarks"
                        });
                    } else if (major === "EC") {
                        res.render("majorMarkInput/ec", {
                            id : id,
                            studentId : studentId,
                            name : name,
                            rollno : rollno,
                            major: major,
                            year: year,
                            acadamicYear: acadamicYear,
                            examType: examType,
                            marks : marks,
                            title: "Assign Edit Mark",
                            path: "/editMarks"
                        });
                    } else if (major === "EP") {
                        res.render("majorMarkInput/ep", {
                            id : id,
                            studentId : studentId,
                            name : name,
                            rollno : rollno,
                            major: major,
                            year: year,
                            acadamicYear: acadamicYear,
                            examType: examType,
                            marks : marks,
                            title: "Assign Edit Mark",
                            path: "/editMarks"
                        });
                    } else if (major === "Mechnical") {
                        res.render("majorMarkInput/mech", {
                            id : id,
                            studentId : studentId,
                            name : name,
                            rollno : rollno,
                            major: major,
                            year: year,
                            acadamicYear: acadamicYear,
                            examType: examType,
                            marks : marks,
                            title: "Assign Edit Mark",
                            path: "/editMarks"
                        });
                    } else if (major === "IT") {
                        res.render("majorMarkInput/it", {
                            id : id,
                            studentId : studentId,
                            name : name,
                            rollno : rollno,
                            major: major,
                            year: year,
                            acadamicYear: acadamicYear,
                            examType: examType,
                            marks : marks,
                            title: "Assign Edit Mark",
                            path: "/editMarks"
                        });
                    }
                }
            })
        })
    })
}

// UPDATE Edit Marks
exports.postUpdateMark = (req, res) => {
    const dataObj = req.body.data;
    const id = req.body.id;
    const studentId = req.body.studentId;
    const major = req.body.major;
    const year = req.body.year;
    const acadamicYear = req.body.acadamicYear;
    const examType = req.body.examType;
    const marks = Object.values(dataObj);
    studentMarks.findOne({
        _id : id},{
        data: {
            $elemMatch: {
                specificStudentId: studentId,
                specificMajor: major,
                year: year,
                acadamicYear: acadamicYear
            }
        }
    })
    .then(results => {
        results.data.forEach(data => {
            const arrLength = data.semester.length;

            if(arrLength === 1){
                let firstSemester = {
                    examType : examType,
                    marks : marks
                }
                const semester = [firstSemester];
                studentMarks.updateOne({"data.specificStudentId" : studentId, "data.year" : year},
                {"data.$.semester" : [...semester]})
                .then(() => {
                    return res.redirect("../");
                })
            }

            else if(arrLength === 2){
                let firstSemester = data.semester[0];
                let secondSemester = data.semester[1];
                if(examType === data.semester[0].examType){
                    firstSemester = {
                        examType : examType,
                        marks : marks
                    }
                } else {
                    secondSemester = {
                        examType : examType,
                        marks : marks
                    }
                }
                const semester = [firstSemester, secondSemester];
                studentMarks.updateOne({"data.specificStudentId" : studentId, "data.year" : year},
                {"data.$.semester" : [...semester]})
                .then(() => res.redirect("../"))
            }
        })
    })
}