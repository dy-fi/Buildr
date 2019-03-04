const express = require('express');
const passport = require('passport');

module.exports = (app) => {

    app.get('/', (req, res) => {
        var currentUser = req.user;

        res.render('index', {
            currentUser,
        })
    })
}
