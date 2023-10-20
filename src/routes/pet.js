const express = require('express');
const router = express.Router();

const PetController = require('../app/controllers/PetController');

router.get('/cat', PetController.getCat);
router.get('/dog', PetController.getDog);
router.put('/remove/:id/cart',PetController.removeFromCart);
router.put('/:id/cart',PetController.addToCart);
router.get('/search', PetController.search);
router.get('/detail/:slug',PetController.detail);
router.get('/:slug',PetController.listPet);
router.get('/cart/show',PetController.showCart);
module.exports = router;
