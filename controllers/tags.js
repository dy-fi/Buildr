const express = require('express')

const User = require('../models/user')
const Project = require('../models/project')

module.exports = (app) => {

    // Get user by tags
    app.get('/search', (req, res) => {
        currentUser = req.User;
        term = new RegExp(req.query.term, 'i')

        User
            .find({'tags': term})
            .exec((err, users) => {
                res.render('user-list', {
                    users,
                    currentUser,
                });
            })
    })

}
