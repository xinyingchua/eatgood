const _ = require('lodash')
const { RecipeModel } = require('../models/recipes')


module.exports = {

    index: async (req, res) => {
        let recipes = []

        try {
            recipes = await RecipeModel.find()
        } catch (err) {
            res.statusCode(500)
            return 'server error'
        }

        res.render('recipes/index', {
            recipes: recipes,
        })
    },


    show: (req, res) => {
        let recipe = {}

        RecipeModel.findOne({ slug: req.params.slug })
            .then(item => {
                // if item is not found, redirect to homepage
                if (!item) {
                    res.redirect('/recipes')
                    return
                }

                recipe = item

                // get product ratings from DB
                // return ProductRatingModel.find({ product_id: item._id }).sort({ created_at: -1 });
            })
            .then(ratings => {
                res.render('recipes/show', {
                    recipe: recipe,
                    // ratings: ratings
                })
            })
            .catch(err => {
                console.log(err)
                res.redirect('/recipes')
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
                image: req.body,image,
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