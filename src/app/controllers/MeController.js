const Pet = require('../models/Course')
const {mutipleMongooseToObject} = require('../../util/mongoose')

class MeController {

    // [GET] / me/stored/courses
    storedCourses(req, res,next) {

        // return res.json(res.locals._sort);
        let courseQuery = Pet.find({});
        
        // if(req.query.hasOwnProperty('_sort')){
        //     courseQuery = courseQuery.sort({
        //         [req.query.column]: req.query.type
        //     })
        // }

        Promise.all([courseQuery,Pet.countDocumentsDeleted()])
        .then(([courses,deletedCount]) => {
            res.render('me/stored-courses',{
                deletedCount,
                courses: mutipleMongooseToObject(courses)
            })
        })
        .catch(next);

        // Course.countDocumentsDeleted()
        // .then((deletedCount) => {
        //     console.log(deletedCount);
        // })
        // .catch(() => {});

        // Course.find({})
        // .then(courses => res.render('me/stored-courses',{
        //     courses: mutipleMongooseToObject(courses)
        // }))
        // .catch(next);
    }

    // [GET] / me/trash/courses
    trashCourses(req,res,next) {
        Pet.findDeleted({})
        .then(courses => res.render('me/trash-courses',{
            courses: mutipleMongooseToObject(courses)
        }))
        .catch(next);
    }
}

module.exports = new MeController();
