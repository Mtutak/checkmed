// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************
// Dependencies
// =============================================================
var path = require('path');
// Routes
// =============================================================
module.exports = function (app) {
    app.get('/test', function (req, res) {
        res.render("index");
    });
    app.get("/create", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/newCreateList.html"));
        console.log(__dirname);
    });
    app.get("/user", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/profile.html"));
        console.log(__dirname);
    });
    app.get("/new_list", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/listRender.html"));
        console.log(__dirname);
    });
    // Default to login
    app.use(function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/welcome.html'));
    });
    app.post("/user", function (req, res) {
        res.sendFile(path.join(__dirname + "/../public/profile.html"));
        console.log(__dirname);
    });
};