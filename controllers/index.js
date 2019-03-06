const express = require('express');

module.exports = (app) => {

    app.get('/', (req, res) => {
        currentUser = req.user
        res.render('index', {currentUser})
    })
}
