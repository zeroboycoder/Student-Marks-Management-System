const User = require("../model/auth");
const bcrypt = require("bcryptjs");

exports.getSignup = (req, res, next ) => {
    let message = req.flash("error");
    if(message.length > 0){
        message = message[0];
    } else {
        message = null;
    }
    res.render("auth/signup", {
        title : "Sing up",
        path : "/signup",
        errorMessage : message
    })
}

exports.postSignup = (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    if(password === confirmPassword){
        User.findOne({email : email})
        .then(user => {
            if(user){
                console.log("This email is already exist. Try another!")
                req.flash("error", "This email is already exist. Try another or Login!")
                return res.redirect("/signup");
            }
            bcrypt.hash(password, 12)
            .then(hashPassword => {
                new User({
                    username : username,
                    email : email,
                    password : hashPassword
                }).save()
                .then(success => {
                    console.log("Congrate! Plz login again")
                    req.flash("success", "Congrate! Please login again")
                    return res.redirect("/login");
                })
                .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    } else {
        console.log("Passwords not Match!");
        req.flash("error", "Your passwords aren't Match!")
        return res.redirect("/signup");
    }
}



exports.getLogin = (req, res, next) => {
    let message;
    let errorCondition;
    let errMessage = req.flash("error");
    let sucMessage = req.flash("success");
    
    if(errMessage.length > 0){
        message = errMessage[0];
        errorCondition = true;
    } else if(sucMessage.length > 0) {
        message = sucMessage[0];
        errorCondition = false;
    }  else {
        message = null;
    }
    res.render("auth/login", {
        title : "Login",
        path : "/login",
        message : message,
        errorCondition : errorCondition
    })
    
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email : email})
    .then(user => {
        if(!user){
            console.log("Your Email is wrong!");
            req.flash("error", "Your Email is wrong. Please try again!");
            return res.redirect("/login");
        }
        bcrypt.compare(password, user.password)
        .then(doMatch => {
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.user = user;
                res.redirect("/");
            } else {
                console.log("Your Password is incorect. Please try again!");
                req.flash("error", "Your Password is incorect.Please try again!");
                return res.redirect("/login");
            }
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect("/");
    })
}