'use strict';

const express = require('express');
const router = express.Router();

const { signup, signin} = require('../lib/controllers/loginController');
const {homePage,
    recipesHandler,
    searchRecipesHandler,
    addFavRecipeHandler,
    getFavRecipesHandler,
    getFavRecipeHandler,
    updateFavRecipeHandler,
    deleteFavRecipeHandler} = require('../lib/controllers/recipesController');


router.get('/', recipesHandler);
router.get('/searchRecipes', searchRecipesHandler);

router.post('/signup', signup);
router.post('/signin', signin);

// router.get('/signin', signin);

router.post('/addFavRecipe', addFavRecipeHandler);
router.get('/favRecipes/:id', getFavRecipesHandler);
router.get('/favRecipe/:id', getFavRecipeHandler);
router.put('/updateFavRecipe/:id', updateFavRecipeHandler);
router.delete('/deleteFavRecipe/:id', deleteFavRecipeHandler);


module.exports = router;
