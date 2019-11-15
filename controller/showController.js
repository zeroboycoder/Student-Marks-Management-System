const studentMarks = require("../model/markRegisterModel");

// GET show mark option
exports.getShowMarksOption = (req, res) => {
    res.render("showMarkOption", {
        title: "Show Marks Option",
        option: "show",
        path: "/showMarks"
    });
}

// Show Students
exports.getShowStudents = (req, res) => {
    const inputmajor = req.body.major;
    const inputyear = req.body.year;
    const inputacadamicYear = req.body.acadamicYear;

    studentMarks.find({
            data: {
                $elemMatch: {
                    specificMajor: inputmajor,
                    year: inputyear,
                    acadamicYear: inputacadamicYear
                }
            }
        })

        .then(results => {
            res.render("showStudents", {
                title: "Show Students",
                path: "/showMarks",
                results: results,
                major: inputmajor,
                year: inputyear,
                acadamicYear: inputacadamicYear
            })
        })
        .catch(err => console.log(err));
}


// Show mark Detail
exports.getShowStudentDetail = (req, res) => {
    const id = req.params.studentId;
    const year = req.query.year;
    studentMarks.find({
            _id: id
        }, {
            data : {
                $elemMatch : {
                    year : year
                }
            }
        })
        .then(results => {
            results.forEach(result => {
                result.data.forEach(data => {
                    const semester = data.semester;
                    res.render("showMarkDetail", {
                        title: "Student Marks Detail",
                        path: "/showMarks",
                        result : result,
                        id : id,
                        semester : semester
                    })
                })
            })
        })
        .catch(err => console.log(err));
}