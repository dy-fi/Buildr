const express = require('express')

const User = require('../models/user')
const Project = require('../models/project')

module.exports = (app) => {

    app.get('/user/:id', async (req, res) => {

        user = await User.findById(req.params.id)

        res.render('user-show', {
            user,
        })
    })

    app.get('/edit/user/:id', async (req, res) => {

    })

    app.delete('/user/delete', async (req, res) => {

    })
}
