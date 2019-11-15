const express = require("express");
const route = express.Router();

const indexController = require("../controller/indexController");
const inputController = require("../controller/inputController");
const showController = require("../controller/showController");
const searchController = require("../controller/searchController");
const editController = require("../controller/editController");
const deleteController = require("../controller/deleteController");

const isAuth = require("../middleware/isAuth");

route.get("/", indexController.indexPage);

// Get Mark Input Option
route.get("/inputMarkOption", isAuth, inputController.getInputMarkOption);

// Input Mark Page
route.post("/inputMarkRoute", isAuth, inputController.InputMarkRoute);

// POST Mark Input
route.post("/postInputMark", isAuth, inputController.postInputMark);


// ===============================

// GET Show Marks
route.get("/showMarkOption", isAuth, showController.getShowMarksOption);

// Show Students
route.post("/students", isAuth, showController.getShowStudents);

// Show Mark Detail
route.get("/students/:studentId", isAuth, showController.getShowStudentDetail);


// ===============================

// Search Student Option
route.get("/searchStudentOption", isAuth, searchController.searchStudentOption);

// POST Search Student
route.post("/postSearchStudent", isAuth, searchController.postSearchStudent);

// =========================

// Show Edit Marks
route.post("/students/:id/edit", isAuth, editController.showEditMark);

// UPDATE Edit Marks
route.post("/postUpdateMark", isAuth, editController.postUpdateMark);

// ==========================

// Delete the semester
route.post("/students/:id/delete", isAuth, deleteController.postDeleteSemester);

module.exports = route;