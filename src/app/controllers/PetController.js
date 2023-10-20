const Pet = require('../models/Course')
const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose')

class PetController {
    getCat(req, res,next) {

        Promise.all([Pet.find({kind: "phổ biến nhất",species: "cat"}),Pet.countDocuments({cart: 'true'})])
                .then(([courses,countCart]) => 
                res.render('animals/cat', {
                    countCart,
                    courses : mutipleMongooseToObject(courses),
                })
            )
            .catch(next);
    }

    getDog(req, res,next) {
        Promise.all([Pet.find({kind: "phổ biến nhất",species: "dog"}),Pet.countDocuments({cart: 'true'})])
        .then(([courses,countCart]) => 
        res.render('animals/dog', {
            countCart,
            courses : mutipleMongooseToObject(courses),
        })
    )
    .catch(next);
    }

    detail(req,res,next) {
        Promise.all([Pet.findOne({ slug : req.params.slug}),Pet.countDocuments({cart: 'true'})])
        .then(([courses,countCart]) => 
        res.render('animals/detail-infor', {
            countCart,
            courses : mongooseToObject(courses),
        })
    )
    .catch(next);
}

    search(req,res,next) {
        Promise.all([Pet.find({style: req.query.types}) ,Pet.countDocuments({cart: 'true'})])
        .then(([courses,countCart]) => 
        res.render('animals/search', {
            countCart,
            courses : mutipleMongooseToObject(courses),
            nameSearch: req.query.types
        })
        )
        .catch(next);
    }

    

    listPet(req,res,next) {
        Pet.find({style: req.params.slug})
            .then(pet => 
                res.render('animals/list-pets',{pet: mutipleMongooseToObject(pet)})    
            )
        .catch(next);
    }

    // add to cart
    addToCart(req, res, next) {
            Pet.updateOne({_id : req.params.id},{cart: req.body.cart})
            .then( pet => 
                res.redirect('back')
            )
            .catch(next)
        // res.json(req.body);
    }

    removeFromCart(req,res,next) {
        Pet.updateOne({_id : req.params.id},{cart: req.body.cart})
        .then( () => res.redirect('back'))
        .catch(next)
    }

    showCart(req,res,next) {
        // console.log(req.query.cart)
        Pet.find({cart: req.query.cart})
            .then(pet => {
                res.render('animals/cart-detail',{pet: mutipleMongooseToObject(pet)})    
                // console.log(pet)
    })
        .catch(next);
    }

    petsManagement(req,res,next) {
        Pet.find({})
        .then(pet => {
            res.render('animals/manage-pets',{pet: mutipleMongooseToObject(pet)})    
    })
    .catch(next);
    }

    discountsManagement(req,res,next) {
        res.render('animals/discount');
    }

    buyPet(req,res,next) {
        res.render('users/buy');
    }
    
}
    
module.exports = new PetController();