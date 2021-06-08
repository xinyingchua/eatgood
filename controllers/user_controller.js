// const { UserModel } = require('../models/users')
// const moment = require('moment')
// const { v4: uuidv4 } = require('uuid')
// const { createHash } = require('crypto') 
// const bcrypt = require('bcrypt')
// const saltRounds = 10

module.exports = {

    registerForm: (req, res) => {

        res.render('users/register')

    },

    loginForm: (req, res) => {

        res.render('users/login')

    },

    

}