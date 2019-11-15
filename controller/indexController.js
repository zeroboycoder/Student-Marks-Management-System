exports.indexPage = (req, res) => {
    res.render("index", {
        title: "Student Marks Management System",
        path: "/"
    });
}