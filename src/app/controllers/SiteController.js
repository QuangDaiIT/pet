const Pet = require('../models/Course')
const {mutipleMongooseToObject} = require('../../util/mongoose')
class SiteController {
    // [GET]/
    home(req, res,next) {
        Promise.all([Pet.find({kind: "phổ biến nhất",species: "dog"}),Pet.countDocuments({cart: 'true'})])
        .then(([courses,countCart]) => 
        res.render('home', {
            countCart,
            courses : mutipleMongooseToObject(courses),
        })
    )
    .catch(next);
}
    // [GET] / search
    search(req, res) {
        res.render('search');
    }
    // [GET] / contact
}

module.exports = new SiteController();
