const express = require('express')
const passport = require('passport')

const User = require('../models/user')
const Project = require('../models/project')

module.exports = (app) => {

    // SHOW all projects a user is part of or owns
    app.get('/user/:id/projects', (req, res) => {
        currentUser = req.user;
        console.log(req.user.projects)
        User.findById(req.params.id)
            .populate(projects)
            .then(user => {
                var projects = user.projects
                res.render('projects-index', {
                    projects,
                    currentUser,
                })
            })
    })

    // NEW project
    app.get('/projects/new', (req, res) => {
        var currentUser = req.user;

        console.log(req.user);
        res.render('projects-new', {

            currentUser,
        });
    })

    // CREATE a project
    app.post('/projects/new', (req, res) => {

        console.log('creating a project...')
        console.log(req.user)

        if (req.user) {
            const project = new Project(req.body);
            project.author = req.user._id;

            project.save().then(project => {
                return User.findById(req.user._id);
            }).then(user => {
                user.projects.unshift(project._id);
                user.save();
                res.redirect('/projects/' + project._id);
            })
            .catch(err => {
                console.log(err.message);
            });
        } else {
            return res.status(401); // UNAUTHORIZED
        }
    });

    // EDIT one project
    app.put('/projects/:id/user/:userid', (req, res) => {

        User.findById(req.params.userid)
            .then(user => {
                Project.findById(req.params.id).populate('author');
            }).then(project => {
                if (user == project.author) {
                    project.dev.unshift(user);
                    project.save();
                    res.redirect('/projects/' + project._id);
                } else {
                    res.status(403);
                }
            })
    })

    // SHOW one project
    app.get('/projects/:id',  (req, res) => {
        const currentUser = req.user;
        // LOOK UP THE PROJECT
        Project.findById(req.params.id)
            .populate('author')
            .populate('devs')
            .then(project => {
                res.render('projects-show', { project, currentUser });
            })
            .catch(err => {
                console.log(err.message);
            });
    });

    // UPDATE a project
    // TODO: install method override
    // app.get >>> /project/projectId/edit >> edit-project.hbs
    app.get('/projects/:id/edit', (req, res) => {
        Project.findById(req.params.id, (err, project) => {
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
    app.delete('/projects/:id/edit', (req, res) => {
        Project.findByIdAndRemove(req.params.id).then((project) => {
            res.redirect('/projects');
        }).catch((err) => {
            console.log(err.message);
        })
    })

}
