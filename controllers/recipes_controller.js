const _ = require('lodash')
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
        res.render('recipes/new')
 
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
    

    //    let user = await UserModel.findOne({ _id: req.session.user })

        // RecipeModel.findOne({ slug: req.params.slug })
        //     .then(async item => {
        //         // if item is not found, redirect to homepage
        //         if (!item) {
        //             res.redirect('/recipes')
        //             return
        //         }

        //         recipe = item

        //         // TEST 14 JUNE POPULATE // 
        //         // let test = await ProductRatingModel.findOne({ product_id: item._id, user_id: '60c22ba20713960d224d4732',}).populate('user');
        //         // console.log(test)

        //         // get product ratings from DB
        //         return ProductRatingModel.find({ product_id: item._id }).sort({ created_at: -1 }).populate('user');
        //     })
        //     .then(ratings => {
        //         // console.log(ratings)
        //         res.render('recipes/show', {
        //             recipe: recipe,
        //             ratings: ratings
        //             // user: user
        //         })
        //         // console.log(user)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         res.redirect('/recipes')
        //     })

    // },
    create: async (req, res) => {
        let slug = _.kebabCase(req.body.name)
        let user = req.session.user

        RecipeModel.create({
            name: req.body.name,
            category: req.body.category,
            image: req.body.image,
            user_id: user._id,
            slug: slug,

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