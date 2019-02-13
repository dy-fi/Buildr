const express = require('express');
const passport = require('passport')

const User = require('../models/user');

module.exports = (app) => {

    app.get('/sign-up', (req, res) => {
        res.render('user-signup')
    })

    app.get('/login', (req, res) => {
        res.render('user-login');
    })

    app.post('/sign-up', (req, res) => {
        var user = new User(req.body)

        user
            .save()
            .then(user => {
                res.render('index', {
                    user,
                })
            })
    })

    app.post('/login', (req, res) => {
        console.log('logging in...')

        passport.authenticate('local', {
            failureRedirect: '/login',
        }), function(req, res) {
            res.render('index', {
                user,
            })
        }
    })

}
