# Recipes-backend

## Author  
#### Isra'a Othman 


  ## Setup 
   - npm install to install the requied packages 
   - create a `.env` file and add :
       - PORT - 3000
       - process.env.APIKEY (git it from : [spoonacular](https://spoonacular.com/food-api) )

  #### How to initialize/run your application
- GET ALL Recipes: GET - http://localhost:3000/
- Signin: POST - http://localhost:3000/signin
- Signup: POST - http://localhost:3000/signup
- ADD Favorite Recipe : POST - http://localhost:3000/addFavRecipe
- GET All Favorite: GET - http://localhost:3000/favRecipe/:id  (the id is the user id )
- Update Favorite Recipe : PUT - http://localhost:3000/updateFavRecipe/:id
- Delete Favorite Recipe : DELETE - http://localhost:3000/deleteFavRecipe/:id


#### Deployed app link : 
 - https://recipes-israa-app.herokuapp.com 

 you can replace the above endpoints with the deployed link like this :  
 https://recipes-israa-app.herokuapp.com/favRecipes/1


