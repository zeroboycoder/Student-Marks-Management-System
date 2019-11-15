const express = require("express");
const route = express.Router();

const authController = require("../controller/authController");

route.get("/signup", authController.getSignup);

route.post("/signup", authController.postSignup);

route.get("/login", authController.getLogin);

route.post("/login", authController.postLogin)

route.post("/logout", authController.postLogout)

module.exports = route;