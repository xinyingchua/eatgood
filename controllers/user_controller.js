const { UserModel} = require('../models/user')
const { RecipeModel } = require('../models/recipes')
const moment = require('moment')
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = {

    registerForm: async (req, res) => {

        const messages = await req.consumeFlash('error')

        res.render('users/register', {
            messages: messages
        })

    },

    loginForm: async (req, res) => {
        const messages = await req.consumeFlash('error')

        res.render('users/login', {
            messages: messages
        })

    },

    registerNewUser: async (req, res) => {

        // validate user's login
        if (!req.body.email) {
            await req.flash('error', 'Email Fields must not be empty');
            res.redirect('/users/register')
            return
        }
        // 1. validate email login and pw
        if (req.body.password !== req.body.password_confirm) {
            await req.flash('error', 'Password does not match');
            res.redirect('/users/register')
            return
        }
        // 2. ensure no duplicated account being created (use try/ catch block)
        let user = null
        try {
            user = await UserModel.findOne({ email:req.body.email})
        }
        catch (err) {
            res.redirect('/users/register')
            return
        }

        if(user) { // if user exists in database 
        await req.flash('error', 'This email is already registered. Try logging in instead.');
        res.redirect('/users/register')
        } 
        const timestampNow = moment().utc()
        // hash using bycrpt
        const generatedHash = await bcrypt.hash(req.body.password, saltRounds)

        try {
            await UserModel.create({
                email: req.body.email,
                hash: generatedHash,
                first_name: req.body.first_name,
                created_at: timestampNow,
                updated_at: timestampNow
            })

        }
        catch(err) {
            console.log(err)
            res.redirect('/users/register')
            return
        }
        res.redirect('/recipes')
    },
    loginUser: async(req, res) => {
        let user = null
        try {
            user = await UserModel.findOne({ email: req.body.email})
        }
        catch(err) {
            console.log(err)
            res.redirect('/users/register')
            return
        }
        if(! req.body.email) {
            await req.flash('error', 'Email fields must not be empty ');
            res.redirect('/users/login')
            return
        }
        if(!req.body.password) {
            await req.flash('error', 'Password fields must not be empty ');
            res.redirect('/users/login')
            return
        }
        if(!user) {
            await req.flash('error', 'This email is not registered, please create an account.');
            res.redirect('/users/register')
            return
        }
        const validatedPassword = await bcrypt.compare(req.body.password, user.hash)
        if(!validatedPassword){
            await req.flash('error', 'The password you entered is incorrect. Please try again.');
            res.redirect('/users/login')
            return
        }
        req.session.user = user
        // console.log(user.first_name)
        res.redirect('/users/dashboard')
    },
    dashboard: async (req, res) => {

        let user = req.session.user

        try {
            const recipes = await RecipeModel.find({ user_id: user._id }).populate('user');
            res.render('users/dashboard', { recipes, user});
            // recipes = await RecipeModel.find()
            // user = await UserModel.find()
            
        } catch (err) {
            res.redirect('/recipes');
        }


    },
    logout: (req, res) => {
        req.session.destroy()
        res.redirect('/recipes')
    },
}