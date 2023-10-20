const express = require('express');
const router = express.Router();

const AccountController = require('../app/controllers/AccountController');
const PetController = require('../app/controllers/PetController');

router.get('/buy/page',PetController.buyPet);
router.get('/admin/manage/pets',PetController.petsManagement);
router.get('/admin/manage/discount',PetController.discountsManagement);
router.get('/admin/manage/members',AccountController.membersManagement);
router.get('/register', AccountController.register);
router.get('/login', AccountController.login);
router.get('/home', AccountController.home);
router.post('/create',AccountController.create);
router.post('/check/user',AccountController.check);
router.get('/admin/page',AccountController.admin);

module.exports = router;
