module.exports = (req, res, next) => {
    if(!req.session.isLoggedIn) {
        req.flash("error", "Please login first!");
        res.redirect("/login");
    }
    next();
}