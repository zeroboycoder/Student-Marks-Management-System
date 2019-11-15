const studentMarks = require("../model/markRegisterModel");

// Delete Semester
exports.postDeleteSemester = (req, res) => {
    const id = req.params.id;
    const dataId = req.body.dataId;
    const semesterId = req.body.semesterId;
    const studentId = req.body.studentId;
    const year = req.body.year;
    const acadamicYear = req.body.acadamicYear;
    const examType = req.body.examType;
    studentMarks.findById({_id : id})
    .then(student => {
        const dataLength = student.data.length;

        if(dataLength === 1){
            studentMarks.findById({_id : id}, {data : {$elemMatch : { _id : dataId}}})
            .then(result => {
                result.data.forEach(dataObj => {
                    const semLength = dataObj.semester.length;

                    if(semLength === 1){
                        studentMarks.findByIdAndRemove({_id : id})
                        .then(() => {
                            res.redirect("/searchStudentOption");
                        })
                    } else if(semLength === 2){
                        studentMarks.update({
                            "data.semester._id" : semesterId
                        }, {
                            $pull : {
                                "data.$.semester" : { _id :  semesterId}
                            }
                        })
                        .then(result => {
                            res.redirect("/searchStudentOption");
                        });
                    }
                });
            })
        } else if(dataLength > 1){
            studentMarks.findById({_id : id}, {data : {$elemMatch : { _id : dataId}}})
            .then(result => {
                result.data.forEach(dataObj => {
                    const semLength = dataObj.semester.length;

                    if(semLength === 1){
                        const updateData = student.data.filter(data => {
                            return data.id !== dataId
                        });
                        studentMarks.update({_id : id}, {data : updateData})
                        .then(result => {
                            res.redirect("/searchStudentOption");
                        })
                    } else if(semLength === 2){
                        studentMarks.update({
                            "data.semester._id" : semesterId
                        }, {
                            $pull : {
                                "data.$.semester" : { _id :  semesterId}
                            }
                        })
                        .then(result => {
                            res.redirect("/searchStudentOption");
                        });
                    }
                });
            })
        }
    })
}