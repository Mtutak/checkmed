var path = require('path');
module.exports = function (app) {
    app.get('/user', function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/test1.html'));
    });
    // Default to login
    app.use(function (req, res) {
        res.sendFile(path.join(__dirname + '/../public/welcome.html'));
    });
};