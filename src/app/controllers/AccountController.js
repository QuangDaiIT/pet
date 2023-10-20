const Users = require('../models/Account')
const {mutipleMongooseToObject, mongooseToObject} = require('../../util/mongoose');

class AccountController {

    register(req, res,next) {
        res.render("users/register");
    }

    login(req, res,next) {
        //.json(.locals._login)
        res.render("users/login");
        // if(req.query.hasOwnProperty("_login")){
            
        // }else{
            
        // }
        
    }

    home(req, res,next) {
        res.render("home");
    }

    create(req, res, next) {
        
    }

    admin(req,res,next) {
        res.render("users/admin");
    }

    membersManagement(req,res,next) {
        Users.find({}) 
        .then( users => 
            res.render("users/members",
            {
                users: mutipleMongooseToObject(users)
            }))
        .catch(next)
    }

    check(req,res,next) {
        Users.updateOne({username : req.body.name,password: req.body.password},{status:'true'}) 
        .then(() => 
            res.redirect('/'))
        .catch(next)
    }

}
    
module.exports = new AccountController();