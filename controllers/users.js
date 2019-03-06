const express = require('express')

const User = require('../models/user')
const Project = require('../models/project')
const Tag = require('../models/tag')

module.exports = (app) => {

    // GET single user by id
    app.get('/user/:id', (req, res) => {
        currentUser = req.user

        User.findById(req.params.id)
            .populate('projects')
            .populate('tags')
            .then(user => {
                console.log(user)
                res.render('user-show', {
                    user,
                    currentUser,
                })
            }).catch(e => {
                console.log(e);
            })
    })

    // PUT single user by id if authorized
    app.put('/user/:id/edit', (req, res) => {
        currentUser = req.user;

        if(currentUser._id = req.params._id) {
            User.findByIdAndUpdate(req.params.id)
                .then(user => {
                    res.redirect('/user/' + user._id);
                }).catch(e => {
                    console.log(e);
                })
        } else {
            res.status(402);
        }

    })

    // DELETE a single user by id if authorized
    app.delete('/user/:id/delete', (req, res) => {
        currentUser = req.user;

        if(currentUser._id == req.params.id) {
            User.findByIdAndRemove(req.params.id)
                .then(user => {
                    res.status(200).redirect('/');
                }).catch(e => {
                    console.log(e);
                })
        } else {
            res.status(402);
        }
    })
}
