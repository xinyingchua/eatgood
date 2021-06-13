const _ = require('lodash')
const moment = require('moment')
const {RecipeModel} = require('../models/recipes')
const {ProductRatingModel} = require('../models/product_ratings')


module.exports = {

    create: (req, res) => {

        let rating = Number(req.body.rating)
        let user = req.session.user

        // retrieve product based on slug from db
        RecipeModel.findOne({ slug: req.params.slug })
            .then(recipeResponse => {
                if (!recipeResponse) {
                    res.redirect('/recipes')
                    return
                }

                const timestampNow = moment().utc()

                return ProductRatingModel.create({
                    product_id: recipeResponse._id,
                    rating: rating,
                    rating_user: user.first_name,
                    comment: req.body.comment,
                    created_at: timestampNow,
                    updated_at: timestampNow,
                })
            })
            .then(createRatingResp => {
                res.redirect(`/recipes/${req.params.slug}`)
                return
            })
            .catch(err => {
                console.log(err)
                res.redirect('/recipes')
            })
    }

}