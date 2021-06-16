const _ = require('lodash')
const moment = require('moment')
const { RecipeModel } = require('../models/recipes')
const {ProductRatingModel} = require('../models/product_ratings')
const { UserModel } = require('../models/user')


module.exports = {

    index: async (req, res) => {
        let recipes = []

        try {
            recipes = await RecipeModel.find()
            user = await UserModel.find()
        } catch (err) {
            res.statusCode(500)
            return 'server error'
        }

        res.render('recipes/index', {
            recipes: recipes,
        })
    },

    newForm: async (req, res) => {
        const messages = await req.consumeFlash('error')

        res.render('recipes/new', {
            messages: messages
        })
 
    },

    show: async (req, res) => {

            try {
                const recipe = await RecipeModel.findOne({ slug: req.params.slug }).populate('user');
                if (!recipe) {
                    throw new Error(`Could not find recipe with slug: ${req.params.slug}`);
                }
                const ratings = await ProductRatingModel.find({ product_id: recipe._id }).sort({ created_at: -1 }).populate('user');
                res.render('recipes/show', { recipe, ratings });
            } catch (err) {
                res.redirect('/recipes');
            }
     },
    

    create: async (req, res) => {
        // fields input validation
        if (!req.body.name || !req.body.image) {
            await req.flash('error', 'Name / URL Fields must not be empty');
    
            res.redirect('/recipes/new')

            return

        }

        let slug = _.kebabCase(req.body.name)
        let user = req.session.user

        const timestampNow = moment().utc()

        RecipeModel.create({
            name: req.body.name,
            category: req.body.category,
            image: req.body.image,
            user_id: user._id,
            slug: slug,
            description: req.body.description,
            created_at: timestampNow,
            updated_at: timestampNow

        })
        .then(createRespond => {
            res.redirect('/recipes')
        })
        .catch(err => {
            console.log(err)
            res.redirect('/recipes/new')
        })


    },
    editForm: (req, res) => {
        RecipeModel.findOne({slug: req.params.slug}) 
        .then(item => {
            res.render('recipes/edit', {
                recipe: item,
            })
        })
        .catch(err => {
            res.redirect('/recipes')
        })
    },

    update: (req, res) => {
        let newSlug = _.kebabCase(req.body.name)
        RecipeModel.updateOne({slug: req.params.slug},
            {
            $set: {
                name: req.body.name,
                category: req.body.category,
                image: req.body.image,
                description: req.body.description,
                slug: newSlug
                 }
            })
            .then(updateRecipe => {
                res.redirect(`/recipes/${newSlug}`)
            })
            .catch(err => {
                res.redirect(`/recipes/${req.params.slug}`)
            })
    },
    delete: (req, res) => {
        RecipeModel.deleteOne({slug: req.params.slug})

            .then(deleteRecipe => {
                res.redirect('/recipes')
            })
            .catch(err => {
                res.redirect('/recipes')
            })

    }

}