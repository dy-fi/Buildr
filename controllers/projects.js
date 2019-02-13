const express = require('express')

const User = require('../models/user')
const Project = require('../models/project')

module.exports = (app) => {

    // All projects - didnt pass the test
    app.get('/projects', (req, res) => {
        const currentUser = req.user;
        Project.find()
            .then(project => {
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

    // CREATE a project
    app.post('/projects/new', (req, res) => {
        if (req.user) {
            const project = new Project(req.body);
            project.author = req.user._id;
            project.save().then(project => {
                return User.findById(req.user._id);
            }).then(user => {
                user.projects.unshift(project);
                user.save();
                res.redirect('/projects');
            })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });

    // SHOW one project
    app.get('/projects/:id', function (req, res) {
        const currentUser = req.user;
        // LOOK UP THE PROJECT
        Project.findById(req.params.id).populate('author')
            .then(post => {
                res.render('show-project', { post, currentUser });
            })
            .catch(err => {
                console.log(err.message);
            });
    }); 

    // UPDATE a project
    // TODO: install method override
    // app.get >>> /project/projectId/edit >> edit-project.hbs
    app.get('/projects/:id/edit', (req, res) => {
        Project.findById(req.params.id, function (err, project) {
            res.render('edit-project', { project: project });
        })
    });

    // app.put >>> /project/projectId >>> redirect show-project.hbs
    app.put('/projects/:id', (req, res) => {
        Project.findByIdAndUpdate(req.params.id, req.body)
            .then(project => {
                res.redirect(`/projects/${project._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })
    // DELETE
    app.delete('/projects/:id/edit', function (req, res) {
        Project.findByIdAndRemove(req.params.id).then((project) => {
            res.redirect('/projects');
        }).catch((err) => {
            console.log(err.message);
        })
    }) 

}