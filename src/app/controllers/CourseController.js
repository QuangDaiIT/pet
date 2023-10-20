const Pet = require('../models/Course')
const {mongooseToObject, mutipleMongooseToObject} = require('../../util/mongoose')
class CourseController {
    /// get /courses/:slug
    // nó động thì ta sẽ truyền param động là :slug.
    show(req, res,next) {
        Pet.findOne({ slug : req.params.slug})
            .then(pet => 
                res.render('courses/show',{pet: mongooseToObject(pet)})
            )
            .catch(next);
    }

    // [GET] /course/create
    create(req,res,next) {
        res.render('courses/create');
    }

    // [POST] /course/store
    store(req,res,next) {
        // res.json(req.body);
        req.body.image = req.body.videoId;
        // https://img.youtube.com/vi/${req.body.videoId}/sddefault.jpg
        const pet = new Pet(req.body)
         pet.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(error => {

            });
    }

    // [GET] /course/:id/edit
    edit(req,res,next) {
        Pet.findById(req.params.id)
            .then(pet => res.render('courses/edit',
            {
                pet: mongooseToObject(pet)
            }))
            .catch(next)
            //
    }

    // [DELETE] /courses/:id
    update(req, res, next) {
        Pet.updateOne({_id : req.params.id},req.body)
        .then(() => res.redirect('/me/stored/courses'))
        .catch(next)
    }

    destroy(req,res,next) {
        Pet.delete({_id : req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Pet.restore({_id : req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    // [DELETE] /courses/:id/forceDestroy
    forceDestroy(req, res, next) {
        Pet.deleteOne({_id : req.params.id})
        .then(() => res.redirect('back'))
        .catch(next)
    }

    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete' : 
                Pet.delete({_id : {$in : req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default :
                res.json({message : 'Action is invalid'});
        }
    }
}
module.exports = new CourseController();
