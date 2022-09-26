/* eslint-disable max-len */
import { React, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../../Components/Loader';
import RecipeCard from '../../Components/RecipeCard';
import './cousinesCSS.css';
import { keys } from '../api_keys';

function Cousines() {
  // const apiKey = 'aa844e1894b74bc2a3e672c59f887e64';
  const { cuisine } = useParams();
  const [recipes, setRecipes] = useState({ isLoad: false, recipesList: [] });
  useEffect(() => {
    const getRecipes = async () => {
      const recipesReq = await fetch(`https://api.spoonacular.com/recipes/complexSearch?cuisine=${cuisine.toLowerCase()}&number=50&addRecipeInformation=true&apiKey=${keys.apiKey3}`);
      const recipesRes = await recipesReq.json();
      setRecipes({ isLoad: true, recipesList: recipesRes.results });
    };
    getRecipes();
  }, [cuisine]);
  return (
    <div className="wrapper">
      <h1 className="title">
        {cuisine}
        {' '}
        cuisine
      </h1>
      <div className="recipeList">
        {recipes.isLoad
          ? recipes.recipesList.map((recipe) => <RecipeCard id={recipe.id} url={recipe.image} title={recipe.title} summary={recipe.summary} dishType={recipe.dishTypes.at(0)} preparationMinutes={recipe.readyInMinutes} key={recipe.id} />)
          : (
            <Loader />
          )}
      </div>
    </div>
  );
}

export default Cousines;
