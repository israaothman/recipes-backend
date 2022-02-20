'use strict';

const express = require('express');
const router = express.Router();

// const { signup, signin} = require('../lib/controllers/loginController');
const {homePage,
    recipesHandler,
    searchRecipesHandler,
    addFavRecipeHandler,
    getFavRecipesHandler,
    getFavRecipeHandler,
    updateFavRecipeHandler,
    deleteFavRecipeHandler} = require('../lib/controllers/recipesController');


router.get('/', homePage);
router.get('/recipes', recipesHandler);
router.get('/searchRecipes', searchRecipesHandler);

// router.post('/signup', signup);
// router.get('/signin', signin);

router.post('/addFavRecipe', addFavRecipeHandler);
router.get('/favRecipes', getFavRecipesHandler);
router.get('/favRecipe/:id', getFavRecipeHandler);
router.put('/updateFavRecipe/:id', updateFavRecipeHandler);
router.delete('/deleteFavRecipe/:id', deleteFavRecipeHandler);


module.exports = router;
