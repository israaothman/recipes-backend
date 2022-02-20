'use strict';

const axios = require('axios');

const errorHandler = require('../../middleware/500');
const client = require('../models/client.js');

const apiKey = process.env.APIKEY;


function Recipe(id, title, readyInMinutes, summary, vegetarian, instructions, sourceUrl, image) {
    this.id = id;
    this.title = title;
    this.readyInMinutes = readyInMinutes;
    this.summary = summary;
    this.vegetarian = vegetarian;
    this.instructions = instructions;
    this.sourceUrl = sourceUrl;
    this.image = image;
}



const homePage = (req, res) => {
    return res.status(200).send("Hello World");
}


const recipesHandler = (req, res) => {

    let recipes = []
    let numberOfReturnedData = 10; 
    axios.get(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}&number=${numberOfReturnedData}`)
        .then(result => {
            result.data.recipes.map(recipe => {
                let oneRecipe = new Recipe(recipe.id, recipe.title || '', recipe.readyInMinutes || '', recipe.summary || '', recipe.vegetarian, recipe.instructions || '', recipe.sourceUrl || '', recipe.image || '');
                recipes.push(oneRecipe);
            })
            return res.status(200).json(recipes);
        })
        .catch(error => {

            errorHandler(error, req, res);
        });
}

const searchRecipesHandler = (req, res) => {
    let recipes = []
    let query = req.query.search;
    axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}/`)
        .then(result => {
            result.data.results.map(recipe => {
                let oneRecipe = new Recipe(recipe.id, recipe.title || '', recipe.readyInMinutes || '', recipe.summary || '', recipe.vegetarian, recipe.instructions || '', recipe.sourceUrl || '', recipe.image || '');
                recipes.push(oneRecipe);
            })
            return res.status(200).json(recipes);
        })
        .catch(error => {
            console.log(error);
            errorHandler(error, req, res);
        });
}



const addFavRecipeHandler = (req, res) => {
    const recipe = req.body;
    const sql = `INSERT INTO favRecipes(title, readyInMinutes, summary, vegetarian, instructions, sourceUrl, image, comment) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;`

    const values = [recipe.title, recipe.readyInMinutes, recipe.summary, recipe.vegetarian, recipe.instructions, recipe.sourceUrl, recipe.image, recipe.comment];
    client.query(sql, values).then((data) => {
        res.status(201).json(data.rows);
    })
        .catch(error => {
            console.log(error);
            errorHandler(error, req, res);
        });
}

const getFavRecipesHandler = (req, res) => {
    const sql = `SELECT * FROM favRecipes`;

    client.query(sql).then(data => {
        return res.status(200).json(data.rows);
    })
        .catch(error => {
            errorHandler(error, req, res);
        });
}

const getFavRecipeHandler = (req, res) => {

    const id = req.params.id;

    const sql = `SELECT * FROM favRecipes WHERE id = ${id}`;

    client.query(sql).then(data => {
        return res.status(200).json(data.rows);
    })
        .catch(error => {
            errorHandler(error, req, res);
        });
}

const updateFavRecipeHandler = (req, res) => {
    const id = req.params.id;
    const recipe = req.body;

    const sql = `UPDATE favRecipes SET title=$1, readyInMinutes=$2, summary=$3, vegetarian=$4, instructions=$5, sourceUrl=$6, image=$7, comment=$8 WHERE id=${id} RETURNING *;`;
    const values = [recipe.title, recipe.readyInMinutes, recipe.summary, recipe.vegetarian, recipe.instructions, recipe.sourceUrl, recipe.image, recipe.comment];

    client.query(sql, values).then(data => {
        return res.status(200).json(data.rows);
    }).catch(err => {
        console.log(err);
        errorHandler(err, req, res);
    });
}

const deleteFavRecipeHandler = (req, res) => {

    const id = req.params.id;

    const sql = `DELETE FROM favRecipes WHERE id=${id};`;

    client.query(sql).then(() => {
        return res.status(204).json({});
    })
        .catch(err => {
            errorHandler(err, req, res);
        })
}



module.exports = {
    homePage,
    recipesHandler,
    searchRecipesHandler,
    addFavRecipeHandler,
    getFavRecipesHandler,
    getFavRecipeHandler,
    updateFavRecipeHandler,
    deleteFavRecipeHandler,
};