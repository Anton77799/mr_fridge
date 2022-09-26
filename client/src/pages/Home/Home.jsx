import React, { useState, useEffect } from 'react';
// , { useState, useEffect }
import FormSearch from '../../Components/formSearch/FormSearch';
import RecipeCard from '../../Components/RecipeCard';
import './homeCSS.css';
// import { recipes } from './save';
import { keys } from '../api_keys';

export default function Home() {
  const [recipes, setReciepes] = useState([]);

  useEffect(() => {
    const getRandomRecipes = async () => {
      // const apiKey = '3f8c71044afe46a1a3cae029bb6d7832';
      const response = await fetch(`https://api.spoonacular.com/recipes/random?number=20&apiKey=${keys.apiKey1}`, {
        method: 'GET',
      });
      const recipesDef = await response.json();
      console.log('recipesDef', recipesDef);
      const recipesProm = recipesDef.recipes
        .map(async (recipe) => ({
          id: recipe.id,
          title: recipe.title,
          image: recipe.image,
          readyInMinutes: recipe.readyInMinutes,
          servings: recipe.servings,
          summary: recipe.summary,
          dishType: recipe.dishTypes.at(0),
          fav: false,
        }));
      const rec = await Promise.all(recipesProm);
      setReciepes(rec);
    };
    getRandomRecipes();
  }, []);

  const submitHandler = async (search) => {
    // const apiKey = 'a474cb28455d46ceb257ef9e3a4a72f7';
    // const apiKey = '3f8c71044afe46a1a3cae029bb6d7832';

    const searchStr = search.split(' ').join(',+');

    const response = await fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${searchStr}&addRecipeInformation=true&number=10&apiKey=${keys.apiKey2}`, {
      method: 'GET',
    });
    const recipesDef = await response.json();
    console.log('recipesDef', recipesDef);
    const recipesProm = recipesDef.results
      .map(async (recipe) => ({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
        servings: recipe.servings,
        summary: recipe.summary,
        likes: recipe.likes,
        dishType: recipe.dishTypes.at(0),
        fav: false,
      }));
    const rec = await Promise.all(recipesProm);
    setReciepes(rec);
    console.log('recipes ', rec);
  };

  return (
    <div>
      <div>
        <FormSearch submitHandler={submitHandler} id="searchForm" />
      </div>

      <div className="recipeList">
        {recipes && recipes.map((recipe) => (
          <RecipeCard
            id={recipe.id}
            url={recipe.image}
            title={recipe.title}
            summary={recipe.summary}
            dishType={recipe.dishType}
            preparationMinutes={recipe.readyInMinutes}
            likes={recipe.likes}
            key={recipe.id}
            fav={recipe.fav}
          />
        ))}
      </div>

    </div>
  );
}
