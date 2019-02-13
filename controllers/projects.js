const express = require('express')

const User = require('../models/user')
const Project = require('../models/project')

module.exports = (app) => {

    // All projects - didnt pass the test
    app.get('/projects', (req, res) => {
        const currentUser = req.user;
        Project.find()
            .then(post => {
                console.log(`currentUser: ${currentUser}`)
                res.render('projects-index', { project: project, currentUser: currentUser });
            })
            .catch(err => {
                console.log(err.message);
            });
    });

    // NEW project
    app.get('/projects/new', (req, res) => {
        res.render('new-project', {});
    })

}