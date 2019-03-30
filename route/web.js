const express = require('express');
module.exports = function () {
    var server = express.Router();
    server.get('/',function (req, res) {
       res.render('manage/game.html',{});
    });
    return server;
};